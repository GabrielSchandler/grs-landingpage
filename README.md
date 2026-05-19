# GRS Soluções Landing Page

Landing page em Next.js App Router para captação de leads de análise revisional de juros.

## Rodar localmente

```bash
npm install
npm run dev
```

Crie um arquivo `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

## Supabase

Execute o script `supabase/leads_landing_page.sql` no SQL Editor do Supabase. Ele cria a tabela `leads_landing_page`, ativa RLS e permite apenas inserção pública com a chave anon.

## Tracking

O ponto indicado para GTM, GA4 e Google Ads Conversion Tracking está em `src/app/layout.tsx`. Mantenha os IDs em variáveis `NEXT_PUBLIC_*` e carregue scripts com `next/script`.
