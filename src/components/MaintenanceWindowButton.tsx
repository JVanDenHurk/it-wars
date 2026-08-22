"use client";

import { useRouter } from "next/navigation";
import {
    useEffect,
    useMemo,
    useState,
} from "react";

interface MaintenanceWindowButtonProps {
  playerLevel: number;
  playerCareerPath: string | null;
  careerAbilityReadyAt: string | null;

  tickets: {
    id: number;
    title: string;
    severity: "P1" | "P2" | "P3" | "P4";
    maintenanceUntil: string | null;
  }[];
}

type MaintenanceResponse = {
  error?: string;
  success?: boolean;

  outcome?:
    "MAINTENANCE_WINDOW";

  ability?: string;

  ticketsProtected?: number;

  ticketIds?: number[];

  maintenanceMinutes?: number;

  maintenanceUntil?: string;

  readyAt?: string;

  cooldownMinutes?: number;

  message?: string;
};

export default function MaintenanceWindowButton({
  playerLevel,
  playerCareerPath,
  careerAbilityReadyAt,
  tickets,
}: MaintenanceWindowButtonProps) {
  const router =
    useRouter();

  const [open, setOpen] =
    useState(false);

  const [
    selectedTicketIds,
    setSelectedTicketIds,
  ] =
    useState<number[]>([]);

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [nowMs, setNowMs] =
    useState(0);

  const [result, setResult] =
    useState<
      "success" | "error" | null
    >(null);

  const [
    successModal,
    setSuccessModal,
  ] =
    useState<MaintenanceResponse | null>(
      null
    );

  const unlocked =
    playerCareerPath ===
      "SYSTEMS" &&
    playerLevel >=
      6;

  const ready =
    !careerAbilityReadyAt ||
    (nowMs > 0 &&
      new Date(
        careerAbilityReadyAt
      ).getTime() <=
        nowMs);

  const availableTickets =
    useMemo(() => {
      return tickets.filter(
        (ticket) =>
          !ticket
            .maintenanceUntil ||
          new Date(
            ticket
              .maintenanceUntil
          ).getTime() <=
            nowMs
      );
    }, [tickets, nowMs]);


  useEffect(() => {
    const updateNow = () =>
      setNowMs(Date.now());

    updateNow();

    const interval = window.setInterval(
      updateNow,
      1000
    );

    return () =>
      window.clearInterval(interval);
  }, []);

  /*
   * ============================
   * GLOBAL MODAL FLAG
   * ============================
   */
  useEffect(() => {
    const modalOpen =
      open ||
      successModal !==
        null;

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
    open,
    successModal,
  ]);

  function toggleTicket(
    ticketId: number
  ) {
    setSelectedTicketIds(
      (current) => {
        if (
          current.includes(
            ticketId
          )
        ) {
          return current.filter(
            (id) =>
              id !==
              ticketId
          );
        }

        if (
          current.length >=
          2
        ) {
          return current;
        }

        return [
          ...current,
          ticketId,
        ];
      }
    );
  }

  function openPicker() {
    setOpen(true);
    setMessage("");
    setResult(null);
    setSelectedTicketIds([]);
  }

  function closePicker() {
    if (submitting) {
      return;
    }

    setOpen(false);
    setMessage("");
    setResult(null);
    setSelectedTicketIds([]);
  }

  async function activateMaintenanceWindow() {
    if (
      selectedTicketIds.length <
      1
    ) {
      setResult(
        "error"
      );

      setMessage(
        "Choose at least one ticket."
      );

      return;
    }

    if (
      selectedTicketIds.length >
      2
    ) {
      setResult(
        "error"
      );

      setMessage(
        "You can protect a maximum of 2 tickets."
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
          "/api/career/systems/maintenance-window",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                ticketIds:
                  selectedTicketIds,
              }),
          }
        );

      const responseText =
        await response.text();

      let data: MaintenanceResponse =
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
            "Unable to activate Maintenance Window."
        );

        return;
      }

      setOpen(false);

      setSuccessModal(
        data
      );

      setSelectedTicketIds([]);
    } catch (error) {
      console.error(
        "Maintenance Window request failed:",
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

  function acknowledgeSuccess() {
    setSuccessModal(
      null
    );

    router.refresh();
  }

  if (!unlocked) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={
          openPicker
        }
        disabled={
          !ready ||
          availableTickets.length ===
            0
        }
        className="border border-blue-700 bg-blue-950/20 px-4 py-2 text-sm font-bold text-blue-300 hover:bg-blue-950/40 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {!ready
          ? "Maintenance Window — Cooldown"
          : "Maintenance Window"}
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 px-4">

          <div className="w-full max-w-lg border border-blue-800 bg-zinc-950 p-7 shadow-2xl">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">
              Systems Ability
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              Maintenance Window
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              Choose up to 2 tickets. Their SLA ageing and ticket value decay will be frozen for 5 minutes.
            </p>

            <div className="mt-6 space-y-2">

              {availableTickets.length ===
              0 ? (
                <div className="border border-zinc-800 bg-black p-4 text-sm text-zinc-500">
                  No tickets are currently available for Maintenance Window.
                </div>
              ) : (
                availableTickets.map(
                  (ticket) => {
                    const selected =
                      selectedTicketIds.includes(
                        ticket.id
                      );

                    return (
                      <button
                        key={
                          ticket.id
                        }
                        type="button"
                        onClick={() =>
                          toggleTicket(
                            ticket.id
                          )
                        }
                        className={`w-full border p-4 text-left ${
                          selected
                            ? "border-blue-500 bg-blue-950/30"
                            : "border-zinc-800 bg-black hover:border-zinc-600"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <p className="text-xs text-zinc-500">
                              INC
                              {ticket.id
                                .toString()
                                .padStart(
                                  5,
                                  "0"
                                )}
                            </p>

                            <p className="mt-1 font-bold text-white">
                              {
                                ticket.title
                              }
                            </p>

                          </div>

                          <div className="shrink-0 text-right">

                            <p className="text-xs font-bold text-zinc-400">
                              {
                                ticket.severity
                              }
                            </p>

                            {selected && (
                              <p className="mt-1 text-xs font-bold text-blue-400">
                                SELECTED
                              </p>
                            )}

                          </div>

                        </div>
                      </button>
                    );
                  }
                )
              )}

            </div>

            <p className="mt-4 text-sm text-zinc-500">
              Selected:{" "}
              {
                selectedTicketIds.length
              }
              /2
            </p>

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

            <button
              type="button"
              onClick={
                activateMaintenanceWindow
              }
              disabled={
                submitting ||
                selectedTicketIds.length <
                  1
              }
              className="mt-6 w-full bg-blue-500 px-5 py-3 font-black text-black hover:bg-blue-400 disabled:opacity-40"
            >
              {submitting
                ? "Opening Maintenance Window..."
                : "Activate Maintenance Window"}
            </button>

            <button
              type="button"
              onClick={
                closePicker
              }
              disabled={
                submitting
              }
              className="mt-3 w-full border border-zinc-700 px-5 py-3 font-bold text-zinc-300 hover:bg-zinc-900 disabled:opacity-40"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {successModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4">

          <div className="w-full max-w-md border border-blue-800 bg-zinc-950 p-8 text-center shadow-2xl">

            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-500">
              Systems Ability
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              MAINTENANCE WINDOW ACTIVE
            </h2>

            <p className="mt-5 text-zinc-300">
              {successModal.message ??
                "Maintenance Window activated."}
            </p>

            <div className="mt-6 border border-blue-900 bg-blue-950/20 p-5">

              <p className="text-xs font-bold uppercase tracking-wide text-blue-400">
                Protected Tickets
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {
                  successModal
                    .ticketsProtected ??
                  selectedTicketIds.length
                }
              </p>

              <p className="mt-3 text-sm text-zinc-400">
                SLA and Credit decay frozen for 5 minutes.
              </p>

            </div>

            <p className="mt-5 text-sm text-zinc-500">
              Maintenance Window is now on a 15 minute cooldown.
            </p>

            <button
              type="button"
              onClick={
                acknowledgeSuccess
              }
              className="mt-6 w-full bg-blue-500 px-5 py-3 font-black text-black hover:bg-blue-400"
            >
              OK
            </button>

          </div>

        </div>
      )}
    </>
  );
}