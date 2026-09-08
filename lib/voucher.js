import { randomInt } from "node:crypto";

// Caracteres sin ambigüedad visual (sin 0/O, 1/I).
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateVoucherCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += ALPHABET[randomInt(ALPHABET.length)];
  }
  return `TERROIR-${code}`;
}
