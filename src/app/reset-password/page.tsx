"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Password reset failed.");
      return;
    }

    setSuccess("Password reset successfully.");

    setTimeout(() => {
      router.push("/");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black">IT WARS</h1>

          <p className="mt-2 text-zinc-500">
            Set a new password
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950 p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded bg-zinc-900 border border-zinc-700 p-3 outline-none focus:border-zinc-500"
                minLength={8}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded bg-zinc-900 border border-zinc-700 p-3 outline-none focus:border-zinc-500"
                minLength={8}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            {success && (
              <p className="text-sm text-green-400">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-white text-black p-3 font-bold hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}