import SignupForm from "@/app/components/SignupForm";
import { config } from "@/lib/config";

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: "url(/images/hero-vinedos.jpg)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm uppercase tracking-widest text-rose-200">
            {config.businessName}
          </p>
          <h1 className="text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
            {config.offerTitle}
          </h1>
          <p className="mt-3 text-stone-100/90">{config.offerDescription}</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
          <SignupForm />
        </div>

        <p className="mt-6 text-center text-xs text-stone-200/80">
          {config.voucherTerms}
        </p>
      </div>
    </main>
  );
}
