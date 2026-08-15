"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const roles = [
  {
    value: "SERVICE_DESK",
    title: "Service Desk Analyst",
    description:
      "Generalist. Handles account issues, endpoint problems, M365, and common user requests.",
  },
  {
    value: "NETWORK_ENGINEER",
    title: "Network Engineer",
    description:
      "Specialist in switches, routing, connectivity, VLANs, and network faults.",
  },
  {
    value: "SYSTEMS_ENGINEER",
    title: "Systems Engineer",
    description:
      "Specialist in servers, Active Directory, DNS, virtualisation, and infrastructure.",
  },
  {
    value: "SECURITY_ANALYST",
    title: "Security Analyst",
    description:
      "Specialist in phishing, suspicious logins, malware, and security incidents.",
  },
];

export default function ChooseRolePage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function chooseRole() {
    if (!selectedRole) {
      setError("Choose a role first.");
      return;
    }

    setLoading(true);
    setError("");

    const response = await fetch("/api/player/choose-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerClass: selectedRole,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Unable to choose role.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black">Choose Your Role</h1>

        <p className="mt-2 text-zinc-400">
          Your role determines which tickets you specialise in.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {roles.map((role) => {
            const selected = selectedRole === role.value;

            return (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={`text-left border p-6 transition ${
                  selected
                    ? "border-white bg-zinc-900"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"
                }`}
              >
                <h2 className="text-xl font-bold">{role.title}</h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="mt-6 text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={chooseRole}
          disabled={!selectedRole || loading}
          className="mt-8 rounded bg-white px-6 py-3 font-bold text-black disabled:opacity-40"
        >
          {loading ? "Saving..." : "Confirm Role"}
        </button>
      </div>
    </main>
  );
}