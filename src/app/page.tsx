"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

export default function Home() {;
  const SERGEJ_IG = "https://www.instagram.com/janjiccsergej/";
  const GYM_IG = "https://www.instagram.com/gym_phoenix_/";
  const PHONE_DISPLAY = "+387 66 457 157";
  const PHONE_E164 = "38766457157";
  const ADDRESS = "Trg srpskih junaka 1, Banja Luka 78000";

  const MAPS_LINK = useMemo(() => {
    const q = encodeURIComponent(ADDRESS);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }, [ADDRESS]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mode: "Uživo (1:1)" as "Uživo (1:1)" | "Online (1:1)",
    goal: "Mršavljenje" as
      | "Mršavljenje"
      | "Mišićna masa"
      | "Kondicija"
      | "Rekompozicija"
      | "Povratak u formu",
    message: "",
  });

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openWhatsApp() {
    const lines = [
      "Zdravo Sergej,",
      "",
      `Ime: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      `Vrsta saradnje: ${form.mode}`,
      `Cilj: ${form.goal}`,
      "",
      "Poruka:",
      form.message || "-",
      "",
      "Hvala!",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(
      `https://wa.me/${PHONE_E164}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // -------- Motion helpers --------
  const reduceMotion = useReducedMotion();

  const reveal: Variants = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  function Reveal({
    children,
    delay = 0,
    className,
  }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }) {
    return (
      <motion.div
        className={className}
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  }

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  // Hero subtle parallax
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, reduceMotion ? 0 : 18]);

  function Card({
    title,
    desc,
    footer,
  }: {
    title: string;
    desc: string;
    footer?: string;
  }) {
    return (
      <motion.div
        whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10"
      >
        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="relative">
          <div className="text-sm font-semibold">{title}</div>
          <p className="mt-2 text-sm text-zinc-300">{desc}</p>
          {footer ? <div className="mt-5 text-xs text-zinc-400">{footer}</div> : null}
        </div>
      </motion.div>
    );
  }

  function CoverImage({
    src,
    alt,
    aspect,
    fit = "cover",
    heightClass,
    overlay = true,
  }: {
    src: string;
    alt: string;
    aspect: string;
    fit?: "cover" | "contain";
    heightClass?: string;
    overlay?: boolean;
  }) {
    return (
      <motion.div
        whileHover={reduceMotion ? undefined : { scale: 1.01 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className={`group relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/25 ${heightClass ?? ""}`}
      >
        <div className={`relative ${aspect}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={[
              "transition duration-500",
              fit === "cover" ? "object-cover" : "object-contain p-4",
              "group-hover:scale-[1.03]",
            ].join(" ")}
            priority={src.includes("/hero/")}
          />
          {overlay ? (
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          ) : null}
        </div>
      </motion.div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[999] h-[2px] w-full origin-left bg-white/60"
      />

      {/* premium background + ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(255,255,255,0.08),transparent_50%),radial-gradient(1000px_circle_at_80%_20%,rgba(255,255,255,0.06),transparent_50%),radial-gradient(900px_circle_at_50%_90%,rgba(255,255,255,0.05),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/35 to-black" />

        {/* blobs */}
        <div className="absolute -left-24 top-24 h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl animate-blob1" />
        <div className="absolute right-[-140px] top-32 h-[380px] w-[380px] rounded-full bg-white/10 blur-3xl animate-blob2" />
        <div className="absolute left-1/2 top-[70%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl animate-blob3" />
      </div>

      {/* NAV */}
      <header
        className={[
          "sticky top-0 z-50 border-b transition-all",
          scrolled ? "border-white/10 bg-black/70 backdrop-blur-xl" : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl ring-1 ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/0" />
              <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_30%_30%,black,transparent_70%)] bg-white/10" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">Sergej Janjić</div>
              <div className="text-[11px] text-zinc-400">Personal coaching • 1:1 • uživo / online</div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
            <a className="hover:text-white transition" href="#saradnja">Saradnja</a>
            <a className="hover:text-white transition" href="#o-meni">O meni</a>
            <a className="hover:text-white transition" href="#dokaz">Rezultati</a>
            <a className="hover:text-white transition" href="#kontakt">Kontakt</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SERGEJ_IG}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              Instagram
            </a>
            <button
              onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition"
            >
              Javi se
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-300/80 shadow-[0_0_20px_rgba(110,231,183,0.6)] animate-pulse" />
                1:1 coaching • plan • podrška • progres
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Moderno vođenje.
                <span className="block text-white/80">Rezultat koji ostaje.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base text-zinc-300 md:text-lg">
                Zovem se <span className="font-semibold text-white">Sergej</span>. Godinama sam u sportu — i kao takmičar i kao trener.
                Radim mirno, precizno i sistemski: da znaš šta radiš i da se osjećaš sigurno kroz cijeli proces.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <motion.button
                  onClick={openWhatsApp}
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className="group relative overflow-hidden rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                >
                  <span className="relative z-10">WhatsApp upit</span>
                  <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_20%_20%,rgba(0,0,0,0.12),transparent_60%)]" />
                </motion.button>

                <button
                  onClick={() => document.getElementById("saradnja")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-2xl bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/12 hover:bg-white/10 transition"
                >
                  Vrste saradnje
                </button>

                <a
                  href={`tel:+${PHONE_E164}`}
                  className="rounded-2xl bg-white/0 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/12 hover:bg-white/5 transition"
                >
                  Pozovi
                </a>
              </div>

              <div className="mt-9 grid grid-cols-3 gap-3">
                {[
                  ["150+", "saradnji"],
                  ["1:1", "pristup"],
                  ["Plan", "i progres"],
                ].map(([big, small]) => (
                  <div
                    key={small}
                    className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 transition"
                  >
                    <div className="text-lg font-bold">{big}</div>
                    <div className="text-xs text-zinc-300">{small}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <div className="flex gap-8 whitespace-nowrap py-3 text-xs text-zinc-300 [animation:marquee_14s_linear_infinite]">
                  {["tehnika", "progresija", "struktura", "oporavak", "navike", "podrška", "realan plan", "bez šablona"].map((w) => (
                    <span key={w} className="px-4">
                      <span className="text-white/70">•</span> {w}
                    </span>
                  ))}
                  {["tehnika", "progresija", "struktura", "oporavak", "navike", "podrška", "realan plan", "bez šablona"].map((w, i) => (
                    <span key={`${w}-${i}`} className="px-4">
                      <span className="text-white/70">•</span> {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <motion.div style={{ y: heroY }}>
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/12">
                <Image
                  src="/images/hero/sergej-hero.jpg"
                  alt="Sergej Janjić – trening"
                  width={1400}
                  height={1400}
                  priority
                  className="h-[420px] w-full object-cover md:h-[560px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-2xl bg-black/55 p-4 ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">Saradnja (1:1)</div>
                        <div className="mt-1 text-xs text-zinc-300">
                          Kratak razgovor → cilj → struktura → dinamika → plan.
                        </div>
                      </div>
                      <motion.button
                        onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
                        whileHover={reduceMotion ? undefined : { y: -1 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        className="shrink-0 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition"
                      >
                        Krenimo
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 hover:bg-white/10 transition">
                  <div className="text-sm font-semibold">Uživo (1:1)</div>
                  <p className="mt-1 text-sm text-zinc-300">Fokus na tehniku, ritam i progres — jasno, bez lutanja.</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 hover:bg-white/10 transition">
                  <div className="text-sm font-semibold">Online (1:1)</div>
                  <p className="mt-1 text-sm text-zinc-300">Struktura + praćenje + korekcije — plan koji možeš pratiti.</p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* SARADNJA */}
      <section id="saradnja" className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Saradnja</h2>
              <p className="mt-2 max-w-2xl text-zinc-300">
                Sve je 1:1 — uživo ili online. Prvo se uskladimo oko cilja i dinamike, a onda gradimo sistem koji je održiv.
              </p>
            </div>
            <div className="text-xs text-zinc-400">Precizno • Sistemski • Bez šablona</div>
          </div>

          <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 text-sm text-zinc-300">
            Cijena se dogovara nakon kratkog razgovora — zavisi od cilja, rasporeda i načina rada (uživo / online).
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card title="Start & procjena" desc="Kratko upoznavanje, cilj, nivo i plan kako da krenemo bez grešaka." />
            <Card title="Plan & progres" desc="Jasna struktura treninga i progresija — mjerljivo i realno." />
            <Card title="Praćenje & korekcije" desc="Korekcije kroz proces i podrška da ostaneš na putu kad postane teško." />
          </div>
        </Reveal>
      </section>

      {/* O MENI */}
      <section id="o-meni" className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
              <h2 className="text-3xl font-bold tracking-tight">O meni</h2>

              <p className="mt-4 text-zinc-300">
                Iza mene su godine rada na sceni, i kao takmičar i kao trener, i saradnja sa{" "}
                <span className="font-semibold text-white">150+ klijenata</span>.
              </p>
              <p className="mt-3 text-zinc-300">
                Najvažnije mi je da se tokom rada osjećaš sigurno: jasan plan, dobra komunikacija i proces koji možeš pratiti
                bez ekstremnih rješenja.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4">
                {[
                  ["Tehnika", "Ispravno i sigurno."],
                  ["Struktura", "Plan koji se prati."],
                  ["Progres", "Mjerljivo i realno."],
                  ["Podrška", "Kad treba najviše."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-sm font-semibold">{t}</div>
                    <div className="mt-1 text-xs text-zinc-300">{d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition"
                >
                  Otvori mapu
                </a>
                <a
                  href={GYM_IG}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/12 hover:bg-white/10 transition"
                >
                  Teretana – Instagram
                </a>
              </div>

              <div className="mt-6 text-xs text-zinc-400">Adresa: {ADDRESS}</div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">Forma / scena</div>
                  <div className="mt-1 text-xs text-zinc-400">Jasno, čisto, bez preuveličavanja.</div>
                </div>
                <a href={SERGEJ_IG} target="_blank" rel="noreferrer" className="text-xs text-zinc-300 hover:text-white transition">
                  Sergej – Instagram →
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <CoverImage src="/images/form/sergej-form-1.png" alt="Sergej forma 1" aspect="aspect-[4/5]" fit="cover" overlay />
                <CoverImage src="/images/form/sergej-form-2.png" alt="Sergej forma 2" aspect="aspect-[4/5]" fit="cover" overlay />
              </div>

              <div className="mt-5 rounded-2xl bg-black/35 p-4 ring-1 ring-white/10 backdrop-blur-xl">
                <div className="text-xs text-zinc-300">
                  Stil rada: mirno, precizno, sistemski — da napredak bude stabilan, ne slučajan.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REZULTATI */}
      <section id="dokaz" className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Rezultati</h2>
              <p className="mt-2 max-w-2xl text-zinc-300">
                Primjeri stvarnih transformacija. (Kasnije možemo dodati trajanje i cilj po klijentu.)
              </p>
            </div>
            <div className="text-xs text-zinc-400">REALNO • MJERLJIVO • ODRŽIVO</div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10"
            >
              <CoverImage
                src="/images/transformations/client-1.png"
                alt="Transformacija klijenta 1"
                aspect="aspect-[4/3]"
                fit="contain"
                overlay={false}
              />
              <div className="mt-4 rounded-2xl bg-black/35 p-4 ring-1 ring-white/10 backdrop-blur-xl">
                <div className="text-sm font-semibold">Aleksa</div>
                <div className="mt-1 text-xs text-zinc-300">
                  "Nakon 20 godina bavljenja profesionalnim sportom, mislio sam da znam sve o treningu. Ova transformacija me je naučila da postoji pametniji način – sada imam snagu kao nekad, a bolova više nema."
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10"
            >
              <CoverImage
                src="/images/transformations/client-2.png"
                alt="Transformacija klijenta 2"
                aspect="aspect-[4/3]"
                fit="contain"
                overlay={false}
              />
              <div className="mt-4 rounded-2xl bg-black/35 p-4 ring-1 ring-white/10 backdrop-blur-xl">
                <div className="text-sm font-semibold">Stvarna transformacija</div>
                <div className="mt-1 text-xs text-zinc-300">
                  "Sedenje u kancelariji 9 sati dnevno ostavilo je trag. Krenuo sam samo da izgubim office belly, a dobio sam energiju i samopouzdanje koje nosim svaki dan. Najbolja odluka!"
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <Reveal>
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Kontakt</h2>
                <p className="mt-3 text-zinc-300">
                  Za početak napiši svoj cilj i šta ti je najveći problem (motivacija, rutina, ishrana, vrijeme).
                  Ja ti se javim sa jasnim prijedlogom kako da krenemo.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-400">Telefon</div>
                    <a href={`tel:+${PHONE_E164}`} className="mt-1 block font-semibold text-white hover:underline">
                      {PHONE_DISPLAY}
                    </a>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-400">Adresa</div>
                    <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="mt-1 block font-semibold text-white hover:underline">
                      {ADDRESS}
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={SERGEJ_IG}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/12 hover:bg-white/10 transition"
                    >
                      Instagram (Sergej)
                    </a>
                    <a
                      href={GYM_IG}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/12 hover:bg-white/10 transition"
                    >
                      Instagram (Teretana)
                    </a>
                  </div>
                </div>
              </div>

              <form
                className="rounded-3xl bg-black/35 p-6 ring-1 ring-white/10 backdrop-blur-xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  openWhatsApp();
                }}
              >
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      className="rounded-2xl bg-zinc-950/60 p-4 text-sm ring-1 ring-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/25"
                      placeholder="Ime"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    />
                    <input
                      className="rounded-2xl bg-zinc-950/60 p-4 text-sm ring-1 ring-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/25"
                      placeholder="Email (opciono)"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <select
                      className="rounded-2xl bg-zinc-950/60 p-4 text-sm ring-1 ring-white/10 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/25"
                      value={form.mode}
                      onChange={(e) => setForm((p) => ({ ...p, mode: e.target.value as any }))}
                    >
                      <option>Uživo (1:1)</option>
                      <option>Online (1:1)</option>
                    </select>

                    <select
                      className="rounded-2xl bg-zinc-950/60 p-4 text-sm ring-1 ring-white/10 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/25"
                      value={form.goal}
                      onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value as any }))}
                    >
                      <option>Mršavljenje</option>
                      <option>Mišićna masa</option>
                      <option>Kondicija</option>
                      <option>Rekompozicija</option>
                      <option>Povratak u formu</option>
                    </select>
                  </div>

                  <textarea
                    className="min-h-[140px] rounded-2xl bg-zinc-950/60 p-4 text-sm ring-1 ring-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/25"
                    placeholder="Poruka (iskustvo, ograničenja, termini...)"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />

                  <motion.button
                    type="submit"
                    whileHover={reduceMotion ? undefined : { y: -1 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="group relative overflow-hidden rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                  >
                    <span className="relative z-10">Pošalji na WhatsApp</span>
                    <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(800px_circle_at_10%_10%,rgba(0,0,0,0.10),transparent_60%)]" />
                  </motion.button>

                  <div className="text-xs text-zinc-400">
                    Klikom na dugme otvara se WhatsApp sa pripremljenom porukom.
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Floating CTA */}
      <motion.button
        onClick={openWhatsApp}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        className="fixed bottom-5 right-5 z-50 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.55)] hover:bg-zinc-200 transition ring-1 ring-white/30"
      >
        WhatsApp
      </motion.button>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-zinc-400">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Sergej Janjić</span>
            <span>1:1 coaching • uživo i online • Banja Luka</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Ambient blobs */
        @keyframes blob1 {
          0% { transform: translate(0px, 0px) scale(1); opacity: 0.55; }
          50% { transform: translate(30px, 18px) scale(1.08); opacity: 0.65; }
          100% { transform: translate(0px, 0px) scale(1); opacity: 0.55; }
        }
        @keyframes blob2 {
          0% { transform: translate(0px, 0px) scale(1); opacity: 0.45; }
          50% { transform: translate(-26px, 24px) scale(1.12); opacity: 0.6; }
          100% { transform: translate(0px, 0px) scale(1); opacity: 0.45; }
        }
        @keyframes blob3 {
          0% { transform: translate(-50%, 0px) scale(1); opacity: 0.35; }
          50% { transform: translate(-50%, -22px) scale(1.1); opacity: 0.5; }
          100% { transform: translate(-50%, 0px) scale(1); opacity: 0.35; }
        }

        .animate-blob1 { animation: blob1 11s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 13s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 15s ease-in-out infinite; }
      `}</style>
    </main>
  );
}