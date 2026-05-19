create extension if not exists pgcrypto;

create table if not exists public.leads_landing_page (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text not null,
  tipo_contrato text not null,
  valor_parcela numeric(12, 2),
  parcelas_atrasadas boolean not null,
  banco text,
  mensagem text,
  origem text not null default 'landing_page',
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
