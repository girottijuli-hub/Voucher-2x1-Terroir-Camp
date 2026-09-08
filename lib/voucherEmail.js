import { config } from "@/lib/config";

export function buildVoucherEmail({ firstName, voucherCode }) {
  const subject = `Tu voucher 2x1 en ${config.businessName} 🍷`;

  const html = `
  <div style="background:#f6f1ec;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#3a2318;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6dcd0;">
      <div style="background:#5c1a2b;padding:24px 32px;text-align:center;">
        <p style="margin:0;color:#f6e9d8;font-size:14px;letter-spacing:2px;text-transform:uppercase;">${config.businessName}</p>
      </div>
      <div style="padding:32px;">
        <p style="font-size:16px;margin:0 0 16px;">¡Hola ${escapeHtml(firstName)}!</p>
        <p style="font-size:16px;line-height:1.5;margin:0 0 24px;">
          Ya tenés tu voucher para <strong>${config.offerTitle}</strong>. Mostrá este mail o el código en tu visita.
        </p>
        <div style="background:#f6f1ec;border:1px dashed #b8896f;border-radius:8px;padding:20px;text-align:center;margin:0 0 24px;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8a6a55;">Tu código</p>
          <p style="margin:0;font-size:28px;letter-spacing:2px;font-weight:bold;color:#5c1a2b;">${voucherCode}</p>
        </div>
        <p style="font-size:14px;line-height:1.6;color:#6b5a4d;margin:0 0 8px;">
          <strong>Condiciones:</strong> ${config.voucherTerms}
        </p>
        <p style="font-size:14px;line-height:1.6;color:#6b5a4d;margin:0;">
          Válido por ${config.voucherValidDays} días desde este mail.
        </p>
      </div>
    </div>
  </div>`;

  const text = `¡Hola ${firstName}!

Ya tenés tu voucher para ${config.offerTitle}.

Tu código: ${voucherCode}

Condiciones: ${config.voucherTerms}
Válido por ${config.voucherValidDays} días desde este mail.`;

  return { subject, html, text };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
