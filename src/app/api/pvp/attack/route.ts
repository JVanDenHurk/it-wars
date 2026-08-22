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

function shuffleArray<T>(
  items: T[]
): T[] {
  const copy = [
    ...items,
  ];

  for (
    let i =
      copy.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() *
          (i + 1)
      );

    [
      copy[i],
      copy[j],
    ] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

/*
 * ============================
 * POISON TICKET TITLES
 * ============================
 */
function getPoisonTicketTitle(
  attackType: PvPAttackType,
  index: number
) {
  switch (attackType) {
    case "PASSWORD_RESET_FLOOD":
      return `Password Reset Request ${index + 1}`;

    case "SELF_SERVICE_PORTAL_OUTAGE":
      return "Self-Service Portal Outage";

    case "NETWORK_OUTAGE":
      return "Regional Network Outage";

    case "FAILED_DEPLOYMENT":
      return "Production Deployment Failure";

    case "PHISHING_CAMPAIGN":
      return "Company-Wide Phishing Campaign";

    case "MONITORING_FAILURE":
      return "Monitoring System Failure";

    case "DNS_FAILURE":
      return "Corporate DNS Failure";

    case "MAJOR_INCIDENT":
      return "Major Production Incident";

    case "EXECUTIVE_ESCALATION":
      return "Executive Escalation";

    case "MAIL_QUEUE_BACKLOG":
      return "Mail Queue Backlog";

    default:
      return "Poison Ticket";
  }
}

/*
 * ============================
 * POISON DESCRIPTIONS
 * ============================
 */
function getPoisonTicketDescription(
  attackType: PvPAttackType,
  index: number
) {
  switch (attackType) {
    case "PASSWORD_RESET_FLOOD":
      return `Another user has forgotten their password and is unable to work. This is password reset request ${
        index + 1
      } of several that appeared suspiciously close together.`;

    case "SELF_SERVICE_PORTAL_OUTAGE":
      return "The self-service portal is unavailable. Users who would normally resolve basic problems themselves are now contacting IT instead.";

    case "NETWORK_OUTAGE":
      return "Multiple users are reporting loss of connectivity across the environment. Existing incidents are rapidly becoming more urgent.";

    case "FAILED_DEPLOYMENT":
      return "A production deployment has failed and several services are unstable. The application team insists the change passed testing.";

    case "PHISHING_CAMPAIGN":
      return "Multiple users have received a suspicious email and several have already clicked the link. Security response is required.";

    case "MONITORING_FAILURE":
      return "The monitoring platform has stopped reporting reliable alerts. Everything appears healthy, which is usually when you should be worried.";

    case "DNS_FAILURE":
      return "Corporate DNS resolution is failing intermittently. Systems can still communicate occasionally, which somehow makes troubleshooting worse.";

    case "MAJOR_INCIDENT":
      return "A major business service is unavailable. Management has declared a critical incident and several teams are demanding updates.";

    case "EXECUTIVE_ESCALATION":
      return "A senior executive has escalated an issue as business critical and expects immediate resolution. Several managers are now watching.";

    case "MAIL_QUEUE_BACKLOG":
      return "The corporate mail queue has stopped processing normally. A large backlog of requests is waiting to be released.";

    default:
      return "A Poison Ticket has been injected into your queue.";
  }
}

/*
 * ============================
 * SUCCESS MESSAGES
 * ============================
 */
function getPoisonSuccessMessage(
  attackType: PvPAttackType
) {
  switch (attackType) {
    case "PASSWORD_RESET_FLOOD":
      return "Password reset completed. One user is productive again. Unfortunately, there are more of them.";

    case "SELF_SERVICE_PORTAL_OUTAGE":
      return "The self-service portal is back online. Users may once again attempt to help themselves before contacting IT.";

    case "NETWORK_OUTAGE":
      return "Connectivity has been restored. Networking is claiming this was always part of the troubleshooting plan.";

    case "FAILED_DEPLOYMENT":
      return "Production has recovered. Nobody is volunteering to explain what happened during the deployment.";

    case "PHISHING_CAMPAIGN":
      return "The phishing campaign has been contained. Finance has been politely asked to stop clicking things.";

    case "MONITORING_FAILURE":
      return "Monitoring is operational again. Unfortunately, it has immediately discovered several things that are broken.";

    case "DNS_FAILURE":
      return "DNS is resolving normally again. It was DNS. Of course it was DNS.";

    case "MAJOR_INCIDENT":
      return "The major incident has been resolved. Management has left the bridge and everyone suddenly remembers their other meetings.";

    case "EXECUTIVE_ESCALATION":
      return "The executive's issue has been resolved. Your manager has stopped receiving messages written entirely in capital letters.";

    case "MAIL_QUEUE_BACKLOG":
      return "The mail queue is moving again. The accumulated workload has not magically disappeared, unfortunately.";

    default:
      return "The Poison Ticket has been cleared.";
  }
}

/*
 * ============================
 * FAILURE MESSAGES
 * ============================
 */
function getPoisonFailureMessage(
  attackType: PvPAttackType
) {
  switch (attackType) {
    case "PASSWORD_RESET_FLOOD":
      return "The password reset somehow made things worse. The user is now locked out of more systems than when they started.";

    case "SELF_SERVICE_PORTAL_OUTAGE":
      return "Your attempted repair has made the self-service portal even less self-service.";

    case "NETWORK_OUTAGE":
      return "Your troubleshooting expanded the outage. Networking would like you to stop touching things.";

    case "FAILED_DEPLOYMENT":
      return "Your recovery attempt has made the failed deployment even more failed. Production is deeply unhappy.";

    case "PHISHING_CAMPAIGN":
      return "The phishing incident has spread further. Someone has now entered their credentials twice.";

    case "MONITORING_FAILURE":
      return "Monitoring is still broken, but it has successfully generated confidence that absolutely nothing can be trusted.";

    case "DNS_FAILURE":
      return "Your DNS fix has created several exciting new DNS problems.";

    case "MAJOR_INCIDENT":
      return "Your attempted fix during the major incident caused another outage. More managers have joined the bridge.";

    case "EXECUTIVE_ESCALATION":
      return "The executive's problem is now worse. Their manager has also joined the escalation.";

    case "MAIL_QUEUE_BACKLOG":
      return "The mail queue remains blocked and somebody has suggested restarting Exchange without telling anyone.";

    default:
      return "Your attempted resolution made the Poison Ticket worse.";
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
     * REQUEST
     * ============================
     */
    const body =
      await request.json();

    const attackType =
      body.attackType as
        PvPAttackType;

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
            "Invalid poison request.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * POISON DEFINITION
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
            "Unknown poison attack.",
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
            "Player not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      attacker.id ===
      targetPlayerId
    ) {
      return NextResponse.json(
        {
          error:
            "You cannot poison your own queue.",
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

    const now =
      new Date();

    const activeCutoff =
      new Date(
        now.getTime() -
          2 *
            60 *
            1000
      );

    /*
     * ============================
     * ONLINE CHECK
     * ============================
     */
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
      attacker.credits <=
      attack.cost
    ) {
      return NextResponse.json(
        {
          error:
            `You need more than ${attack.cost} CR to launch this poison. You cannot spend your final Credits.`,
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * DUPLICATE POISON CHECK
     * ============================
     */
    if (
      attack.poisonEffect !==
      "NONE"
    ) {
      const existingPoison =
        await prisma.ticket.findFirst({
          where: {
            assignedToId:
              target.id,

            status:
              "OPEN",

            isPoison:
              true,

            poisonEffect:
              attack.poisonEffect,
          },

          select: {
            id:
              true,

            title:
              true,
          },
        });

      if (existingPoison) {
        return NextResponse.json(
          {
            error:
              `${target.username} is already affected by ${attack.effectDescription}`,
          },
          {
            status: 400,
          }
        );
      }
    }

    /*
     * ============================
     * PREPARE POISON TICKETS
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
              getPoisonTicketTitle(
                attack.type,
                index
              ),

            description:
              getPoisonTicketDescription(
                attack.type,
                index
              ),

            category,

            severity,

            difficulty:
              attack.difficulty,

            maxValue:
              0,

            baseXp:
              0,

            isPoison:
              true,

            poisonEffect:
              attack.poisonEffect,

            successMessage:
              getPoisonSuccessMessage(
                attack.type
              ),

            failureMessage:
              getPoisonFailureMessage(
                attack.type
              ),

            assignedToId:
              target.id,

            lastSentById:
              null,

            attackSourcePlayerId:
              attacker.id,
          };
        }
      );

    /*
     * ============================
     * CREATE POISON ATTACK
     * ============================
     */
    const result =
      await prisma.$transaction(
        async (tx) => {
          /*
           * Deduct poison cost.
           */
          const deducted =
            await tx.player.updateMany({
              where: {
                id:
                  attacker.id,

                credits: {
                  gte:
                    attack.cost +
                    1,
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
           * Record attack.
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
           * ============================
           * NETWORK OUTAGE
           * ============================
           *
           * Network Outage applies an
           * immediate SLA age offset.
           *
           * It DOES NOT modify createdAt.
           *
           * Up to 3 random existing open
           * tickets receive +5 minutes
           * of effective SLA age.
           */
          let ticketsAged =
            0;

          let totalMinutesAdded =
            0;

          if (
            attack.poisonEffect ===
              "SLA_PRESSURE" &&
            attack.slaAgeMinutes &&
            attack.slaAffectedTicketCount
          ) {
            /*
             * Existing OPEN tickets only.
             *
             * The newly-created Network
             * Outage poison ticket is not
             * included because this runs
             * before poison ticket creation.
             */
            const currentTickets =
              await tx.ticket.findMany({
                where: {
                  assignedToId:
                    target.id,

                  status:
                    "OPEN",
                },

                select: {
                  id:
                    true,

                  slaAgeOffsetMinutes:
                    true,
                },
              });

            const selectedTickets =
              shuffleArray(
                currentTickets
              ).slice(
                0,
                attack
                  .slaAffectedTicketCount
              );

            for (
              const selectedTicket of
              selectedTickets
            ) {
              await tx.ticket.update({
                where: {
                  id:
                    selectedTicket.id,
                },

                data: {
                  slaAgeOffsetMinutes: {
                    increment:
                      attack.slaAgeMinutes,
                  },
                },
              });

              ticketsAged++;

              totalMinutesAdded +=
                attack.slaAgeMinutes;
            }
          }

          /*
           * ============================
           * CREATE POISON TICKETS
           * ============================
           */
          const tickets = [];

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
            ticketsAged,
            totalMinutesAdded,
          };
        }
      );

    /*
     * ============================
     * RESPONSE MESSAGE
     * ============================
     */
    let message =
      `${attack.name} launched against ${target.username}. ` +
      `${result.tickets.length} Poison Ticket${
        result.tickets.length === 1
          ? ""
          : "s"
      } added to their queue.`;

    if (
      attack.poisonEffect ===
        "SLA_PRESSURE" &&
      result.ticketsAged > 0
    ) {
      message +=
        ` ${result.ticketsAged} existing ticket${
          result.ticketsAged ===
          1
            ? ""
            : "s"
        } received +${attack.slaAgeMinutes} minutes of SLA pressure.`;
    }

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

      poisonEffect:
        attack.poisonEffect,

      effectDescription:
        attack.effectDescription,

      target:
        target.username,

      cost:
        attack.cost,

      ticketsCreated:
        result.tickets.length,

      ticketsAged:
        result.ticketsAged,

      slaMinutesAddedPerTicket:
        attack.poisonEffect ===
          "SLA_PRESSURE"
          ? attack.slaAgeMinutes ??
            0
          : 0,

      totalSlaMinutesAdded:
        result.totalMinutesAdded,

      message,
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
            "You no longer have enough Credits to launch that poison.",
        },
        {
          status: 400,
        }
      );
    }

    console.error(
      "PvP poison error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to launch poison attack.",
      },
      {
        status: 500,
      }
    );
  }
}