import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
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

export async function PUT(req: Request, { params }: { params: { id: string } | any }) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const card = await prisma.pokemonCard.update({
    where: { id },
    data: { ...body, hp: Number(body.hp) },
  });

  return NextResponse.json(card);
}

export async function DELETE(req: Request, { params }: { params: { id: string } | any }) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { id } = await params;
  await prisma.pokemonCard.delete({ where: { id } });

  return NextResponse.json({ success: true });
}