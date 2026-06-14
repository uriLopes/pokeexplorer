import Link from 'next/link';

type CardProps = {
  id: string;
  name: string;
  type: string;
  hp: number;
  attack: string;
  image: string;
  rarity: string;
};

export default function PokemonCard({ id, name, type, hp, attack, image, rarity }: CardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group">
      <div className="bg-gray-50 rounded-xl p-4 mb-4 group-hover:bg-blue-50 transition-colors">
        <img src={image} alt={name} className="w-32 h-32 mx-auto object-contain" />
      </div>
      <h2 className="text-xl font-bold capitalize mb-1 text-center text-gray-800">{name}</h2>
      <p className="text-center text-sm text-gray-500 mb-2">
        {type} · HP {hp} · {rarity}
      </p>
      <p className="text-center text-sm text-gray-600 mb-4">Ataque: {attack}</p>
      <Link
        href={`/cards/${id}`}
        className="block bg-blue-600 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
      >
        Ver / Editar
      </Link>
    </div>
  );
}