import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/*
 * ============================
 * REQUIRE ADMIN
 * ============================
 *
 * Server-side admin protection.
 *
 * Any admin page can call:
 *
 * const admin = await requireAdmin();
 *
 * Unauthenticated users go to login.
 * Normal players go to dashboard.
 */
export async function requireAdmin() {
  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });

  if (!session) {
    redirect("/");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id:
          session.user.id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        banned: true,
      },
    });

  if (
    !user ||
    user.role !== "admin"
  ) {
    redirect("/dashboard");
  }

  return user;
}