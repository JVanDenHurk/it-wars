import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
  finalizeExpiredMaintenanceWindows,
} from "@/lib/maintenance-window";
import { applyCreditPenalty } from "@/lib/player-bankruptcy";
import { prisma } from "@/lib/prisma";
import {
  calculateTicketAgeMinutes,
} from "@/lib/ticket-value";

function getAbandonmentRule(
  severity: "P1" | "P2" | "P3" | "P4"
) {
  switch (severity) {
    case "P1":
      return {
        minutes: 10,
        penalty: 500,
      };

    case "P2":
      return {
        minutes: 20,
        penalty: 300,
      };

    case "P3":
      return {
        minutes: 30,
        penalty: 200,
      };

    case "P4":
    default:
      return {
        minutes: 44,
        penalty: 100,
      };
  }
}

function getAbandonmentMessage(
  title: string,
  category: string
) {
  const lowerTitle =
    title.toLowerCase();

  if (
    lowerTitle.includes(
      "phishing"
    ) ||
    lowerTitle.includes(
      "suspicious email"
    )
  ) {
    return "You ignored a phishing incident long enough for the email to make a full tour of the company. Security would like to know why everyone in Sales clicked it.";
  }

  if (
    lowerTitle.includes(
      "printer"
    )
  ) {
    return "The printer ticket sat untouched for so long that the user has now formed a personal vendetta against IT.";
  }

  if (
    lowerTitle.includes(
      "password"
    ) ||
    lowerTitle.includes(
      "locked"
    )
  ) {
    return "The user waited so long for help that they've called the Service Desk four times, emailed your manager, and are now standing behind you.";
  }

  if (
    lowerTitle.includes(
      "network"
    ) ||
    lowerTitle.includes(
      "switch"
    ) ||
    lowerTitle.includes(
      "wifi"
    ) ||
    lowerTitle.includes(
      "wi-fi"
    )
  ) {
    return "The network issue was left alone long enough to become everyone else's problem too.";
  }

  if (
    lowerTitle.includes(
      "backup"
    )
  ) {
    return "The backup failure was ignored long enough for someone to finally ask the uncomfortable question: when was the last successful backup?";
  }

  switch (category) {
    case "SECURITY":
      return "The Security team has noticed you ignored their incident. They have also noticed everything else you have ever done.";

    case "NETWORK":
      return "Networking has escalated the issue and quietly added your name to a list titled 'people who should not ignore outages'.";

    case "SYSTEMS":
      return "Infrastructure has declared the ticket abandoned and would like you to stop pretending the server was going to fix itself.";

    case "SERVICE_DESK":
      return "The user gave up waiting for you and has now contacted every other person in IT instead.";

    default:
      return "You left the ticket sitting in your queue for too long. It has been marked abandoned.";
  }
}

export async function POST() {
  try {
    /*
     * ============================
     * AUTHENTICATION
     * ============================
     */
    const session =
      await auth.api.getSession({
        headers:
          await headers(),
      });

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * ============================
     * CURRENT PLAYER
     * ============================
     */
    const player =
      await prisma.player.findUnique({
        where: {
          userId:
            session.user.id,
        },
      });

    if (!player) {
      return NextResponse.json(
        {
          error:
            "Player not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * ============================
     * FINALIZE MAINTENANCE WINDOWS
     * ============================
     *
     * Any Maintenance Window that
     * has finished becomes permanent
     * paused SLA time before we check
     * abandonment.
     *
     * Example:
     *
     * maintenancePausedMinutes:
     * 0 -> 5
     *
     * maintenanceUntil:
     * expired date -> null
     */
    await finalizeExpiredMaintenanceWindows(
      player.id
    );

    /*
     * ============================
     * OPEN TICKETS
     * ============================
     */
    const openTickets =
      await prisma.ticket.findMany({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",

          abandonmentPenaltyApplied:
            false,
        },

        orderBy: {
          createdAt:
            "asc",
        },
      });

    if (
      openTickets.length ===
      0
    ) {
      return NextResponse.json({
        success:
          true,

        abandoned:
          false,
      });
    }

    const now =
      new Date();

    /*
     * ============================
     * ACTIVE POISON EFFECTS
     * ============================
     */

    /*
     * Major Incident
     *
     * Abandonment penalties
     * increase by 50%.
     */
    const abandonmentPenaltyPoisonActive =
      openTickets.some(
        (ticket) =>
          ticket.isPoison &&
          ticket.poisonEffect ===
            "ABANDONMENT_PENALTY"
      );

    /*
     * ============================
     * FIND ABANDONED TICKET
     * ============================
     *
     * Effective age now includes:
     *
     * real age
     * +
     * poison SLA pressure
     * -
     * completed maintenance time
     * -
     * elapsed active maintenance time
     *
     * An actively protected ticket
     * cannot continue ageing toward
     * abandonment.
     */
    const abandonedTicket =
      openTickets.find(
        (ticket) => {
          /*
           * If Maintenance Window is
           * currently active, the ticket
           * is protected from abandonment.
           *
           * We explicitly skip it here
           * in addition to using effective
           * age calculations.
           */
          const maintenanceActive =
            ticket
              .maintenanceUntil !==
              null &&
            ticket
              .maintenanceUntil >
              now;

          if (
            maintenanceActive
          ) {
            return false;
          }

          const ageMinutes =
            calculateTicketAgeMinutes(
              ticket.createdAt,
              ticket
                .slaAgeOffsetMinutes,
              ticket
                .maintenanceUntil,
              ticket
                .maintenancePausedMinutes
            );

          /*
           * Executive Escalation
           *
           * Special 8 minute SLA.
           */
          if (
            ticket.isPoison &&
            ticket.poisonEffect ===
              "EXECUTIVE_ESCALATION"
          ) {
            return (
              ageMinutes >=
              8
            );
          }

          const rule =
            getAbandonmentRule(
              ticket.severity
            );

          return (
            ageMinutes >=
            rule.minutes
          );
        }
      );

    /*
     * Nothing has breached yet.
     */
    if (!abandonedTicket) {
      return NextResponse.json({
        success:
          true,

        abandoned:
          false,
      });
    }

    /*
     * ============================
     * EFFECTIVE AGE
     * ============================
     */
    const effectiveAgeMinutes =
      calculateTicketAgeMinutes(
        abandonedTicket
          .createdAt,
        abandonedTicket
          .slaAgeOffsetMinutes,
        abandonedTicket
          .maintenanceUntil,
        abandonedTicket
          .maintenancePausedMinutes
      );

    /*
     * ============================
     * BASE ABANDONMENT RULE
     * ============================
     */
    const baseRule =
      getAbandonmentRule(
        abandonedTicket
          .severity
      );

    let abandonmentMinutes =
      baseRule.minutes;

    let basePenalty =
      baseRule.penalty;

    /*
     * ============================
     * EXECUTIVE ESCALATION
     * ============================
     *
     * Special rules:
     *
     * 8 minute SLA
     * 500 CR penalty
     */
    if (
      abandonedTicket
        .isPoison &&
      abandonedTicket
        .poisonEffect ===
        "EXECUTIVE_ESCALATION"
    ) {
      abandonmentMinutes =
        8;

      basePenalty =
        500;
    }

    /*
     * ============================
     * MAJOR INCIDENT
     * ============================
     *
     * +50% abandonment penalty.
     */
    const finalPenalty =
      abandonmentPenaltyPoisonActive
        ? Math.floor(
            basePenalty *
              1.5
          )
        : basePenalty;

    /*
     * ============================
     * FAILURE MESSAGE
     * ============================
     */
    const failureMessage =
      abandonedTicket
        .isPoison &&
      abandonedTicket
        .poisonEffect ===
        "EXECUTIVE_ESCALATION"
        ? "The executive waited long enough to escalate the escalation. Your manager is now involved, their manager is involved, and somehow this has become a career discussion."
        : getAbandonmentMessage(
            abandonedTicket
              .title,
            abandonedTicket
              .category
          );

    const abandonmentTime =
      new Date();

    /*
     * ============================
     * CLOSE ABANDONED TICKET
     * ============================
     */
    await prisma.ticket.update({
      where: {
        id:
          abandonedTicket.id,
      },

      data: {
        status:
          "EXPIRED",

        abandonmentPenaltyApplied:
          true,

        abandonmentPenaltyAt:
          abandonmentTime,

        expiredAt:
          abandonmentTime,
      },
    });

    /*
     * ============================
     * APPLY CREDIT PENALTY
     * ============================
     */
    const penaltyResult =
      await applyCreditPenalty(
        player.id,
        player.credits,
        finalPenalty,
        {
          attackSourcePlayerId:
            abandonedTicket
              .attackSourcePlayerId,

          pvpAttackId:
            abandonedTicket
              .pvpAttackId,
        }
      );

    /*
     * ============================
     * RESPONSE
     * ============================
     */
    return NextResponse.json({
      success:
        true,

      abandoned:
        true,

      ticketId:
        abandonedTicket.id,

      ticketNumber:
        `INC${abandonedTicket.id
          .toString()
          .padStart(
            5,
            "0"
          )}`,

      ticketTitle:
        abandonedTicket.title,

      severity:
        abandonedTicket.severity,

      isPoison:
        abandonedTicket.isPoison,

      poisonEffect:
        abandonedTicket
          .poisonEffect,

      /*
       * ============================
       * AGE INFORMATION
       * ============================
       */
      realAgeMinutes:
        Math.max(
          0,
          Math.floor(
            (
              Date.now() -
              abandonedTicket
                .createdAt
                .getTime()
            ) /
              60000
          )
        ),

      slaAgeOffsetMinutes:
        abandonedTicket
          .slaAgeOffsetMinutes,

      maintenancePausedMinutes:
        abandonedTicket
          .maintenancePausedMinutes,

      maintenanceUntil:
        abandonedTicket
          .maintenanceUntil,

      effectiveAgeMinutes,

      abandonmentMinutes,

      /*
       * ============================
       * PENALTY INFORMATION
       * ============================
       */
      basePenalty,

      penalty:
        finalPenalty,

      abandonmentPenaltyPoisonActive,

      credits:
        penaltyResult.player
          .credits,

      failureMessage,

      bankrupt:
        penaltyResult.bankrupt,

      resetToServiceDesk:
        penaltyResult.bankrupt,

      killAwarded:
        penaltyResult.killAwarded,

      attackSourcePlayerId:
        abandonedTicket
          .attackSourcePlayerId,

      pvpAttackId:
        abandonedTicket
          .pvpAttackId,
    });
  } catch (error) {
    console.error(
      "Check abandoned tickets error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to check abandoned tickets.",
      },
      {
        status: 500,
      }
    );
  }
}