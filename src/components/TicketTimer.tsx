"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface TicketTimerProps {
  nextTicketAt: string | Date | null;
  queuePenaltyActive?: boolean;
}

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

  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const generationStarted = useRef(false);

  useEffect(() => {
    generationStarted.current = false;
  }, [nextTicketAt]);

  useEffect(() => {
    function updateTimer() {
      if (!nextTicketAt) {
        setSecondsRemaining(0);
        return;
      }

      const target = new Date(nextTicketAt).getTime();
      const now = Date.now();

      const seconds = Math.max(
        0,
        Math.ceil((target - now) / 1000)
      );

      setSecondsRemaining(seconds);
    }

    updateTimer();

    const interval = setInterval(
      updateTimer,
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [nextTicketAt]);

  useEffect(() => {
    if (
      secondsRemaining === null ||
      secondsRemaining > 0 ||
      generationStarted.current
    ) {
      return;
    }

    generationStarted.current = true;

    async function generateTicket() {
      setChecking(true);
      setError("");

      try {
        const response = await fetch(
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
              "Unable to generate ticket."
          );
          return;
        }

        router.refresh();
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
  }, [secondsRemaining, router]);

  if (secondsRemaining === null) {
    return (
      <p className="text-sm text-zinc-500">
        Checking queue...
      </p>
    );
  }

  if (
    secondsRemaining <= 0 ||
    checking
  ) {
    return (
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
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-zinc-500">
        Next Ticket
      </p>

      <p className="mt-1 text-2xl font-bold">
        {formatTime(secondsRemaining)}
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