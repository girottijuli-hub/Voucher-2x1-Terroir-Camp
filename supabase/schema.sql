-- Ejecutar en Supabase: Project > SQL Editor > New query > pegar y correr.

create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Seguridad: se activa RLS y no se crea ninguna policy. Esto bloquea
-- cualquier acceso desde el navegador (clave anon) y solo permite leer o
-- escribir usando la service role key, que se usa exclusivamente del lado
-- del servidor (API route /api/subscribe) y nunca se expone al cliente.
alter table public.signups enable row level security;
