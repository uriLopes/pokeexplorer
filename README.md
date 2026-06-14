# 🚀 PokeExplorer - Gerenciador de Cards Pokémon (Full Stack)

Aplicação Full Stack para gerenciamento de Cards Pokémon, desenvolvida para as disciplinas de **Programação e Design para Web II** na **FAETERJ**. Cada usuário pode criar sua conta, fazer login de forma segura e gerenciar sua própria coleção de Cards Pokémon (criar, listar, editar, excluir e buscar por nome).

## 👤 Desenvolvedor
* **Nome:** Iury Lopes da Silva
* **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas
* **Instituição:** FAETERJ - Unidade Barra Mansa

---

## 🛠️ Tecnologias Utilizadas
* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS (v4)
* **Banco de Dados:** [NeonDB](https://neon.tech/) (PostgreSQL serverless)
* **ORM:** Prisma ORM (com adapter Neon)
* **Autenticação:** NextAuth.js (Credentials Provider + JWT)
* **Segurança:** bcryptjs (hash de senhas)

---

## 📌 Funcionalidades

- Cadastro e login de usuários com senha criptografada
- Autenticação via NextAuth (sessão JWT)
- Rotas protegidas (somente usuários autenticados acessam o dashboard)
- CRUD completo de Cards Pokémon:
  - Criar card (nome, tipo, HP, ataque, descrição, imagem, raridade)
  - Listar cards do usuário logado
  - Editar card existente
  - Excluir card
  - Buscar card por nome
- Layout responsivo

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/uriLopes/pokeexplorer.git
cd pokeexplorer
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

DATABASE_URL="sua_connection_string_do_neondb"

NEXTAUTH_SECRET="uma_string_aleatoria_segura"

NEXTAUTH_URL="http://localhost:3000"

> Você pode gerar uma connection string criando um projeto gratuito em [neon.tech](https://neon.tech).

### 4. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

### 5. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📁 Estrutura do Projeto

pokeexplorer/
├── app/
│   ├── page.tsx                  # Dashboard (lista de cards)
│   ├── layout.tsx                # Layout raiz
│   ├── login/page.tsx            # Tela de login
│   ├── cadastro/page.tsx         # Tela de cadastro
│   ├── sobre/page.tsx            # Página estática sobre o projeto
│   ├── cards/
│   │   ├── novo/page.tsx         # Criar novo card
│   │   └── [id]/page.tsx         # Editar/excluir card
│   └── api/
│       ├── auth/[...nextauth]/   # Rotas do NextAuth
│       ├── register/             # Cadastro de usuário
│       └── cards/                # API CRUD de cards
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PokemonCard.tsx
│   ├── CardForm.tsx
│   └── SessionProvider.tsx
├── lib/
│   └── prisma.ts                 # Cliente Prisma
├── prisma/
│   └── schema.prisma             # Schema do banco de dados
└── .env                          # Variáveis de ambiente (não versionado)