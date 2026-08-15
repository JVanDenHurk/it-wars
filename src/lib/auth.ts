import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { resend } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:3000",
    "http://192.168.50.186:3000",
  ],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        subject: "Reset your IT Wars password",
        html: `
          <h1>IT WARS</h1>
          <p>You requested a password reset.</p>
          <p><a href="${url}">Reset Password</a></p>
        `,
      });

      if (error) {
        throw new Error("Failed to send reset email");
      }
    },

    resetPasswordTokenExpiresIn: 3600,
    revokeSessionsOnPasswordReset: true,
  },
});