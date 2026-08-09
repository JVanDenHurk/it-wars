import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  let player = await prisma.player.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!player) {
    player = await prisma.player.create({
      data: {
        userId: session.user.id,
        username: session.user.name,
      },
    });
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">IT WARS</h1>

        <p className="mt-2 text-zinc-400">
          Welcome back, {player.username}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold">
              Level {player.level}
            </h2>

            <p className="mt-2">
              XP: {player.xp}
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-6">
            <p>HP: {player.hp} / {player.maxHp}</p>
            <p>Energy: {player.energy} / {player.maxEnergy}</p>
            <p>Credits: {player.credits} CR</p>
            <p>Stress: {player.stress} / 100</p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-bold">
              Stats
            </h2>

            <p className="mt-2">Attack: {player.attack}</p>
            <p>Defence: {player.defence}</p>
            <p>Accuracy: {player.accuracy}</p>
          </div>
        </div>
      </div>
    </main>
  );
}