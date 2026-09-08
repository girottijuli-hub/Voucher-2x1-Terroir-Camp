import SignupForm from "@/app/components/SignupForm";
import { config } from "@/lib/config";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm uppercase tracking-widest text-rose-900">
            {config.businessName}
          </p>
          <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
            {config.offerTitle}
          </h1>
          <p className="mt-3 text-stone-600">{config.offerDescription}</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <SignupForm />
        </div>

        <p className="mt-6 text-center text-xs text-stone-400">
          {config.voucherTerms}
        </p>
      </div>
    </main>
  );
}
