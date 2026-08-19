"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getRoleTitle } from "@/lib/player-level";

interface BounceTicketButtonProps {
  ticketId: number;
}

interface PlayerOption {
  id: number;
  username: string;
  level: number;
  careerPath: string | null;
  queueSize: number;
}

type BounceResponse = {
  error?: string;

  outcome?:
    | "CORRECT_BOUNCE"
    | "WRONG_BOUNCE"
    | "OWNERSHIP_WARNING"
    | "SERVICE_DESK_HANDOFF";

  correct?: boolean;
  reward?: number;
  xp?: number;
  penalty?: number;
  credits?: number;
  bankrupt?: boolean;
  resetToServiceDesk?: boolean;
  target?: string;

  queuePenaltyUntil?: string;
  message?: string;

  level?: number;
  levelledUp?: boolean;
  careerUnlocked?: boolean;
};

type WrongBounceInfo = {
  target: string;
  penalty: number;
  message: string;
} | null;

export default function BounceTicketButton({
  ticketId,
}: BounceTicketButtonProps) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [players, setPlayers] =
    useState<PlayerOption[]>([]);

  const [selectedPlayer, setSelectedPlayer] =
    useState<number | null>(null);

  const [loadingPlayers, setLoadingPlayers] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [clearingPenalty, setClearingPenalty] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [result, setResult] = useState<
    "success" | "error" | null
  >(null);

  /*
   * Ownership Warning
   */
  const [ownershipWarning, setOwnershipWarning] =
    useState(false);

  const [ownershipError, setOwnershipError] =
    useState("");

  /*
   * Wrong Team popup
   */
  const [wrongBounce, setWrongBounce] =
    useState<WrongBounceInfo>(null);

  /*
   * Bankruptcy / demotion popup
   */
  const [demoted, setDemoted] =
    useState(false);

  /*
   * Global modal flag.
   *
   * Prevents TicketTimer from refreshing
   * underneath one of these popups.
   */
  useEffect(() => {
    const modalOpen =
      ownershipWarning ||
      wrongBounce !== null ||
      demoted;

    if (modalOpen) {
      document.body.dataset.gameModalOpen =
        "true";
    } else {
      delete document.body.dataset
        .gameModalOpen;
    }

    return () => {
      delete document.body.dataset
        .gameModalOpen;
    };
  }, [
    ownershipWarning,
    wrongBounce,
    demoted,
  ]);

  /*
   * ============================
   * LOAD PLAYERS
   * ============================
   */
  useEffect(() => {
    if (
      !open ||
      players.length > 0
    ) {
      return;
    }

    async function loadPlayers() {
      setLoadingPlayers(true);
      setMessage("");
      setResult(null);

      try {
        const response = await fetch(
          "/api/players/available"
        );

        const responseText =
          await response.text();

        let data: {
          error?: string;
          players?: PlayerOption[];
        } = {};

        if (responseText) {
          try {
            data =
              JSON.parse(
                responseText
              );
          } catch {
            setResult("error");

            setMessage(
              `Server returned an invalid response (${response.status}).`
            );

            return;
          }
        }

        if (!response.ok) {
          setResult("error");

          setMessage(
            data.error ??
              "Unable to load players."
          );

          return;
        }

        setPlayers(
          data.players ?? []
        );
      } catch (error) {
        console.error(
          "Unable to load players:",
          error
        );

        setResult("error");

        setMessage(
          "Unable to load players."
        );
      } finally {
        setLoadingPlayers(false);
      }
    }

    loadPlayers();
  }, [
    open,
    players.length,
  ]);

  /*
   * ============================
   * BOUNCE TICKET
   * ============================
   */
  async function bounceTicket() {
    if (!selectedPlayer) {
      setResult("error");

      setMessage(
        "Choose a player first."
      );

      return;
    }

    setSubmitting(true);
    setMessage("");
    setResult(null);

    try {
      const response = await fetch(
        `/api/tickets/${ticketId}/bounce`,
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              targetPlayerId:
                selectedPlayer,
            }),
        }
      );

      const responseText =
        await response.text();

      let data: BounceResponse = {};

      if (responseText) {
        try {
          data =
            JSON.parse(
              responseText
            );
        } catch {
          setResult("error");

          setMessage(
            `Server returned an invalid response (${response.status}).`
          );

          return;
        }
      }

      if (!response.ok) {
        setResult("error");

        setMessage(
          data.error ??
            `Server error (${response.status})`
        );

        return;
      }

      /*
       * ===========================
       * SERVICE DESK HANDOFF
       * ===========================
       *
       * Specialist sends a Service Desk
       * ticket back to an SDA.
       *
       * No reward.
       * No XP.
       * No slowdown.
       * No penalty.
       */
      if (
        data.outcome ===
        "SERVICE_DESK_HANDOFF"
      ) {
        setOpen(false);

        setResult("success");

        setMessage(
          data.message ??
            `Ticket handed back to ${
              data.target ??
              "Service Desk"
            }.`
        );

        setSelectedPlayer(null);
        setPlayers([]);

        setTimeout(() => {
          router.refresh();
        }, 800);

        return;
      }

      /*
       * ===========================
       * OWNERSHIP WARNING
       * ===========================
       */
      if (
        data.outcome ===
        "OWNERSHIP_WARNING"
      ) {
        setOpen(false);

        setOwnershipError("");
        setOwnershipWarning(true);

        return;
      }

      /*
       * ===========================
       * CORRECT ESCALATION
       * ===========================
       */
      if (
        data.outcome ===
        "CORRECT_BOUNCE"
      ) {
        setResult("success");

        setMessage(
          `Correctly routed to ${
            data.target ??
            "player"
          }! +${
            data.reward ?? 0
          } CR / +${
            data.xp ?? 0
          } XP`
        );

        setTimeout(() => {
          router.refresh();
        }, 1000);

        return;
      }

      /*
       * ===========================
       * WRONG BOUNCE + BANKRUPTCY
       * ===========================
       */
      if (
        data.bankrupt === true ||
        data.resetToServiceDesk === true
      ) {
        setOpen(false);

        setOwnershipWarning(false);

        setWrongBounce(null);

        setDemoted(true);

        return;
      }

      /*
       * ===========================
       * WRONG TEAM
       * ===========================
       */
      if (
        data.outcome ===
        "WRONG_BOUNCE"
      ) {
        setOpen(false);

        setWrongBounce({
          target:
            data.target ??
            "the selected player",

          penalty:
            data.penalty ??
            0,

          message:
            data.message ??
            "The receiving team is not impressed.",
        });

        return;
      }

      /*
       * Unexpected server outcome.
       */
      setResult("error");

      setMessage(
        "Unknown bounce result."
      );
    } catch (error) {
      console.error(
        "Bounce request failed:",
        error
      );

      setResult("error");

      setMessage(
        "Unable to contact the server."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * ============================
   * BUY OUT QUEUE PENALTY
   * ============================
   */
  async function clearQueuePenalty() {
    setClearingPenalty(true);
    setOwnershipError("");

    try {
      const response = await fetch(
        "/api/players/clear-queue-penalty",
        {
          method:
            "POST",
        }
      );

      const responseText =
        await response.text();

      let data: {
        error?: string;
        success?: boolean;
        cost?: number;
        credits?: number;
        bankrupt?: boolean;
        resetToServiceDesk?: boolean;
        message?: string;
      } = {};

      if (responseText) {
        try {
          data =
            JSON.parse(
              responseText
            );
        } catch {
          setOwnershipError(
            `Server returned an invalid response (${response.status}).`
          );

          return;
        }
      }

      if (!response.ok) {
        setOwnershipError(
          data.error ??
            "Unable to restore queue priority."
        );

        return;
      }

      /*
       * Buying out the penalty
       * caused bankruptcy.
       */
      if (
        data.bankrupt === true ||
        data.resetToServiceDesk ===
          true
      ) {
        setOwnershipWarning(false);

        setDemoted(true);

        return;
      }

      /*
       * Normal successful buyout.
       */
      setOwnershipWarning(false);

      setSelectedPlayer(null);

      setPlayers([]);

      setOwnershipError("");

      router.refresh();
    } catch (error) {
      console.error(
        "Clear queue penalty failed:",
        error
      );

      setOwnershipError(
        "Unable to contact the server."
      );
    } finally {
      setClearingPenalty(false);
    }
  }

  /*
   * Accept ownership slowdown.
   */
  function acknowledgeOwnershipWarning() {
    setOwnershipWarning(false);

    setSelectedPlayer(null);

    setPlayers([]);

    setOwnershipError("");

    router.refresh();
  }

  /*
   * Accept wrong-team penalty.
   */
  function acknowledgeWrongBounce() {
    setWrongBounce(null);

    setSelectedPlayer(null);

    setPlayers([]);

    router.refresh();
  }

  /*
   * Accept bankruptcy / demotion.
   */
  function acknowledgeDemotion() {
    window.location.href =
      "/dashboard";
  }

  function toggleOpen() {
    setOpen(
      (current) =>
        !current
    );

    setMessage("");
    setResult(null);
  }

  return (
    <>
      {/* Bounce Button */}
      <div>
        <button
          type="button"
          onClick={
            toggleOpen
          }
          disabled={
            submitting
          }
          className="border border-zinc-700 px-4 py-2 font-bold hover:bg-zinc-900 disabled:opacity-50"
        >
          Bounce
        </button>

        {/* Player Picker */}
        {open && (
          <div className="mt-3 w-80 border border-zinc-800 bg-black p-4">

            <p className="font-bold">
              Choose player
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Pick carefully. The ticket category is hidden.
            </p>

            {loadingPlayers && (
              <p className="mt-4 text-sm text-zinc-500">
                Loading players...
              </p>
            )}

            {!loadingPlayers &&
              players.length === 0 &&
              !message && (
                <p className="mt-4 text-sm text-zinc-500">
                  No other players are currently available.
                </p>
              )}

            <div className="mt-4 space-y-2">
              {players.map(
                (player) => (
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
                        ? "border-white bg-zinc-900"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex justify-between gap-3">

                      <span className="font-bold">
                        {
                          player.username
                        }
                      </span>

                      <span className="text-xs text-zinc-500">
                        Queue:{" "}
                        {
                          player.queueSize
                        }
                      </span>

                    </div>

                    <p className="mt-1 text-xs text-zinc-500">
                      {getRoleTitle(
                        player.level,
                        player.careerPath
                      )}
                    </p>

                  </button>
                )
              )}
            </div>

            {players.length > 0 && (
              <button
                type="button"
                onClick={
                  bounceTicket
                }
                disabled={
                  !selectedPlayer ||
                  submitting
                }
                className="mt-4 w-full bg-white px-4 py-2 font-bold text-black hover:bg-zinc-200 disabled:opacity-40"
              >
                {submitting
                  ? "Transferring..."
                  : "Confirm Bounce"}
              </button>
            )}

            {message && (
              <div
                className={`mt-4 border p-3 text-sm ${
                  result ===
                  "success"
                    ? "border-green-900 text-green-400"
                    : "border-red-900 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

          </div>
        )}
      </div>

      {/* ===========================
          OWNERSHIP WARNING MODAL
          =========================== */}
      {ownershipWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">

          <div className="w-full max-w-md border border-yellow-900 bg-zinc-950 p-8 shadow-2xl">

            <p className="text-sm uppercase tracking-[0.25em] text-yellow-500">
              Ownership Warning
            </p>

            <h2 className="mt-3 text-2xl font-black text-white">
              You transferred a ticket that you could resolve.
            </h2>

            <p className="mt-4 text-zinc-400">
              You are expected to take ownership of work that belongs to your resolver group.
            </p>

            <div className="mt-6 border border-yellow-900/60 bg-yellow-950/20 p-4">

              <p className="font-bold text-yellow-400">
                Queue Priority Reduced
              </p>

              <p className="mt-2 text-sm text-zinc-300">
                Your personal ticket intake will be slower for the next 5 minutes.
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                This only affects your queue.
              </p>

            </div>

            {ownershipError && (
              <p className="mt-4 text-sm text-red-400">
                {
                  ownershipError
                }
              </p>
            )}

            <button
              type="button"
              onClick={
                clearQueuePenalty
              }
              disabled={
                clearingPenalty
              }
              className="mt-6 w-full border border-yellow-700 px-5 py-3 font-bold text-yellow-300 hover:bg-yellow-950/30 disabled:opacity-50"
            >
              {clearingPenalty
                ? "Restoring Priority..."
                : "Pay 100 CR to Restore Priority"}
            </button>

            <button
              type="button"
              onClick={
                acknowledgeOwnershipWarning
              }
              disabled={
                clearingPenalty
              }
              className="mt-3 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              Accept 5 Minute Slowdown
            </button>

          </div>
        </div>
      )}

      {/* ===========================
          WRONG TEAM MODAL
          =========================== */}
      {wrongBounce && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 px-4">

          <div className="w-full max-w-md border border-red-900 bg-zinc-950 p-8 shadow-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Routing Error
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              WRONG TEAM
            </h2>

            <p className="mt-5 text-zinc-300">
              {
                wrongBounce.message
              }
            </p>

            <div className="mt-6 border border-red-900/70 bg-red-950/20 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-red-400">
                Routing Penalty
              </p>

              <p className="mt-2 text-3xl font-black text-red-400">
                -
                {
                  wrongBounce.penalty
                }{" "}
                CR
              </p>

              <p className="mt-3 text-sm text-zinc-400">
                The ticket has still been transferred to{" "}
                <span className="font-bold text-white">
                  {
                    wrongBounce.target
                  }
                </span>
                .
              </p>

            </div>

            <button
              type="button"
              onClick={
                acknowledgeWrongBounce
              }
              className="mt-6 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
            >
              OK
            </button>

          </div>
        </div>
      )}

      {/* ===========================
          BANKRUPTCY / DEMOTION MODAL
          =========================== */}
      {demoted && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4">

          <div className="w-full max-w-md border border-red-800 bg-zinc-950 p-8 text-center shadow-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Bankruptcy
            </p>

            <h2 className="mt-3 text-4xl font-black text-white">
              YOU HAVE BEEN DEMOTED
            </h2>

            <p className="mt-5 text-zinc-300">
              Your Credits reached 0.
            </p>

            <p className="mt-2 text-zinc-400">
              Your career has been reset and you have been sent back to the Service Desk.
            </p>

            <div className="mt-6 border border-red-900 bg-red-950/20 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-red-400">
                New Position
              </p>

              <p className="mt-3 text-2xl font-black text-white">
                Service Desk Analyst
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">

                <div className="border border-zinc-800 bg-black p-3">
                  <p className="text-xs text-zinc-500">
                    Level
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    1
                  </p>
                </div>

                <div className="border border-zinc-800 bg-black p-3">
                  <p className="text-xs text-zinc-500">
                    XP
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    0
                  </p>
                </div>

                <div className="border border-zinc-800 bg-black p-3">
                  <p className="text-xs text-zinc-500">
                    Credits
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    1000
                  </p>
                </div>

              </div>
            </div>

            <p className="mt-5 text-sm text-zinc-500">
              Your lifetime statistics and bankruptcy count are retained.
            </p>

            <button
              type="button"
              onClick={
                acknowledgeDemotion
              }
              className="mt-6 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
            >
              OK
            </button>

          </div>
        </div>
      )}
    </>
  );
}