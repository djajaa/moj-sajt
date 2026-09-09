import type { Metadata } from "next";
import Link from "next/link";
import { UtilityHeader, UtilityFooter } from "./_components/UtilityChrome";

export const metadata: Metadata = {
  title: "Stranica nije pronađena",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <UtilityHeader />

      <main className="flex min-h-[70vh] items-center bg-[#08090b]">
        <div className="mx-auto w-full max-w-[900px] px-8 py-24 text-center sm:px-10 lg:px-14">
          <div className="font-heading text-[clamp(5rem,18vw,10rem)] font-bold leading-none text-white/10">
            404
          </div>
          <h1 className="-mt-6 text-white sm:-mt-10">
            Izgleda da je ova stranica <span className="font-serif italic font-normal text-theme">preskočila noge</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-md leading-8 text-white/60">
            Ne postoji, ili je premještena. Vrati se na početnu i nastavi odatle.
          </p>
          <Link
            href="/"
            className="gt-cut-lg mt-10 inline-flex min-h-[58px] items-center justify-center bg-theme px-9 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_12px_32px_rgba(184,87,8,0.30)] transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(184,87,8,0.38)]"
          >
            Nazad na početnu
          </Link>
        </div>
      </main>

      <UtilityFooter />
    </>
  );
}
