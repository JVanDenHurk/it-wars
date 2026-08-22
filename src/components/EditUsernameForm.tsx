"use client";

import { useRouter } from "next/navigation";
import {
    FormEvent,
    useState,
} from "react";

interface EditUsernameFormProps {
  currentUsername: string;
}

export default function EditUsernameForm({
  currentUsername,
}: EditUsernameFormProps) {
  const router =
    useRouter();

  const [username, setUsername] =
    useState(
      currentUsername
    );

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
      username.trim() ===
      currentUsername
    ) {
      setSuccess(
        "Username is already up to date."
      );

      return;
    }

    setLoading(
      true
    );

    try {
      const response =
        await fetch(
          "/api/profile/username",
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                username,
              }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "Unable to update username."
        );

        return;
      }

      setSuccess(
        "Username updated successfully."
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Username update failed:",
        error
      );

      setError(
        "Unable to contact the server."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="mt-3"
    >

      <input
        type="text"
        value={
          username
        }
        onChange={(
          event
        ) =>
          setUsername(
            event.target.value
          )
        }
        disabled={
          loading
        }
        maxLength={
          24
        }
        className="w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white disabled:opacity-50"
      />

      <p className="mt-2 text-xs text-zinc-500">
        3-24 characters. Letters, numbers, underscores and hyphens only.
      </p>

      {error && (
        <div className="mt-3 border border-red-900 bg-red-950/20 p-3">

          <p className="text-sm text-red-400">
            {error}
          </p>

        </div>
      )}

      {success && (
        <div className="mt-3 border border-green-900 bg-green-950/20 p-3">

          <p className="text-sm text-green-400">
            {success}
          </p>

        </div>
      )}

      <button
        type="submit"
        disabled={
          loading
        }
        className="mt-4 border border-zinc-700 px-4 py-2 font-bold hover:bg-zinc-900 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Save Username"}
      </button>

    </form>
  );
}