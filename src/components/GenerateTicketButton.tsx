"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GenerateTicketButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateTicket() {
    setLoading(true);
    setError("");

    const response = await fetch("/api/tickets/generate", {
      method: "POST",
    });

    const data = await response.json();

    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Unable to generate ticket.");
      return;
    }

    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={generateTicket}
        disabled={loading}
        className="bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200 disabled:opacity-50"
      >
        {loading ? "Getting Ticket..." : "Get Ticket"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}