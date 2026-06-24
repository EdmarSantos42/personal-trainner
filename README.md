# João Paulo — Personal Trainer

Landing page de alta conversão para o personal trainer **João Paulo**, construída
com uma arquitetura preparada para crescer até uma plataforma completa.

## Stack

- **Next.js 16** — App Router, TypeScript, `src/` directory
- **React 19**
- **Tailwind CSS v4** — via `@tailwindcss/postcss`
- **motion v12** — animações (`import { ... } from "motion/react"`)
- **lucide-react** — ícones
- **clsx** + **tailwind-merge** — helper `cn()`

## Arquitetura

O projeto segue princípios rígidos para escalar sem refatoração:

1. **Conteúdo** → todo texto e configuração editável vive em `src/lib/config.ts` (fonte única de verdade).
2. **Cores / tokens** → todos os tokens de design vivem em `src/lib/theme.ts` (e no `@theme` de `globals.css`).
3. **Design system** → componentes genéricos e reutilizáveis em `src/components/ui/`.
4. **Seções** → cada seção da landing é um componente isolado em `src/components/landing/`.
5. **Tipagem** → TypeScript em modo `strict`, tipos compartilhados em `src/types/`.
6. **Chat isolado** → `src/components/chat/` + `src/app/api/chat/` evoluem sem tocar no resto (hoje simulado, depois IA real).

## Estrutura de pastas

```
src/
├── app/
│   ├── (landing)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── landing/
│   └── chat/
├── lib/
│   ├── config.ts
│   ├── theme.ts
│   └── utils.ts
├── hooks/
└── types/
    └── index.ts
```

## Começando

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servir build de produção
- `npm run typecheck` — checagem de tipos
- `npm run lint` — lint
