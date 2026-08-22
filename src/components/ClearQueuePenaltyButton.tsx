"use client";

import { useRouter } from "next/navigation";

import { STARTING_CREDITS } from "@/lib/game-balance";
import { useState } from "react";

export default function ClearQueuePenaltyButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demoted, setDemoted] = useState(false);

  async function clearPenalty() {
    if (loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/players/clear-queue-penalty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await response.text();

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
          data = JSON.parse(responseText);
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
            "Unable to restore queue priority."
        );
        return;
      }

      /*
       * IMPORTANT:
       * Don't refresh when bankruptcy happens.
       *
       * Keep this component mounted so the
       * demotion modal remains visible.
       */
      if (
        data.bankrupt === true ||
        data.resetToServiceDesk === true
      ) {
        setDemoted(true);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Clear queue penalty failed:",
        error
      );

      setError(
        "Unable to contact the server."
      );
    } finally {
      setLoading(false);
    }
  }

  function acknowledgeDemotion() {
    /*
     * Full navigation guarantees the player
     * returns to a freshly rendered dashboard
     * with their new Level 1 state.
     */
    router.replace("/dashboard");
  }

  return (
    <>
      <div className="mt-5">
        <button
          type="button"
          onClick={clearPenalty}
          disabled={loading}
          className="border border-yellow-700 px-5 py-3 font-bold text-yellow-300 hover:bg-yellow-950/30 disabled:opacity-50"
        >
          {loading
            ? "Restoring Priority..."
            : "Pay 100 CR to Restore Queue Priority"}
        </button>

        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>

      {/* Bankruptcy / Demotion Modal */}
      {demoted && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4">
          <div className="w-full max-w-md border border-red-700 bg-zinc-950 p-8 shadow-2xl">

            <div className="text-center">
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
                Management has decided that your
                specialist career is no longer
                working out.
              </p>
            </div>

            <div className="mt-6 border border-red-900 bg-red-950/20 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-red-400">
                Career Reset
              </p>

              <p className="mt-3 text-xl font-black text-white">
                Service Desk Analyst
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="border border-zinc-800 bg-black p-3 text-center">
                  <p className="text-xs text-zinc-500">
                    Level
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    1
                  </p>
                </div>

                <div className="border border-zinc-800 bg-black p-3 text-center">
                  <p className="text-xs text-zinc-500">
                    XP
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    0
                  </p>
                </div>

                <div className="border border-zinc-800 bg-black p-3 text-center">
                  <p className="text-xs text-zinc-500">
                    Credits
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {STARTING_CREDITS}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-zinc-500">
              Your lifetime statistics and
              bankruptcy record have been retained.
            </p>

            <button
              type="button"
              onClick={acknowledgeDemotion}
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