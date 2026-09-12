import type { Metadata } from "next";
import Link from "next/link";
import { UtilityHeader, UtilityFooter, Breadcrumbs } from "../_components/UtilityChrome";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Koje podatke ovaj sajt prikuplja, šta se dešava sa njima i kako kontaktirati Sergeja Janjića u vezi privatnosti.",
  alternates: { canonical: "https://sergejjanjic.com/privacy" },
  robots: { index: true, follow: true },
};

const cx = "mx-auto w-full max-w-[900px] px-8 sm:px-10 lg:px-14";

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gray-100 py-10 first:border-t-0 first:pt-0">
      <h2 className="mb-4 flex items-baseline gap-3 text-2xl">
        <span className="font-serif text-xl italic text-theme">{n}</span>
        {title}
      </h2>
      <div className="space-y-4 leading-8 text-txt">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <UtilityHeader />

      <main className="bg-white py-20 sm:py-24">
        <div className={cx}>
          <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Politika privatnosti" }]} />
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-theme">Pravno</p>
          <h1 className="mb-6">Politika privatnosti</h1>
          <p className="mb-14 max-w-2xl leading-8 text-txt">
            Ovaj sajt vodi Sergej Janjić, personalni trener u Banja Luci. Ova stranica objašnjava, jednostavnim
            jezikom, koji se podaci prikupljaju kad posjetiš sergejjanjic.com i šta se sa njima dešava. Nema
            sitnih slova. Pročitaj do kraja, traje dvije minute.
          </p>

          <Section n="01" title="Koje podatke prikupljam">
            <p>
              Ovaj sajt nema bazu podataka, naloge ni prijavu. Jedini podaci koje ostavljaš su oni koje sâm
              upišeš u kontakt formu na početnoj strani: ime, telefon (opciono), vrsta saradnje, cilj i poruka.
              Ništa se ne prikuplja automatski u pozadini: nema praćenja pokreta miša, nema fingerprinting-a,
              nema prodaje podataka trećim licima, jer ih uopšte i ne čuvam.
            </p>
          </Section>

          <Section n="02" title="Šta se dešava kad pošalješ poruku">
            <p>
              Kad klikneš &bdquo;Pošalji poruku&ldquo;, forma ne šalje ništa na server. Ona samo otvori tvoj
              vlastiti mail program (Gmail, Outlook, Mail...) sa već popunjenim tekstom. Poruka stiže do mene
              tek kad je ti stvarno pošalješ iz svog naloga. Isto važi za dugme WhatsApp: ono otvara direktan
              razgovor sa mnom preko WhatsApp aplikacije, ne prolazi kroz ovaj sajt.
            </p>
            <p>
              Drugim riječima: ja ne vidim ništa dok mi sâm(a) ne pošalješ poruku ili se ne javiš na WhatsApp.
            </p>
          </Section>

          <Section n="03" title="Kolačići">
            <p>
              Sajt ne koristi kolačiće za praćenje niti za oglašavanje. Za osnovnu, anonimnu statistiku posjeta
              (koliko ljudi otvori sajt, sa kog uređaja) koristim Vercel Analytics, servis koji ne koristi
              kolačiće i ne prikuplja lične podatke, pa banner za saglasnost nije potreban.
            </p>
          </Section>

          <Section n="04" title="Linkovi ka trećim stranama">
            <p>
              Sajt sadrži linkove ka Instagramu, WhatsApp-u i Google Mapama. Kad klikneš na njih, napuštaš ovaj
              sajt i primjenjuje se politika privatnosti tog servisa (Meta za Instagram i WhatsApp, Google za
              Mape). Nemam uvid niti kontrolu nad tim šta se tamo dešava sa tvojim podacima.
            </p>
          </Section>

          <Section n="05" title="Fotografije klijenata">
            <p>
              Transformacije prikazane u sekciji &bdquo;Rezultati&ldquo; objavljene su uz saglasnost klijenata
              čije su. Ako si klijent i želiš da tvoja slika bude uklonjena sa sajta, javi se, skidam je u roku
              od nekoliko dana.
            </p>
          </Section>

          <Section n="06" title="Tvoja prava">
            <p>
              Pošto ne čuvam podatke na serveru, nema ništa za brisanje van onoga što se nalazi u tvojoj
              prepisci sa mnom (mail ili WhatsApp). Tu prepisku možeš obrisati kad god želiš, sa svoje strane.
              Ako imaš pitanje šta se dešava sa informacijom koju si mi poslao/la, samo pitaj. Odgovaram lično.
            </p>
          </Section>

          <Section n="07" title="Sigurnost">
            <p>Sajt se servira isključivo preko HTTPS konekcije, što znači da je saobraćaj između tvog uređaja i sajta enkriptovan.</p>
          </Section>

          <Section n="08" title="Izmjene ove politike">
            <p>
              Ako se nešto promijeni u načinu rada sajta (npr. dodam novi alat za rezervacije), ova stranica će
              biti ažurirana. Datum posljednje izmjene: septembar 2026.
            </p>
          </Section>

          <Section n="09" title="Kontakt">
            <p>
              Pitanja o privatnosti: <a className="font-semibold text-header underline decoration-theme/40 underline-offset-4 hover:text-theme" href="mailto:janjicsergejcoaching@gmail.com">janjicsergejcoaching@gmail.com</a> ili{" "}
              <a className="font-semibold text-header underline decoration-theme/40 underline-offset-4 hover:text-theme" href="tel:+38766457157">+387 66 457 157</a>.
            </p>
            <p className="pt-2 text-sm">
              Pogledaj i <Link href="/terms" className="font-semibold text-header underline decoration-theme/40 underline-offset-4 hover:text-theme">uslove korišćenja</Link>.
            </p>
          </Section>
        </div>
      </main>

      <UtilityFooter />
    </>
  );
}
