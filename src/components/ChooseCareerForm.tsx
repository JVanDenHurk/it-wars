"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CareerPath =
  | "NETWORK"
  | "SYSTEMS"
  | "SECURITY";

const careers = [
  {
    id: "NETWORK" as CareerPath,
    title: "Network",
    role:
      "Junior Network Engineer",
    description:
      "Work with switching, routing, VLANs, wireless, firewalls, VPNs and network outages.",
  },

  {
    id: "SYSTEMS" as CareerPath,
    title: "Systems",
    role:
      "Junior Systems Administrator",
    description:
      "Handle Active Directory, servers, virtual machines, backups, storage, Group Policy and infrastructure.",
  },

  {
    id: "SECURITY" as CareerPath,
    title: "Security",
    role:
      "Junior Security Analyst",
    description:
      "Investigate phishing, suspicious logins, malware, endpoint alerts, credential theft and security incidents.",
  },
];

export default function ChooseCareerForm() {
  const router =
    useRouter();

  const [
    selected,
    setSelected,
  ] =
    useState<CareerPath | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
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
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                careerPath:
                  selected,
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
            "Unable to choose career."
        );

        return;
      }

      window.location.href =
        "/dashboard";
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
        {careers.map(
          (career) => (
            <button
              key={
                career.id
              }
              type="button"
              onClick={() =>
                setSelected(
                  career.id
                )
              }
              className={`border p-6 text-left transition ${
                selected ===
                career.id
                  ? "border-white bg-zinc-900"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                {
                  career.title
                }
              </p>

              <h2 className="mt-3 text-xl font-black">
                {
                  career.role
                }
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {
                  career.description
                }
              </p>
            </button>
          )
        )}
      </div>

      {error && (
        <p className="mt-5 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={
          chooseCareer
        }
        disabled={
          !selected ||
          loading
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