"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/*
 * ============================
 * SUBMIT PLAYER FEEDBACK
 * ============================
 */
export async function submitFeedback(
  formData: FormData
) {
  /*
   * ============================
   * AUTHENTICATION
   * ============================
   */
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect("/");
  }

  /*
   * ============================
   * FIND PLAYER
   * ============================
   */
  const player =
    await prisma.player.findUnique({
      where: {
        userId:
          session.user.id,
      },

      select: {
        id: true,
      },
    });

  if (!player) {
    throw new Error(
      "Player account not found."
    );
  }

  /*
   * ============================
   * READ FORM DATA
   * ============================
   */
  const type =
    String(
      formData.get("type") ?? ""
    )
      .trim()
      .toUpperCase();

  const message =
    String(
      formData.get("message") ?? ""
    ).trim();

  /*
   * ============================
   * VALIDATE TYPE
   * ============================
   */
  const validTypes = [
    "BUG",
    "SUGGESTION",
    "BALANCE",
    "OTHER",
  ] as const;

  type FeedbackType =
    (typeof validTypes)[number];

  if (
    !validTypes.includes(
      type as FeedbackType
    )
  ) {
    throw new Error(
      "Invalid feedback type."
    );
  }

  /*
   * ============================
   * VALIDATE MESSAGE
   * ============================
   */
  if (message.length < 5) {
    throw new Error(
      "Feedback must be at least 5 characters."
    );
  }

  if (message.length > 2000) {
    throw new Error(
      "Feedback cannot exceed 2000 characters."
    );
  }

  /*
   * ============================
   * CREATE FEEDBACK
   * ============================
   */
  await prisma.feedback.create({
    data: {
      playerId:
        player.id,

      type:
        type as FeedbackType,

      message,

      /*
       * Explicitly start new
       * submissions in NEW state.
       */
      status:
        "NEW",
    },
  });

  /*
   * ============================
   * RETURN TO FEEDBACK PAGE
   * ============================
   */
  redirect(
    "/feedback?submitted=true"
  );
}