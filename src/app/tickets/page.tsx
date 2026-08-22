import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import BounceTicketButton from "@/components/BounceTicketButton";
import MaintenanceWindowButton from "@/components/MaintenanceWindowButton";
import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import QuarantineButton from "@/components/QuarantineButton";
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
import {
  getPoisonEffectLabel,
} from "@/lib/pvp-attacks";
import {
  getAbandonmentMinutes,
} from "@/lib/ticket-abandonment";
import {
  calculateTicketAgeMinutes,
  calculateTicketValue,
  getTicketMaximumReward,
} from "@/lib/ticket-value";

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
        return "The mail backlog has already released its burst. This Poison Ticket can no longer trigger another burst.";
      }

      return "Your next normal ticket delivery will release 3 tickets at once.";

    case "NONE":
    default:
      return "This Poison Ticket provides no Credits or Career XP.";
  }
}

export default async function TicketsPage() {
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
    redirect("/");
  }

  /*
   * ============================
   * PLAYER
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
    redirect("/dashboard");
  }

  /*
   * ============================
   * FINALIZE MAINTENANCE
   * ============================
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
        ticket.pvpAttack?.status ===
          "ACTIVE"
    );

  const mailBacklogReleased =
    tickets.some(
      (ticket) =>
        ticket.isPoison &&
        ticket.poisonEffect ===
          "MAIL_BACKLOG" &&
        ticket.pvpAttack?.status ===
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

  /*
   * ============================
   * QUEUE STATE
   * ============================
   */
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
          ticket.maintenanceUntil
            ?.toISOString() ??
          null,
      })
    );

  return (
    <main className="min-h-screen bg-black px-4 py-5 text-white md:px-6">

      <PlayerHeartbeat />

      {/*
       * Hidden gameplay timer.
       *
       * Nothing visible is rendered,
       * but ticket generation and
       * abandonment checks continue.
       */}
      <TicketTimer
        nextTicketAt={
          player.nextTicketAt
        }
        queuePenaltyActive={
          queuePenaltyActive
        }
      />

      <div className="mx-auto max-w-5xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-3">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Service Management
            </p>

            <h1 className="mt-1 text-3xl font-black">
              Ticket Queue
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">

              <p className="text-zinc-400">
                <span className="font-bold text-white">
                  {
                    tickets.length
                  }
                </span>{" "}
                open ticket
                {
                  tickets.length ===
                  1
                    ? ""
                    : "s"
                }
              </p>

              {poisonCount > 0 && (
                <p className="font-bold text-purple-400">
                  ☣{" "}
                  {
                    poisonCount
                  }{" "}
                  Poison
                </p>
              )}

            </div>

          </div>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-3 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Dashboard
          </Link>

        </div>

        {/* ============================
            CAREER STATUS
            ============================ */}
        {(systemsPassiveActive ||
          player.careerPath ===
            "SECURITY") && (
          <div className="mt-4 flex flex-wrap gap-2">

            {systemsPassiveActive && (
              <div className="border border-blue-900 bg-blue-950/10 px-3 py-2 text-xs font-bold text-blue-300">
                ⚙ Automation — value decay reduced 25%
              </div>
            )}

            {player.careerPath ===
              "SECURITY" && (
              <div className="border border-cyan-900 bg-cyan-950/10 px-3 py-2 text-xs font-bold text-cyan-300">
                ⛨ Incident Hardened — Poison penalties reduced 25%
              </div>
            )}

          </div>
        )}

        {/* ============================
            SYSTEMS ACTIVE ABILITY
            ============================ */}
        {player.careerPath ===
          "SYSTEMS" &&
          player.level >=
            6 && (
            <div className="mt-4 border border-blue-900 bg-blue-950/10 p-4">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
                    Systems Ability
                  </p>

                  <h2 className="mt-1 text-lg font-black text-blue-200">
                    Maintenance Window
                  </h2>

                  <p className="mt-1 text-xs text-zinc-400">
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
          <div className="mt-4 border border-purple-900 bg-purple-950/20 p-4">

            <div className="flex flex-wrap items-center justify-between gap-2">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-500">
                  Queue Poisoned
                </p>

                <h2 className="mt-1 text-lg font-black text-purple-200">
                  Active poison effects
                </h2>

              </div>

              <p className="text-sm font-black text-purple-400">
                ☣{" "}
                {
                  poisonCount
                }
              </p>

            </div>

            <div className="mt-3 grid gap-1 text-sm text-zinc-300 md:grid-cols-2">

              {queueSpeedPoisonActive && (
                <p>
                  • Tickets arriving 30% faster
                </p>
              )}

              {valueDecayPoisonActive && (
                <p>
                  • Rewards decaying 25% faster
                </p>
              )}

              {resolutionPenaltyPoisonActive && (
                <p>
                  • Wrong resolves cost 50% more
                </p>
              )}

              {monitoringFailureActive && (
                <p>
                  • BREACHING warnings unavailable
                </p>
              )}

              {bounceFailurePoisonActive && (
                <p>
                  • Bounce attempts may fail
                </p>
              )}

              {abandonmentPenaltyPoisonActive && (
                <p>
                  • Abandonment penalties +50%
                </p>
              )}

              {mailBacklogPoisonActive && (
                <p>
                  • Mail backlog burst armed
                </p>
              )}

            </div>

          </div>
        )}

        {/* ============================
            RELEASED MAIL BACKLOG
            ============================ */}
        {mailBacklogReleased && (
          <div className="mt-3 border border-zinc-800 bg-zinc-950 px-4 py-3">

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-500">
              Poison Payload Released
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              A Mail Queue Backlog has already released its burst. Its remaining Poison Ticket cannot fire again.
            </p>

          </div>
        )}

        {/* ============================
            QUEUE
            ============================ */}
        <div className="mt-5 space-y-3">

          {tickets.length ===
            0 && (
            <div className="border border-zinc-800 bg-zinc-950 p-8 text-center">

              <h2 className="text-xl font-black">
                Queue Empty
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Enjoy it while it lasts.
              </p>

            </div>
          )}

          {tickets.map(
            (ticket) => {
              /*
               * ============================
               * MAINTENANCE
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
               * SLA
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

              const breachingSoon =
                !monitoringFailureActive &&
                !maintenanceActive &&
                ageMinutes >=
                  abandonmentMinutes *
                    0.75;

              /*
               * ============================
               * POISON
               * ============================
               */
              const poisonEffectLabel =
                ticket.isPoison
                  ? getPoisonEffectLabel(
                      ticket.poisonEffect
                    )
                  : null;

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
                  className={`border p-4 md:p-5 ${
                    ticket.isPoison
                      ? "border-purple-900 bg-purple-950/10"
                      : maintenanceActive
                        ? "border-blue-800 bg-blue-950/10"
                        : "border-zinc-800 bg-zinc-950"
                  }`}
                >

                  {/* ============================
                      TICKET TOP
                      ============================ */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`border px-2 py-1 text-xs font-bold ${getSeverityClasses(
                            ticket.severity
                          )}`}
                        >
                          {
                            ticket.severity
                          }
                        </span>

                        {ticket.isPoison && (
                          <span className="border border-purple-700 bg-purple-950/40 px-2 py-1 text-xs font-black text-purple-400">
                            ☣ POISON
                          </span>
                        )}

                        {maintenanceActive && (
                          <span className="border border-blue-700 bg-blue-950/30 px-2 py-1 text-xs font-black text-blue-300">
                            ⚙ MAINTENANCE
                          </span>
                        )}

                        {mailBacklogPayloadReleased && (
                          <span className="border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs font-black text-zinc-400">
                            PAYLOAD RELEASED
                          </span>
                        )}

                        {breachingSoon && (
                          <span className="border border-red-900 bg-red-950/20 px-2 py-1 text-xs font-black text-red-400">
                            BREACHING
                          </span>
                        )}

                      </div>

                      <p className="mt-2 text-xs text-zinc-600">
                        INC
                        {ticket.id
                          .toString()
                          .padStart(
                            5,
                            "0"
                          )}
                      </p>

                      <h2 className="mt-1 text-lg font-black md:text-xl">
                        {
                          ticket.title
                        }
                      </h2>

                    </div>

                    {/* Reward */}
                    <div className="shrink-0 text-right">

                      {ticket.isPoison ? (
                        <>
                          <p className="text-lg font-black text-purple-400 md:text-xl">
                            0 CR
                          </p>

                          <p className="text-[10px] font-bold uppercase tracking-wide text-purple-700">
                            No Reward
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-black md:text-xl">
                            {
                              value
                            }{" "}
                            CR
                          </p>

                          <p className="text-[10px] text-zinc-600">
                            Max{" "}
                            {
                              getTicketMaximumReward(
                                ticket.maxValue
                              )
                            }
                          </p>
                        </>
                      )}

                    </div>

                  </div>

                  {/* ============================
                      DESCRIPTION
                      ============================ */}
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                    {
                      ticket.description
                    }
                  </p>

                  {/* ============================
                      POISON EFFECT
                      ============================ */}
                  {ticket.isPoison && (
                    <div
                      className={`mt-4 border px-4 py-3 ${
                        mailBacklogPayloadReleased
                          ? "border-zinc-800 bg-black"
                          : "border-purple-900/70 bg-purple-950/20"
                      }`}
                    >

                      <div className="flex flex-wrap items-center gap-2">

                        <p
                          className={`text-xs font-black uppercase tracking-[0.16em] ${
                            mailBacklogPayloadReleased
                              ? "text-zinc-500"
                              : "text-purple-500"
                          }`}
                        >
                          {
                            poisonEffectLabel
                          }
                        </p>

                      </div>

                      <p className="mt-1 text-sm text-zinc-300">
                        {getPoisonEffectDescription(
                          ticket.poisonEffect,
                          ticket
                            .pvpAttack
                            ?.status
                        )}
                      </p>

                    </div>
                  )}

                  {/* ============================
                      MAINTENANCE STATUS
                      ============================ */}
                  {maintenanceActive && (
                    <div className="mt-4 border border-blue-900/70 bg-blue-950/20 px-4 py-3">

                      <div className="flex flex-wrap items-center justify-between gap-2">

                        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-400">
                          Maintenance Window
                        </p>

                        <p className="text-xs font-bold text-blue-300">
                          SLA FROZEN
                        </p>

                      </div>

                      {ticket.maintenanceUntil && (
                        <p className="mt-1 text-xs text-zinc-500">
                          Ends{" "}
                          {ticket.maintenanceUntil.toLocaleTimeString(
                            "en-AU",
                            {
                              hour:
                                "2-digit",

                              minute:
                                "2-digit",
                            }
                          )}
                        </p>
                      )}

                    </div>
                  )}

                  {/* ============================
                      SLA / AGE
                      ============================ */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-zinc-800 pt-3 text-xs">

                    <p className="text-zinc-500">
                      Age{" "}
                      <span className="font-bold text-zinc-300">
                        {
                          ageMinutes
                        }
                        m
                      </span>
                    </p>

                    {ticket
                      .slaAgeOffsetMinutes >
                      0 && (
                      <p className="text-purple-400">
                        +
                        {
                          ticket
                            .slaAgeOffsetMinutes
                        }
                        m poison SLA
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
                        m saved
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
                  <div className="mt-4 flex flex-wrap items-start gap-2">

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

                    {ticket.isPoison && (
                      <QuarantineButton
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
                    )}

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