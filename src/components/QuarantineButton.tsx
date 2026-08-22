"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface QuarantineButtonProps {
  ticketId: number;
  playerLevel: number;
  playerCareerPath: string | null;
  careerAbilityReadyAt: string | null;
}

type QuarantineResponse = {
  error?: string;
  success?: boolean;
  ticketTitle?: string;
  message?: string;
  readyAt?: string;
};

export default function QuarantineButton({
  ticketId,
  playerLevel,
  playerCareerPath,
  careerAbilityReadyAt,
}: QuarantineButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nowMs, setNowMs] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<QuarantineResponse | null>(null);

  const unlocked =
    playerCareerPath === "SECURITY" &&
    playerLevel >= 6;

  const ready =
    !careerAbilityReadyAt ||
    (nowMs > 0 &&
      new Date(careerAbilityReadyAt).getTime() <= nowMs);

  useEffect(() => {
    const updateNow = () => setNowMs(Date.now());
    updateNow();
    const interval = window.setInterval(updateNow, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (success) {
      document.body.dataset.gameModalOpen = "true";
    } else {
      delete document.body.dataset.gameModalOpen;
    }

    return () => {
      delete document.body.dataset.gameModalOpen;
    };
  }, [success]);

  if (!unlocked) {
    return null;
  }

  async function quarantine() {
    if (!ready || loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/career/security/quarantine",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketId }),
        }
      );

      const text = await response.text();
      let data: QuarantineResponse = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          setError(`Server returned an invalid response (${response.status}).`);
          return;
        }
      }

      if (!response.ok) {
        setError(data.error ?? "Unable to quarantine Poison Ticket.");
        return;
      }

      setSuccess(data);
    } catch (requestError) {
      console.error("Quarantine request failed:", requestError);
      setError("Unable to contact the server.");
    } finally {
      setLoading(false);
    }
  }

  function acknowledge() {
    setSuccess(null);
    router.refresh();
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={quarantine}
          disabled={!ready || loading}
          className="border border-cyan-800 bg-cyan-950/20 px-4 py-2 font-bold text-cyan-300 hover:bg-cyan-950/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading
            ? "Quarantining..."
            : ready
              ? "Quarantine"
              : "Quarantine — Cooldown"}
        </button>

        {error && (
          <p className="mt-2 max-w-xs text-sm text-red-400">
            {error}
          </p>
        )}
      </div>

      {success && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 px-4">
          <div className="w-full max-w-md border border-cyan-900 bg-zinc-950 p-8 shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-500">
              Security Ability
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              QUARANTINED
            </h2>

            <p className="mt-4 font-bold text-zinc-200">
              {success.ticketTitle ?? "Poison Ticket"}
            </p>

            <p className="mt-3 text-zinc-400">
              {success.message ??
                "Poison Ticket removed from your queue with no Credits or Career XP awarded."}
            </p>

            <p className="mt-4 text-xs text-zinc-500">
              Quarantine is now on a 15 minute cooldown.
            </p>

            <button
              type="button"
              onClick={acknowledge}
              className="mt-6 w-full bg-cyan-500 px-5 py-3 font-black text-black hover:bg-cyan-400"
            >
              Return to Queue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
