"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Login failed.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black tracking-tight">
            IT WARS
          </h1>

          <p className="mt-2 text-zinc-500">
            Survive the service desk.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8">
          <h2 className="mb-6 text-xl font-bold">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-zinc-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-zinc-500"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-white p-3 font-bold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-zinc-500 hover:text-white"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="my-6 border-t border-zinc-800" />

          <p className="mb-3 text-center text-sm text-zinc-500">
            Looking for employment?
          </p>

          <Link
            href="/register"
            className="block w-full rounded border border-zinc-700 p-3 text-center font-bold hover:bg-zinc-900"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}