import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const validClasses = [
  "SERVICE_DESK",
  "NETWORK_ENGINEER",
  "SYSTEMS_ENGINEER",
  "SECURITY_ANALYST",
] as const;

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated." },
      { status: 401 }
    );
  }

  const body = await request.json();

  const playerClass = body.playerClass;

  if (!validClasses.includes(playerClass)) {
    return NextResponse.json(
      { error: "Invalid role." },
      { status: 400 }
    );
  }

  const player = await prisma.player.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!player) {
    return NextResponse.json(
      { error: "Player not found." },
      { status: 404 }
    );
  }

  if (player.class) {
    return NextResponse.json(
      { error: "Role has already been selected." },
      { status: 400 }
    );
  }

  await prisma.player.update({
    where: {
      id: player.id,
    },
    data: {
      class: playerClass,
    },
  });

  return NextResponse.json({
    success: true,
  });
}