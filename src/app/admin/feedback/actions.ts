"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

/*
 * ============================
 * DELETE FEEDBACK
 * ============================
 */
export async function deleteFeedback(
  formData: FormData
) {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  /*
   * ============================
   * FEEDBACK ID
   * ============================
   */
  const feedbackId =
    Number(
      formData.get(
        "feedbackId"
      )
    );

  if (
    !Number.isInteger(
      feedbackId
    ) ||
    feedbackId <= 0
  ) {
    throw new Error(
      "Invalid feedback ID."
    );
  }

  /*
   * ============================
   * CHECK EXISTS
   * ============================
   */
  const feedback =
    await prisma.feedback.findUnique({
      where: {
        id:
          feedbackId,
      },

      select: {
        id:
          true,
      },
    });

  if (!feedback) {
    throw new Error(
      "Feedback not found."
    );
  }

  /*
   * ============================
   * DELETE
   * ============================
   */
  await prisma.feedback.delete({
    where: {
      id:
        feedbackId,
    },
  });

  /*
   * ============================
   * REFRESH ADMIN PAGES
   * ============================
   */
  revalidatePath(
    "/admin/feedback"
  );

  revalidatePath(
    "/admin"
  );

  /*
   * ============================
   * RETURN TO QUEUE
   * ============================
   */
  redirect(
    "/admin/feedback"
  );
}