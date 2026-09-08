"use client";

import { useState } from "react";

const initialForm = { firstName: "", lastName: "", email: "", company: "" };

export default function SignupForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | already | error
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm(initialForm);
        return;
      }

      if (res.status === 409 || data.error === "already_registered") {
        setStatus("already");
        return;
      }

      setStatus("error");
      setErrorMessage(
        data.error === "invalid_fields"
          ? "Revisá los datos ingresados e intentá de nuevo."
          : "Ocurrió un error de nuestro lado. Probá de nuevo en un momento."
      );
    } catch {
      setStatus("error");
      setErrorMessage("No pudimos conectar con el servidor. Probá de nuevo en un momento.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-800">¡Listo! 🎉</p>
        <p className="mt-2 text-emerald-700">
          Te enviamos tu voucher por mail. Si no lo ves en unos minutos, revisá la carpeta de spam.
        </p>
      </div>
    );
  }

  if (status === "already") {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="text-lg font-semibold text-amber-800">Ya estás registrado</p>
        <p className="mt-2 text-amber-700">
          Ese mail ya recibió su voucher anteriormente. Revisá tu casilla (o la de spam).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-stone-700">
            Nombre
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-stone-700">
            Apellido
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
        />
      </div>

      {/* Campo trampa para bots: oculto para personas, invisible incluso para lectores de pantalla */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">No completar</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={handleChange}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-rose-900 px-4 py-3 font-semibold text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Quiero mi 2x1"}
      </button>

      <p className="text-center text-xs text-stone-500">
        Al registrarte aceptás recibir el voucher y novedades de Terroir Camp por mail.
      </p>
    </form>
  );
}
