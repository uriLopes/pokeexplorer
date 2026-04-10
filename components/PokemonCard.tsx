import Link from 'next/link';

export default function PokemonCard({ name, image }: { name: string, image: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group">
      <div className="bg-gray-50 rounded-xl p-4 mb-4 group-hover:bg-blue-50 transition-colors">
        <img src={image} alt={name} className="w-32 h-32 mx-auto object-contain" />
      </div>
      <h2 className="text-xl font-bold capitalize mb-4 text-center text-gray-800">{name}</h2>
      <Link 
        href={`/pokemon/${name}`} 
        className="block bg-blue-600 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
      >
        Ver Detalhes
      </Link>
    </div>
  );
}