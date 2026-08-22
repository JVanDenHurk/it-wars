import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const USERNAME_CHANGE_COOLDOWN_DAYS =
  30;

export async function PATCH(
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

    const body =
      await request.json();

    const username =
      String(
        body.username ?? ""
      ).trim();

    /*
     * ============================
     * VALIDATION
     * ============================
     */
    if (
      username.length < 3
    ) {
      return NextResponse.json(
        {
          error:
            "Username must be at least 3 characters.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      username.length > 24
    ) {
      return NextResponse.json(
        {
          error:
            "Username must be 24 characters or fewer.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !/^[a-zA-Z0-9_-]+$/.test(
        username
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Username can only contain letters, numbers, underscores and hyphens.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * CURRENT PLAYER
     * ============================
     */
    const player =
      await prisma.player.findUnique({
        where: {
          userId:
            session.user.id,
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

    /*
     * Same username.
     */
    if (
      player.username ===
      username
    ) {
      return NextResponse.json({
        success:
          true,

        username:
          player.username,

        message:
          "Username is already up to date.",
      });
    }

    /*
     * ============================
     * 30 DAY COOLDOWN
     * ============================
     *
     * null means they have never
     * changed their username before,
     * so the first change is allowed.
     */
    if (
      player.usernameChangedAt
    ) {
      const nextChangeAt =
        new Date(
          player
            .usernameChangedAt
            .getTime() +
            USERNAME_CHANGE_COOLDOWN_DAYS *
              24 *
              60 *
              60 *
              1000
        );

      const now =
        new Date();

      if (
        now <
        nextChangeAt
      ) {
        const remainingMs =
          nextChangeAt.getTime() -
          now.getTime();

        const remainingDays =
          Math.ceil(
            remainingMs /
              (
                24 *
                60 *
                60 *
                1000
              )
          );

        return NextResponse.json(
          {
            error:
              `You can change your username again in ${remainingDays} day${
                remainingDays ===
                1
                  ? ""
                  : "s"
              }.`,

            nextChangeAt,
          },
          {
            status: 429,
          }
        );
      }
    }

    /*
     * ============================
     * UNIQUE USERNAME
     * ============================
     *
     * Case-insensitive so:
     *
     * Justin
     * JUSTIN
     * justin
     *
     * cannot belong to different
     * players.
     */
    const existingPlayer =
      await prisma.player.findFirst({
        where: {
          username: {
            equals:
              username,

            mode:
              "insensitive",
          },

          id: {
            not:
              player.id,
          },
        },

        select: {
          id:
            true,
        },
      });

    if (
      existingPlayer
    ) {
      return NextResponse.json(
        {
          error:
            "That username is already taken.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * ============================
     * UPDATE
     * ============================
     *
     * Update Player.username and
     * Better Auth User.name together
     * so they cannot become out of sync.
     */
    const now =
      new Date();

    const updatedPlayer =
      await prisma.$transaction(
        async (tx) => {
          const updated =
            await tx.player.update({
              where: {
                id:
                  player.id,
              },

              data: {
                username,

                usernameChangedAt:
                  now,

                lastActiveAt:
                  now,
              },
            });

          await tx.user.update({
            where: {
              id:
                session.user.id,
            },

            data: {
              name:
                username,
            },
          });

          return updated;
        }
      );

    return NextResponse.json({
      success:
        true,

      username:
        updatedPlayer.username,

      usernameChangedAt:
        updatedPlayer
          .usernameChangedAt,

      message:
        "Username updated successfully. You can change it again in 30 days.",
    });
  } catch (error) {
    console.error(
      "Update username error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update username.",
      },
      {
        status: 500,
      }
    );
  }
}