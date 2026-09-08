# 2x1 Terroir Camp — Voucher automático

Landing page con formulario (Nombre, Apellido, Email) para el beneficio 2x1
de turismo enológico. Al anotarse, la persona queda guardada en una base de
datos (Supabase) y recibe al instante un mail con su voucher (Resend).

Pensado para linkear desde un código QR (folleto, cartel, redes) directo a
la landing.

## Cómo funciona

1. La persona completa el formulario en la landing.
2. El servidor valida los datos y los guarda en la tabla `signups` de Supabase.
3. Se genera un código de voucher único (ej: `TERROIR-A7K2PQ`).
4. Se envía un mail automático con ese código vía Resend.
5. Si el mail ya se registró antes, no se genera un voucher nuevo (evita
   duplicados y abuso).

Todos los registros quedan en Supabase para exportar o usar después en tus
campañas de venta de vino.

## Puesta en marcha (una sola vez)

### 1. Crear el proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta / proyecto
   nuevo (plan gratis).
2. Andá a **SQL Editor** → **New query**, pegá el contenido de
   [`supabase/schema.sql`](./supabase/schema.sql) y ejecutalo. Esto crea la
   tabla `signups`.
3. Andá a **Project Settings → API** y copiá:
   - **Project URL** → va en `SUPABASE_URL`
   - **service_role key** (no la `anon` key) → va en `SUPABASE_SERVICE_ROLE_KEY`

   ⚠️ La `service_role key` tiene acceso total a la base de datos. Nunca la
   pongas en código del navegador ni la compartas: solo se usa del lado del
   servidor (ya está así en este proyecto).

### 2. Crear la cuenta de Resend

1. Entrá a [resend.com](https://resend.com) y creá una cuenta (plan gratis,
   3.000 mails/mes).
2. Andá a **API Keys** → **Create API Key** → copiá el valor a
   `RESEND_API_KEY`.
3. Para poder enviar mails desde tu propia dirección (ej:
   `promos@terroircamp.com`) tenés que **verificar tu dominio** en
   **Domains → Add Domain**, siguiendo las instrucciones (agregar unos
   registros DNS donde tengas comprado el dominio). Mientras no lo
   verifiques, podés dejar `RESEND_FROM_EMAIL=onboarding@resend.dev`, pero
   Resend en ese modo solo entrega a la casilla con la que creaste la
   cuenta — sirve para probar, no para producción.
4. Una vez verificado el dominio, poné en `RESEND_FROM_EMAIL` algo como:
   `Terroir Camp <promos@terroircamp.com>`.

### 3. Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores:

```bash
cp .env.example .env.local
```

### 4. Probar en local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000), completá el formulario
con un mail real y verificá que llegue el voucher.

### 5. Deploy (Vercel)

1. Entrá a [vercel.com](https://vercel.com), creá una cuenta con GitHub e
   importá este repo (`New Project` → elegís
   `Voucher-2x1-Terroir-Camp`).
2. En **Environment Variables** cargá las mismas 3 variables de
   `.env.local` (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `RESEND_API_KEY`, `RESEND_FROM_EMAIL`).
3. Deploy. Vercel te da una URL tipo `https://voucher-2x1-terroir-camp.vercel.app`
   (podés conectarle un dominio propio después desde **Settings → Domains**).

### 6. Generar el QR

Con la URL de producción, generá el QR en cualquier generador (ej.
[qr-code-generator.com](https://www.qr-code-generator.com/) o el mismo
Google) apuntando a esa URL. Imprimilo en el folleto/cartel de Terroir Camp.

## Editar textos del beneficio

Todos los textos (título, descripción, condiciones, días de validez) están
centralizados en [`lib/config.js`](./lib/config.js) — no hace falta tocar
el resto del código para cambiarlos.

## Ver y exportar los registros

En Supabase: **Table Editor → signups**. Desde ahí podés filtrar, exportar
a CSV, o marcar `redeemed_at` cuando alguien canjea el voucher en el local.
