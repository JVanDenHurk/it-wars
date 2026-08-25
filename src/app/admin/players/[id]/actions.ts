"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

const STARTING_CREDITS = 750;

/*
 * ============================
 * LOAD TARGET USER
 * ============================
 */
async function getTargetUser(
  userId: string
) {
  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },

      include: {
        player: true,
      },
    });

  if (!user) {
    throw new Error(
      "User not found."
    );
  }

  return user;
}

/*
 * ============================
 * BAN PLAYER
 * ============================
 */
export async function banPlayer(
  formData: FormData
) {
  const admin =
    await requireAdmin();

  const userId =
    String(
      formData.get("userId") ??
        ""
    );

  const reason =
    String(
      formData.get("reason") ??
        ""
    ).trim();

  if (!userId) {
    throw new Error(
      "Missing user ID."
    );
  }

  if (userId === admin.id) {
    throw new Error(
      "You cannot ban your own admin account."
    );
  }

  await getTargetUser(
    userId
  );

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        banned: true,

        banReason:
          reason ||
          "Administrative suspension",

        banExpires:
          null,
      },
    }),

    /*
     * Immediately invalidate
     * all active sessions.
     */
    prisma.session.deleteMany({
      where: {
        userId,
      },
    }),
  ]);

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    "/admin/players"
  );

  revalidatePath(
    `/admin/players/${userId}`
  );
}

/*
 * ============================
 * UNBAN PLAYER
 * ============================
 */
export async function unbanPlayer(
  formData: FormData
) {
  await requireAdmin();

  const userId =
    String(
      formData.get("userId") ??
        ""
    );

  if (!userId) {
    throw new Error(
      "Missing user ID."
    );
  }

  await getTargetUser(
    userId
  );

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      banned: false,

      banReason:
        null,

      banExpires:
        null,
    },
  });

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    "/admin/players"
  );

  revalidatePath(
    `/admin/players/${userId}`
  );
}

/*
 * ============================
 * FORCE LOGOUT
 * ============================
 */
export async function forceLogout(
  formData: FormData
) {
  const admin =
    await requireAdmin();

  const userId =
    String(
      formData.get("userId") ??
        ""
    );

  if (!userId) {
    throw new Error(
      "Missing user ID."
    );
  }

  if (userId === admin.id) {
    throw new Error(
      "You cannot revoke your own admin sessions here."
    );
  }

  await getTargetUser(
    userId
  );

  await prisma.session.deleteMany({
    where: {
      userId,
    },
  });

  revalidatePath(
    `/admin/players/${userId}`
  );
}

/*
 * ============================
 * ADJUST CREDITS
 * ============================
 */
export async function adjustCredits(
  formData: FormData
) {
  await requireAdmin();

  const userId =
    String(
      formData.get("userId") ??
        ""
    );

  const amount =
    Number(
      formData.get("amount")
    );

  if (
    !userId ||
    !Number.isInteger(amount)
  ) {
    throw new Error(
      "Invalid Credit adjustment."
    );
  }

  const user =
    await getTargetUser(
      userId
    );

  if (!user.player) {
    throw new Error(
      "This account does not have a Player record."
    );
  }

  const newCredits =
    Math.max(
      0,
      user.player.credits +
        amount
    );

  await prisma.player.update({
    where: {
      id: user.player.id,
    },

    data: {
      credits:
        newCredits,
    },
  });

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    "/admin/players"
  );

  revalidatePath(
    `/admin/players/${userId}`
  );
}

/*
 * ============================
 * ADJUST XP
 * ============================
 */
export async function adjustXp(
  formData: FormData
) {
  await requireAdmin();

  const userId =
    String(
      formData.get("userId") ??
        ""
    );

  const amount =
    Number(
      formData.get("amount")
    );

  if (
    !userId ||
    !Number.isInteger(amount)
  ) {
    throw new Error(
      "Invalid XP adjustment."
    );
  }

  const user =
    await getTargetUser(
      userId
    );

  if (!user.player) {
    throw new Error(
      "This account does not have a Player record."
    );
  }

  const newXp =
    Math.max(
      0,
      user.player.xp +
        amount
    );

  await prisma.player.update({
    where: {
      id: user.player.id,
    },

    data: {
      xp:
        newXp,
    },
  });

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    "/admin/players"
  );

  revalidatePath(
    `/admin/players/${userId}`
  );
}

/*
 * ============================
 * RESET CURRENT CAREER
 * ============================
 *
 * Lifetime statistics remain.
 */
export async function resetCareer(
  formData: FormData
) {
  const admin =
    await requireAdmin();

  const userId =
    String(
      formData.get("userId") ??
        ""
    );

  if (!userId) {
    throw new Error(
      "Missing user ID."
    );
  }

  if (userId === admin.id) {
    throw new Error(
      "Your own admin player cannot be reset from this page."
    );
  }

  const user =
    await getTargetUser(
      userId
    );

  if (!user.player) {
    throw new Error(
      "This account does not have a Player record."
    );
  }

  const playerId =
    user.player.id;

  const now =
    new Date();

  await prisma.$transaction(
    async (tx) => {
      /*
       * Expire all current
       * open tickets.
       */
      await tx.ticket.updateMany({
        where: {
          assignedToId:
            playerId,

          status:
            "OPEN",
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

      /*
       * Reset current progression.
       *
       * Lifetime statistics remain.
       */
      await tx.player.update({
        where: {
          id:
            playerId,
        },

        data: {
          level:
            1,

          xp:
            0,

          careerPath:
            null,

          careerAbilityReadyAt:
            null,

          credits:
            STARTING_CREDITS,

          queuePenaltyUntil:
            null,

          nextTicketAt:
            null,

          lastActiveAt:
            now,
        },
      });
    }
  );

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    "/admin/players"
  );

  revalidatePath(
    `/admin/players/${userId}`
  );
}

/*
 * ============================
 * DELETE ACCOUNT
 * ============================
 *
 * Permanent destructive action.
 *
 * Requires the admin to type the
 * exact visible username.
 */
export async function deleteAccount(
  formData: FormData
) {
  const admin =
    await requireAdmin();

  const userId =
    String(
      formData.get("userId") ??
        ""
    );

  const confirmation =
    String(
      formData.get(
        "confirmation"
      ) ??
        ""
    ).trim();

  if (!userId) {
    throw new Error(
      "Missing user ID."
    );
  }

  /*
   * Prevent accidental admin
   * lockout.
   */
  if (userId === admin.id) {
    throw new Error(
      "You cannot delete your own admin account."
    );
  }

  const user =
    await getTargetUser(
      userId
    );

  const expectedUsername =
    user.player?.username ??
    user.name;

  if (
    confirmation !==
    expectedUsername
  ) {
    throw new Error(
      "Username confirmation does not match."
    );
  }

  /*
   * We delete related data explicitly
   * where useful before deleting
   * the User.
   *
   * The Prisma schema also has
   * cascading relationships for
   * several auth/game records.
   */
  await prisma.$transaction(
    async (tx) => {
      /*
       * Sessions.
       */
      await tx.session.deleteMany({
        where: {
          userId,
        },
      });

      /*
       * Better Auth accounts.
       */
      await tx.account.deleteMany({
        where: {
          userId,
        },
      });

      /*
       * User deletion will cascade
       * into Player where configured.
       *
       * Tickets / PvP relationships
       * then follow the relations
       * defined in schema.prisma.
       */
      await tx.user.delete({
        where: {
          id:
            userId,
        },
      });
    }
  );

  revalidatePath(
    "/admin"
  );

  revalidatePath(
    "/admin/players"
  );

  redirect(
    "/admin/players"
  );
}