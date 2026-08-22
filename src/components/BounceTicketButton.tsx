"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import { getRoleTitle } from "@/lib/player-level";

interface BounceTicketButtonProps {
  ticketId: number;

  /*
   * Optional for now so the existing
   * ticket page does not break.
   *
   * Next we will pass these from
   * /tickets/page.tsx.
   */
  playerLevel?: number;
  playerCareerPath?: string | null;
  careerAbilityReadyAt?: string | null;
}

interface PlayerOption {
  id: number;
  username: string;
  level: number;
  careerPath: string | null;
  queueSize: number;
}

type ActionMode =
  | "BOUNCE"
  | "ROUTE_FLAP";

type BounceResponse = {
  error?: string;

  outcome?:
    | "CORRECT_BOUNCE"
    | "WRONG_BOUNCE"
    | "OWNERSHIP_WARNING"
    | "SERVICE_DESK_HANDOFF"
    | "DNS_BOUNCE_FAILURE";

  correct?: boolean;
  transferred?: boolean;

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

  isPoison?: boolean;
  poisonEffect?: string;

  dnsFailureActive?: boolean;
};

type RouteFlapResponse = {
  error?: string;

  success?: boolean;

  outcome?:
    "ROUTE_FLAP";

  ability?: string;

  ticketId?: number;

  target?: string;

  readyAt?: string;

  cooldownMinutes?: number;

  message?: string;
};

type WrongBounceInfo = {
  target: string;
  penalty: number;
  message: string;
} | null;

type DnsFailureInfo = {
  target: string;
  message: string;
} | null;

type RouteFlapInfo = {
  target: string;
  message: string;
  readyAt: string | null;
} | null;

export default function BounceTicketButton({
  ticketId,
  playerLevel = 0,
  playerCareerPath = null,
  careerAbilityReadyAt = null,
}: BounceTicketButtonProps) {
  const router =
    useRouter();

  const [open, setOpen] =
    useState(false);

  const [actionMode, setActionMode] =
    useState<ActionMode>(
      "BOUNCE"
    );

  const [players, setPlayers] =
    useState<PlayerOption[]>(
      []
    );

  const [
    selectedPlayer,
    setSelectedPlayer,
  ] =
    useState<number | null>(
      null
    );

  const [
    loadingPlayers,
    setLoadingPlayers,
  ] =
    useState(false);

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const [
    clearingPenalty,
    setClearingPenalty,
  ] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [result, setResult] =
    useState<
      "success" | "error" | null
    >(null);

  /*
   * ============================
   * OWNERSHIP WARNING
   * ============================
   */
  const [
    ownershipWarning,
    setOwnershipWarning,
  ] =
    useState(false);

  const [
    ownershipError,
    setOwnershipError,
  ] =
    useState("");

  /*
   * ============================
   * WRONG TEAM
   * ============================
   */
  const [
    wrongBounce,
    setWrongBounce,
  ] =
    useState<WrongBounceInfo>(
      null
    );

  /*
   * ============================
   * DNS FAILURE
   * ============================
   */
  const [
    dnsFailure,
    setDnsFailure,
  ] =
    useState<DnsFailureInfo>(
      null
    );

  /*
   * ============================
   * ROUTE FLAP SUCCESS
   * ============================
   */
  const [
    routeFlapResult,
    setRouteFlapResult,
  ] =
    useState<RouteFlapInfo>(
      null
    );

  /*
   * ============================
   * BANKRUPTCY
   * ============================
   */
  const [
    demoted,
    setDemoted,
  ] =
    useState(false);

  /*
   * ============================
   * NETWORK ABILITY
   * ============================
   */
  const routeFlapUnlocked =
    playerCareerPath ===
      "NETWORK" &&
    playerLevel >=
      6;

  const routeFlapReady =
    !careerAbilityReadyAt ||
    new Date(
      careerAbilityReadyAt
    ).getTime() <=
      Date.now();

  /*
   * ============================
   * GLOBAL MODAL FLAG
   * ============================
   */
  useEffect(() => {
    const modalOpen =
      ownershipWarning ||
      wrongBounce !== null ||
      dnsFailure !== null ||
      routeFlapResult !==
        null ||
      demoted;

    if (modalOpen) {
      document.body.dataset
        .gameModalOpen =
        "true";
    } else {
      delete document.body
        .dataset
        .gameModalOpen;
    }

    return () => {
      delete document.body
        .dataset
        .gameModalOpen;
    };
  }, [
    ownershipWarning,
    wrongBounce,
    dnsFailure,
    routeFlapResult,
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
      players.length >
        0
    ) {
      return;
    }

    async function loadPlayers() {
      setLoadingPlayers(
        true
      );

      setMessage("");
      setResult(null);

      try {
        const response =
          await fetch(
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
            setResult(
              "error"
            );

            setMessage(
              `Server returned an invalid response (${response.status}).`
            );

            return;
          }
        }

        if (!response.ok) {
          setResult(
            "error"
          );

          setMessage(
            data.error ??
              "Unable to load players."
          );

          return;
        }

        setPlayers(
          data.players ??
            []
        );
      } catch (error) {
        console.error(
          "Unable to load players:",
          error
        );

        setResult(
          "error"
        );

        setMessage(
          "Unable to load players."
        );
      } finally {
        setLoadingPlayers(
          false
        );
      }
    }

    void loadPlayers();
  }, [
    open,
    players.length,
  ]);

  /*
   * ============================
   * NORMAL BOUNCE
   * ============================
   */
  async function bounceTicket() {
    if (
      !selectedPlayer
    ) {
      setResult(
        "error"
      );

      setMessage(
        "Choose a player first."
      );

      return;
    }

    setSubmitting(
      true
    );

    setMessage("");
    setResult(null);

    try {
      const response =
        await fetch(
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

      let data: BounceResponse =
        {};

      if (responseText) {
        try {
          data =
            JSON.parse(
              responseText
            );
        } catch {
          setResult(
            "error"
          );

          setMessage(
            `Server returned an invalid response (${response.status}).`
          );

          return;
        }
      }

      if (!response.ok) {
        setResult(
          "error"
        );

        setMessage(
          data.error ??
            `Server error (${response.status})`
        );

        return;
      }

      /*
       * DNS FAILURE
       */
      if (
        data.outcome ===
        "DNS_BOUNCE_FAILURE"
      ) {
        setOpen(false);

        setDnsFailure({
          target:
            data.target ??
            "the resolver team",

          message:
            data.message ??
            "The ticket transfer failed.",
        });

        return;
      }

      /*
       * SERVICE DESK HANDOFF
       */
      if (
        data.outcome ===
        "SERVICE_DESK_HANDOFF"
      ) {
        setOpen(false);

        setResult(
          "success"
        );

        setMessage(
          data.message ??
            `Ticket handed to ${
              data.target ??
              "Service Desk"
            }.`
        );

        setSelectedPlayer(
          null
        );

        setPlayers([]);

        setTimeout(() => {
          router.refresh();
        }, 800);

        return;
      }

      /*
       * OWNERSHIP WARNING
       */
      if (
        data.outcome ===
        "OWNERSHIP_WARNING"
      ) {
        setOpen(false);

        setOwnershipError(
          ""
        );

        setOwnershipWarning(
          true
        );

        return;
      }

      /*
       * CORRECT BOUNCE
       */
      if (
        data.outcome ===
        "CORRECT_BOUNCE"
      ) {
        setResult(
          "success"
        );

        if (
          data.isPoison
        ) {
          setMessage(
            data.message ??
              `Poison Ticket successfully routed to ${
                data.target ??
                "the resolver team"
              }.`
          );
        } else {
          setMessage(
            `Correctly routed to ${
              data.target ??
              "player"
            }! +${
              data.reward ??
              0
            } CR / +${
              data.xp ??
              0
            } XP`
          );
        }

        setTimeout(() => {
          router.refresh();
        }, 1000);

        return;
      }

      /*
       * BANKRUPTCY
       */
      if (
        data.bankrupt ===
          true ||
        data.resetToServiceDesk ===
          true
      ) {
        setOpen(false);

        setOwnershipWarning(
          false
        );

        setWrongBounce(
          null
        );

        setDnsFailure(
          null
        );

        setDemoted(
          true
        );

        return;
      }

      /*
       * WRONG TEAM
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

      setResult(
        "error"
      );

      setMessage(
        "Unknown bounce result."
      );
    } catch (error) {
      console.error(
        "Bounce request failed:",
        error
      );

      setResult(
        "error"
      );

      setMessage(
        "Unable to contact the server."
      );
    } finally {
      setSubmitting(
        false
      );
    }
  }

  /*
   * ============================
   * ROUTE FLAP
   * ============================
   */
  async function useRouteFlap() {
    if (
      !selectedPlayer
    ) {
      setResult(
        "error"
      );

      setMessage(
        "Choose a player first."
      );

      return;
    }

    setSubmitting(
      true
    );

    setMessage("");
    setResult(null);

    try {
      const response =
        await fetch(
          "/api/career/network/route-flap",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                ticketId,

                targetPlayerId:
                  selectedPlayer,
              }),
          }
        );

      const responseText =
        await response.text();

      let data: RouteFlapResponse =
        {};

      if (responseText) {
        try {
          data =
            JSON.parse(
              responseText
            );
        } catch {
          setResult(
            "error"
          );

          setMessage(
            `Server returned an invalid response (${response.status}).`
          );

          return;
        }
      }

      if (!response.ok) {
        setResult(
          "error"
        );

        setMessage(
          data.error ??
            "Unable to use Route Flap."
        );

        return;
      }

      setOpen(false);

      setRouteFlapResult({
        target:
          data.target ??
          "the selected player",

        message:
          data.message ??
          "Route Flap successfully transferred the ticket.",

        readyAt:
          data.readyAt ??
          null,
      });
    } catch (error) {
      console.error(
        "Route Flap failed:",
        error
      );

      setResult(
        "error"
      );

      setMessage(
        "Unable to contact the server."
      );
    } finally {
      setSubmitting(
        false
      );
    }
  }

  /*
   * ============================
   * BUY OUT QUEUE PENALTY
   * ============================
   */
  async function clearQueuePenalty() {
    setClearingPenalty(
      true
    );

    setOwnershipError(
      ""
    );

    try {
      const response =
        await fetch(
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
        bankrupt?: boolean;
        resetToServiceDesk?: boolean;
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

      if (
        data.bankrupt ===
          true ||
        data.resetToServiceDesk ===
          true
      ) {
        setOwnershipWarning(
          false
        );

        setDemoted(
          true
        );

        return;
      }

      setOwnershipWarning(
        false
      );

      resetPicker();

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
      setClearingPenalty(
        false
      );
    }
  }

  /*
   * ============================
   * HELPERS
   * ============================
   */
  function resetPicker() {
    setOpen(false);

    setSelectedPlayer(
      null
    );

    setPlayers([]);

    setMessage("");
    setResult(null);

    setActionMode(
      "BOUNCE"
    );
  }

  function openBounce() {
    setActionMode(
      "BOUNCE"
    );

    setOpen(true);

    setSelectedPlayer(
      null
    );

    setMessage("");
    setResult(null);
  }

  function openRouteFlap() {
    setActionMode(
      "ROUTE_FLAP"
    );

    setOpen(true);

    setSelectedPlayer(
      null
    );

    setMessage("");
    setResult(null);
  }

  function acknowledgeOwnershipWarning() {
    setOwnershipWarning(
      false
    );

    resetPicker();

    router.refresh();
  }

  function acknowledgeWrongBounce() {
    setWrongBounce(
      null
    );

    resetPicker();

    router.refresh();
  }

  function acknowledgeDnsFailure() {
    setDnsFailure(
      null
    );

    resetPicker();

    router.refresh();
  }

  function acknowledgeRouteFlap() {
    setRouteFlapResult(
      null
    );

    resetPicker();

    router.refresh();
  }

  function acknowledgeDemotion() {
    window.location.href =
      "/dashboard";
  }

  return (
    <>
      {/* ============================
          ACTION BUTTONS
          ============================ */}
      <div>

        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={
              openBounce
            }
            disabled={
              submitting
            }
            className="border border-zinc-700 px-4 py-2 font-bold hover:bg-zinc-900 disabled:opacity-50"
          >
            Bounce
          </button>

          {routeFlapUnlocked && (
            <button
              type="button"
              onClick={
                openRouteFlap
              }
              disabled={
                submitting ||
                !routeFlapReady
              }
              className="border border-cyan-800 bg-cyan-950/20 px-4 py-2 font-bold text-cyan-300 hover:bg-cyan-950/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {routeFlapReady
                ? "Route Flap"
                : "Route Flap — Cooldown"}
            </button>
          )}

        </div>

        {/* ============================
            PLAYER PICKER
            ============================ */}
        {open && (
          <div
            className={`mt-3 w-80 border bg-black p-4 ${
              actionMode ===
              "ROUTE_FLAP"
                ? "border-cyan-900"
                : "border-zinc-800"
            }`}
          >

            {actionMode ===
            "ROUTE_FLAP" ? (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-500">
                  Network Ability
                </p>

                <p className="mt-2 text-lg font-black text-cyan-200">
                  Route Flap
                </p>

                <p className="mt-2 text-xs text-zinc-400">
                  Force-transfer this ticket without a wrong-team penalty, ownership warning or DNS failure.
                </p>
              </>
            ) : (
              <>
                <p className="font-bold">
                  Choose player
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Pick carefully. The ticket category is hidden.
                </p>
              </>
            )}

            {loadingPlayers && (
              <p className="mt-4 text-sm text-zinc-500">
                Loading players...
              </p>
            )}

            {!loadingPlayers &&
              players.length ===
                0 &&
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
                        ? actionMode ===
                          "ROUTE_FLAP"
                          ? "border-cyan-500 bg-cyan-950/20"
                          : "border-white bg-zinc-900"
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

            {players.length >
              0 && (
              <button
                type="button"
                onClick={
                  actionMode ===
                  "ROUTE_FLAP"
                    ? useRouteFlap
                    : bounceTicket
                }
                disabled={
                  !selectedPlayer ||
                  submitting
                }
                className={`mt-4 w-full px-4 py-2 font-bold disabled:opacity-40 ${
                  actionMode ===
                  "ROUTE_FLAP"
                    ? "bg-cyan-500 text-black hover:bg-cyan-400"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {submitting
                  ? "Transferring..."
                  : actionMode ===
                      "ROUTE_FLAP"
                    ? "Execute Route Flap"
                    : "Confirm Bounce"}
              </button>
            )}

            <button
              type="button"
              onClick={
                resetPicker
              }
              disabled={
                submitting
              }
              className="mt-2 w-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-900"
            >
              Cancel
            </button>

            {message && (
              <div
                className={`mt-4 border p-3 text-sm ${
                  result ===
                  "success"
                    ? "border-green-900 text-green-400"
                    : "border-red-900 text-red-400"
                }`}
              >
                {
                  message
                }
              </div>
            )}

          </div>
        )}

      </div>

      {/* ============================
          ROUTE FLAP SUCCESS
          ============================ */}
      {routeFlapResult && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 px-4">

          <div className="w-full max-w-md border border-cyan-800 bg-zinc-950 p-8 shadow-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-500">
              Network Ability
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              ROUTE FLAP
            </h2>

            <p className="mt-5 text-zinc-300">
              {
                routeFlapResult.message
              }
            </p>

            <div className="mt-6 border border-cyan-900/70 bg-cyan-950/20 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-cyan-400">
                Forced Transfer
              </p>

              <p className="mt-2 text-xl font-black text-white">
                {
                  routeFlapResult.target
                }
              </p>

              <p className="mt-3 text-sm text-zinc-400">
                No routing penalty.
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                No ownership slowdown.
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                DNS bypassed.
              </p>

            </div>

            <p className="mt-5 text-sm text-zinc-500">
              Route Flap is now on a 10 minute cooldown.
            </p>

            <button
              type="button"
              onClick={
                acknowledgeRouteFlap
              }
              className="mt-6 w-full bg-cyan-500 px-5 py-3 font-black text-black hover:bg-cyan-400"
            >
              OK
            </button>

          </div>

        </div>
      )}

      {/* ============================
          DNS FAILURE MODAL
          ============================ */}
      {dnsFailure && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 px-4">

          <div className="w-full max-w-md border border-purple-800 bg-zinc-950 p-8 shadow-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-500">
              Poison Effect
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              BOUNCE FAILED
            </h2>

            <p className="mt-5 text-zinc-300">
              {
                dnsFailure.message
              }
            </p>

            <div className="mt-6 border border-purple-900/70 bg-purple-950/20 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-purple-400">
                DNS Failure
              </p>

              <p className="mt-3 text-lg font-black text-white">
                Ticket Not Transferred
              </p>

              <p className="mt-3 text-sm text-zinc-400">
                The attempted transfer to{" "}
                <span className="font-bold text-white">
                  {
                    dnsFailure.target
                  }
                </span>{" "}
                failed.
              </p>

              <p className="mt-3 text-sm text-purple-300">
                The ticket remains in your queue.
              </p>

            </div>

            <p className="mt-5 text-xs text-zinc-500">
              While DNS Failure remains open, each bounce attempt has a 50% chance to fail.
            </p>

            <button
              type="button"
              onClick={
                acknowledgeDnsFailure
              }
              className="mt-6 w-full bg-purple-600 px-5 py-3 font-black text-white hover:bg-purple-500"
            >
              Of Course It&apos;s DNS
            </button>

          </div>

        </div>
      )}

      {/* ============================
          OWNERSHIP WARNING
          ============================ */}
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

      {/* ============================
          WRONG TEAM
          ============================ */}
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

      {/* ============================
          BANKRUPTCY
          ============================ */}
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