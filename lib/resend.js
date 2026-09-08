import { Resend } from "resend";

let client;

export function getResend() {
  if (!client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("Falta la variable de entorno RESEND_API_KEY");
    }
    client = new Resend(key);
  }
  return client;
}
