import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ChooseCareerForm from "@/components/ChooseCareerForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ChooseCareerPage() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect("/");
  }

  const player =
    await prisma.player.findUnique({
      where: {
        userId:
          session.user.id,
      },
    });

  if (!player) {
    redirect(
      "/dashboard"
    );
  }

  /*
   * Not eligible yet.
   */
  if (player.level < 4) {
    redirect(
      "/dashboard"
    );
  }

  /*
   * Career has already been selected.
   */
  if (player.careerPath) {
    redirect(
      "/dashboard"
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-500">
            Promotion
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Choose Your Career Path
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            You have completed the
            Service Desk career track.
            Your next choice determines
            which specialist tickets you
            can resolve.
          </p>
        </div>

        <div className="mt-10">
          <ChooseCareerForm />
        </div>

      </div>
    </main>
  );
}