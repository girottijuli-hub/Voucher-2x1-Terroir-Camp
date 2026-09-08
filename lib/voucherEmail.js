import { config } from "@/lib/config";

export function buildVoucherEmail({ firstName, voucherCode }) {
  const subject = `Tu voucher 2x1 en ${config.businessName} · Bodega ${config.wineryName} 🍷`;
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    config.whatsappMessage
  )}`;

  const html = `
  <div style="background:#f6f1ec;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#3a2318;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6dcd0;">
      <div style="background:#ffffff;padding:28px 32px;text-align:center;border-bottom:1px solid #e6dcd0;">
        <img src="${config.siteUrl}/images/logo-dona-paula.png" alt="${config.wineryName}" width="160" style="display:inline-block;height:auto;" />
      </div>
      <div style="padding:32px;">
        <p style="font-size:16px;margin:0 0 16px;">¡Hola ${escapeHtml(firstName)}!</p>
        <p style="font-size:16px;line-height:1.5;margin:0 0 24px;">
          Ya tenés tu voucher para tu experiencia de <strong>${config.businessName}</strong> en nuestra ${config.fincaName}, de Bodega ${config.wineryName}. Te dejamos el link para que hagas tu reserva.
        </p>
        <div style="background:#f6f1ec;border:1px dashed #b8896f;border-radius:8px;padding:20px;text-align:center;margin:0 0 24px;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8a6a55;">Tu código</p>
          <p style="margin:0;font-size:28px;letter-spacing:2px;font-weight:bold;color:#5c1a2b;">${voucherCode}</p>
        </div>
        <div style="text-align:center;margin:0 0 24px;">
          <a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;font-family:Arial,sans-serif;font-weight:bold;font-size:16px;text-decoration:none;padding:14px 28px;border-radius:8px;">
            Hacé tu reserva por WhatsApp
          </a>
        </div>
        <p style="font-size:14px;line-height:1.6;color:#6b5a4d;margin:0;">
          <strong>Condiciones:</strong> ${config.voucherTerms}
        </p>
      </div>
    </div>
  </div>`;

  const text = `¡Hola ${firstName}!

Ya tenés tu voucher para tu experiencia de ${config.businessName} en nuestra ${config.fincaName}, de Bodega ${config.wineryName}.

Tu código: ${voucherCode}

Hacé tu reserva por WhatsApp: ${whatsappUrl}

Condiciones: ${config.voucherTerms}`;

  return { subject, html, text };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
