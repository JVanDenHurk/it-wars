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

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message ?? "Login failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);

      setError(
        "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10 text-white">
      <div className="w-full max-w-md">

        {/* ============================
            TITLE
            ============================ */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black tracking-tight">
            IT WARS
          </h1>

          <p className="mt-2 text-zinc-500">
            Survive the Service Desk.
          </p>
        </div>

        {/* ============================
            LOGIN CARD
            ============================ */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8">

          <h2 className="mb-6 text-xl font-bold">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-zinc-400"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                disabled={loading}
                className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 outline-none transition focus:border-zinc-500 disabled:opacity-50"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-zinc-400"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
                disabled={loading}
                className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 outline-none transition focus:border-zinc-500 disabled:opacity-50"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-900 bg-red-950/20 p-3">
                <p className="text-sm text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-white p-3 font-bold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* Forgot password */}
          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-zinc-500 hover:text-white"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="my-6 border-t border-zinc-800" />

          {/* ============================
              NEW PLAYER
              ============================ */}
          <p className="mb-3 text-center text-sm text-zinc-500">
            New to IT WARS?
          </p>

          <div className="space-y-3">

            <Link
              href="/register"
              className="block w-full rounded border border-zinc-700 p-3 text-center font-bold hover:bg-zinc-900"
            >
              Create Account
            </Link>

            <Link
              href="/how-to-play"
              className="block w-full rounded border border-zinc-700 p-3 text-center font-bold text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              How to Play
            </Link>

          </div>

        </div>

        {/* ============================
            FOOTER
            ============================ */}
        <p className="mt-6 text-center text-xs text-zinc-700">
          Resolve tickets. Get promoted. Sabotage your coworkers.
        </p>

      </div>
    </main>
  );
}