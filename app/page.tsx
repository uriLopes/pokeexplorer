"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PokemonCard from "../components/PokemonCard";

type Card = {
  id: string;
  name: string;
  type: string;
  hp: number;
  attack: string;
  image: string;
  rarity: string;
};

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCards();
    }
  }, [status, search]);

  async function fetchCards() {
    setLoading(true);
    const res = await fetch(`/api/cards?search=${encodeURIComponent(search)}`);
    if (res.ok) {
      const data = await res.json();
      setCards(data);
    }
    setLoading(false);
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-black text-gray-800">
          Olá, {session?.user?.name}!
        </h1>
        <div className="flex gap-3">
          <Link
            href="/cards/novo"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            + Novo Card
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl font-bold hover:bg-gray-300 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar card por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <p className="text-center text-gray-500">Carregando cards...</p>
      ) : cards.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum card encontrado. Crie o seu primeiro!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card) => (
            <PokemonCard key={card.id} {...card} />
          ))}
        </div>
      )}
    </div>
  );
}