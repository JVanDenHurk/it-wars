"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { STARTING_CREDITS } from "@/lib/game-balance";
import { getRoleTitle } from "@/lib/player-level";

interface ResolveTicketButtonProps {
  ticketId: number;
}

type ResolveResponse = {
  success?: boolean;
  correct?: boolean;

  reward?: number;
  xp?: number;

  penalty?: number;
  credits?: number;

  failed?: boolean;

  ticketId?: number;
  ticketNumber?: string;
  ticketTitle?: string;
  ticketCategory?: string;

  failureMessage?: string;
  successMessage?: string;

  bankrupt?: boolean;
  resetToServiceDesk?: boolean;

  error?: string;

  level?: number;
  levelledUp?: boolean;
  careerUnlocked?: boolean;
};

type FailureInfo = {
  ticketNumber: string;
  ticketTitle: string;
  penalty: number;
  failureMessage: string;
} | null;

type SuccessInfo = {
  ticketNumber: string;
  ticketTitle: string;
  reward: number;
  xp: number;
  successMessage: string;

  promotion: {
    level: number;
    careerUnlocked: boolean;
  } | null;
} | null;


function getRandomSuccessMessage() {
  const messages = [
    "Against all expectations, the issue is fixed. The user has confirmed everything is working and has immediately forgotten you exist.",

    "Ticket resolved successfully. Management has cancelled the emergency meeting they scheduled thirty seconds ago.",

    "The issue is fixed. Nobody knows exactly why, so it is probably best not to touch anything else.",

    "Another successful resolution. The user has replied with the highest honour in IT: 'thanks'.",

    "Problem solved. You may now enjoy approximately twelve seconds of peace before the next ticket arrives.",

    "The fix worked first time. This is suspicious, but we will take the win.",

    "Everything is working again. Naturally, the user now has an unrelated question.",

    "Ticket resolved. Your troubleshooting skills have temporarily restored confidence in the IT department.",

    "The issue has been fixed without causing another incident. Management considers this outstanding performance.",

    "Resolution successful. Somewhere, an IT manager quietly removes your name from an escalation email.",
  ];

  return messages[
    Math.floor(Math.random() * messages.length)
  ];
}

export default function ResolveTicketButton({
  ticketId,
}: ResolveTicketButtonProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  /*
   * Successful resolution popup
   */
  const [
    resolutionSuccess,
    setResolutionSuccess,
  ] = useState<SuccessInfo>(null);

  /*
   * Promotion popup
   */
  const [promotion, setPromotion] =
    useState<{
      level: number;
      careerUnlocked: boolean;
    } | null>(null);

  /*
   * Failed resolution popup
   */
  const [failure, setFailure] =
    useState<FailureInfo>(null);

  /*
   * Bankruptcy / demotion popup
   */
  const [demoted, setDemoted] =
    useState(false);

  /*
   * ============================
   * GLOBAL MODAL STATE
   * ============================
   *
   * TicketTimer refreshes the page
   * whenever a new ticket arrives.
   *
   * If a resolution, failure,
   * promotion or bankruptcy popup
   * is currently open, that refresh
   * would destroy the popup.
   *
   * We expose a simple flag on the
   * document body so TicketTimer can
   * wait until the popup is closed.
   */
  useEffect(() => {
    const modalOpen =
      resolutionSuccess !== null ||
      promotion !== null ||
      failure !== null ||
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
    resolutionSuccess,
    promotion,
    failure,
    demoted,
  ]);

  async function resolveTicket() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/tickets/${ticketId}/resolve`,
        {
          method: "POST",
        }
      );

      const responseText =
        await response.text();

      let data: ResolveResponse = {};

      if (responseText) {
        try {
          data =
            JSON.parse(responseText);
        } catch {
          setMessage(
            `Server returned an invalid response (${response.status}).`
          );

          return;
        }
      }

      if (!response.ok) {
        setMessage(
          data.error ??
            `Server error (${response.status})`
        );

        return;
      }

      /*
       * ============================
       * CORRECT RESOLUTION
       * ============================
       */
      if (data.correct === true) {
        const pendingPromotion =
          data.levelledUp &&
          data.level
            ? {
                level: data.level,
                careerUnlocked:
                  data.careerUnlocked ??
                  false,
              }
            : null;

        setResolutionSuccess({
          ticketNumber:
            data.ticketNumber ??
            `INC${ticketId
              .toString()
              .padStart(5, "0")}`,

          ticketTitle:
            data.ticketTitle ??
            "Ticket",

          reward:
            data.reward ?? 0,

          xp:
            data.xp ?? 0,

          successMessage:
            data.successMessage ??
            getRandomSuccessMessage(),

          promotion:
            pendingPromotion,
        });

        return;
      }

      /*
       * ============================
       * WRONG RESOLUTION +
       * BANKRUPTCY
       * ============================
       */
      if (
        data.bankrupt === true ||
        data.resetToServiceDesk === true
      ) {
        setDemoted(true);

        return;
      }

      /*
       * ============================
       * WRONG RESOLUTION
       * ============================
       */
      if (
        data.failed === true ||
        data.correct === false
      ) {
        setFailure({
          ticketNumber:
            data.ticketNumber ??
            `INC${ticketId
              .toString()
              .padStart(5, "0")}`,

          ticketTitle:
            data.ticketTitle ??
            "Ticket",

          penalty:
            data.penalty ?? 0,

          failureMessage:
            data.failureMessage ??
            "Your attempted resolution has made the situation worse.",
        });

        return;
      }
    } catch (error) {
      console.error(
        "Resolve request failed:",
        error
      );

      setMessage(
        "Unable to contact the server."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Successful resolution acknowledged.
   *
   * If the resolution also caused a
   * promotion, show that next.
   */
  function acknowledgeSuccess() {
    if (!resolutionSuccess) {
      return;
    }

    const pendingPromotion =
      resolutionSuccess.promotion;

    setResolutionSuccess(null);

    if (pendingPromotion) {
      setPromotion(
        pendingPromotion
      );

      return;
    }

    router.refresh();
  }

  function acknowledgeFailure() {
    setFailure(null);

    router.refresh();
  }

  function acknowledgeDemotion() {
    router.replace("/dashboard");
  }

  function continueAfterPromotion() {
    setPromotion(null);

    router.refresh();
  }

  function chooseCareer() {
    setPromotion(null);

    router.push(
      "/choose-career"
    );
  }


  const promotionTitle =
    promotion &&
    !promotion.careerUnlocked
      ? getRoleTitle(
          promotion.level,
          null
        )
      : null;

  return (
    <>
      <div>
        <button
          type="button"
          onClick={resolveTicket}
          disabled={loading}
          className="bg-white px-4 py-2 font-bold text-black hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading
            ? "Resolving..."
            : "Resolve"}
        </button>

        {message && (
          <p className="mt-2 text-sm text-red-400">
            {message}
          </p>
        )}
      </div>

      {/* ============================
          SUCCESSFUL RESOLUTION MODAL
          ============================ */}
      {resolutionSuccess && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 px-4">
          <div className="w-full max-w-md border border-green-900 bg-zinc-950 p-8 shadow-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-500">
              Ticket Resolved
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              {
                resolutionSuccess.ticketNumber
              }
            </h2>

            <p className="mt-1 text-lg font-bold text-zinc-300">
              {
                resolutionSuccess.ticketTitle
              }
            </p>

            <div className="mt-6 border border-green-900/70 bg-green-950/20 p-5">

              <p className="text-zinc-200">
                {
                  resolutionSuccess.successMessage
                }
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-green-900/60 pt-5">

                <div className="border border-zinc-800 bg-black p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    Credits
                  </p>

                  <p className="mt-2 text-2xl font-black text-green-400">
                    +
                    {
                      resolutionSuccess.reward
                    }{" "}
                    CR
                  </p>
                </div>

                <div className="border border-zinc-800 bg-black p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    Career XP
                  </p>

                  <p className="mt-2 text-2xl font-black text-green-400">
                    +
                    {
                      resolutionSuccess.xp
                    }{" "}
                    XP
                  </p>
                </div>

              </div>
            </div>

            <p className="mt-5 text-sm text-zinc-500">
              Ticket successfully closed.
            </p>

            <button
              type="button"
              onClick={
                acknowledgeSuccess
              }
              className="mt-6 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
            >
              OK
            </button>

          </div>
        </div>
      )}

      {/* ============================
          FAILED RESOLUTION MODAL
          ============================ */}
      {failure && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 px-4">
          <div className="w-full max-w-md border border-red-900 bg-zinc-950 p-8 shadow-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Resolution Failed
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              {failure.ticketNumber}
            </h2>

            <p className="mt-1 text-lg font-bold text-zinc-300">
              {failure.ticketTitle}
            </p>

            <div className="mt-6 border border-red-900/70 bg-red-950/20 p-5">

              <p className="text-zinc-200">
                {
                  failure.failureMessage
                }
              </p>

              <div className="mt-5 border-t border-red-900/60 pt-4">

                <p className="text-xs font-bold uppercase tracking-wide text-red-400">
                  Failed Resolution Penalty
                </p>

                <p className="mt-2 text-3xl font-black text-red-400">
                  -
                  {
                    failure.penalty
                  }{" "}
                  CR
                </p>

              </div>
            </div>

            <p className="mt-5 text-sm text-zinc-500">
              The ticket has been closed as a failed resolution.
            </p>

            <button
              type="button"
              onClick={
                acknowledgeFailure
              }
              className="mt-6 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
            >
              OK
            </button>

          </div>
        </div>
      )}

      {/* ============================
          BANKRUPTCY / DEMOTION MODAL
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
                    {STARTING_CREDITS}
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

      {/* ============================
          PROMOTION MODAL
          ============================ */}
      {promotion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">

          <div className="w-full max-w-md border border-zinc-700 bg-zinc-950 p-8 text-center shadow-2xl">

            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Promotion
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Congratulations on your promotion!
            </h2>

            {promotion.careerUnlocked ? (
              <>
                <p className="mt-5 text-xl text-zinc-300">
                  You have completed the Service Desk career track.
                </p>

                <p className="mt-3 text-2xl font-bold">
                  Specialist Career Available
                </p>

                <p className="mt-4 text-sm text-zinc-400">
                  Choose between Network, Systems, or Security.
                </p>

                <button
                  type="button"
                  onClick={
                    chooseCareer
                  }
                  className="mt-6 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
                >
                  Choose Career Path
                </button>
              </>
            ) : (
              <>
                <p className="mt-6 text-sm uppercase tracking-wide text-zinc-500">
                  Your new role
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {
                    promotionTitle
                  }
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Level{" "}
                  {
                    promotion.level
                  }
                </p>

                <button
                  type="button"
                  onClick={
                    continueAfterPromotion
                  }
                  className="mt-6 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
                >
                  Continue
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}