import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
    getPvPAttackDefinition,
    type PvPAttackType,
} from "@/lib/pvp-attacks";

const validCategories = [
  "SERVICE_DESK",
  "NETWORK",
  "SYSTEMS",
  "SECURITY",
] as const;

const validSeverities = [
  "P1",
  "P2",
  "P3",
  "P4",
] as const;

function randomItem<T>(
  items: readonly T[]
): T {
  return items[
    Math.floor(
      Math.random() *
        items.length
    )
  ];
}

function getAttackTicketTitle(
  attackType: PvPAttackType,
  index: number
) {
  switch (attackType) {
    case "PASSWORD_RESET_FLOOD":
      return `Password Reset Request ${index + 1}`;

    case "NETWORK_OUTAGE":
      return "Regional Network Outage";

    case "FAILED_DEPLOYMENT":
      return "Production Deployment Failure";

    case "PHISHING_CAMPAIGN":
      return "Company-Wide Phishing Campaign";

    case "TICKET_STORM":
      return `Ticket Storm Incident ${index + 1}`;

    case "MAJOR_INCIDENT":
      return "Major Production Incident";

    default:
      return "Hostile Support Request";
  }
}

function getAttackTicketDescription(
  attackType: PvPAttackType,
  index: number
) {
  switch (attackType) {
    case "PASSWORD_RESET_FLOOD":
      return `Another user has forgotten their password and is now unable to work. This is password reset request ${
        index + 1
      } of several that appeared suspiciously close together.`;

    case "NETWORK_OUTAGE":
      return "Multiple users are reporting they cannot access internal systems. Connectivity appears to be failing across part of the environment.";

    case "FAILED_DEPLOYMENT":
      return "A production deployment has failed and several services are now unavailable. The application team insists the change was tested.";

    case "PHISHING_CAMPAIGN":
      return "Multiple users have received a suspicious email and several have already clicked the link. Security response is required.";

    case "TICKET_STORM":
      return "Another urgent support request has entered the queue as part of a sudden surge in incidents. Somebody is having a very bad day.";

    case "MAJOR_INCIDENT":
      return "A major business service is unavailable and management has declared a critical incident. Multiple teams are now asking for updates.";

    default:
      return "A hostile ticket has appeared in your queue.";
  }
}

function getAttackSuccessMessage(
  attackType: PvPAttackType
) {
  switch (attackType) {
    case "PASSWORD_RESET_FLOOD":
      return "Password reset completed. One user is productive again. Unfortunately, several more are waiting.";

    case "NETWORK_OUTAGE":
      return "Connectivity has been restored. Networking is claiming this was always part of the plan.";

    case "FAILED_DEPLOYMENT":
      return "The deployment has been recovered and production is stable again. Nobody is volunteering to explain what happened.";

    case "PHISHING_CAMPAIGN":
      return "The phishing campaign has been contained. Finance has been asked to stop clicking links for the remainder of the day.";

    case "TICKET_STORM":
      return "Another incident from the storm has been cleared. The queue is slightly less terrifying now.";

    case "MAJOR_INCIDENT":
      return "The major incident is resolved. Management has left the call and suddenly everyone remembers they have other meetings.";

    default:
      return "The hostile ticket has been resolved.";
  }
}

function getAttackFailureMessage(
  attackType: PvPAttackType
) {
  switch (attackType) {
    case "PASSWORD_RESET_FLOOD":
      return "The password reset somehow made things worse. The user is now locked out of more systems than when they started.";

    case "NETWORK_OUTAGE":
      return "Your network troubleshooting expanded the outage. More users are now offline and Networking would like you to stop helping.";

    case "FAILED_DEPLOYMENT":
      return "Your attempted recovery has made the failed deployment even more failed. Production is now deeply unhappy.";

    case "PHISHING_CAMPAIGN":
      return "The phishing incident has spread further. Somebody has entered their credentials into a fake login page twice.";

    case "TICKET_STORM":
      return "You dealt with one ticket from the storm incorrectly. Somehow the queue feels even more hostile now.";

    case "MAJOR_INCIDENT":
      return "Your attempted fix during the major incident caused another outage. Management has added more people to the call.";

    default:
      return "Your attempted resolution made the hostile ticket worse.";
  }
}

export async function POST(
  request: Request
) {
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
     * REQUEST BODY
     * ============================
     */
    const body =
      await request.json();

    const attackType =
      body.attackType as PvPAttackType;

    const targetPlayerId =
      Number(
        body.targetPlayerId
      );

    if (
      !attackType ||
      !Number.isInteger(
        targetPlayerId
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid attack request.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * ATTACK DEFINITION
     * ============================
     */
    const attack =
      getPvPAttackDefinition(
        attackType
      );

    if (!attack) {
      return NextResponse.json(
        {
          error:
            "Unknown PvP attack.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * ATTACKER
     * ============================
     */
    const attacker =
      await prisma.player.findUnique({
        where: {
          userId:
            session.user.id,
        },
      });

    if (!attacker) {
      return NextResponse.json(
        {
          error:
            "Attacker player not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Cannot attack yourself.
     */
    if (
      attacker.id ===
      targetPlayerId
    ) {
      return NextResponse.json(
        {
          error:
            "You cannot attack yourself.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * TARGET
     * ============================
     */
    const target =
      await prisma.player.findUnique({
        where: {
          id:
            targetPlayerId,
        },
      });

    if (!target) {
      return NextResponse.json(
        {
          error:
            "Target player not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * ============================
     * ONLINE CHECK
     * ============================
     *
     * Only allow attacks against
     * players active in the last
     * 2 minutes.
     */
    const now =
      new Date();

    const activeCutoff =
      new Date(
        now.getTime() -
          2 * 60 * 1000
      );

    const activeTarget =
      await prisma.player.findFirst({
        where: {
          id:
            target.id,

          lastActiveAt: {
            gt:
              activeCutoff,
          },

          user: {
            sessions: {
              some: {
                expiresAt: {
                  gt:
                    now,
                },
              },
            },
          },
        },

        select: {
          id:
            true,
        },
      });

    if (!activeTarget) {
      return NextResponse.json(
        {
          error:
            "That player is not currently online.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * CREDIT CHECK
     * ============================
     */
    if (
      attacker.credits <
      attack.cost
    ) {
      return NextResponse.json(
        {
          error:
            `You need ${attack.cost} CR to launch this attack.`,
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * PREPARE TICKETS
     * ============================
     */
    const ticketData =
      Array.from({
        length:
          attack.ticketCount,
      }).map(
        (_, index) => {
          const category =
            attack.category ===
            "MIXED"
              ? randomItem(
                  validCategories
                )
              : attack.category;

          const severity =
            attack.severity ===
            "MIXED"
              ? randomItem(
                  validSeverities
                )
              : attack.severity;

          return {
            title:
              getAttackTicketTitle(
                attack.type,
                index
              ),

            description:
              getAttackTicketDescription(
                attack.type,
                index
              ),

            category,

            severity,

            difficulty:
              attack.difficulty,

            maxValue:
              attack.maxValue,

            baseXp:
              attack.baseXp,

            successMessage:
              getAttackSuccessMessage(
                attack.type
              ),

            failureMessage:
              getAttackFailureMessage(
                attack.type
              ),

            assignedToId:
              target.id,

            lastSentById:
              attacker.id,

            attackSourcePlayerId:
              attacker.id,
          };
        }
      );

    /*
     * ============================
     * CREATE ATTACK
     * ============================
     *
     * Deduct attacker Credits,
     * create PvPAttack record,
     * then create hostile tickets.
     */
    const result =
      await prisma.$transaction(
        async (tx) => {
          /*
           * Deduct attack cost.
           *
           * We check again inside
           * the update condition so
           * two fast requests cannot
           * overspend the attacker.
           */
          const deducted =
            await tx.player.updateMany({
              where: {
                id:
                  attacker.id,

                credits: {
                  gte:
                    attack.cost,
                },
              },

              data: {
                credits: {
                  decrement:
                    attack.cost,
                },

                lastActiveAt:
                  now,
              },
            });

          if (
            deducted.count !==
            1
          ) {
            throw new Error(
              "INSUFFICIENT_CREDITS"
            );
          }

          /*
           * Record the attack.
           */
          const pvpAttack =
            await tx.pvPAttack.create({
              data: {
                type:
                  attack.type,

                status:
                  "ACTIVE",

                cost:
                  attack.cost,

                attackerId:
                  attacker.id,

                targetId:
                  target.id,
              },
            });

          /*
           * Create attack tickets.
           */
          const tickets =
            [];

          for (
            const ticket of
            ticketData
          ) {
            const createdTicket =
              await tx.ticket.create({
                data: {
                  ...ticket,

                  pvpAttackId:
                    pvpAttack.id,
                },
              });

            tickets.push(
              createdTicket
            );
          }

          return {
            pvpAttack,
            tickets,
          };
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

      attackId:
        result.pvpAttack.id,

      attackType:
        attack.type,

      attackName:
        attack.name,

      target:
        target.username,

      cost:
        attack.cost,

      ticketsCreated:
        result.tickets.length,

      message:
        `${attack.name} launched against ${target.username}. ${result.tickets.length} hostile ticket${
          result.tickets.length === 1
            ? ""
            : "s"
        } added to their queue.`,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "INSUFFICIENT_CREDITS"
    ) {
      return NextResponse.json(
        {
          error:
            "You no longer have enough Credits to launch that attack.",
        },
        {
          status: 400,
        }
      );
    }

    console.error(
      "PvP attack error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to launch PvP attack.",
      },
      {
        status: 500,
      }
    );
  }
}