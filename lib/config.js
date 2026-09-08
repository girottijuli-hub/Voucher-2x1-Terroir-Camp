// Datos del beneficio. Editá esto para cambiar textos sin tocar el resto del código.
export const config = {
  businessName: "Terroir Camp",
  wineryName: "Doña Paula",
  // URL pública del sitio, para armar links absolutos (ej. el logo en el mail).
  // En Vercel se completa sola; en local queda localhost (el logo no se va a
  // ver en un mail de prueba hasta que esto apunte a una URL pública).
  siteUrl:
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  offerTitle: "2x1 en tu experiencia de turismo enológico",
  offerDescription:
    "Te esperamos para que vivas la experiencia Doña Paula Terroir Camp, donde queremos que entres en contacto con la naturaleza que nos rodea y aprendas más sobre los viñedos, nuestros suelos y nuestro programa de sustentabilidad. Esta visita termina con una experiencia de realidad virtual y la degustación de 5 de los mejores vinos de Doña Paula.",
  voucherValidUntil: "31/12/26",
  voucherTerms: "Válido hasta el 31/12/26.",
  fincaName: "Finca El Alto",
  fromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  contactEmail: process.env.CONTACT_EMAIL || "",
  whatsappNumber: "5492613415739",
  whatsappMessage:
    "Hola! Quiero canjear mi voucher 2x1 de Terroir Camp en Finca El Alto y coordinar mi visita.",
};
