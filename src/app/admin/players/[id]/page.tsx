import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import {
    adjustCredits,
    adjustXp,
    banPlayer,
    deleteAccount,
    forceLogout,
    resetCareer,
    unbanPlayer,
} from "./actions";

type AdminPlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPlayerPage({
  params,
}: AdminPlayerPageProps) {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  const admin =
    await requireAdmin();

  const { id } =
    await params;

  /*
   * ============================
   * LOAD USER
   * ============================
   */
  const user =
    await prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        player: true,

        sessions: {
          select: {
            id: true,
            expiresAt: true,
            ipAddress: true,
            userAgent: true,
          },
        },
      },
    });

  if (!user) {
    notFound();
  }

  const player =
    user.player;

  const isSelf =
    admin.id ===
    user.id;

  /*
   * ============================
   * DELETE CONFIRMATION NAME
   * ============================
   *
   * This exact value is shown to
   * the admin and should match the
   * value checked in actions.ts.
   */
  const confirmationName =
    player?.username ??
    user.name;

  /*
   * ============================
   * OPEN QUEUE
   * ============================
   */
  const openTickets =
    player
      ? await prisma.ticket.count({
          where: {
            assignedToId:
              player.id,

            status:
              "OPEN",
          },
        })
      : 0;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">

      <div className="mx-auto max-w-6xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Administration / Player
            </p>

            <h1 className="mt-2 text-4xl font-black">
              {
                confirmationName
              }
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              {
                user.email
              }
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <Link
              href="/admin/players"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Players
            </Link>

            <Link
              href="/admin"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Admin Home
            </Link>

          </div>

        </div>

        {/* ============================
            ACCOUNT STATUS
            ============================ */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Role
            </p>

            <p className="mt-2 text-xl font-black">
              {
                user.role ??
                "user"
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Account
            </p>

            <p
              className={`mt-2 text-xl font-black ${
                user.banned
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {user.banned
                ? "BANNED"
                : "ACTIVE"}
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Sessions
            </p>

            <p className="mt-2 text-xl font-black">
              {
                user.sessions.length
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Joined
            </p>

            <p className="mt-2 text-sm font-bold">
              {user.createdAt.toLocaleDateString(
                "en-AU"
              )}
            </p>

          </div>

        </div>

        {/* ============================
            BAN INFORMATION
            ============================ */}
        {user.banned &&
          user.banReason && (
            <div className="mt-3 border border-red-900 bg-red-950/10 p-4">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-500">
                Ban Reason
              </p>

              <p className="mt-2 text-sm text-red-200">
                {
                  user.banReason
                }
              </p>

            </div>
          )}

        {/* ============================
            PLAYER GAME STATE
            ============================ */}
        {player ? (
          <>

            <div className="mt-6">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Current Game State
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">

                <Stat
                  name="Level"
                  value={
                    player.level
                  }
                />

                <Stat
                  name="XP"
                  value={
                    player.xp
                  }
                />

                <div className="border border-zinc-800 bg-zinc-950 p-4">

                  <p className="text-xs text-zinc-500">
                    Credits
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    {
                      player.credits
                    }{" "}
                    CR
                  </p>

                </div>

                <div className="border border-zinc-800 bg-zinc-950 p-4">

                  <p className="text-xs text-zinc-500">
                    Career
                  </p>

                  <p className="mt-1 text-lg font-black">
                    {
                      player.careerPath ??
                      "SERVICE DESK"
                    }
                  </p>

                </div>

                <Stat
                  name="Open Queue"
                  value={
                    openTickets
                  }
                />

              </div>

            </div>

            {/* ============================
                LIFETIME STATS
                ============================ */}
            <div className="mt-6">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Lifetime Statistics
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">

                <Stat
                  name="Resolved"
                  value={
                    player
                      .ticketsResolved
                  }
                />

                <Stat
                  name="Correct Bounces"
                  value={
                    player
                      .correctBounces
                  }
                />

                <Stat
                  name="Wrong Bounces"
                  value={
                    player
                      .incorrectBounces
                  }
                />

                <Stat
                  name="Wrong Resolves"
                  value={
                    player
                      .incorrectResolves
                  }
                />

                <Stat
                  name="Lifetime Credits"
                  value={
                    player
                      .lifetimeCreditsEarned
                  }
                />

                <Stat
                  name="Tickets Handled"
                  value={
                    player
                      .lifetimeTicketsHandled
                  }
                />

                <Stat
                  name="PvP Kills"
                  value={
                    player.kills
                  }
                />

                <Stat
                  name="Bankruptcies"
                  value={
                    player.bankruptcies
                  }
                />

              </div>

            </div>

            {/* ============================
                GAME REPAIR
                ============================ */}
            <div className="mt-6">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-500">
                Game Repair
              </p>

              <div className="mt-3 grid gap-3 md:grid-cols-2">

                <form
                  action={
                    adjustCredits
                  }
                  className="border border-zinc-800 bg-zinc-950 p-5"
                >

                  <input
                    type="hidden"
                    name="userId"
                    value={
                      user.id
                    }
                  />

                  <p className="font-black">
                    Adjust Credits
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Positive numbers add Credits. Negative numbers remove them.
                  </p>

                  <div className="mt-4 flex gap-2">

                    <input
                      type="number"
                      name="amount"
                      required
                      placeholder="250 or -250"
                      className="min-w-0 flex-1 border border-zinc-700 bg-black px-3 py-2 outline-none focus:border-white"
                    />

                    <button
                      type="submit"
                      className="bg-white px-4 py-2 font-bold text-black hover:bg-zinc-200"
                    >
                      Apply
                    </button>

                  </div>

                </form>

                <form
                  action={
                    adjustXp
                  }
                  className="border border-zinc-800 bg-zinc-950 p-5"
                >

                  <input
                    type="hidden"
                    name="userId"
                    value={
                      user.id
                    }
                  />

                  <p className="font-black">
                    Adjust XP
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Intended for repairing progression errors.
                  </p>

                  <div className="mt-4 flex gap-2">

                    <input
                      type="number"
                      name="amount"
                      required
                      placeholder="100 or -100"
                      className="min-w-0 flex-1 border border-zinc-700 bg-black px-3 py-2 outline-none focus:border-white"
                    />

                    <button
                      type="submit"
                      className="bg-white px-4 py-2 font-bold text-black hover:bg-zinc-200"
                    >
                      Apply
                    </button>

                  </div>

                </form>

              </div>

              {!isSelf && (
                <form
                  action={
                    resetCareer
                  }
                  className="mt-3 border border-yellow-900 bg-yellow-950/10 p-5"
                >

                  <input
                    type="hidden"
                    name="userId"
                    value={
                      user.id
                    }
                  />

                  <p className="font-black text-yellow-200">
                    Reset Current Career
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Returns the player to Level 1, 0 XP and 750 CR.
                    Their open queue is expired and specialist selection is removed.
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Lifetime statistics remain untouched.
                  </p>

                  <button
                    type="submit"
                    className="mt-4 border border-yellow-700 px-4 py-2 text-sm font-bold text-yellow-200 hover:bg-yellow-950/30"
                  >
                    Reset Career
                  </button>

                </form>
              )}

            </div>

          </>
        ) : (
          <div className="mt-6 border border-yellow-900 bg-yellow-950/10 p-5">

            <p className="font-bold text-yellow-300">
              This account does not have a Player record.
            </p>

          </div>
        )}

        {/* ============================
            ACCOUNT MANAGEMENT
            ============================ */}
        <div className="mt-6">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-500">
            Account Management
          </p>

          {isSelf ? (
            <div className="mt-3 border border-red-900/50 bg-red-950/10 p-5">

              <p className="font-bold text-red-300">
                This is your admin account.
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Self-ban, self-reset, self-session revocation and account deletion
                are disabled here to prevent accidental admin lockout.
              </p>

            </div>
          ) : (
            <div className="mt-3 grid gap-3 md:grid-cols-2">

              {/* ============================
                  BAN / UNBAN
                  ============================ */}
              {user.banned ? (
                <form
                  action={
                    unbanPlayer
                  }
                  className="border border-green-900 bg-green-950/10 p-5"
                >

                  <input
                    type="hidden"
                    name="userId"
                    value={
                      user.id
                    }
                  />

                  <p className="font-black text-green-300">
                    Unban Account
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Restore access to this IT WARS account.
                  </p>

                  <button
                    type="submit"
                    className="mt-4 border border-green-700 px-4 py-2 text-sm font-bold text-green-300 hover:bg-green-950/20"
                  >
                    Unban Player
                  </button>

                </form>
              ) : (
                <form
                  action={
                    banPlayer
                  }
                  className="border border-red-900 bg-red-950/10 p-5"
                >

                  <input
                    type="hidden"
                    name="userId"
                    value={
                      user.id
                    }
                  />

                  <p className="font-black text-red-300">
                    Ban Account
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Suspend the account and immediately revoke its sessions.
                  </p>

                  <input
                    type="text"
                    name="reason"
                    required
                    placeholder="Reason for suspension"
                    className="mt-4 w-full border border-red-900 bg-black px-3 py-2 outline-none focus:border-red-500"
                  />

                  <button
                    type="submit"
                    className="mt-3 border border-red-700 px-4 py-2 text-sm font-bold text-red-300 hover:bg-red-950/30"
                  >
                    Ban Player
                  </button>

                </form>
              )}

              {/* ============================
                  FORCE LOGOUT
                  ============================ */}
              <form
                action={
                  forceLogout
                }
                className="border border-zinc-800 bg-zinc-950 p-5"
              >

                <input
                  type="hidden"
                  name="userId"
                  value={
                    user.id
                  }
                />

                <p className="font-black">
                  Force Logout
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Delete every active session belonging to this account.
                </p>

                <button
                  type="submit"
                  className="mt-4 border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
                >
                  Revoke Sessions
                </button>

              </form>

              {/* ============================
                  DELETE ACCOUNT
                  ============================ */}
              <div className="border border-red-700 bg-red-950/20 p-5 md:col-span-2">

                <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
                  Danger Zone
                </p>

                <h2 className="mt-2 text-xl font-black text-red-300">
                  Permanently Delete Account
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  Permanently delete this user account and its associated game data.
                </p>

                <p className="mt-2 text-sm font-bold text-red-400">
                  This action cannot be undone.
                </p>

                <form
                  action={
                    deleteAccount
                  }
                  className="mt-5"
                >

                  <input
                    type="hidden"
                    name="userId"
                    value={
                      user.id
                    }
                  />

                  <label
                    htmlFor="confirmation"
                    className="text-xs font-bold uppercase tracking-wide text-zinc-500"
                  >
                    Type{" "}
                    <span className="text-white">
                      {
                        confirmationName
                      }
                    </span>{" "}
                    to confirm
                  </label>

                  <div className="mt-2 flex flex-wrap gap-2">

                    <input
                      id="confirmation"
                      name="confirmation"
                      type="text"
                      required
                      autoComplete="off"
                      placeholder={
                        confirmationName
                      }
                      className="min-w-[220px] flex-1 border border-red-900 bg-black px-3 py-2 text-white outline-none focus:border-red-500"
                    />

                    <button
                      type="submit"
                      className="border border-red-600 bg-red-950/30 px-4 py-2 text-sm font-black text-red-300 hover:bg-red-950/60"
                    >
                      Permanently Delete
                    </button>

                  </div>

                </form>

              </div>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}

/*
 * ============================
 * STAT CARD
 * ============================
 */
function Stat({
  name,
  value,
}: {
  name: string;
  value: number;
}) {
  return (
    <div className="border border-zinc-800 bg-zinc-950 p-4">

      <p className="text-xs text-zinc-500">
        {name}
      </p>

      <p className="mt-1 text-xl font-black">
        {value}
      </p>

    </div>
  );
}