import type { Metadata } from "next";
import Link from "next/link";
import { UtilityHeader, UtilityFooter, Breadcrumbs } from "../_components/UtilityChrome";

export const metadata: Metadata = {
  title: "Uslovi korišćenja",
  description: "Uslovi saradnje sa Sergejom Janjićem — usluge, plaćanje, otkazivanje termina i odgovornost.",
  alternates: { canonical: "https://sergejjanjic.com/terms" },
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

export default function TermsPage() {
  return (
    <>
      <UtilityHeader />

      <main className="bg-white py-20 sm:py-24">
        <div className={cx}>
          <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Uslovi korišćenja" }]} />
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-theme">Pravno</p>
          <h1 className="mb-6">Uslovi korišćenja</h1>
          <p className="mb-14 max-w-2xl leading-8 text-txt">
            Kratko i jasno, bez pravničkog žargona: ovo su uslovi pod kojima radim sa klijentima. Konkretni
            detalji (cijena, raspored, dinamika) se uvijek dogovaraju lično, prije početka saradnje.
          </p>

          <Section n="01" title="Usluge">
            <p>
              Nudim 1:1 personalni trening, uživo u Banja Luci ili online, uključujući izradu individualnog
              plana treninga, praćenje napretka i korekcije po potrebi. Sajt služi za predstavljanje usluge i
              prvi kontakt — sama saradnja i njeni detalji dogovaraju se direktno, van sajta.
            </p>
          </Section>

          <Section n="02" title="Cijena i plaćanje">
            <p>
              Cijena zavisi od cilja, dinamike i vrste saradnje (uživo/online) i dogovara se nakon uvodnog
              razgovora — na sajtu namjerno nema fiksnog cjenovnika, jer se svaki plan pravi za konkretnu osobu.
              Način i dinamika plaćanja se dogovaraju prije početka saradnje.
            </p>
          </Section>

          <Section n="03" title="Otkazivanje i pomjeranje termina">
            <p>
              Termin uživo treninga otkazuj ili pomjeri najkasnije nekoliko sati unaprijed, uz najavu putem
              telefona ili WhatsApp-a — kasno otkazivanje bez najave može se računati kao iskorišćen termin.
              Za online saradnju, dinamika je fleksibilnija i dogovara se individualno.
            </p>
          </Section>

          <Section n="04" title="Zdravlje i odgovornost">
            <p>
              Fizička aktivnost nosi rizik. Prijavljujući se na trening, potvrđuješ da si zdravstveno sposoban/na
              za fizičku aktivnost ili da si se prethodno konsultovao/la s ljekarom, i da ćeš me obavijestiti o
              svakom zdravstvenom stanju, povredi ili ograničenju koje može uticati na trening.
            </p>
            <p>
              Ne pružam medicinske savjete niti zamjenjujem ljekara ili fizioterapeuta. Treniraš po sopstvenoj
              procjeni i odgovornosti, a ja se trudim da svaki plan bude siguran i prilagođen tvom stanju na
              osnovu informacija koje mi daš.
            </p>
          </Section>

          <Section n="05" title="Rezultati">
            <p>
              Rezultati prikazani na sajtu (transformacije, brojke) stvarni su i pripadaju konkretnim klijentima,
              ali nisu garancija — napredak zavisi od doslednosti, ishrane, sna, genetike i truda svake osobe
              pojedinačno. Ne obećavam konkretan rezultat u konkretnom roku.
            </p>
          </Section>

          <Section n="06" title="Planovi i sadržaj">
            <p>
              Trening planovi koje dobiješ pravljeni su za tebe lično i nisu namijenjeni daljem prosljeđivanju,
              preprodaji ili objavljivanju bez dogovora. Sadržaj sajta (tekst, dizajn, fotografije) vlasništvo
              je Sergeja Janjića, osim fotografija klijenata koje se koriste uz njihovu saglasnost.
            </p>
          </Section>

          <Section n="07" title="Prekid saradnje">
            <p>
              Bilo koja strana može prekinuti saradnju u bilo kom trenutku, uz razuman rok obavještenja — u tom
              slučaju se rješavaju samo obaveze koje su već nastale (npr. iskorišćeni ili plaćeni termini).
            </p>
          </Section>

          <Section n="08" title="Izmjene uslova">
            <p>
              Ovi uslovi mogu biti povremeno ažurirani kako se usluga mijenja. Datum posljednje izmjene: septembar 2026.
            </p>
          </Section>

          <Section n="09" title="Mjerodavno pravo i kontakt">
            <p>
              Na ove uslove primjenjuje se pravo Bosne i Hercegovine. Za sva pitanja:{" "}
              <a className="font-semibold text-header underline decoration-theme/40 underline-offset-4 hover:text-theme" href="mailto:janjicsergejcoaching@gmail.com">janjicsergejcoaching@gmail.com</a> ili{" "}
              <a className="font-semibold text-header underline decoration-theme/40 underline-offset-4 hover:text-theme" href="tel:+38766457157">+387 66 457 157</a>.
            </p>
            <p className="pt-2 text-sm">
              Pogledaj i <Link href="/privacy" className="font-semibold text-header underline decoration-theme/40 underline-offset-4 hover:text-theme">politiku privatnosti</Link>.
            </p>
          </Section>
        </div>
      </main>

      <UtilityFooter />
    </>
  );
}
