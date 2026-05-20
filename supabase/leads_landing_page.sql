-- Migration: tornar parcelas_atrasadas opcional e adicionar ab_variant (A/B test form curto)
-- Execute no Supabase SQL Editor antes do deploy do Grupo 4:
-- ALTER TABLE leads_landing_page ALTER COLUMN parcelas_atrasadas DROP NOT NULL;
-- ALTER TABLE leads_landing_page ADD COLUMN IF NOT EXISTS ab_variant text;

create extension if not exists pgcrypto;

create table if not exists public.leads_landing_page (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text not null,
  tipo_contrato text not null,
  valor_parcela numeric(12, 2),
  parcelas_atrasadas boolean,
  banco text,
  mensagem text,
  origem text not null default 'landing_page',
  ab_variant text,
  created_at timestamptz not null default now()
);

alter table public.leads_landing_page enable row level security;

drop policy if exists "Allow public landing page lead inserts" on public.leads_landing_page;

create policy "Allow public landing page lead inserts"
on public.leads_landing_page
for insert
to anon
with check (origem = 'landing_page');

grant usage on schema public to anon;
grant insert on public.leads_landing_page to anon;
