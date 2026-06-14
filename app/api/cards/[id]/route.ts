import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } | any }) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  const card = await prisma.pokemonCard.findUnique({ where: { id } });

  if (!card) {
    return NextResponse.json({ error: "Card não encontrado." }, { status: 404 });
  }

  return NextResponse.json(card);
}

export async function PUT(req: Request, { params }: { params: { id: string } | any }) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { name, type, hp, attack, description, image, rarity } = body;

  const card = await prisma.pokemonCard.update({
    where: { id },
    data: { name, type, hp: Number(hp), attack, description, image, rarity },
  });

  return NextResponse.json(card);
}

export async function DELETE(req: Request, { params }: { params: { id: string } | any }) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  await prisma.pokemonCard.delete({ where: { id } });

  return NextResponse.json({ success: true });
}