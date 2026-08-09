import { prisma } from "@/lib/prisma";

export default async function Home() {
  const players = await prisma.player.findMany();

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">IT WARS</h1>

      <p className="mt-4">Database connected.</p>

      <p className="mt-2">
        Players: {players.length}
      </p>
    </main>
  );
}