"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
  bankrupt?: boolean;
  error?: string;

  level?: number;
  levelledUp?: boolean;
  careerUnlocked?: boolean;
};

function getPromotionBonus(level: number) {
  if (level === 2) {
    return "+5% credits from correct resolutions";
  }

  if (level === 3) {
    return "+10% credits from correct resolutions";
  }

  if (level === 4) {
    return "Specialist career path unlocked";
  }

  if (level === 5) {
    return "+20% specialist ticket rewards";
  }

  if (level >= 6) {
    return "+25% specialist ticket rewards";
  }

  return null;
}

export default function ResolveTicketButton({
  ticketId,
}: ResolveTicketButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<
    "success" | "error" | null
  >(null);

  const [promotion, setPromotion] = useState<{
    level: number;
    careerUnlocked: boolean;
  } | null>(null);

  async function resolveTicket() {
    setLoading(true);
    setMessage("");
    setResult(null);

    try {
      const response = await fetch(
        `/api/tickets/${ticketId}/resolve`,
        {
          method: "POST",
        }
      );

      const responseText = await response.text();

      let data: ResolveResponse = {};

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

      if (data.correct === true) {
        setResult("success");

        setMessage(
          `Resolved correctly! +${data.reward ?? 0} CR / +${data.xp ?? 0} XP`
        );

        if (data.levelledUp && data.level) {
          setPromotion({
            level: data.level,
            careerUnlocked:
              data.careerUnlocked ?? false,
          });

          return;
        }

        setTimeout(() => {
          router.refresh();
        }, 1000);

        return;
      }

      setResult("error");

      const penalty = data.penalty ?? 0;

      if (data.bankrupt) {
        setMessage(
          `Wrong resolution! -${penalty} CR — BANKRUPT`
        );
      } else {
        setMessage(
          `Wrong resolution! -${penalty} CR`
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Resolve request failed:",
        error
      );

      setResult("error");
      setMessage(
        "Unable to contact the server."
      );
    } finally {
      setLoading(false);
    }
  }

  function continueAfterPromotion() {
    setPromotion(null);
    router.refresh();
  }

  function chooseCareer() {
    setPromotion(null);
    router.push("/choose-career");
  }

  const promotionBonus = promotion
    ? getPromotionBonus(promotion.level)
    : null;

  const promotionTitle =
    promotion && !promotion.careerUnlocked
      ? getRoleTitle(
          promotion.level,
          null
        )
      : null;

  return (
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
        <p
          className={`mt-2 text-sm ${
            result === "success"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

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
                  You have completed the
                  Service Desk career track.
                </p>

                <p className="mt-3 text-2xl font-bold">
                  Specialist Career Available
                </p>

                {promotionBonus && (
                  <div className="mt-5 border border-zinc-800 bg-black p-4">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      New Benefit
                    </p>

                    <p className="mt-2 font-bold text-yellow-400">
                      {promotionBonus}
                    </p>
                  </div>
                )}

                <p className="mt-4 text-sm text-zinc-400">
                  Choose between Network,
                  Systems, or Security.
                </p>

                <button
                  type="button"
                  onClick={chooseCareer}
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
                  {promotionTitle}
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Level {promotion.level}
                </p>

                {promotionBonus && (
                  <div className="mt-5 border border-zinc-800 bg-black p-4">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Promotion Bonus
                    </p>

                    <p className="mt-2 font-bold text-green-400">
                      {promotionBonus}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={continueAfterPromotion}
                  className="mt-6 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
                >
                  Continue
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}