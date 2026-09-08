// Datos del beneficio. Editá esto para cambiar textos sin tocar el resto del código.
export const config = {
  businessName: "Terroir Camp",
  offerTitle: "2x1 en tu experiencia de turismo enológico",
  offerDescription:
    "Te esperamos para que vivas la experiencia Doña Paula Terroir Camp, donde queremos que entres en contacto con la naturaleza que nos rodea y aprendas más sobre los viñedos, nuestros suelos y nuestro programa de sustentabilidad. Esta visita termina con una experiencia de realidad virtual y la degustación de 5 de los mejores vinos de Doña Paula.",
  voucherValidDays: 30,
  voucherTerms:
    "Válido para 2 personas en una misma reserva. Coordiná día y horario con anticipación escribiendo a Terroir Camp. Sujeto a disponibilidad. No acumulable con otras promociones.",
  fromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  contactEmail: process.env.CONTACT_EMAIL || "",
};
