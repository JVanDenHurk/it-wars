"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type {
    PvPAttackType,
} from "@/lib/pvp-attacks";

interface TargetOption {
  id: number;
  username: string;
  level: number;
  careerPath: string | null;
  credits: number;
  queueSize: number;
}

interface PvPAttackButtonProps {
  attackType: PvPAttackType;
  attackName: string;
  attackCost: number;
  playerCredits: number;
  targets: TargetOption[];
}

type AttackResponse = {
  success?: boolean;

  attackId?: number;
  attackType?: string;
  attackName?: string;

  target?: string;

  cost?: number;

  ticketsCreated?: number;

  message?: string;

  error?: string;
};

export default function PvPAttackButton({
  attackType,
  attackName,
  attackCost,
  playerCredits,
  targets,
}: PvPAttackButtonProps) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [
    selectedTarget,
    setSelectedTarget,
  ] = useState<number | null>(
    null
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState<{
      target: string;
      attackName: string;
      cost: number;
      ticketsCreated: number;
      message: string;
    } | null>(null);

  const affordable =
    playerCredits >=
    attackCost;

  function toggleOpen() {
    if (!affordable) {
      return;
    }

    setOpen(
      (current) =>
        !current
    );

    setError("");
    setSelectedTarget(
      null
    );
  }

  async function launchAttack() {
    if (!selectedTarget) {
      setError(
        "Choose a target first."
      );

      return;
    }

    setLoading(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/pvp/attack",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                attackType,

                targetPlayerId:
                  selectedTarget,
              }),
          }
        );

      const responseText =
        await response.text();

      let data: AttackResponse =
        {};

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
            `Server error (${response.status})`
        );

        return;
      }

      setOpen(false);

      setSuccess({
        target:
          data.target ??
          "Unknown Player",

        attackName:
          data.attackName ??
          attackName,

        cost:
          data.cost ??
          attackCost,

        ticketsCreated:
          data.ticketsCreated ??
          0,

        message:
          data.message ??
          `${attackName} launched successfully.`,
      });

      setSelectedTarget(
        null
      );
    } catch (error) {
      console.error(
        "PvP attack request failed:",
        error
      );

      setError(
        "Unable to contact the server."
      );
    } finally {
      setLoading(false);
    }
  }

  function acknowledgeSuccess() {
    setSuccess(null);

    router.refresh();
  }

  return (
    <>
      {/* ============================
          ATTACK BUTTON
          ============================ */}
      <button
        type="button"
        onClick={toggleOpen}
        disabled={
          !affordable ||
          targets.length === 0 ||
          loading
        }
        className="mt-5 w-full bg-red-600 px-5 py-3 font-black text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
      >
        {!affordable
          ? "Not Enough Credits"
          : targets.length === 0
            ? "No Online Targets"
            : "Launch Attack"}
      </button>

      {/* ============================
          TARGET PICKER
          ============================ */}
      {open && (
        <div className="mt-4 border border-red-900 bg-black p-4">

          <p className="text-xs font-bold uppercase tracking-wide text-red-500">
            Choose Target
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            This attack costs{" "}
            <span className="font-bold text-white">
              {attackCost} CR
            </span>
            .
          </p>

          <div className="mt-4 space-y-2">

            {targets.map(
              (target) => (
                <button
                  key={
                    target.id
                  }
                  type="button"
                  onClick={() =>
                    setSelectedTarget(
                      target.id
                    )
                  }
                  className={`w-full border p-4 text-left ${
                    selectedTarget ===
                    target.id
                      ? "border-red-500 bg-red-950/20"
                      : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-2">

                        <span className="h-2 w-2 rounded-full bg-green-400" />

                        <p className="font-bold text-white">
                          {
                            target.username
                          }
                        </p>

                      </div>

                      <p className="mt-1 text-xs text-zinc-500">
                        Level{" "}
                        {
                          target.level
                        }
                        {target.careerPath
                          ? ` · ${target.careerPath}`
                          : ""}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-xs uppercase tracking-wide text-zinc-600">
                        Queue
                      </p>

                      <p
                        className={`font-bold ${
                          target.queueSize >= 8
                            ? "text-red-400"
                            : target.queueSize >= 4
                              ? "text-yellow-400"
                              : "text-zinc-300"
                        }`}
                      >
                        {
                          target.queueSize
                        }
                      </p>

                    </div>

                  </div>

                  <div className="mt-3 border-t border-zinc-900 pt-3">

                    <p className="text-xs uppercase tracking-wide text-zinc-600">
                      Credits
                    </p>

                    <p
                      className={`mt-1 font-bold ${
                        target.credits <= 300
                          ? "text-red-400"
                          : "text-zinc-300"
                      }`}
                    >
                      {
                        target.credits
                      }{" "}
                      CR
                    </p>

                  </div>

                </button>
              )
            )}

          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="mt-4 flex gap-3">

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSelectedTarget(
                  null
                );
                setError("");
              }}
              disabled={loading}
              className="flex-1 border border-zinc-700 px-4 py-3 font-bold text-zinc-300 hover:bg-zinc-900 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={
                launchAttack
              }
              disabled={
                !selectedTarget ||
                loading
              }
              className="flex-1 bg-red-600 px-4 py-3 font-black text-white hover:bg-red-500 disabled:opacity-40"
            >
              {loading
                ? "Launching..."
                : `Spend ${attackCost} CR`}
            </button>

          </div>

        </div>
      )}

      {/* ============================
          SUCCESS MODAL
          ============================ */}
      {success && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4">

          <div className="w-full max-w-md border border-red-800 bg-zinc-950 p-8 shadow-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Attack Launched
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
              {
                success.attackName
              }
            </h2>

            <p className="mt-3 text-zinc-300">
              Target:{" "}
              <span className="font-bold text-white">
                {
                  success.target
                }
              </span>
            </p>

            <div className="mt-6 border border-red-900/70 bg-red-950/20 p-5">

              <p className="text-zinc-200">
                {
                  success.message
                }
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-red-900/60 pt-5">

                <div className="border border-zinc-800 bg-black p-4 text-center">

                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    Cost
                  </p>

                  <p className="mt-2 text-2xl font-black text-red-400">
                    -
                    {
                      success.cost
                    }{" "}
                    CR
                  </p>

                </div>

                <div className="border border-zinc-800 bg-black p-4 text-center">

                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    Tickets Sent
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    {
                      success.ticketsCreated
                    }
                  </p>

                </div>

              </div>

            </div>

            <p className="mt-5 text-sm text-zinc-500">
              Their queue is now somebody else&apos;s problem.
            </p>

            <button
              type="button"
              onClick={
                acknowledgeSuccess
              }
              className="mt-6 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
            >
              Excellent
            </button>

          </div>

        </div>
      )}
    </>
  );
}