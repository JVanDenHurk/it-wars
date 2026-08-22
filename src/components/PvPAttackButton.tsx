"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import { getRoleTitle } from "@/lib/player-level";

interface PvPAttackButtonProps {
  attackType: string;
  attackName: string;
  attackCost: number;
  playerCredits: number;
}

interface PlayerOption {
  id: number;
  username: string;
  level: number;
  careerPath: string | null;
  credits: number;
  queueSize: number;
}

type SortOption =
  | "queue"
  | "credits-low"
  | "credits-high"
  | "username";

export default function PvPAttackButton({
  attackType,
  attackName,
  attackCost,
  playerCredits,
}: PvPAttackButtonProps) {
  const router =
    useRouter();

  const [open, setOpen] =
    useState(false);

  const [players, setPlayers] =
    useState<PlayerOption[]>(
      []
    );

  const [selectedPlayer, setSelectedPlayer] =
    useState<number | null>(
      null
    );

  const [search, setSearch] =
    useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [sort, setSort] =
    useState<SortOption>(
      "queue"
    );

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalPlayers, setTotalPlayers] =
    useState(0);

  const [loadingPlayers, setLoadingPlayers] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const affordable =
    playerCredits >
    attackCost;

  /*
   * ============================
   * SEARCH DEBOUNCE
   * ============================
   */
  useEffect(() => {
    const timer =
      window.setTimeout(
        () => {
          setDebouncedSearch(
            search
          );

          setPage(1);
        },
        300
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [search]);

  /*
   * ============================
   * LOAD TARGETS
   * ============================
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    async function loadPlayers() {
      setLoadingPlayers(
        true
      );

      setError("");

      try {
        const params =
          new URLSearchParams({
            page:
              page.toString(),

            sort,

            search:
              debouncedSearch,
          });

        const response =
          await fetch(
            `/api/pvp/targets?${params.toString()}`
          );

        const responseText =
          await response.text();

        let data: {
          error?: string;

          players?: PlayerOption[];

          page?: number;

          totalPages?: number;

          total?: number;
        } = {};

        if (responseText) {
          data =
            JSON.parse(
              responseText
            );
        }

        if (!response.ok) {
          setError(
            data.error ??
              "Unable to load players."
          );

          return;
        }

        setPlayers(
          data.players ??
            []
        );

        setTotalPages(
          data.totalPages ??
            1
        );

        setTotalPlayers(
          data.total ??
            0
        );

        /*
         * Selection should disappear
         * if the selected player is no
         * longer on the current page.
         */
        setSelectedPlayer(
          null
        );
      } catch (error) {
        console.error(
          "Unable to load PvP targets:",
          error
        );

        setError(
          "Unable to load players."
        );
      } finally {
        setLoadingPlayers(
          false
        );
      }
    }

    loadPlayers();
  }, [
    open,
    page,
    sort,
    debouncedSearch,
  ]);

  /*
   * ============================
   * LAUNCH POISON
   * ============================
   */
  async function launchPoison() {
    if (!selectedPlayer) {
      setError(
        "Choose a target first."
      );

      return;
    }

    setSubmitting(
      true
    );

    setError("");
    setMessage("");

    try {
      const response =
        await fetch(
          "/api/pvp/attack",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                attackType,

                targetPlayerId:
                  selectedPlayer,
              }),
          }
        );

      const responseText =
        await response.text();

      let data: {
        error?: string;
        message?: string;
      } = {};

      if (responseText) {
        data =
          JSON.parse(
            responseText
          );
      }

      if (!response.ok) {
        setError(
          data.error ??
            "Unable to launch poison."
        );

        return;
      }

      setMessage(
        data.message ??
          `${attackName} launched.`
      );

      setSelectedPlayer(
        null
      );

      /*
       * Refresh PvP page so Credits
       * and other server data update.
       */
      router.refresh();

      /*
       * Close picker shortly after
       * successful attack.
       */
      window.setTimeout(
        () => {
          setOpen(false);
          setMessage("");
        },
        1200
      );
    } catch (error) {
      console.error(
        "Poison attack failed:",
        error
      );

      setError(
        "Unable to contact the server."
      );
    } finally {
      setSubmitting(
        false
      );
    }
  }

  return (
    <div className="mt-5">

      <button
        type="button"
        disabled={
          !affordable
        }
        onClick={() => {
          setOpen(
            (current) =>
              !current
          );

          setError("");
          setMessage("");
        }}
        className="w-full bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {affordable
          ? "Choose Target"
          : "Not Enough Credits"}
      </button>

      {open && (
        <div className="mt-4 border border-purple-900 bg-black p-4">

          <div className="flex items-start justify-between gap-4">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-500">
                Choose Target
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {totalPlayers} player
                {totalPlayers === 1
                  ? ""
                  : "s"}{" "}
                online
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="text-sm text-zinc-500 hover:text-white"
            >
              Close
            </button>

          </div>

          {/* Search */}
          <input
            type="text"
            value={
              search
            }
            onChange={(
              event
            ) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search players..."
            className="mt-4 w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-purple-600"
          />

          {/* Sort */}
          <select
            value={
              sort
            }
            onChange={(
              event
            ) => {
              setSort(
                event.target
                  .value as SortOption
              );

              setPage(1);
            }}
            className="mt-3 w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-purple-600"
          >
            <option value="queue">
              Biggest Queue
            </option>

            <option value="credits-low">
              Lowest Credits
            </option>

            <option value="credits-high">
              Highest Credits
            </option>

            <option value="username">
              Username
            </option>
          </select>

          {/* Loading */}
          {loadingPlayers && (
            <p className="mt-5 text-sm text-zinc-500">
              Loading targets...
            </p>
          )}

          {/* Empty */}
          {!loadingPlayers &&
            players.length ===
              0 && (
              <div className="mt-5 border border-zinc-800 p-4 text-sm text-zinc-500">
                No matching online players.
              </div>
            )}

          {/* Players */}
          {!loadingPlayers && (
            <div className="mt-4 space-y-2">

              {players.map(
                (player) => {
                  const vulnerable =
                    player.credits <=
                      300 ||
                    player.queueSize >=
                      8;

                  return (
                    <button
                      key={
                        player.id
                      }
                      type="button"
                      onClick={() =>
                        setSelectedPlayer(
                          player.id
                        )
                      }
                      className={`w-full border p-3 text-left ${
                        selectedPlayer ===
                        player.id
                          ? "border-purple-500 bg-purple-950/30"
                          : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"
                      }`}
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <div className="flex items-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-green-400" />

                            <p className="truncate font-bold">
                              {
                                player.username
                              }
                            </p>

                            {vulnerable && (
                              <span className="border border-purple-900 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-400">
                                Vulnerable
                              </span>
                            )}

                          </div>

                          <p className="mt-1 text-xs text-zinc-500">
                            {getRoleTitle(
                              player.level,
                              player.careerPath
                            )}
                          </p>

                        </div>

                        <div className="shrink-0 text-right">

                          <p
                            className={
                              player.credits <=
                              300
                                ? "font-bold text-red-400"
                                : "font-bold text-zinc-300"
                            }
                          >
                            {
                              player.credits
                            }{" "}
                            CR
                          </p>

                          <p
                            className={`mt-1 text-xs ${
                              player.queueSize >=
                              8
                                ? "text-purple-400"
                                : "text-zinc-500"
                            }`}
                          >
                            Queue:{" "}
                            {
                              player.queueSize
                            }
                          </p>

                        </div>

                      </div>

                    </button>
                  );
                }
              )}

            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">

              <button
                type="button"
                disabled={
                  page <= 1 ||
                  loadingPlayers
                }
                onClick={() =>
                  setPage(
                    (current) =>
                      Math.max(
                        1,
                        current -
                          1
                      )
                  )
                }
                className="border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900 disabled:opacity-30"
              >
                Previous
              </button>

              <p className="text-xs text-zinc-500">
                Page {page} of{" "}
                {
                  totalPages
                }
              </p>

              <button
                type="button"
                disabled={
                  page >=
                    totalPages ||
                  loadingPlayers
                }
                onClick={() =>
                  setPage(
                    (current) =>
                      Math.min(
                        totalPages,
                        current +
                          1
                      )
                  )
                }
                className="border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900 disabled:opacity-30"
              >
                Next
              </button>

            </div>
          )}

          {/* Confirm */}
          {players.length >
            0 && (
            <button
              type="button"
              disabled={
                !selectedPlayer ||
                submitting
              }
              onClick={
                launchPoison
              }
              className="mt-4 w-full bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500 disabled:opacity-40"
            >
              {submitting
                ? "Launching..."
                : `Launch ${attackName}`}
            </button>
          )}

          {error && (
            <div className="mt-4 border border-red-900 bg-red-950/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-4 border border-purple-900 bg-purple-950/20 p-3 text-sm text-purple-300">
              {message}
            </div>
          )}

        </div>
      )}

    </div>
  );
}