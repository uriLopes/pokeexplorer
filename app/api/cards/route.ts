import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const cards = await prisma.pokemonCard.findMany({
    where: {
      user: { email: session.user.email! },
      name: { contains: search, mode: "insensitive" },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(cards);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = await req.json();
  const { name, type, hp, attack, description, image, rarity } = body;

  if (!name || !type || !hp || !attack || !description || !image || !rarity) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  const card = await prisma.pokemonCard.create({
    data: {
      name,
      type,
      hp: Number(hp),
      attack,
      description,
      image,
      rarity,
      userId: user.id,
    },
  });

  return NextResponse.json(card, { status: 201 });
}