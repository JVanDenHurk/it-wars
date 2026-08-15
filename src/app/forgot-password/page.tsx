"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Unable to request password reset.");
      return;
    }

    setMessage(
      "If an account exists for that email, a reset link has been generated."
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black">IT WARS</h1>
          <p className="mt-2 text-zinc-500">
            Reset your password
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded bg-zinc-900 border border-zinc-700 p-3 outline-none focus:border-zinc-500"
                required
              />
            </div>

            {message && (
              <p className="text-green-400 text-sm">
                {message}
              </p>
            )}

            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-white text-black p-3 font-bold hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-white"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}