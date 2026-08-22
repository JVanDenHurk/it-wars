"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { STARTING_CREDITS } from "@/lib/game-balance";

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

export default function TicketTimer({
  nextTicketAt,
  queuePenaltyActive: _queuePenaltyActive = false,
}: TicketTimerProps) {
  const router = useRouter();

  const [secondsRemaining, setSecondsRemaining] =
    useState<number | null>(null);

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
   * HIDDEN NEXT TICKET TIMER
   * ============================
   *
   * The timer still runs normally,
   * but nothing is shown to the player.
   *
   * Tickets should feel like they
   * arrive naturally rather than on
   * a visible countdown.
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
      window.setInterval(
        updateTimer,
        1000
      );

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [nextTicketAt]);

  /*
   * ============================
   * SAFE PAGE REFRESH
   * ============================
   *
   * A ticket may arrive while
   * another gameplay modal is open.
   *
   * Wait until the modal closes
   * before refreshing the page.
   */
  const refreshWhenSafe =
    useCallback(() => {
      const modalOpen =
        document.body.dataset
          .gameModalOpen ===
        "true";

      if (!modalOpen) {
        router.refresh();
        return;
      }

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
    }, [router]);

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
            console.error(
              `Ticket generation returned an invalid response (${response.status}).`
            );

            return;
          }
        }

        if (!response.ok) {
          console.error(
            data.error ??
              "Unable to generate ticket."
          );

          return;
        }

        /*
         * Ticket is already created
         * server-side.
         *
         * Refresh only when gameplay
         * popups are no longer open.
         */
        refreshWhenSafe();
      } catch (error) {
        console.error(
          "Automatic ticket generation failed:",
          error
        );
      }
    }

    generateTicket();
  }, [
    secondsRemaining,
    refreshWhenSafe,
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
      window.setInterval(
        checkAbandonedTickets,
        10000
      );

    return () => {
      window.clearInterval(
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
   */
  useEffect(() => {
    const modalOpen =
      abandonedTicket !== null ||
      demoted;

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

    router.replace(
      "/dashboard"
    );
  }

  /*
   * ============================
   * UI
   * ============================
   *
   * Deliberately no ticket timer,
   * countdown, "incoming" notice or
   * queue countdown is rendered.
   *
   * Tickets simply appear.
   */
  return (
    <>
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
                    {STARTING_CREDITS}
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