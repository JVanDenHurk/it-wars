import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ChooseCareerForm from "@/components/ChooseCareerForm";
import { auth } from "@/lib/auth";
import {
  getInDemandCareer,
  IN_DEMAND_CAREER_XP_BONUS,
  type CareerCounts,
} from "@/lib/career-demand";
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
        userId: session.user.id,
      },
    });

  if (!player) {
    redirect("/dashboard");
  }

  if (player.level < 4) {
    redirect("/dashboard");
  }

  if (player.careerPath) {
    redirect("/dashboard");
  }

  const specialistPlayers =
    await prisma.player.findMany({
      where: {
        careerPath: {
          not: null,
        },
      },

      select: {
        careerPath: true,
      },
    });

  const careerCounts: CareerCounts = {
    NETWORK: 0,
    SYSTEMS: 0,
    SECURITY: 0,
  };

  for (const specialist of specialistPlayers) {
    if (
      specialist.careerPath === "NETWORK" ||
      specialist.careerPath === "SYSTEMS" ||
      specialist.careerPath === "SECURITY"
    ) {
      careerCounts[specialist.careerPath] += 1;
    }
  }

  const inDemandCareer =
    getInDemandCareer(
      careerCounts,
      player.id
    );

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
            You have completed the Service Desk career track. Your next choice
            determines which specialist tickets you can resolve.
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-500">
            One pathway is marked In Demand. Choosing it helps balance the
            resolver teams and awards +{IN_DEMAND_CAREER_XP_BONUS} XP.
          </p>
        </div>

        <div className="mt-10">
          <ChooseCareerForm
            careerCounts={careerCounts}
            inDemandCareer={inDemandCareer}
            inDemandXpBonus={IN_DEMAND_CAREER_XP_BONUS}
          />
        </div>

      </div>
    </main>
  );
}
