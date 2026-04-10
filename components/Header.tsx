import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
          POKÉEXPLORER
        </Link>
        <nav>
          <Link href="/sobre" className="font-bold border-2 border-white/30 hover:border-white px-4 py-2 rounded-lg transition-all">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}