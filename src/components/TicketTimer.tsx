"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface TicketTimerProps {
  nextTicketAt: string | Date | null;
  queuePenaltyActive?: boolean;
}

type AbandonedTicket = {
  ticketNumber: string;
  ticketTitle: string;
  severity: "P1" | "P2" | "P3" | "P4";
  penalty: number;
  failureMessage: string;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function TicketTimer({
  nextTicketAt,
  queuePenaltyActive = false,
}: TicketTimerProps) {
  const router = useRouter();

  const [secondsRemaining, setSecondsRemaining] =
    useState<number | null>(null);

  const [checking, setChecking] =
    useState(false);

  const [error, setError] =
    useState("");

  const [abandonedTicket, setAbandonedTicket] =
    useState<AbandonedTicket | null>(null);

  const [demoted, setDemoted] =
    useState(false);

  const generationStarted =
    useRef(false);

  const abandonmentCheckRunning =
    useRef(false);

  /*
   * ============================
   * RESET GENERATION LOCK
   * ============================
   */
  useEffect(() => {
    generationStarted.current = false;
  }, [nextTicketAt]);

  /*
   * ============================
   * NEXT TICKET COUNTDOWN
   * ============================
   */
  useEffect(() => {
    function updateTimer() {
      if (!nextTicketAt) {
        setSecondsRemaining(0);
        return;
      }

      const target =
        new Date(
          nextTicketAt
        ).getTime();

      const now =
        Date.now();

      const seconds =
        Math.max(
          0,
          Math.ceil(
            (target - now) /
              1000
          )
        );

      setSecondsRemaining(
        seconds
      );
    }

    updateTimer();

    const interval =
      setInterval(
        updateTimer,
        1000
      );

    return () => {
      clearInterval(
        interval
      );
    };
  }, [nextTicketAt]);

  /*
   * ============================
   * SAFE PAGE REFRESH
   * ============================
   *
   * A new ticket may arrive while
   * the player is reading:
   *
   * - successful resolution popup
   * - failure popup
   * - promotion popup
   * - bankruptcy popup
   *
   * Do not refresh until those
   * popups have been closed.
   */
  function refreshWhenSafe() {
    const modalOpen =
      document.body.dataset
        .gameModalOpen ===
      "true";

    /*
     * Nothing open.
     * Refresh immediately.
     */
    if (!modalOpen) {
      router.refresh();
      return;
    }

    /*
     * A modal is open.
     *
     * Wait until it closes.
     */
    const refreshInterval =
      window.setInterval(
        () => {
          const stillOpen =
            document.body.dataset
              .gameModalOpen ===
            "true";

          if (!stillOpen) {
            window.clearInterval(
              refreshInterval
            );

            router.refresh();
          }
        },
        250
      );
  }

  /*
   * ============================
   * AUTOMATIC TICKET GENERATION
   * ============================
   */
  useEffect(() => {
    if (
      secondsRemaining === null ||
      secondsRemaining > 0 ||
      generationStarted.current
    ) {
      return;
    }

    generationStarted.current =
      true;

    async function generateTicket() {
      setChecking(true);
      setError("");

      try {
        const response =
          await fetch(
            "/api/tickets/generate",
            {
              method: "POST",
            }
          );

        const responseText =
          await response.text();

        let data: {
          error?: string;
          success?: boolean;
          generated?: boolean;
          nextTicketAt?: string;
        } = {};

        if (responseText) {
          try {
            data =
              JSON.parse(
                responseText
              );
          } catch {
            setError(
              `Server returned an invalid response (${response.status}).`
            );

            return;
          }
        }

        if (!response.ok) {
          setError(
            data.error ??
              "Unable to generate ticket."
          );

          return;
        }

        /*
         * Ticket has already been
         * created in the database.
         *
         * Only delay refreshing
         * the page if a modal is open.
         */
        refreshWhenSafe();
      } catch (error) {
        console.error(
          "Automatic ticket generation failed:",
          error
        );

        setError(
          "Unable to contact the server."
        );
      } finally {
        setChecking(false);
      }
    }

    generateTicket();
  }, [
    secondsRemaining,
    router,
  ]);

  /*
   * ============================
   * ABANDONED TICKET CHECKER
   * ============================
   */
  useEffect(() => {
    async function checkAbandonedTickets() {
      if (
        abandonmentCheckRunning.current ||
        abandonedTicket ||
        demoted
      ) {
        return;
      }

      abandonmentCheckRunning.current =
        true;

      try {
        const response =
          await fetch(
            "/api/tickets/check-abandoned",
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
          abandoned?: boolean;

          ticketNumber?: string;
          ticketTitle?: string;

          severity?:
            | "P1"
            | "P2"
            | "P3"
            | "P4";

          penalty?: number;

          failureMessage?: string;

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
            console.error(
              "Invalid abandoned ticket response."
            );

            return;
          }
        }

        if (!response.ok) {
          console.error(
            data.error ??
              "Unable to check abandoned tickets."
          );

          return;
        }

        if (!data.abandoned) {
          return;
        }

        /*
         * Bankruptcy takes priority.
         */
        if (
          data.bankrupt === true ||
          data.resetToServiceDesk ===
            true
        ) {
          setDemoted(true);
          return;
        }

        setAbandonedTicket({
          ticketNumber:
            data.ticketNumber ??
            "Unknown Ticket",

          ticketTitle:
            data.ticketTitle ??
            "Ticket",

          severity:
            data.severity ??
            "P4",

          penalty:
            data.penalty ??
            0,

          failureMessage:
            data.failureMessage ??
            "You left this ticket sitting in your queue for too long.",
        });
      } catch (error) {
        console.error(
          "Abandoned ticket check failed:",
          error
        );
      } finally {
        abandonmentCheckRunning.current =
          false;
      }
    }

    /*
     * Check immediately.
     */
    checkAbandonedTickets();

    /*
     * Then every 10 seconds.
     */
    const interval =
      setInterval(
        checkAbandonedTickets,
        10000
      );

    return () => {
      clearInterval(
        interval
      );
    };
  }, [
    abandonedTicket,
    demoted,
  ]);

  /*
   * ============================
   * ABANDONMENT MODAL STATE
   * ============================
   *
   * TicketTimer has its own modals,
   * so it also needs to tell the
   * refresh system when they are open.
   */
  useEffect(() => {
    const modalOpen =
      abandonedTicket !== null ||
      demoted;

    /*
     * Only set the global flag if
     * this component has one of its
     * own modals open.
     *
     * Don't delete another component's
     * active flag here.
     */
    if (modalOpen) {
      document.body.dataset
        .gameModalOpen =
        "true";
    }
  }, [
    abandonedTicket,
    demoted,
  ]);

  /*
   * Player acknowledges abandoned ticket.
   */
  function acknowledgeAbandonedTicket() {
    setAbandonedTicket(
      null
    );

    delete document.body.dataset
      .gameModalOpen;

    router.refresh();
  }

  /*
   * Player acknowledges bankruptcy.
   */
  function acknowledgeDemotion() {
    delete document.body.dataset
      .gameModalOpen;

    window.location.href =
      "/dashboard";
  }

  /*
   * ============================
   * TIMER UI
   * ============================
   */

  let timerContent;

  if (
    secondsRemaining === null
  ) {
    timerContent = (
      <p className="text-sm text-zinc-500">
        Checking queue...
      </p>
    );
  } else if (
    secondsRemaining <= 0 ||
    checking
  ) {
    timerContent = (
      <div>
        <p className="text-sm font-bold text-green-400">
          Ticket incoming...
        </p>

        {queuePenaltyActive && (
          <p className="mt-1 text-xs text-yellow-400">
            Queue priority reduced
          </p>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  } else {
    timerContent = (
      <div>
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Next Ticket
        </p>

        <p className="mt-1 text-2xl font-bold">
          {formatTime(
            secondsRemaining
          )}
        </p>

        {queuePenaltyActive && (
          <p className="mt-1 text-xs text-yellow-400">
            Queue priority reduced
          </p>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      {timerContent}

      {/* ============================
          ABANDONED TICKET MODAL
          ============================ */}
      {abandonedTicket && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 px-4">

          <div className="w-full max-w-md border border-red-800 bg-zinc-950 p-8 shadow-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              SLA Breach
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              TICKET ABANDONED
            </h2>

            <div className="mt-5 border border-zinc-800 bg-black p-4">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xs text-zinc-500">
                    {
                      abandonedTicket
                        .ticketNumber
                    }
                  </p>

                  <p className="mt-1 font-bold text-white">
                    {
                      abandonedTicket
                        .ticketTitle
                    }
                  </p>
                </div>

                <div className="border border-red-900 px-3 py-1 text-sm font-bold text-red-400">
                  {
                    abandonedTicket
                      .severity
                  }
                </div>

              </div>

            </div>

            <p className="mt-5 text-zinc-300">
              {
                abandonedTicket
                  .failureMessage
              }
            </p>

            <div className="mt-6 border border-red-900/70 bg-red-950/20 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-red-400">
                Abandonment Penalty
              </p>

              <p className="mt-2 text-3xl font-black text-red-400">
                -
                {
                  abandonedTicket
                    .penalty
                }{" "}
                CR
              </p>

              <p className="mt-3 text-sm text-zinc-400">
                The ticket has been closed as abandoned.
              </p>

            </div>

            <button
              type="button"
              onClick={
                acknowledgeAbandonedTicket
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
              An abandoned ticket penalty reduced your Credits to 0.
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