"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { authClient } from "@/lib/auth-client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    setLoading(false);

    if (resetError) {
      setError(resetError.message ?? "Password reset failed.");
      return;
    }

    setSuccess("Password reset successfully.");

    window.setTimeout(() => {
      router.push("/");
    }, 1500);
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black">IT WARS</h1>
        <p className="mt-2 text-zinc-500">Set a new password</p>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-zinc-500"
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-zinc-500"
              minLength={8}
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-white p-3 font-bold text-black hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <Suspense fallback={<p className="text-zinc-500">Loading reset form...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
