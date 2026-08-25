import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import ClearQueuePenaltyButton from "@/components/ClearQueuePenaltyButton";
import DashboardRefresh from "@/components/DashboardRefresh";
import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { calculateLeaderboardScore } from "@/lib/leaderboard";
import { getRoleTitle } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";

type LeaderboardPlayer = {
  username: string;
  lifetimeCreditsEarned: number;
  ticketsResolved: number;
  correctBounces: number;
  kills: number;
  bankruptcies: number;
};

function getNextLevelXp(level: number) {
  switch (level) {
    case 1:
      return 150;
    case 2:
      return 350;
    case 3:
      return 700;
    case 4:
      return 1200;
    case 5:
      return 1800;
    case 6:
      return 2500;
    case 7:
      return 3400;
    case 8:
      return 4500;
    case 9:
      return 6000;
    default:
      return null;
  }
}

function getCurrentLevelFloorXp(level: number) {
  switch (level) {
    case 1:
      return 0;
    case 2:
      return 150;
    case 3:
      return 350;
    case 4:
      return 700;
    case 5:
      return 1200;
    case 6:
      return 1800;
    case 7:
      return 2500;
    case 8:
      return 3400;
    case 9:
      return 4500;
    case 10:
    default:
      return 6000;
  }
}

function getCareerDisplayName(
  careerPath:
    | "NETWORK"
    | "SYSTEMS"
    | "SECURITY"
    | null
) {
  switch (careerPath) {
    case "NETWORK":
      return "Network";

    case "SYSTEMS":
      return "Systems";

    case "SECURITY":
      return "Security";

    default:
      return "Service Desk";
  }
}

export default async function DashboardPage() {
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
  let player =
    await prisma.player.findUnique({
      where: {
        userId:
          session.user.id,
      },
    });

  if (!player) {
    player =
      await prisma.player.create({
        data: {
          userId:
            session.user.id,

          username:
            session.user.name,
        },
      });
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
   * DASHBOARD DATA
   * ============================
   */
  const [
    openTickets,
    activePlayers,
    leaderboardPlayers,
    networkSpecialists,
    systemsSpecialists,
    securitySpecialists,
  ] =
    await Promise.all([
      prisma.ticket.count({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",
        },
      }),

      prisma.player.count({
        where: {
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
      }),

      prisma.player.findMany({
        select: {
          username:
            true,

          lifetimeCreditsEarned:
            true,

          ticketsResolved:
            true,

          correctBounces:
            true,

          kills:
            true,

          bankruptcies:
            true,
        },
      }),

      prisma.player.count({
        where: {
          careerPath:
            "NETWORK",
        },
      }),

      prisma.player.count({
        where: {
          careerPath:
            "SYSTEMS",
        },
      }),

      prisma.player.count({
        where: {
          careerPath:
            "SECURITY",
        },
      }),
    ]);

  /*
   * ============================
   * LEADERBOARD
   * ============================
   */
  const leaderboard =
    (
      leaderboardPlayers as
        LeaderboardPlayer[]
    )
      .map(
        (
          leaderboardPlayer
        ) => ({
          username:
            leaderboardPlayer
              .username,

          score:
            calculateLeaderboardScore({
              lifetimeCreditsEarned:
                leaderboardPlayer
                  .lifetimeCreditsEarned,

              ticketsResolved:
                leaderboardPlayer
                  .ticketsResolved,

              correctBounces:
                leaderboardPlayer
                  .correctBounces,

              kills:
                leaderboardPlayer
                  .kills,

              bankruptcies:
                leaderboardPlayer
                  .bankruptcies,
            }),
        })
      )
      .sort(
        (a, b) =>
          b.score -
          a.score
      );

  const leaderboardLeader =
    leaderboard[0] ??
    null;

  /*
   * ============================
   * ROLE / CAREER
   * ============================
   */
  const roleTitle =
    getRoleTitle(
      player.level,
      player.careerPath
    );

  const careerDisplayName =
    getCareerDisplayName(
      player.careerPath
    );

  const careerChoiceAvailable =
    player.level >=
      4 &&
    !player.careerPath;

  /*
   * ============================
   * XP PROGRESS
   * ============================
   */
  const nextLevelXp =
    getNextLevelXp(
      player.level
    );

  const currentLevelFloorXp =
    getCurrentLevelFloorXp(
      player.level
    );

  const xpIntoLevel =
    Math.max(
      0,
      player.xp -
        currentLevelFloorXp
    );

  const xpNeededForLevel =
    nextLevelXp
      ? nextLevelXp -
        currentLevelFloorXp
      : 0;

  const progressPercentage =
    nextLevelXp &&
    xpNeededForLevel >
      0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              (
                xpIntoLevel /
                xpNeededForLevel
              ) *
                100
            )
          )
        )
      : 100;

  /*
   * ============================
   * IN-DEMAND SPECIALIST
   * ============================
   */
  const specialistCounts = [
    {
      path:
        "NETWORK",
      label:
        "Network",
      count:
        networkSpecialists,
    },
    {
      path:
        "SYSTEMS",
      label:
        "Systems",
      count:
        systemsSpecialists,
    },
    {
      path:
        "SECURITY",
      label:
        "Security",
      count:
        securitySpecialists,
    },
  ];

  specialistCounts.sort(
    (a, b) =>
      a.count -
      b.count
  );

  const inDemandCareer =
    specialistCounts[0];

  /*
   * ============================
   * QUEUE PENALTY
   * ============================
   */
  const queuePenaltyActive =
    player.queuePenaltyUntil !==
      null &&
    player.queuePenaltyUntil >
      now;

  const queuePenaltyMinutesRemaining =
    queuePenaltyActive &&
    player.queuePenaltyUntil
      ? Math.max(
          1,
          Math.ceil(
            (
              player
                .queuePenaltyUntil
                .getTime() -
              now.getTime()
            ) /
              60000
          )
        )
      : 0;

  /*
   * ============================
   * NEXT MILESTONE
   * ============================
   */
  let nextMilestoneTitle =
    "Keep climbing";

  let nextMilestoneText =
    "Resolve and route tickets to continue progressing.";

  if (
    player.level <
    4
  ) {
    nextMilestoneTitle =
      "Specialist Career";

    nextMilestoneText =
      "Reach Level 4 to choose Network, Systems or Security.";
  } else if (
    careerChoiceAvailable
  ) {
    nextMilestoneTitle =
      "Choose Your Specialist";

    nextMilestoneText =
      "Your specialist career is ready to be selected.";
  } else if (
    player.level <
    6
  ) {
    nextMilestoneTitle =
      "Career Ability";

    nextMilestoneText =
      "Reach Level 6 to unlock your specialist active ability.";
  } else {
    nextMilestoneTitle =
      "Specialist Progression";

    nextMilestoneText =
      "Build XP, Credits and PvP pressure while developing your specialist career.";
  }

  return (
    <main className="min-h-screen bg-black px-4 py-5 text-white md:px-6">

      <PlayerHeartbeat />

      <DashboardRefresh />

      <div className="mx-auto max-w-6xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-3">

          <div>

            <h1 className="text-3xl font-black">
              IT WARS
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              Welcome back,{" "}
              {
                player.username
              }
            </p>

            <p className="text-xs font-semibold text-zinc-500">
              {
                roleTitle
              }
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-2">

            <Link
              href="/profile"
              className="border border-zinc-700 px-3 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Profile
            </Link>

            <Link
              href="/how-to-play"
              className="border border-zinc-700 px-3 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              How to Play
            </Link>

            {/* ============================
                FEEDBACK
                ============================ */}
            <Link
              href="/feedback"
              className="border border-blue-800 bg-blue-950/10 px-3 py-2 text-sm font-bold text-blue-300 hover:bg-blue-950/30"
            >
              Feedback
            </Link>

            <Link
              href="/pvp"
              className="border border-purple-700 bg-purple-950/20 px-3 py-2 text-sm font-bold text-purple-300 hover:bg-purple-950/40"
            >
              ☣ Poison Store
            </Link>

            <SignOutButton />

          </div>

        </div>

        {/* ============================
            QUEUE
            ============================ */}
        <div className="mt-4 border border-zinc-700 bg-zinc-950 p-4">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Your Queue
              </p>

              <h2 className="mt-1 text-3xl font-black">
                {
                  openTickets
                }{" "}
                Open Ticket
                {
                  openTickets ===
                  1
                    ? ""
                    : "s"
                }
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Keep the queue moving. Ticket value drops while work remains unresolved.
              </p>

            </div>

            <Link
              href="/tickets"
              className="rounded bg-white px-5 py-2.5 text-sm font-black text-black hover:bg-zinc-200"
            >
              Open Queue
            </Link>

          </div>

        </div>

        {/* ============================
            CAREER CHOICE
            ============================ */}
        {careerChoiceAvailable && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border border-yellow-900 bg-yellow-950/20 px-4 py-3">

            <div>

              <p className="text-xs font-bold uppercase tracking-wide text-yellow-500">
                Promotion Available
              </p>

              <p className="mt-1 text-sm font-bold text-yellow-200">
                Choose your specialist career path.
              </p>

            </div>

            <Link
              href="/choose-career"
              className="border border-yellow-700 px-3 py-2 text-sm font-bold text-yellow-200 hover:bg-yellow-950/40"
            >
              Choose Career
            </Link>

          </div>
        )}

        {/* ============================
            OWNERSHIP WARNING
            ============================ */}
        {queuePenaltyActive && (
          <div className="mt-3 border border-yellow-900 bg-yellow-950/20 p-4">

            <div className="flex flex-wrap items-start justify-between gap-3">

              <div>

                <p className="text-xs uppercase tracking-wide text-yellow-500">
                  Ownership Warning
                </p>

                <h2 className="mt-1 text-lg font-bold text-yellow-300">
                  Queue priority reduced
                </h2>

                <p className="mt-1 text-sm text-zinc-300">
                  You transferred a ticket that you could have resolved.
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  New work will arrive less frequently until the warning expires.
                </p>

                <p className="mt-2 text-xs font-bold text-yellow-400">
                  Approximately{" "}
                  {
                    queuePenaltyMinutesRemaining
                  }{" "}
                  minute
                  {
                    queuePenaltyMinutesRemaining ===
                    1
                      ? ""
                      : "s"
                  }{" "}
                  remaining.
                </p>

              </div>

              <ClearQueuePenaltyButton />

            </div>

          </div>
        )}

        {/* ============================
            CORE STATS
            ============================ */}
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Level
            </p>

            <p className="mt-1 text-2xl font-black">
              {
                player.level
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Career XP
            </p>

            <p className="mt-1 text-2xl font-black">
              {
                player.xp
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Credits
            </p>

            <div className="mt-1 flex items-end gap-1">

              <p className="text-2xl font-black">
                {
                  player.credits
                }
              </p>

              <p className="pb-0.5 text-[10px] text-zinc-500">
                CR
              </p>

            </div>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Position
            </p>

            <p className="mt-1 text-lg font-black leading-tight">
              {
                roleTitle
              }
            </p>

          </div>

        </div>

        {/* ============================
            CAREER PROGRESS
            ============================ */}
        <div className="mt-3 border border-zinc-800 bg-zinc-950 p-4">

          <div className="flex flex-wrap items-start justify-between gap-3">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                Career Progress
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                {
                  careerDisplayName
                }
              </p>

            </div>

            {nextLevelXp ? (
              <p className="text-xs font-bold text-zinc-400">
                {
                  player.xp
                }{" "}
                /{" "}
                {
                  nextLevelXp
                }{" "}
                XP
              </p>
            ) : (
              <p className="text-xs font-bold text-zinc-400">
                Max Level
              </p>
            )}

          </div>

          <div className="mt-3 h-2 overflow-hidden bg-zinc-800">

            <div
              className="h-full bg-white transition-all"
              style={{
                width:
                  `${progressPercentage}%`,
              }}
            />

          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

            <p className="text-xs text-zinc-500">
              {
                nextMilestoneText
              }
            </p>

            {player.level ===
              3 &&
              !player.careerPath && (
                <p className="text-xs font-bold text-yellow-400">
                  Specialist selection approaching
                </p>
              )}

          </div>

        </div>

        {/* ============================
            PLAYERS / LEADERBOARD
            ============================ */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">

          {/* ACTIVE PLAYERS */}
          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Active Players
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                  <p className="text-2xl font-black">
                    {
                      activePlayers
                    }
                  </p>

                </div>

                <p className="text-xs text-zinc-500">
                  Online now
                </p>

              </div>

              <Link
                href="/players"
                className="border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900"
              >
                View Players
              </Link>

            </div>

            <p className="mt-3 border-t border-zinc-800 pt-3 text-[11px] text-zinc-600">
              Online specialists affect which resolver teams are available.
            </p>

          </div>

          {/* LEADERBOARD */}
          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Leaderboard
                </p>

                {leaderboardLeader ? (
                  <>
                    <div className="mt-2 flex items-center gap-2">

                      <span className="text-xl font-black text-yellow-400">
                        #1
                      </span>

                      <p className="text-xl font-black">
                        {
                          leaderboardLeader
                            .username
                        }
                      </p>

                    </div>

                    <p className="mt-1 text-xs text-zinc-500">
                      {
                        leaderboardLeader
                          .score
                      }{" "}
                      Score
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-zinc-500">
                    No rankings yet.
                  </p>
                )}

              </div>

              <Link
                href="/leaderboard"
                className="border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900"
              >
                View Leaderboard
              </Link>

            </div>

            <p className="mt-3 border-t border-zinc-800 pt-3 text-[11px] text-zinc-600">
              Lifetime performance, Credits, routing and PvP contribute to score.
            </p>

          </div>

        </div>

        {/* ============================
            OPERATIONS / NEXT MILESTONE
            ============================ */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              Next Milestone
            </p>

            <h2 className="mt-1 text-lg font-black">
              {
                nextMilestoneTitle
              }
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              {
                nextMilestoneText
              }
            </p>

          </div>

          <div className="border border-yellow-900/70 bg-yellow-950/10 p-4">

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-yellow-500">
              In Demand
            </p>

            <div className="mt-1 flex items-center justify-between gap-3">

              <div>

                <h2 className="text-lg font-black text-yellow-200">
                  ⚡{" "}
                  {
                    inDemandCareer.label
                  }
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Currently the least represented specialist path.
                </p>

              </div>

              <div className="text-right">

                <p className="text-xl font-black text-yellow-400">
                  {
                    inDemandCareer.count
                  }
                </p>

                <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                  Specialists
                </p>

              </div>

            </div>

            {!player.careerPath &&
              player.level <
                4 && (
                <p className="mt-3 border-t border-yellow-900/40 pt-3 text-xs text-yellow-400">
                  Reach Level 4 to take advantage of an in-demand specialist bonus.
                </p>
              )}

            {careerChoiceAvailable && (
              <Link
                href="/choose-career"
                className="mt-3 inline-block border border-yellow-700 px-3 py-2 text-xs font-bold text-yellow-200 hover:bg-yellow-950/40"
              >
                View Career Paths
              </Link>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}