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
          <img
            src="/images/logo-terroir-in-focus-white.png"
            alt={config.businessName}
            className="mx-auto mb-4 h-40 w-auto drop-shadow-sm"
          />
          <h1 className="text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
            {config.offerTitle}
          </h1>
          <p className="mt-3 text-sm text-stone-100/90 sm:text-base">
            {config.offerDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-white/20 bg-black/40 p-6 shadow-xl backdrop-blur-md sm:p-8">
          <SignupForm />
        </div>

        <p className="mt-6 text-center text-xs text-stone-200/80">
          {config.voucherTerms}
        </p>
      </div>
    </main>
  );
}
