import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import BounceTicketButton from "@/components/BounceTicketButton";
import MaintenanceWindowButton from "@/components/MaintenanceWindowButton";
import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import ResolveTicketButton from "@/components/ResolveTicketButton";
import TicketTimer from "@/components/TicketTimer";
import { auth } from "@/lib/auth";
import {
  getCareerValueDecayMultiplier,
} from "@/lib/career-abilities";
import {
  finalizeExpiredMaintenanceWindows,
} from "@/lib/maintenance-window";
import { prisma } from "@/lib/prisma";
import { getPoisonEffectLabel } from "@/lib/pvp-attacks";
import {
  calculateTicketAgeMinutes,
  calculateTicketValue,
} from "@/lib/ticket-value";

function getAbandonmentMinutes(
  severity: "P1" | "P2" | "P3" | "P4"
) {
  switch (severity) {
    case "P1":
      return 10;

    case "P2":
      return 20;

    case "P3":
      return 30;

    case "P4":
    default:
      return 44;
  }
}

function getSeverityClasses(
  severity: "P1" | "P2" | "P3" | "P4"
) {
  switch (severity) {
    case "P1":
    case "P2":
      return "border-red-700 bg-red-950/20 text-red-400";

    case "P3":
      return "border-yellow-700 bg-yellow-950/20 text-yellow-400";

    case "P4":
    default:
      return "border-zinc-700 bg-zinc-900 text-zinc-300";
  }
}

function getPoisonEffectDescription(
  poisonEffect: string,
  attackStatus?: string | null
) {
  switch (poisonEffect) {
    case "QUEUE_SPEED":
      return "Normal system tickets arrive 30% faster while this ticket remains open.";

    case "SLA_PRESSURE":
      return "This poison attack applied immediate SLA pressure to existing tickets.";

    case "VALUE_DECAY":
      return "Normal ticket Credit rewards decay 25% faster while this ticket remains open.";

    case "RESOLUTION_PENALTY":
      return "Wrong-resolution penalties are increased by 50% while this ticket remains open.";

    case "MONITORING_FAILURE":
      return "BREACHING warnings are hidden while this ticket remains open.";

    case "BOUNCE_FAILURE":
      return "Bounce attempts have a 50% chance to fail while this ticket remains open.";

    case "ABANDONMENT_PENALTY":
      return "Abandonment penalties are increased by 50% while this ticket remains open.";

    case "EXECUTIVE_ESCALATION":
      return "This ticket has an 8 minute SLA and a heavy abandonment penalty.";

    case "MAIL_BACKLOG":
      if (
        attackStatus ===
        "COMPLETED"
      ) {
        return "The mail backlog has already released its burst of normal tickets. This Poison Ticket remains in your queue but cannot trigger another burst.";
      }

      return "Your next normal ticket delivery will release 3 tickets at once.";

    case "NONE":
    default:
      return "This Poison Ticket provides no Credits or Career XP.";
  }
}

export default async function TicketsPage() {
  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });

  if (!session) {
    redirect("/");
  }

  const player =
    await prisma.player.findUnique({
      where: {
        userId:
          session.user.id,
      },
    });

  if (!player) {
    redirect("/dashboard");
  }

  /*
   * ============================
   * FINALIZE MAINTENANCE
   * ============================
   *
   * Any expired Maintenance Window
   * becomes permanent paused time.
   */
  await finalizeExpiredMaintenanceWindows(
    player.id
  );

  /*
   * ============================
   * OPEN QUEUE
   * ============================
   */
  const tickets =
    await prisma.ticket.findMany({
      where: {
        assignedToId:
          player.id,

        status:
          "OPEN",
      },

      include: {
        pvpAttack: {
          select: {
            id:
              true,

            type:
              true,

            status:
              true,

            completedAt:
              true,
          },
        },
      },

      orderBy: {
        createdAt:
          "asc",
      },
    });

  const now =
    new Date();

  const queuePenaltyActive =
    player.queuePenaltyUntil !==
      null &&
    player.queuePenaltyUntil >
      now;

  /*
   * ============================
   * ACTIVE POISON EFFECTS
   * ============================
   */

  const valueDecayPoisonActive =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "VALUE_DECAY"
    );

  const monitoringFailureActive =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "MONITORING_FAILURE"
    );

  const queueSpeedPoisonActive =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "QUEUE_SPEED"
    );

  const bounceFailurePoisonActive =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "BOUNCE_FAILURE"
    );

  const abandonmentPenaltyPoisonActive =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "ABANDONMENT_PENALTY"
    );

  const resolutionPenaltyPoisonActive =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "RESOLUTION_PENALTY"
    );

  const mailBacklogPoisonActive =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "MAIL_BACKLOG" &&
        ticket.pvpAttack
          ?.status ===
          "ACTIVE"
    );

  const mailBacklogReleased =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "MAIL_BACKLOG" &&
        ticket.pvpAttack
          ?.status ===
          "COMPLETED"
    );

  /*
   * ============================
   * SYSTEMS PASSIVE
   * ============================
   */
  const careerDecayMultiplier =
    getCareerValueDecayMultiplier(
      player.careerPath
    );

  const poisonDecayMultiplier =
    valueDecayPoisonActive
      ? 1.25
      : 1;

  const normalDecayMultiplier =
    careerDecayMultiplier *
    poisonDecayMultiplier;

  const systemsPassiveActive =
    player.careerPath ===
    "SYSTEMS";

  const poisonCount =
    tickets.filter(
      (ticket) =>
        ticket.isPoison
    ).length;

  const persistentPoisonActive =
    valueDecayPoisonActive ||
    monitoringFailureActive ||
    queueSpeedPoisonActive ||
    bounceFailurePoisonActive ||
    abandonmentPenaltyPoisonActive ||
    resolutionPenaltyPoisonActive ||
    mailBacklogPoisonActive;

  /*
   * ============================
   * MAINTENANCE PICKER DATA
   * ============================
   *
   * Client Components cannot
   * receive Date objects directly,
   * so convert them to strings.
   */
  const maintenanceTicketOptions =
    tickets.map(
      (ticket) => ({
        id:
          ticket.id,

        title:
          ticket.title,

        severity:
          ticket.severity,

        maintenanceUntil:
          ticket
            .maintenanceUntil
            ?.toISOString() ??
          null,
      })
    );

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">

      <PlayerHeartbeat />

      <div className="mx-auto max-w-5xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex items-start justify-between gap-4">

          <div>

            <h1 className="text-4xl font-black">
              Ticket Queue
            </h1>

            <p className="mt-2 text-zinc-400">
              {tickets.length} open ticket
              {tickets.length === 1
                ? ""
                : "s"}
            </p>

            {poisonCount > 0 && (
              <p className="mt-2 text-sm font-bold text-purple-400">
                ☣ {poisonCount} Poison Ticket
                {poisonCount === 1
                  ? ""
                  : "s"}{" "}
                in queue
              </p>
            )}

            {systemsPassiveActive && (
              <p className="mt-2 text-sm font-bold text-blue-400">
                ⚙ Automation active — ticket value decay reduced by 25%
              </p>
            )}

          </div>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
          >
            Dashboard
          </Link>

        </div>

        {/* ============================
            CAREER ABILITY
            ============================ */}
        {player.careerPath ===
          "SYSTEMS" &&
          player.level >=
            6 && (
            <div className="mt-6 border border-blue-900 bg-blue-950/10 p-5">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                Systems Ability
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">

                <div>

                  <h2 className="text-xl font-black text-blue-200">
                    Maintenance Window
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                    Freeze SLA ageing and Credit decay on up to 2 tickets for 5 minutes.
                  </p>

                </div>

                <MaintenanceWindowButton
                  playerLevel={
                    player.level
                  }

                  playerCareerPath={
                    player.careerPath
                  }

                  careerAbilityReadyAt={
                    player
                      .careerAbilityReadyAt
                      ?.toISOString() ??
                    null
                  }

                  tickets={
                    maintenanceTicketOptions
                  }
                />

              </div>

            </div>
          )}

        {/* ============================
            ACTIVE POISON WARNING
            ============================ */}
        {persistentPoisonActive && (
          <div className="mt-6 border border-purple-900 bg-purple-950/20 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
              Queue Poisoned
            </p>

            <h2 className="mt-2 text-xl font-black text-purple-200">
              Active poison effects detected
            </h2>

            <div className="mt-4 space-y-2 text-sm text-zinc-300">

              {queueSpeedPoisonActive && (
                <p>
                  • Normal tickets are arriving 30% faster.
                </p>
              )}

              {valueDecayPoisonActive && (
                <p>
                  • Ticket rewards are decaying 25% faster.
                </p>
              )}

              {resolutionPenaltyPoisonActive && (
                <p>
                  • Wrong-resolution penalties are increased by 50%.
                </p>
              )}

              {monitoringFailureActive && (
                <p>
                  • BREACHING warnings are currently unavailable.
                </p>
              )}

              {bounceFailurePoisonActive && (
                <p>
                  • Bounce attempts have a 50% chance to fail.
                </p>
              )}

              {abandonmentPenaltyPoisonActive && (
                <p>
                  • Abandonment penalties are increased by 50%.
                </p>
              )}

              {mailBacklogPoisonActive && (
                <p>
                  • Mail Queue Backlog is armed. Your next normal delivery will arrive as a 3-ticket burst.
                </p>
              )}

            </div>

          </div>
        )}

        {/* ============================
            RELEASED MAIL BACKLOG
            ============================ */}
        {mailBacklogReleased && (
          <div className="mt-4 border border-purple-950 bg-purple-950/10 p-4">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
              Poison Payload Released
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              A Mail Queue Backlog has already released its ticket burst.
              Its remaining Poison Ticket cannot trigger another burst.
            </p>

          </div>
        )}

        {/* ============================
            NEXT TICKET TIMER
            ============================ */}
        <div className="mt-8 border border-zinc-800 bg-zinc-950 p-5">

          <TicketTimer
            nextTicketAt={
              player.nextTicketAt
            }

            queuePenaltyActive={
              queuePenaltyActive
            }
          />

        </div>

        {/* ============================
            QUEUE
            ============================ */}
        <div className="mt-8 space-y-4">

          {tickets.length === 0 && (
            <div className="border border-zinc-800 bg-zinc-950 p-8 text-center">

              <h2 className="text-xl font-bold">
                Queue Empty
              </h2>

              <p className="mt-2 text-zinc-400">
                Waiting for your next ticket...
              </p>

            </div>
          )}

          {tickets.map(
            (ticket) => {
              /*
               * ============================
               * MAINTENANCE WINDOW
               * ============================
               */
              const maintenanceActive =
                ticket.maintenanceUntil !==
                  null &&
                ticket.maintenanceUntil >
                  now;

              /*
               * ============================
               * EFFECTIVE AGE
               * ============================
               */
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
               * ============================
               * CURRENT VALUE
               * ============================
               */
              const value =
                ticket.isPoison
                  ? 0
                  : calculateTicketValue(
                      ticket.maxValue,
                      ticket.createdAt,
                      normalDecayMultiplier,
                      ticket
                        .slaAgeOffsetMinutes,
                      ticket
                        .maintenanceUntil,
                      ticket
                        .maintenancePausedMinutes
                    );

              /*
               * ============================
               * SLA WINDOW
               * ============================
               */
              const abandonmentMinutes =
                ticket.isPoison &&
                ticket.poisonEffect ===
                  "EXECUTIVE_ESCALATION"
                  ? 8
                  : getAbandonmentMinutes(
                      ticket.severity
                    );

              /*
               * ============================
               * BREACH WARNING
               * ============================
               */
              const breachingSoon =
                !monitoringFailureActive &&
                !maintenanceActive &&
                ageMinutes >=
                  abandonmentMinutes *
                    0.75;

              const poisonEffectLabel =
                ticket.isPoison
                  ? getPoisonEffectLabel(
                      ticket.poisonEffect
                    )
                  : null;

              /*
               * ============================
               * MAIL BACKLOG
               * ============================
               */
              const isMailBacklog =
                ticket.isPoison &&
                ticket.poisonEffect ===
                  "MAIL_BACKLOG";

              const mailBacklogPayloadReleased =
                isMailBacklog &&
                ticket.pvpAttack
                  ?.status ===
                  "COMPLETED";

              return (
                <div
                  key={
                    ticket.id
                  }
                  className={`border p-6 ${
                    ticket.isPoison
                      ? "border-purple-900 bg-purple-950/10"
                      : maintenanceActive
                        ? "border-blue-800 bg-blue-950/10"
                        : "border-zinc-800 bg-zinc-950"
                  }`}
                >

                  {/* ============================
                      TICKET HEADER
                      ============================ */}
                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`inline-block border px-2 py-1 text-xs font-bold ${getSeverityClasses(
                            ticket.severity
                          )}`}
                        >
                          {
                            ticket.severity
                          }
                        </span>

                        {ticket.isPoison && (
                          <span className="inline-block border border-purple-700 bg-purple-950/40 px-2 py-1 text-xs font-black text-purple-400">
                            ☣ POISON
                          </span>
                        )}

                        {ticket
                          .slaAgeOffsetMinutes >
                          0 && (
                          <span className="inline-block border border-purple-900 bg-purple-950/20 px-2 py-1 text-xs font-bold text-purple-400">
                            +
                            {
                              ticket
                                .slaAgeOffsetMinutes
                            }
                            m SLA
                          </span>
                        )}

                        {maintenanceActive && (
                          <span className="inline-block border border-blue-700 bg-blue-950/30 px-2 py-1 text-xs font-black text-blue-300">
                            ⚙ MAINTENANCE WINDOW
                          </span>
                        )}

                        {ticket
                          .maintenancePausedMinutes >
                          0 && (
                          <span className="inline-block border border-blue-900 bg-blue-950/20 px-2 py-1 text-xs font-bold text-blue-400">
                            -
                            {
                              ticket
                                .maintenancePausedMinutes
                            }
                            m SLA
                          </span>
                        )}

                        {mailBacklogPayloadReleased && (
                          <span className="inline-block border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs font-black text-zinc-400">
                            PAYLOAD RELEASED
                          </span>
                        )}

                      </div>

                      <p className="mt-2 text-xs text-zinc-500">
                        INC
                        {ticket.id
                          .toString()
                          .padStart(
                            5,
                            "0"
                          )}
                      </p>

                      <h2 className="mt-1 text-xl font-bold">
                        {
                          ticket.title
                        }
                      </h2>

                    </div>

                    {/* ============================
                        REWARD
                        ============================ */}
                    <div className="shrink-0 text-right">

                      {ticket.isPoison ? (
                        <>
                          <p className="text-xl font-black text-purple-400">
                            0 CR
                          </p>

                          <p className="text-xs font-bold uppercase tracking-wide text-purple-700">
                            No Reward
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xl font-bold">
                            {
                              value
                            }{" "}
                            CR
                          </p>

                          <p className="text-xs text-zinc-500">
                            Max{" "}
                            {
                              ticket.maxValue
                            }{" "}
                            CR
                          </p>

                          {systemsPassiveActive && (
                            <p className="mt-1 text-xs text-blue-400">
                              Automation
                            </p>
                          )}

                        </>
                      )}

                    </div>

                  </div>

                  {/* ============================
                      DESCRIPTION
                      ============================ */}
                  <p className="mt-5 leading-relaxed text-zinc-300">
                    {
                      ticket.description
                    }
                  </p>

                  {/* ============================
                      MAINTENANCE WINDOW
                      ============================ */}
                  {maintenanceActive && (
                    <div className="mt-5 border border-blue-900/70 bg-blue-950/20 p-4">

                      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-500">
                        Systems Ability
                      </p>

                      <p className="mt-2 font-bold text-blue-200">
                        Maintenance Window
                      </p>

                      <p className="mt-2 text-sm text-zinc-300">
                        SLA ageing and ticket value decay are currently frozen.
                      </p>

                      {ticket
                        .maintenanceUntil && (
                        <p className="mt-3 text-xs text-zinc-500">
                          Window ends at{" "}
                          {ticket
                            .maintenanceUntil
                            .toLocaleTimeString(
                              "en-AU",
                              {
                                hour:
                                  "2-digit",

                                minute:
                                  "2-digit",

                                second:
                                  "2-digit",
                              }
                            )}
                        </p>
                      )}

                    </div>
                  )}

                  {/* ============================
                      POISON
                      ============================ */}
                  {ticket.isPoison && (
                    <div
                      className={`mt-5 border p-4 ${
                        mailBacklogPayloadReleased
                          ? "border-zinc-800 bg-black"
                          : "border-purple-900/70 bg-purple-950/20"
                      }`}
                    >

                      <p
                        className={`text-xs font-black uppercase tracking-[0.18em] ${
                          mailBacklogPayloadReleased
                            ? "text-zinc-500"
                            : "text-purple-500"
                        }`}
                      >
                        {mailBacklogPayloadReleased
                          ? "Poison Payload Released"
                          : "Poison Effect"}
                      </p>

                      <p
                        className={`mt-2 font-bold ${
                          mailBacklogPayloadReleased
                            ? "text-zinc-300"
                            : "text-purple-200"
                        }`}
                      >
                        {
                          poisonEffectLabel
                        }
                      </p>

                      <p className="mt-2 text-sm text-zinc-300">
                        {getPoisonEffectDescription(
                          ticket
                            .poisonEffect,
                          ticket
                            .pvpAttack
                            ?.status
                        )}
                      </p>

                      {mailBacklogPayloadReleased ? (
                        <p className="mt-3 text-xs text-zinc-500">
                          The payload is spent. The ticket still occupies queue space and must still be dealt with normally.
                        </p>
                      ) : (
                        <p className="mt-3 text-xs text-zinc-500">
                          Clearing or routing this ticket removes its active effect from your queue.
                        </p>
                      )}

                    </div>
                  )}

                  {/* ============================
                      AGE / SLA
                      ============================ */}
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">

                    <p className="text-zinc-500">
                      Age:{" "}
                      {
                        ageMinutes
                      }
                      m
                    </p>

                    {maintenanceActive && (
                      <p className="font-bold text-blue-400">
                        SLA FROZEN
                      </p>
                    )}

                    {ticket
                      .maintenancePausedMinutes >
                      0 && (
                      <p className="text-blue-400">
                        {
                          ticket
                            .maintenancePausedMinutes
                        }
                        m saved by Maintenance Window
                      </p>
                    )}

                    {ticket
                      .slaAgeOffsetMinutes >
                      0 && (
                      <p className="text-purple-400">
                        Includes +
                        {
                          ticket
                            .slaAgeOffsetMinutes
                        }
                        m poison pressure
                      </p>
                    )}

                    {breachingSoon && (
                      <p className="font-bold text-red-500">
                        BREACHING
                      </p>
                    )}

                    {monitoringFailureActive &&
                      !ticket.isPoison && (
                        <p className="font-bold text-purple-500">
                          MONITORING UNAVAILABLE
                        </p>
                      )}

                  </div>

                  {/* ============================
                      ACTIONS
                      ============================ */}
                  <div className="mt-6 flex items-start gap-3">

                    <ResolveTicketButton
                      ticketId={
                        ticket.id
                      }
                    />

                    <BounceTicketButton
                      ticketId={
                        ticket.id
                      }

                      playerLevel={
                        player.level
                      }

                      playerCareerPath={
                        player.careerPath
                      }

                      careerAbilityReadyAt={
                        player
                          .careerAbilityReadyAt
                          ?.toISOString() ??
                        null
                      }
                    />

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </main>
  );
}