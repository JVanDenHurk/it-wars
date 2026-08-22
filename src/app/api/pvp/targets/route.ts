import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

export async function GET(
  request: Request
) {
  try {
    const session =
      await auth.api.getSession({
        headers:
          await headers(),
      });

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const player =
      await prisma.player.findUnique({
        where: {
          userId:
            session.user.id,
        },

        select: {
          id:
            true,
        },
      });

    if (!player) {
      return NextResponse.json(
        {
          error:
            "Player not found.",
        },
        {
          status: 404,
        }
      );
    }

    const url =
      new URL(
        request.url
      );

    const search =
      url.searchParams
        .get("search")
        ?.trim() ?? "";

    const sort =
      url.searchParams
        .get("sort") ??
      "queue";

    const pageParam =
      Number(
        url.searchParams.get(
          "page"
        ) ?? "1"
      );

    const page =
      Number.isInteger(
        pageParam
      ) &&
      pageParam > 0
        ? pageParam
        : 1;

    const now =
      new Date();

    const activeCutoff =
      new Date(
        now.getTime() -
          2 *
            60 *
            1000
      );

    /*
     * We fetch the matching online
     * players first.
     *
     * Queue size is calculated using
     * _count so we don't need to load
     * every Ticket row.
     */
    const players =
      await prisma.player.findMany({
        where: {
          id: {
            not:
              player.id,
          },

          lastActiveAt: {
            gt:
              activeCutoff,
          },

          user: {
            sessions: {
              some: {
                expiresAt: {
                  gt:
                    now,
                },
              },
            },
          },

          ...(search
            ? {
                username: {
                  contains:
                    search,

                  mode:
                    "insensitive",
                },
              }
            : {}),
        },

        select: {
          id:
            true,

          username:
            true,

          level:
            true,

          careerPath:
            true,

          credits:
            true,

          _count: {
            select: {
              assignedTickets: {
                where: {
                  status:
                    "OPEN",
                },
              },
            },
          },
        },
      });

    /*
     * Convert Prisma result into
     * the shape used by the UI.
     */
    const targets =
      players.map(
        (target) => ({
          id:
            target.id,

          username:
            target.username,

          level:
            target.level,

          careerPath:
            target.careerPath,

          credits:
            target.credits,

          queueSize:
            target._count
              .assignedTickets,
        })
      );

    /*
     * ============================
     * SORTING
     * ============================
     */
    targets.sort(
      (a, b) => {
        switch (sort) {
          case "credits-low":
            return (
              a.credits -
              b.credits
            );

          case "credits-high":
            return (
              b.credits -
              a.credits
            );

          case "username":
            return a.username.localeCompare(
              b.username
            );

          case "queue":
          default:
            return (
              b.queueSize -
              a.queueSize
            );
        }
      }
    );

    const total =
      targets.length;

    const totalPages =
      Math.max(
        1,
        Math.ceil(
          total /
            PAGE_SIZE
        )
      );

    const safePage =
      Math.min(
        page,
        totalPages
      );

    const start =
      (safePage - 1) *
      PAGE_SIZE;

    const pagedTargets =
      targets.slice(
        start,
        start +
          PAGE_SIZE
      );

    return NextResponse.json({
      success:
        true,

      players:
        pagedTargets,

      page:
        safePage,

      pageSize:
        PAGE_SIZE,

      total,

      totalPages,
    });
  } catch (error) {
    console.error(
      "PvP targets error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load PvP targets.",
      },
      {
        status: 500,
      }
    );
  }
}