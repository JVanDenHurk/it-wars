"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type {
  CareerCounts,
  SpecialistCareer,
} from "@/lib/career-demand";

const careers = [
  {
    id: "NETWORK" as SpecialistCareer,
    title: "Network",
    role: "Junior Network Engineer",
    description:
      "Work with switching, routing, VLANs, wireless, firewalls, VPNs and network outages.",
  },
  {
    id: "SYSTEMS" as SpecialistCareer,
    title: "Systems",
    role: "Junior Systems Administrator",
    description:
      "Handle Active Directory, servers, virtual machines, backups, storage, Group Policy and infrastructure.",
  },
  {
    id: "SECURITY" as SpecialistCareer,
    title: "Security",
    role: "Junior Security Analyst",
    description:
      "Investigate phishing, suspicious logins, malware, endpoint alerts, credential theft and security incidents.",
  },
];

interface ChooseCareerFormProps {
  careerCounts: CareerCounts;
  inDemandCareer: SpecialistCareer;
  inDemandXpBonus: number;
}

export default function ChooseCareerForm({
  careerCounts,
  inDemandCareer,
  inDemandXpBonus,
}: ChooseCareerFormProps) {
  const router = useRouter();

  const [selected, setSelected] =
    useState<SpecialistCareer | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function chooseCareer() {
    if (!selected) {
      setError(
        "Choose a career path first."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/players/choose-career",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              careerPath: selected,
            }),
          }
        );

      const responseText =
        await response.text();

      let data: {
        success?: boolean;
        error?: string;
      } = {};

      if (responseText) {
        try {
          data = JSON.parse(
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
            "Unable to choose career."
        );
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(
        "Career selection failed:",
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
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {careers.map((career) => {
          const inDemand =
            career.id ===
            inDemandCareer;

          return (
            <button
              key={career.id}
              type="button"
              onClick={() =>
                setSelected(
                  career.id
                )
              }
              className={`relative border p-6 text-left transition ${
                selected === career.id
                  ? "border-white bg-zinc-900"
                  : inDemand
                    ? "border-yellow-700 bg-yellow-950/10 hover:border-yellow-500"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"
              }`}
            >
              {inDemand && (
                <span className="absolute right-4 top-4 border border-yellow-700 bg-yellow-950/40 px-2 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-yellow-400">
                  In Demand +{inDemandXpBonus} XP
                </span>
              )}

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                {career.title}
              </p>

              <h2 className="mt-3 pr-24 text-xl font-black">
                {career.role}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {career.description}
              </p>

              <p className="mt-4 text-xs text-zinc-600">
                Current specialists: {careerCounts[career.id]}
              </p>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-5 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={chooseCareer}
        disabled={
          !selected || loading
        }
        className="mt-8 w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200 disabled:opacity-40"
      >
        {loading
          ? "Starting Career..."
          : "Confirm Career Path"}
      </button>
    </div>
  );
}
