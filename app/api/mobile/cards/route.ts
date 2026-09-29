import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import jwt from "jsonwebtoken";

function getUserFromToken(req: Request) {
  const auth = req.headers.get("Authorization");
  if (!auth) return null;
  const token = auth.replace("Bearer ", "");
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const cards = await prisma.pokemonCard.findMany({
    where: {
      userId: user.id,
      name: { contains: search, mode: "insensitive" },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(cards);
}

export async function POST(req: Request) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { name, type, hp, attack, description, image, rarity } = await req.json();

  const card = await prisma.pokemonCard.create({
    data: { name, type, hp: Number(hp), attack, description, image, rarity, userId: user.id },
  });

  return NextResponse.json(card, { status: 201 });
}