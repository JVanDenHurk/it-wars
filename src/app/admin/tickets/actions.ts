"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

/*
 * ============================
 * EXPIRE TICKET
 * ============================
 *
 * Use this when a live ticket is
 * stuck or needs to be removed
 * from the player's active queue.
 *
 * We expire instead of deleting so
 * history is preserved.
 */
export async function expireTicket(
  formData: FormData
) {
  await requireAdmin();

  const ticketId =
    Number(
      formData.get("ticketId")
    );

  if (
    !Number.isInteger(ticketId) ||
    ticketId <= 0
  ) {
    throw new Error(
      "Invalid ticket ID."
    );
  }

  const ticket =
    await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },

      select: {
        id: true,
        status: true,
      },
    });

  if (!ticket) {
    throw new Error(
      "Ticket not found."
    );
  }

  if (
    ticket.status !==
    "OPEN"
  ) {
    throw new Error(
      "Only open tickets can be expired."
    );
  }

  const now =
    new Date();

  await prisma.ticket.update({
    where: {
      id: ticketId,
    },

    data: {
      status:
        "EXPIRED",

      expiredAt:
        now,

      maintenanceUntil:
        null,
    },
  });

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    "/admin/tickets"
  );
}

/*
 * ============================
 * DELETE TICKET
 * ============================
 *
 * Hard deletion should be rare.
 *
 * This is mainly for test data or
 * malformed tickets that should not
 * remain in history.
 */
export async function deleteTicket(
  formData: FormData
) {
  await requireAdmin();

  const ticketId =
    Number(
      formData.get("ticketId")
    );

  const confirmation =
    String(
      formData.get("confirmation") ??
        ""
    ).trim();

  if (
    !Number.isInteger(ticketId) ||
    ticketId <= 0
  ) {
    throw new Error(
      "Invalid ticket ID."
    );
  }

  const ticket =
    await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },

      select: {
        id: true,
      },
    });

  if (!ticket) {
    throw new Error(
      "Ticket not found."
    );
  }

  const expectedConfirmation =
    `INC${ticket.id
      .toString()
      .padStart(5, "0")}`;

  if (
    confirmation !==
    expectedConfirmation
  ) {
    throw new Error(
      "Ticket confirmation does not match."
    );
  }

  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    "/admin/tickets"
  );
}