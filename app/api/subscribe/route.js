import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getResend } from "@/lib/resend";
import { generateVoucherCode } from "@/lib/voucher";
import { buildVoucherEmail } from "@/lib/voucherEmail";
import { config } from "@/lib/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const honeypot = String(body.company ?? "").trim();

  // Campo trampa: los bots suelen completar cualquier input que encuentran.
  // Devolvemos éxito falso sin hacer nada para no revelarles la validación.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!firstName || !lastName || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data: existing, error: lookupError } = await supabase
    .from("signups")
    .select("voucher_code")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) {
    console.error("Error buscando registro existente:", lookupError);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json({ error: "already_registered" }, { status: 409 });
  }

  const voucherCode = generateVoucherCode();

  const { error: insertError } = await supabase.from("signups").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    voucher_code: voucherCode,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      // Choque de unique constraint (email ya registrado en simultáneo).
      return NextResponse.json({ error: "already_registered" }, { status: 409 });
    }
    console.error("Error guardando el registro:", insertError);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  try {
    const { subject, html, text } = buildVoucherEmail({ firstName, voucherCode });
    const resend = getResend();
    const { error: emailError } = await resend.emails.send({
      from: config.fromEmail,
      to: email,
      subject,
      html,
      text,
    });

    if (emailError) {
      console.error("Error enviando el mail del voucher:", emailError);
      return NextResponse.json(
        { ok: true, emailSent: false },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("Excepción enviando el mail del voucher:", err);
    return NextResponse.json({ ok: true, emailSent: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true, emailSent: true });
}
