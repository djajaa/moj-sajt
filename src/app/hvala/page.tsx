import type { Metadata } from "next";
import Link from "next/link";
import { UtilityHeader, UtilityFooter } from "../_components/UtilityChrome";

export const metadata: Metadata = {
  title: "Hvala",
  robots: { index: false, follow: true },
};

const PHONE_E164 = "38766457157";
const SERGEJ_IG = "https://www.instagram.com/janjiccsergej/";

export default function ThankYouPage() {
  return (
    <>
      <UtilityHeader />

      <main className="flex min-h-[70vh] items-center bg-[#08090b]">
        <div className="mx-auto w-full max-w-[700px] px-8 py-24 text-center sm:px-10 lg:px-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-theme">Poruka je na putu</p>
          <h1 className="text-white">
            Hvala. <span className="font-serif italic font-normal text-theme">Javljam se uskoro.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md leading-8 text-white/60">
            Otvoren ti je mail sa pripremljenom porukom. Provjeri da li je stvarno poslana. Trudim se da
            odgovorim u roku od 24h.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="gt-cut-lg inline-flex min-h-[58px] w-full items-center justify-center bg-theme px-9 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_12px_32px_rgba(184,87,8,0.30)] transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(184,87,8,0.38)] sm:w-auto"
            >
              Nazad na početnu
            </Link>
            <a
              href={`https://wa.me/${PHONE_E164}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gt-cut-lg inline-flex min-h-[58px] w-full items-center justify-center border-2 border-white/25 px-9 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:border-theme hover:text-theme sm:w-auto"
            >
              Brže je preko WhatsApp-a
            </a>
          </div>

          <p className="mt-10 text-sm text-white/40">
            Ili prati na{" "}
            <a href={SERGEJ_IG} target="_blank" rel="noopener noreferrer" className="font-semibold text-white/70 underline decoration-theme/40 underline-offset-4 hover:text-theme">
              Instagramu
            </a>{" "}
            dok čekaš odgovor.
          </p>
        </div>
      </main>

      <UtilityFooter />
    </>
  );
}
