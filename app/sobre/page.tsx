export default function SobrePage() {
  return (
    <div className="p-10 max-w-4xl mx-auto text-center bg-white mt-10 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-4xl font-black mb-6 text-blue-600">Sobre o Projeto</h1>
      <div className="space-y-4 text-lg text-gray-800">
        <p><strong>Aluno:</strong> Iury Lopes da Silva</p>
        <p><strong>Curso:</strong> Tecnologia em Análise e Desenvolvimento de Sistemas</p>
        <p className="pt-4 border-t">
          Este projeto é o <strong>PokeExplorer</strong>, uma aplicação Full Stack para
          gerenciamento de Cards Pokémon, desenvolvida como trabalho prático para a
          disciplina de Programação e Design para Web II.
        </p>
        <p>
          A aplicação permite que cada usuário crie sua própria conta, faça login de
          forma segura e gerencie sua coleção pessoal de Cards Pokémon (criar, listar,
          editar, excluir e buscar por nome).
        </p>
        <p>
          Construído com <strong>Next.js</strong> (App Router), <strong>Prisma ORM</strong>,
          banco de dados <strong>NeonDB (PostgreSQL)</strong> e autenticação com{" "}
          <strong>NextAuth</strong>.
        </p>
      </div>
    </div>
  );
}