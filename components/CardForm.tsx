"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CardData = {
  id?: string;
  name: string;
  type: string;
  hp: number | string;
  attack: string;
  description: string;
  image: string;
  rarity: string;
};

export default function CardForm({ initialData }: { initialData?: CardData }) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [form, setForm] = useState<CardData>(
    initialData || {
      name: "",
      type: "",
      hp: "",
      attack: "",
      description: "",
      image: "",
      rarity: "",
    }
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isEditing ? `/api/cards/${initialData!.id}` : "/api/cards";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erro ao salvar card.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este card?")) return;

    setLoading(true);
    const res = await fetch(`/api/cards/${initialData!.id}`, { method: "DELETE" });
    setLoading(false);

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Erro ao excluir card.");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-3xl font-black text-center text-gray-900 mb-6">
        {isEditing ? "Editar Card" : "Novo Card"}
      </h1>

      {error && (
        <p className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-2 mb-4 text-sm">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold text-gray-700 mb-1">Nome do Pokémon</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Tipo</label>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            placeholder="Ex: Fogo, Água, Elétrico"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">HP</label>
          <input
            name="hp"
            type="number"
            value={form.hp}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Ataque Principal</label>
          <input
            name="attack"
            value={form.attack}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">URL da Imagem</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            required
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Raridade</label>
          <input
            name="rarity"
            value={form.rarity}
            onChange={handleChange}
            required
            placeholder="Ex: Comum, Raro, Lendário"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Salvando..." : isEditing ? "Salvar Alterações" : "Criar Card"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-50 text-red-600 border border-red-200 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            Excluir Card
          </button>
        )}
      </form>
    </div>
  );
}