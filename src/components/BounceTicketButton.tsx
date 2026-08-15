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

export default function BounceTicketButton({
  ticketId,
}: BounceTicketButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState<PlayerOption[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [result, setResult] = useState<
    "success" | "error" | null
  >(null);

  useEffect(() => {
    if (!open || players.length > 0) {
      return;
    }

    async function loadPlayers() {
      setLoadingPlayers(true);

      try {
        const response = await fetch("/api/players/available");

        const responseText = await response.text();

        let data: {
          error?: string;
          players?: PlayerOption[];
        } = {};

        if (responseText) {
          try {
            data = JSON.parse(responseText);
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
            data.error ?? "Unable to load players."
          );
          return;
        }

        setPlayers(data.players ?? []);
      } catch (error) {
        console.error("Unable to load players:", error);

        setResult("error");
        setMessage("Unable to load players.");
      } finally {
        setLoadingPlayers(false);
      }
    }

    loadPlayers();
  }, [open, players.length]);

  async function bounceTicket() {
    if (!selectedPlayer) {
      setResult("error");
      setMessage("Choose a player first.");
      return;
    }

    setSubmitting(true);
    setMessage("");
    setResult(null);

    try {
      const response = await fetch(
        `/api/tickets/${ticketId}/bounce`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetPlayerId: selectedPlayer,
          }),
        }
      );

      const responseText = await response.text();

      let data: {
        error?: string;
        correct?: boolean;
        reward?: number;
        xp?: number;
        penalty?: number;
        bankrupt?: boolean;
        target?: string;
      } = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
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
          data.error ?? `Server error (${response.status})`
        );
        return;
      }

      if (data.correct) {
        setResult("success");

        setMessage(
          `Correct bounce to ${data.target}! +${data.reward ?? 0} CR / +${data.xp ?? 0} XP`
        );

        setTimeout(() => {
          router.refresh();
        }, 1000);

        return;
      }

      setResult("error");

      if (data.bankrupt) {
        setMessage(
          `Wrong bounce! -${data.penalty ?? 0} CR — BANKRUPT`
        );
      } else {
        setMessage(
          `Wrong bounce! -${data.penalty ?? 0} CR`
        );
      }

      router.refresh();
    } catch (error) {
      console.error("Bounce request failed:", error);

      setResult("error");
      setMessage("Unable to contact the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="border border-zinc-700 px-4 py-2 font-bold hover:bg-zinc-900"
      >
        Bounce
      </button>

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

          {!loadingPlayers && players.length === 0 && !message && (
            <p className="mt-4 text-sm text-zinc-500">
              No other players are currently available.
            </p>
          )}

          <div className="mt-4 space-y-2">
            {players.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => setSelectedPlayer(player.id)}
                className={`w-full border p-3 text-left ${
                  selectedPlayer === player.id
                    ? "border-white bg-zinc-900"
                    : "border-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="flex justify-between gap-3">
                  <span className="font-bold">
                    {player.username}
                  </span>

                  <span className="text-xs text-zinc-500">
                    Queue: {player.queueSize}
                  </span>
                </div>

                <p className="mt-1 text-xs text-zinc-500">
                  {getRoleTitle(
                    player.level,
                    player.careerPath
                  )}
                </p>
              </button>
            ))}
          </div>

          {players.length > 0 && (
            <button
              type="button"
              onClick={bounceTicket}
              disabled={!selectedPlayer || submitting}
              className="mt-4 w-full bg-white px-4 py-2 font-bold text-black disabled:opacity-40"
            >
              {submitting ? "Bouncing..." : "Confirm Bounce"}
            </button>
          )}

          {message && (
            <p
              className={`mt-3 text-sm ${
                result === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}