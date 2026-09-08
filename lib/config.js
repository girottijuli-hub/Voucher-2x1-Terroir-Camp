// Datos del beneficio. Editá esto para cambiar textos sin tocar el resto del código.
export const config = {
  businessName: "Terroir Camp",
  offerTitle: "2x1 en tu experiencia de turismo enológico",
  offerDescription:
    "Anotate con tu nombre y mail y te enviamos al instante un voucher para acceder al 2x1 en tu próxima visita a Terroir Camp.",
  voucherValidDays: 30,
  voucherTerms:
    "Válido para 2 personas en una misma reserva. Coordiná día y horario con anticipación escribiendo a Terroir Camp. Sujeto a disponibilidad. No acumulable con otras promociones.",
  fromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  contactEmail: process.env.CONTACT_EMAIL || "",
};
