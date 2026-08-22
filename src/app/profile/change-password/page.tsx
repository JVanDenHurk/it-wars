"use client";

import Link from "next/link";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
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
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError(
        "Please complete all fields."
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setError(
        "New passwords do not match."
      );

      return;
    }

    if (
      newPassword.length < 8
    ) {
      setError(
        "New password must be at least 8 characters."
      );

      return;
    }

    if (
      currentPassword ===
      newPassword
    ) {
      setError(
        "Your new password must be different from your current password."
      );

      return;
    }

    setLoading(
      true
    );

    try {
      const result =
        await authClient.changePassword({
          currentPassword,
          newPassword,

          /*
           * Keep the player signed in
           * on this device.
           */
          revokeOtherSessions:
            true,
        });

      if (
        result.error
      ) {
        setError(
          result.error.message ??
            "Unable to change password."
        );

        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSuccess(
        "Password changed successfully."
      );
    } catch (error) {
      console.error(
        "Change password failed:",
        error
      );

      setError(
        "Unable to change password."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">

      <div className="w-full max-w-md">

        <div className="border border-zinc-800 bg-zinc-950 p-8">

          {/* ============================
              HEADER
              ============================ */}
          <div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Security
            </p>

            <h1 className="mt-2 text-3xl font-black">
              Change Password
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Enter your current password and choose a new one.
            </p>

          </div>

          {/* ============================
              FORM
              ============================ */}
          <form
            onSubmit={
              handleSubmit
            }
            className="mt-8 space-y-5"
          >

            {/* Current Password */}
            <div>

              <label
                htmlFor="currentPassword"
                className="text-sm font-bold text-zinc-300"
              >
                Current Password
              </label>

              <input
                id="currentPassword"
                type="password"
                value={
                  currentPassword
                }
                onChange={(
                  event
                ) =>
                  setCurrentPassword(
                    event.target.value
                  )
                }
                autoComplete="current-password"
                disabled={
                  loading
                }
                className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white disabled:opacity-50"
              />

            </div>

            {/* New Password */}
            <div>

              <label
                htmlFor="newPassword"
                className="text-sm font-bold text-zinc-300"
              >
                New Password
              </label>

              <input
                id="newPassword"
                type="password"
                value={
                  newPassword
                }
                onChange={(
                  event
                ) =>
                  setNewPassword(
                    event.target.value
                  )
                }
                autoComplete="new-password"
                disabled={
                  loading
                }
                className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white disabled:opacity-50"
              />

            </div>

            {/* Confirm Password */}
            <div>

              <label
                htmlFor="confirmPassword"
                className="text-sm font-bold text-zinc-300"
              >
                Confirm New Password
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
                autoComplete="new-password"
                disabled={
                  loading
                }
                className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white disabled:opacity-50"
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
              className="w-full bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading
                ? "Changing Password..."
                : "Change Password"}
            </button>

          </form>

          {/* ============================
              BACK
              ============================ */}
          <Link
            href="/profile"
            className="mt-4 block w-full border border-zinc-700 px-5 py-3 text-center font-bold hover:bg-zinc-900"
          >
            Back to Profile
          </Link>

        </div>

      </div>

    </main>
  );
}