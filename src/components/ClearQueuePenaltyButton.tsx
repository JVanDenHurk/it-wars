"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClearQueuePenaltyButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function clearPenalty() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/players/clear-queue-penalty",
        {
          method: "POST",
        }
      );

      const responseText = await response.text();

      let data: {
        error?: string;
        success?: boolean;
        cost?: number;
        credits?: number;
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

  return (
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
  );
}