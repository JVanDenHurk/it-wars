import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError } from "better-auth/api";
import { admin } from "better-auth/plugins";

import { resend } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { validateUsername } from "@/lib/username";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:3000",
    "http://192.168.50.186:3000",
  ],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  /*
   * ============================
   * BETTER AUTH PLUGINS
   * ============================
   */
  plugins: [
    admin({
      defaultRole: "user",

      bannedUserMessage:
        "Your IT WARS account has been suspended.",
    }),
  ],

  /*
   * ============================
   * USER VALIDATION
   * ============================
   */
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const validation =
            validateUsername(
              user.name
            );

          if (!validation.valid) {
            throw new APIError(
              "BAD_REQUEST",
              {
                message:
                  validation.error,
              }
            );
          }

          const existingPlayer =
            await prisma.player.findFirst({
              where: {
                username: {
                  equals:
                    validation.username,

                  mode:
                    "insensitive",
                },
              },

              select: {
                id: true,
              },
            });

          const existingUser =
            await prisma.user.findFirst({
              where: {
                name: {
                  equals:
                    validation.username,

                  mode:
                    "insensitive",
                },
              },

              select: {
                id: true,
              },
            });

          if (
            existingPlayer ||
            existingUser
          ) {
            throw new APIError(
              "CONFLICT",
              {
                message:
                  "That username is already taken.",
              }
            );
          }

          return {
            data: {
              ...user,

              name:
                validation.username,
            },
          };
        },
      },
    },
  },

  /*
   * ============================
   * EMAIL / PASSWORD
   * ============================
   */
  emailAndPassword: {
    enabled: true,

    sendResetPassword:
      async ({
        user,
        url,
      }) => {
        const { error } =
          await resend.emails.send({
            from:
              process.env.EMAIL_FROM!,

            to:
              user.email,

            subject:
              "Reset your IT Wars password",

            html: `
              <h1>IT WARS</h1>
              <p>You requested a password reset.</p>
              <p><a href="${url}">Reset Password</a></p>
            `,
          });

        if (error) {
          throw new Error(
            "Failed to send reset email"
          );
        }
      },

    resetPasswordTokenExpiresIn:
      3600,

    revokeSessionsOnPasswordReset:
      true,
  },
});