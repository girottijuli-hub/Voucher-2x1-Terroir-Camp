import { createClient } from "@supabase/supabase-js";

let client;

// Cliente de Supabase con la service role key: solo se usa del lado del
// servidor (API routes), nunca se expone al navegador.
export function getSupabaseAdmin() {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error(
        "Faltan las variables de entorno SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY"
      );
    }

    client = createClient(url, key, {
      auth: { persistSession: false },
    });
  }

  return client;
}
