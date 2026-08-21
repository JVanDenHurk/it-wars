import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { applyCreditPenalty } from "@/lib/player-bankruptcy";
import { prisma } from "@/lib/prisma";

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
    lowerTitle.includes("phishing") ||
    lowerTitle.includes("suspicious email")
  ) {
    return "You ignored a phishing incident long enough for the email to make a full tour of the company. Security would like to know why everyone in Sales clicked it.";
  }

  if (
    lowerTitle.includes("printer")
  ) {
    return "The printer ticket sat untouched for so long that the user has now formed a personal vendetta against IT.";
  }

  if (
    lowerTitle.includes("password") ||
    lowerTitle.includes("locked")
  ) {
    return "The user waited so long for help that they've called the Service Desk four times, emailed your manager, and are now standing behind you.";
  }

  if (
    lowerTitle.includes("network") ||
    lowerTitle.includes("switch") ||
    lowerTitle.includes("wifi") ||
    lowerTitle.includes("wi-fi")
  ) {
    return "The network issue was left alone long enough to become everyone else's problem too.";
  }

  if (
    lowerTitle.includes("backup")
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
        headers: await headers(),
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
     * OPEN TICKETS
     * ============================
     *
     * Only load tickets where an
     * abandonment penalty has not
     * already been applied.
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
      openTickets.length === 0
    ) {
      return NextResponse.json({
        success:
          true,

        abandoned:
          false,
      });
    }

    const now =
      Date.now();

    /*
     * ============================
     * FIND ONE ABANDONED TICKET
     * ============================
     *
     * Only process ONE ticket per call.
     *
     * This means the player sees one
     * abandonment popup at a time.
     */
    const abandonedTicket =
      openTickets.find(
        (ticket) => {
          const rule =
            getAbandonmentRule(
              ticket.severity
            );

          const ageMs =
            now -
            ticket.createdAt.getTime();

          const ageMinutes =
            ageMs /
            60000;

          return (
            ageMinutes >=
            rule.minutes
          );
        }
      );

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
     * ABANDONMENT RULE
     * ============================
     */
    const rule =
      getAbandonmentRule(
        abandonedTicket.severity
      );

    const failureMessage =
      getAbandonmentMessage(
        abandonedTicket.title,
        abandonedTicket.category
      );

    const abandonmentTime =
      new Date();

    /*
     * ============================
     * CLOSE ABANDONED TICKET
     * ============================
     *
     * Mark the ticket first so this
     * penalty can never be processed
     * twice.
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
     *
     * PvP information is passed into
     * the shared bankruptcy helper.
     *
     * Normal system tickets have:
     *
     * attackSourcePlayerId = null
     * pvpAttackId = null
     *
     * so they behave exactly as before.
     *
     * PvP tickets retain the ID of the
     * original attacker even if the
     * ticket has been bounced between
     * several players.
     */
    const penaltyResult =
      await applyCreditPenalty(
        player.id,
        player.credits,
        rule.penalty,
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

      penalty:
        rule.penalty,

      credits:
        penaltyResult.player
          .credits,

      failureMessage,

      bankrupt:
        penaltyResult.bankrupt,

      resetToServiceDesk:
        penaltyResult.bankrupt,

      /*
       * PvP information.
       *
       * Frontend does not have to
       * display this yet.
       */
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