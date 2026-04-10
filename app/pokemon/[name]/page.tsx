import Link from 'next/link';

export default async function PokemonPage({ params }: { params: { name: string } | any }) {
  const resolvedParams = await params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${resolvedParams.name}`);
  const p = await res.json();

  return (
    <div className="p-6 md:p-10 flex flex-col items-center min-h-screen bg-gray-100">
      {/* Botão Voltar */}
      <div className="max-w-md w-full mb-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors"
        >
          ← Voltar para a listagem
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md w-full">
        <img 
          src={p.sprites.other['official-artwork'].front_default} 
          alt={p.name} 
          className="w-48 h-48 mx-auto drop-shadow-md" 
        />
        <h1 className="text-3xl font-black text-center capitalize mt-4 text-gray-900 border-b pb-4">
          {p.name}
        </h1>
        
        <div className="mt-6 space-y-4 text-gray-800">
          <p className="flex justify-between">
            <span className="font-bold text-gray-500">Tipo:</span> 
            <span className="capitalize">{p.types.map((t: any) => t.type.name).join(', ')}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-bold text-gray-500">Peso:</span> 
            <span>{p.weight / 10} kg</span>
          </p>
          <p className="flex justify-between">
            <span className="font-bold text-gray-500">Altura:</span> 
            <span>{p.height / 10} m</span>
          </p>
          
          <div className="pt-4">
            <p className="font-bold mb-2 text-blue-600">Habilidades Principais:</p>
            <ul className="grid grid-cols-2 gap-2">
              {p.abilities.slice(0, 4).map((a: any) => (
                <li key={a.ability.name} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm capitalize text-center border border-blue-100">
                  {a.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}