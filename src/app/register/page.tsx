"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please complete all fields."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    if (
      password.length < 8
    ) {
      setError(
        "Password must be at least 8 characters."
      );

      return;
    }

    setLoading(true);

    try {
      const result =
        await authClient.signUp.email({
          name:
            name.trim(),

          email:
            email.trim(),

          password,
        });

      if (
        result.error
      ) {
        setError(
          result.error.message ??
            "Unable to create account."
        );

        return;
      }

      setSuccess(
        "Account created successfully."
      );

      /*
       * Better Auth normally creates
       * the session immediately after
       * email/password registration.
       *
       * Send the new player to the
       * dashboard where their Player
       * record will be created.
       */
      router.push(
        "/dashboard"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      setError(
        "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">

      <div className="w-full max-w-md">

        <div className="border border-zinc-800 bg-zinc-950 p-8">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
              IT WARS
            </p>

            <h1 className="mt-3 text-3xl font-black">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Join the Service Desk and try not to go bankrupt.
            </p>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="mt-8 space-y-5"
          >

            {/* Username */}
            <div>

              <label
                htmlFor="name"
                className="text-sm font-bold text-zinc-300"
              >
                Username
              </label>

              <input
                id="name"
                type="text"
                value={
                  name
                }
                onChange={(
                  event
                ) =>
                  setName(
                    event.target.value
                  )
                }
                disabled={
                  loading
                }
                autoComplete="username"
                className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition hover:border-zinc-600 focus:border-white disabled:opacity-50"
                placeholder="ServiceDeskHero"
              />

            </div>

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="text-sm font-bold text-zinc-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={
                  email
                }
                onChange={(
                  event
                ) =>
                  setEmail(
                    event.target.value
                  )
                }
                disabled={
                  loading
                }
                autoComplete="email"
                className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition hover:border-zinc-600 focus:border-white disabled:opacity-50"
                placeholder="you@example.com"
              />

            </div>

            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="text-sm font-bold text-zinc-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={
                  password
                }
                onChange={(
                  event
                ) =>
                  setPassword(
                    event.target.value
                  )
                }
                disabled={
                  loading
                }
                autoComplete="new-password"
                className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition hover:border-zinc-600 focus:border-white disabled:opacity-50"
                placeholder="Minimum 8 characters"
              />

            </div>

            {/* Confirm Password */}
            <div>

              <label
                htmlFor="confirmPassword"
                className="text-sm font-bold text-zinc-300"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={
                  confirmPassword
                }
                onChange={(
                  event
                ) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                disabled={
                  loading
                }
                autoComplete="new-password"
                className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition hover:border-zinc-600 focus:border-white disabled:opacity-50"
                placeholder="Enter password again"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-900 bg-red-950/20 p-4">

                <p className="text-sm text-red-400">
                  {error}
                </p>

              </div>
            )}

            {/* Success */}
            {success && (
              <div className="border border-green-900 bg-green-950/20 p-4">

                <p className="text-sm text-green-400">
                  {success}
                </p>

              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={
                loading
              }
              className="w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="mt-6 border-t border-zinc-800 pt-6 text-center">

            <p className="text-sm text-zinc-500">
              Already have an account?
            </p>

            <Link
              href="/"
              className="mt-2 inline-block font-bold text-white hover:text-zinc-300"
            >
              Sign In
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}