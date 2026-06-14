import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import CardForm from "../../../components/CardForm";

export default async function EditCardPage({ params }: { params: { id: string } | any }) {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const card = await prisma.pokemonCard.findUnique({ where: { id } });

  if (!card) redirect("/");

  return (
    <div className="p-8">
      <CardForm
        initialData={{
          id: card.id,
          name: card.name,
          type: card.type,
          hp: card.hp,
          attack: card.attack,
          description: card.description,
          image: card.image,
          rarity: card.rarity,
        }}
      />
    </div>
  );
}