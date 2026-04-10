import PokemonCard from '../components/PokemonCard';

export default async function HomePage() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await res.json();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.results.map((p: any, i: number) => (
          <PokemonCard 
            key={p.name} 
            name={p.name} 
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`} 
          />
        ))}
      </div>
    </div>
  );
}