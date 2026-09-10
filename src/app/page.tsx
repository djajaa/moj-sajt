"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const SERGEJ_IG     = "https://www.instagram.com/janjiccsergej/";
const GYM_IG        = "https://www.instagram.com/gym_phoenix_/";
const PHONE_DISPLAY = "+387 66 457 157";
const PHONE_E164    = "38766457157";
const ADDRESS       = "Trg srpskih junaka 1, Banja Luka 78000";
const MAPS_LINK     = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const cx = "mx-auto w-full max-w-[1600px] px-8 sm:px-10 lg:px-14 xl:px-20";

const NAV_LINKS = [
  { label: "Početna",   href: "#hero"     },
  { label: "O meni",    href: "#about"    },
  { label: "Saradnja",  href: "#services" },
  { label: "Rezultati", href: "#results"  },
  { label: "Pitanja",   href: "#faq"      },
  { label: "Kontakt",   href: "#contact"  },
];

const MARQUEE_WORDS = [
  "tehnika", "progresija", "struktura", "oporavak",
  "navike",  "podrška",    "realan plan", "bez šablona",
];

const FAQS = [
  {
    q: "Da li mi treba prethodno iskustvo sa treningom?",
    a: "Ne. Radim i sa ljudima koji nikad nisu bili u teretani i sa onima koji treniraju godinama. Plan se pravi prema tvom nivou, ne obrnuto.",
  },
  {
    q: "Kad mogu očekivati prve rezultate?",
    a: "Prve promjene u snazi i osjećaju obično se vide za 3–4 nedjelje. Vidljiva promjena izgleda traje duže i zavisi od cilja, doslednosti i polazne tačke, zato ne dajem univerzalan broj.",
  },
  {
    q: "Koja je razlika između uživo i online saradnje?",
    a: "Uživo treniramo zajedno u sali u Banja Luci, sa direktnom korekcijom tehnike. Online dobijaš isti nivo plana i praćenja, uz video-provjere forme. Biraš prema tome gdje živiš i šta ti više odgovara.",
  },
  {
    q: "Koliko košta saradnja?",
    a: "Zavisi od cilja, učestalosti i vrste saradnje, pa cijenu dogovaramo nakon kratkog razgovora. Ne postoji fiksni paket za sve.",
  },
  {
    q: "Šta ako imam povredu ili zdravstveno ograničenje?",
    a: "Javi mi prije početka. Plan se prilagođava onome što tvoje tijelo trenutno može, a ne obrnuto. Bezbjednost dolazi prije napretka.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "Sergej Janjić Personal Coaching",
  url: "https://sergejjanjic.com",
  telephone: "+38766457157",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Trg srpskih junaka 1",
    addressLocality: "Banja Luka",
    postalCode: "78000",
    addressCountry: "BA",
  },
  sameAs: ["https://www.instagram.com/janjiccsergej/", "https://www.instagram.com/gym_phoenix_/"],
};

const TESTIMONIALS = [
  { src: "/images/transformations/client-1.png", name: "Aleksa",  quote: "Trenirao sam profesionalno godinama i mislio da znam sve o treningu. Sergej mi je za mjesec dana pokazao koliko sam pogrešno radio bazu." },
  { src: "/images/transformations/client-2.png", name: "Luka",    quote: "Znao sam šta treba da radim, samo nisam imao ko da me drži za riječ. Sad nemam izgovor: primijeti odmah kad počnem da popuštam." },
  { src: "/images/transformations/client-3.jpg", name: "Marko",   quote: "104kg → 84kg za sedam mjeseci, bez gladovanja i bez ijedne povrede. Prvi put mi je neko dao plan koji sam stvarno mogao da izdržim." },
  { src: "/images/transformations/client-4.png", name: "Jovan",   quote: "Gledam slike od prije godinu dana i ne prepoznajem se. Nisam očekivao da ću ikad ovako izgledati, a kamoli da ću uživati u procesu." },
  { src: "/images/transformations/client-5.png", name: "Danilo",  quote: "Na prvom treningu mi je Sergej objasnio tačno šta radimo i zašto. Poslije toliko pokušaja sa programima sa interneta, to mi je bilo skoro čudno." },
  { src: "/images/transformations/client-6.jpg", name: "Sergej",  quote: "57kg → 62kg čiste mase, bez ijednog kilograma masti navrh. Kad ljudima kažem kako, ne vjeruju da nisam koristio ništa osim treninga i hrane." },
];

// ─── Icons (custom, bez emoji-ja) ──────────────────────────────────────────────
function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 3.5c.6 0 1.2.4 1.4 1l1 2.6c.2.5.1 1.1-.3 1.5L7.2 10c1 2.4 2.9 4.3 5.3 5.3l1.4-1.4c.4-.4 1-.5 1.5-.3l2.6 1c.6.2 1 .8 1 1.4v2.3c0 1-.8 1.8-1.8 1.7-6.6-.5-11.9-5.8-12.4-12.4-.1-1 .7-1.8 1.7-1.8h2Z" />
    </svg>
  );
}
function PinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6.8-6.1-6.8-11.2a6.8 6.8 0 1 1 13.6 0C18.8 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.6" r="2.4" />
    </svg>
  );
}
function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="6" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function DumbbellIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9v6M2.5 10.5v3M6.5 7.5v9" />
      <path d="M20 9v6M21.5 10.5v3M17.5 7.5v9" />
      <path d="M6.5 12h11" />
    </svg>
  );
}
function OrbitIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  );
}
function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-3Z" />
      <path d="M9 12.2l2 2 4-4.2" />
    </svg>
  );
}
function ChartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M2.5 20h19" />
    </svg>
  );
}
function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function PlusIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function ArrowIcon({ className = "h-4 w-4", direction = "right" }: { className?: string; direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={direction === "left" ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function ChatIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L4 20l1-4.4A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.5 10.5c.3 2 2 3.7 4 4" />
    </svg>
  );
}

// ─── Hooks ──────────────────────────────────────────────────────────────────
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );
    obs.observe(el);

    // Sigurnosna mreža: ako je element već blizu vrha stranice pri učitavanju
    // (npr. hero), a observer iz bilo kog razloga ne okine odmah, ne smije
    // ostati trajno nevidljiv — provjeri geometriju direktno kao fallback.
    const fallback = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setInView(true);
        obs.unobserve(el);
      }
    }, 1200);

    return () => { obs.disconnect(); window.clearTimeout(fallback); };
  }, []);

  return { ref, inView };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useIsFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  return fine;
}

function useMagneticEnabled() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  return fine && !reduced;
}

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({
  children, className = "", delay = 0, variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale" | "fade";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`gt-reveal gt-reveal--${variant} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ value, className = "" }: { value: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(() => value.replace(/[0-9]/g, "0"));

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/[0-9]+/);
    if (!match || match.index === undefined) { setDisplay(value); return; }
    const target = parseInt(match[0], 10);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[0].length);
    const duration = 1300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref} className={className}>{display}</span>;
}

// ─── TiltCard ─────────────────────────────────────────────────────────────────
function TiltCard({
  children, className = "", max = 8,
}: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(900px) rotateX(${(py - 0.5) * -max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`gt-tilt ${className}`}>
      {children}
    </div>
  );
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────
function Eyebrow({
  index, label, className = "", light = false,
}: { index: string; label: string; className?: string; light?: boolean }) {
  return (
    <div className={`gt-eyebrow ${light ? "gt-eyebrow--light" : ""} ${className}`}>
      <span className="gt-eyebrow-index">{index}</span>
      <span className="gt-eyebrow-line" aria-hidden="true" />
      <span className="gt-eyebrow-label">{label}</span>
    </div>
  );
}

// ─── FaqItem ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="gt-cut-md border border-gray-100 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-base font-bold text-header">{q}</span>
        <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-theme/10 text-theme transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <PlusIcon />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-7 text-txt">{a}</p>
        </div>
      </div>
    </div>
  );
}

// ─── CustomCursor ─────────────────────────────────────────────────────────────
function CustomCursor({ active }: { active: boolean }) {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => { pos.x = e.clientX; pos.y = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hoverable = target?.closest("a, button, input, textarea, select, [data-cursor-hover]");
      document.documentElement.classList.toggle("gt-cursor-active", !!hoverable);
    };
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current)  dotRef.current.style.transform  = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("gt-cursor-on");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("gt-cursor-on", "gt-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;
  return (
    <>
      <div ref={dotRef} className="gt-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="gt-cursor-ring" aria-hidden="true" />
    </>
  );
}

// ─── ParticleField — canvas "constellation" atmosfera (desktop only) ─────────
function ParticleField({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    const COUNT = 64;
    let particles: Particle[] = [];
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
      }));
    };
    resize();
    init();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onResize = () => { resize(); };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const f = (120 - dist) / 120;
          p.x += (dx / (dist || 1)) * f * 1.1;
          p.y += (dy / (dist || 1)) * f * 1.1;
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      }

      ctx.strokeStyle = "rgba(252,138,23,0.14)";
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 108) {
            ctx.globalAlpha = 1 - d / 108;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = "rgba(252,138,23,0.6)";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[3] h-full w-full" aria-hidden="true" />;
}

// ─── ThemeBtn ─────────────────────────────────────────────────────────────────
function ThemeBtn({
  children, href, onClick, className = "", variant = "filled", type, showArrow = true,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "filled" | "border";
  type?: "submit";
  showArrow?: boolean;
}) {
  const magnetic = useMagneticEnabled();

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px) translateY(-3px)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = ""; };

  const inner = (
    <>
      <span className="btn-text">
        {children}
        {showArrow && <ArrowIcon className="btn-arrow h-4 w-4" />}
      </span>
      <span className="btn-hover btn-hover--1" />
      <span className="btn-hover btn-hover--2" />
      <span className="btn-hover btn-hover--3" />
      <span className="btn-hover btn-hover--4" />
      <span className="btn-hover btn-hover--5" />
    </>
  );
  const cls = `gt-theme-btn ${variant === "border" ? "style-border" : ""} ${className}`.trim();
  if (href) {
    return (
      <a href={href} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} className={cls}>
      {inner}
    </button>
  );
}

// ─── Coverflow — 3D karusel za rezultate ──────────────────────────────────────
function Coverflow({ items }: { items: typeof TESTIMONIALS }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);
  const tickingRef = useRef(false);
  const autoRafRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const touchResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const applyTilt = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const center = wrapRect.left + wrapRect.width / 2;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const delta = (cardCenter - center) / (wrapRect.width / 2);
      const clamped = Math.max(-1.3, Math.min(1.3, delta));
      const rotateY = clamped * -16;
      const scale = 1 - Math.min(Math.abs(clamped), 1) * 0.08;
      const opacity = 1 - Math.min(Math.abs(clamped), 1) * 0.3;

      card.style.transform = `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${100 - Math.round(Math.abs(clamped) * 10)}`;
    });
  }, []);

  const requestTilt = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    rafRef.current = requestAnimationFrame(() => {
      applyTilt();
      tickingRef.current = false;
    });
  }, [applyTilt]);

  // Beskonačna petlja (kartice su duplirane) + tilt se računa samo na scroll, ne svaki frejm
  useEffect(() => {
    applyTilt();
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const half = track.scrollWidth / 2;
      if (track.scrollLeft >= half) track.scrollLeft -= half;
      else if (track.scrollLeft <= 0) track.scrollLeft += half;
      requestTilt();
    };

    track.scrollLeft = 2;
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", requestTilt);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", requestTilt);
      cancelAnimationFrame(rafRef.current);
    };
  }, [applyTilt, requestTilt]);

  // Kontinuirano auto-vrtenje — pauzira se dok korisnik drži/prevlači
  useEffect(() => {
    if (reducedMotion) return;
    const SPEED = 1.3; // px po frejmu

    const step = () => {
      const track = trackRef.current;
      if (track && !pausedRef.current && !draggingRef.current) {
        track.scrollLeft += SPEED;
      }
      autoRafRef.current = requestAnimationFrame(step);
    };
    autoRafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(autoRafRef.current);
  }, [reducedMotion]);

  // Prevlačenje mišem (touch već ima native swipe, ne diramo ga)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
    track.style.cursor = "grabbing";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = dragStartScrollRef.current - (e.clientX - dragStartXRef.current);
  };
  const endDrag = () => {
    draggingRef.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const onTouchStart = () => {
    if (touchResumeTimer.current) clearTimeout(touchResumeTimer.current);
    pausedRef.current = true;
  };
  const onTouchEnd = () => {
    touchResumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 600);
  };

  const loopItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div ref={wrapRef} className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#f4f6f9] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#f4f6f9] to-transparent sm:w-24" />

      <div
        ref={trackRef}
        className="gt-coverflow-track flex cursor-grab select-none overflow-x-auto py-10"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; endDrag(); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {loopItems.map((item, i) => (
          <div
            key={item.name + i}
            ref={(el: HTMLDivElement | null) => { cardRefs.current[i] = el; }}
            className="gt-cut-md mx-2 w-[240px] flex-shrink-0 overflow-hidden border border-gray-100 bg-white sm:mx-3 sm:w-[300px]"
          >
            <div className="relative aspect-square overflow-hidden bg-bg2">
              <Image
                src={item.src}
                alt={`Transformacija klijenta ${item.name} nakon treninga sa Sergejom Janjićem`}
                fill
                draggable={false}
                sizes="(max-width: 640px) 240px, 300px"
                className="pointer-events-none object-contain p-3"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-header">{item.name}</h3>
                <span className="font-serif text-base italic text-theme">5.0</span>
              </div>
              <p className="text-sm leading-7 text-txt">&ldquo;{item.quote}&rdquo;</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MobileActionBar ──────────────────────────────────────────────────────────
function MobileActionBar({ onWhatsApp }: { onWhatsApp: () => void }) {
  return (
    <div className="gt-mobile-bar flex items-stretch lg:hidden">
      <a href={`tel:+${PHONE_E164}`} className="gt-mobile-bar-btn">
        <PhoneIcon className="h-[18px] w-[18px]" />
        <span>Pozovi</span>
      </a>
      <div className="gt-mobile-bar-divider" aria-hidden="true" />
      <button onClick={onWhatsApp} className="gt-mobile-bar-btn gt-mobile-bar-btn--accent">
        <ChatIcon className="h-[18px] w-[18px]" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded]                 = useState(false);
  const [loadPct, setLoadPct]               = useState(0);
  const [wideEnough, setWideEnough]         = useState(false);

  const mobileMenuCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const heroBgRef             = useRef<HTMLDivElement | null>(null);
  const heroGlowRef           = useRef<HTMLDivElement | null>(null);
  const marqueeTopRef         = useRef<HTMLDivElement | null>(null);
  const marqueeSkewRef        = useRef<HTMLDivElement | null>(null);
  const lastScrollY           = useRef(0);
  const lastScrollTime        = useRef(0);
  const skewResetTimer        = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finePointer   = useIsFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const motionFX      = finePointer && !reducedMotion && wideEnough;
  const router        = useRouter();

  const [form, setForm] = useState({
    name:     "",
    email:    "",
    mode:     "Uživo (1:1)"  as "Uživo (1:1)"  | "Online (1:1)",
    goal:     "Mršavljenje"  as "Mršavljenje" | "Mišićna masa" | "Kondicija" | "Rekompozicija" | "Povratak u formu",
    message:  "",
    website:  "", // honeypot — pravi posjetioci ovo ne vide ni ne popunjavaju
  });

  useEffect(() => {
    const update = () => setWideEnough(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(scrollable > 0 ? (y / scrollable) * 100 : 0);

      if (heroBgRef.current) {
        const shift = Math.min(y * 0.18, 140);
        heroBgRef.current.style.transform = `translate3d(0, ${shift}px, 0) scale(1.08)`;
      }

      if (!reducedMotion && marqueeSkewRef.current) {
        const now = performance.now();
        const dt = now - lastScrollTime.current || 16;
        const velocity = (y - lastScrollY.current) / dt;
        lastScrollY.current = y;
        lastScrollTime.current = now;
        const skew = Math.max(-12, Math.min(12, velocity * 36));
        marqueeSkewRef.current.style.transform = `skewX(${skew}deg)`;
        if (skewResetTimer.current) clearTimeout(skewResetTimer.current);
        skewResetTimer.current = setTimeout(() => {
          if (marqueeSkewRef.current) marqueeSkewRef.current.style.transform = "skewX(0deg)";
        }, 120);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) { setLoaded(true); return; }
    let raf = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setLoadPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLoaded(true), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  useEffect(() => {
    if (loaded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [loaded]);

  const onHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = heroGlowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(620px circle at ${x}px ${y}px, rgba(252,138,23,0.18), transparent 70%)`;
  }, []);

  const pauseMarquee = (ref: React.RefObject<HTMLDivElement | null>) => () => {
    if (ref.current) ref.current.style.animationPlayState = "paused";
  };
  const resumeMarquee = (ref: React.RefObject<HTMLDivElement | null>) => () => {
    if (ref.current) ref.current.style.animationPlayState = "running";
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    mobileMenuCloseBtnRef.current?.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const openWhatsApp = useCallback(() => {
    const lines = [
      "Zdravo Sergej,", "",
      `Ime: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      `Vrsta saradnje: ${form.mode}`,
      `Cilj: ${form.goal}`, "",
      "Poruka:", form.message || "-", "", "Hvala!",
    ];
    window.open(
      `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank", "noopener,noreferrer"
    );
  }, [form]);

  const marqueeItems = useMemo(() => [...MARQUEE_WORDS, ...MARQUEE_WORDS], []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }} />

      {/* Preloader */}
      <div className={`gt-preloader ${loaded ? "gt-preloader--done" : ""}`} aria-hidden="true">
        <div className="gt-preloader-inner">
          <span className="gt-preloader-word">Sergej Janjić</span>
          <span className="gt-preloader-pct">{loadPct}</span>
        </div>
        <div className="gt-preloader-bar"><span style={{ width: `${loadPct}%` }} /></div>
      </div>

      {/* Custom kursor + atmosfera (desktop only) */}
      <CustomCursor active={motionFX} />
      <div className="gt-noise" aria-hidden="true" />

      {/* Scroll progress bar */}
      <div className="fixed left-0 top-0 z-[70] h-[3px] w-full bg-transparent" aria-hidden="true">
        <div className="h-full bg-theme transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ════════════════════════════ HEADER ════════════════════════════ */}
      <header className={`fixed left-0 right-0 top-0 z-50 font-heading transition-all duration-300 ${
        scrolled
          ? "bg-white/96 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl"
          : "bg-[#08090b]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      }`}>
        <div className={`${cx} py-4 lg:py-3`}>

          {/* Desktop (lg+) — jedan red, nepromijenjeno */}
          <div className="hidden items-center justify-between lg:flex">
            <a href="#hero" className="flex items-center gap-3">
              <div className="gt-cut-sm flex h-11 w-11 items-center justify-center bg-theme shadow-[0_8px_24px_rgba(252,138,23,0.35)]">
                <span className="font-heading text-lg font-bold text-white">S</span>
              </div>
              <div className="leading-tight">
                <div className="font-heading text-sm font-bold tracking-wide text-theme">Sergej Janjić</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-theme">Personal Coaching</div>
              </div>
            </a>

            <nav className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
                    scrolled ? "text-header hover:text-theme" : "text-white hover:text-theme"
                  }`}
                >{link.label}</a>
              ))}
            </nav>

            <ThemeBtn href="#contact" showArrow={false} className="!min-h-[40px] !px-7 !py-3 !text-sm">
              JAVI SE
            </ThemeBtn>
          </div>

          {/* Mobile/tablet (< lg) — logo+ime lijevo, burger desno, bez JAVI SE dugmeta */}
          <div className="flex items-center justify-between lg:hidden">
            <a href="#hero" className="flex items-center gap-3">
              <div className="gt-cut-sm flex h-11 w-11 items-center justify-center bg-theme shadow-[0_8px_24px_rgba(252,138,23,0.35)]">
                <span className="font-heading text-lg font-bold text-white">S</span>
              </div>
              <div className="leading-tight">
                <div className="font-heading text-sm font-bold tracking-wide text-theme">Sergej Janjić</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-theme">Personal Coaching</div>
              </div>
            </a>

            <button
              className="flex flex-col gap-1.5 rounded-xl p-2"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
            >
              <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${mobileMenuOpen ? "opacity-0"              : ""}`} />
              <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════ MOBILE MENU ═══════════════════════════ */}
      <div id="mobile-menu" className={`fixed inset-0 z-[60] lg:hidden ${mobileMenuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Glavni meni"
          aria-hidden={!mobileMenuOpen}
          className={`absolute right-0 top-0 h-full w-full max-w-[400px] bg-[#08090b] shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
            <a href="#hero" onClick={closeMobileMenu} className="flex items-center gap-3">
              <div className="gt-cut-sm flex h-9 w-9 items-center justify-center bg-theme">
                <span className="font-heading text-base font-bold text-white">S</span>
              </div>
              <div className="leading-tight">
                <div className="font-heading text-sm font-bold text-white">Sergej Janjić</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-theme">Personal Coaching</div>
              </div>
            </a>
            <button
              ref={mobileMenuCloseBtnRef}
              onClick={closeMobileMenu}
              className="grid h-10 w-10 place-items-center rounded-xl text-white/60 transition hover:text-theme"
              aria-label="Zatvori meni"
            >✕</button>
          </div>

          <div className="h-[calc(100%-72px)] overflow-y-auto px-5 py-6">
            <nav className="space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="gt-cut-sm flex items-center justify-between border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-base font-bold uppercase tracking-[0.08em] text-white transition hover:border-theme/40 hover:bg-white/[0.08] hover:text-theme"
                >
                  {link.label}
                  <ArrowIcon className="h-4 w-4 text-theme" />
                </a>
              ))}
            </nav>

            <div className="mt-6 space-y-3">
              <ThemeBtn href="#contact" className="w-full !justify-center" onClick={closeMobileMenu}>
                JAVI SE
              </ThemeBtn>
              <div className="grid grid-cols-2 gap-3">
                <a href={SERGEJ_IG} target="_blank" rel="noopener noreferrer"
                  className="gt-cut-sm flex items-center justify-center gap-2 border border-white/[0.10] bg-white/[0.04] py-4 font-semibold text-white transition hover:border-theme/50 hover:text-theme">
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href={GYM_IG} target="_blank" rel="noopener noreferrer"
                  className="gt-cut-sm flex items-center justify-center gap-2 border border-white/[0.10] bg-white/[0.04] py-4 text-white transition hover:border-theme/50 hover:text-theme">
                  <DumbbellIcon className="h-5 w-5" />
                  <span className="sr-only">Teretana</span>
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Kontakt</p>
              <a className="mt-3 block font-heading text-lg font-semibold text-white transition hover:text-theme" href={`tel:+${PHONE_E164}`}>
                {PHONE_DISPLAY}
              </a>
              <a className="mt-1.5 block text-sm leading-relaxed text-white/50 transition hover:text-theme" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                {ADDRESS}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════ HERO ═══════════════════════════ */}
      <section id="hero" onMouseMove={onHeroMouseMove} className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div
          ref={heroBgRef}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero/sergej-hero.jpg')", transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#08090b] via-[#08090b]/88 to-[#08090b]/45" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#08090b]/90 via-[#08090b]/20 to-transparent" />
        <div className="absolute left-0 top-1/4 z-[1] h-[600px] w-[600px] -translate-x-1/4 rounded-full bg-theme/[0.08] blur-[120px]" />
        <div ref={heroGlowRef} className="pointer-events-none absolute inset-0 z-[2] transition-[background] duration-150" aria-hidden="true" />
        <ParticleField active={motionFX} />

        <div className={`${cx} relative z-10 pb-24 pt-40 md:pb-28 lg:pb-32 lg:pt-44`}>
          <div className="max-w-4xl">
            <Reveal variant="fade">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  Dostupan za nove klijente
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-theme" />
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-theme">Personal Coaching</span>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <h1 className="text-[clamp(3.2rem,9vw,7rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
                SISTEM, NE NAGAĐANJE.
                <br />
                <span className="gt-gradient-text">REZULTAT</span>{" "}
                <span className="font-serif text-[0.8em] font-normal italic text-white/90">koji ostaje</span>
              </h1>
            </Reveal>

            <Reveal delay={340}>
              <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
                Ne dobijaš gotov program sa interneta. Dobijaš plan pisan za tebe, treniraš sa jasnim ciljem i znaš tačno zašto radiš ono što radiš, iz nedjelje u nedjelju, bez lutanja.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <ThemeBtn href="#contact" className="w-full sm:w-auto">ZAPOČNI SARADNJU</ThemeBtn>
                <ThemeBtn href="#services" variant="border" showArrow={false} className="w-full sm:w-auto">VRSTE SARADNJE</ThemeBtn>
              </div>
            </Reveal>

            <Reveal delay={500} variant="scale">
              <div className="gt-cut-lg mt-14 grid max-w-md grid-cols-3 gap-4 border border-white/[0.10] bg-white/[0.05] p-6 backdrop-blur-md sm:p-7">
                {([["300+","Saradnji"],["1:1","Pristup"],["100%","Posvećenost"]] as const).map(([big,small]) => (
                  <div key={small}>
                    <div className="font-heading text-3xl font-bold text-theme sm:text-[2.2rem]"><Counter value={big} /></div>
                    <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{small}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">Skroluj</span>
          <div className="gt-scrollcue h-9 w-px bg-white/20" />
        </div>
      </section>

      {/* ═══════════════════════════ MARQUEE ════════════════════════════ */}
      <div
        className="overflow-hidden bg-[#08090b] py-5"
        onMouseEnter={pauseMarquee(marqueeTopRef)}
        onMouseLeave={resumeMarquee(marqueeTopRef)}
      >
        <div ref={marqueeSkewRef} className="gt-kinetic-wrap">
          <div ref={marqueeTopRef} style={{ animation: "marquee 20s linear infinite" }} className="flex whitespace-nowrap">
            {marqueeItems.map((w, i) => (
              <span key={`${w}-${i}`} className="px-8 font-heading text-[13px] font-semibold uppercase tracking-[0.18em] text-white/60">
                <span className="text-theme" aria-hidden="true">/</span> {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════ ABOUT ════════════════════════════ */}
      <section id="about" className="section-padding relative">
        <div className="gt-orb gt-orb--red h-[420px] w-[420px] -left-32 top-10" aria-hidden="true" />
        <div className="gt-trans-text" aria-hidden="true">COACHING</div>

        <div className={`${cx} relative z-10`}>
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">

            <Reveal variant="scale" className="relative">
              <div className="gt-cut-lg absolute -left-4 -top-4 -z-10 hidden h-full w-full -rotate-3 border border-theme/25 sm:block" aria-hidden="true" />
              <div className="grid grid-cols-2 gap-5">
                <div className="gt-cut-lg relative aspect-[3/4] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
                  <Image src="/images/form/sergej-form-1.png" alt="Sergej Janjić, personalni trener u Banja Luci, tokom treninga" fill sizes="(max-width: 768px) 45vw, 320px" className="gt-img-hover object-cover" />
                </div>
                <div className="gt-cut-lg-r relative mt-10 aspect-[3/4] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
                  <Image src="/images/form/sergej-form-2.png" alt="Sergej Janjić demonstrira pravilnu tehniku izvođenja vježbe" fill sizes="(max-width: 768px) 45vw, 320px" className="gt-img-hover object-cover" />
                </div>
              </div>
              <div className="gt-cut-md relative z-10 -mt-10 ml-5 inline-flex items-center gap-3 bg-theme px-6 py-4 shadow-[0_20px_40px_rgba(252,138,23,0.30)]">
                <span className="font-heading text-3xl font-bold text-white"><Counter value="300+" /></span>
                <span className="text-sm font-bold uppercase leading-tight text-white/90">Uspješnih<br />saradnji</span>
              </div>
            </Reveal>

            <div>
              <Reveal delay={100}>
                <div className="gt-section-title">
                  <Eyebrow index="01" label="O meni" />
                  <h2>Sergej <span className="font-serif text-[0.9em] font-normal italic text-theme">Janjić</span></h2>
                </div>

                <p className="mt-7 max-w-xl leading-8 text-txt">
                  Vidio sam dovoljno ljudi da odustanu poslije dvije nedjelje ekstremne dijete da više ne vjerujem u prečice. Radi jasan plan, iskrena komunikacija i tempo koji možeš da izdržiš, ne tri mjeseca nego trajno.
                </p>
                <p className="mt-4 max-w-xl leading-8 text-txt">
                  Na treningu sam miran i precizan. Ne vičem, ne motivišem parolama. Pratim brojke, pravim korekcije i gradim naviku koja ostaje i kad mene nema.
                </p>
              </Reveal>

              <div className="mt-10 space-y-4">
                {[
                  { Icon: ShieldIcon, title: "Tehnika & sigurnost", desc: "Loša tehnika te prije ili kasnije izbaci iz stroja. Ispravljam je prije nego što postane problem." },
                  { Icon: ChartIcon,  title: "Struktura & progres",  desc: "Svaki trening ima razlog. Napredak mjerim brojkama, ne osjećajem."  },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={180 + i * 100}>
                    <div className="gt-soft-card gt-cut-md flex gap-5 p-6">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center gt-cut-sm bg-theme/10 text-theme">
                        <item.Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="mb-1.5 text-header">{item.title}</h4>
                        <p className="text-sm leading-7 text-txt">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={420}>
                <div className="mt-10">
                  <ThemeBtn href="#contact" className="w-full sm:w-auto">JAVI SE</ThemeBtn>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SERVICES ════════════════════════════ */}
      <section id="services" className="section-padding section-bg-2 relative">
        <div className="gt-orb gt-orb--ember h-[380px] w-[380px] -top-10 right-0" aria-hidden="true" />
        <div className={`${cx} relative z-10`}>

          <Reveal>
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="gt-section-title">
                <Eyebrow index="02" label="Vrste saradnje" />
                <h2>Saradnja <span className="font-serif text-[0.85em] font-normal italic text-theme">(1:1)</span></h2>
              </div>
              <ThemeBtn href="#contact" className="w-full sm:w-auto">JAVI SE</ThemeBtn>
            </div>

            <p className="mb-14 max-w-3xl leading-8 text-txt">
              Sve je 1:1, uživo ili online. Prvo pričamo o cilju i rasporedu, onda gradim
              sistem koji možeš da održavaš i kad ti se raspored raspadne. Cijena se dogovara poslije kratkog poziva.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "01", title: "Start & procjena",     desc: "Prije prvog treninga pričamo o cilju, navikama, rasporedu i onome što ti realno stoji na putu. Plan se pravi oko tebe, ne obrnuto." },
              { num: "02", title: "Plan & progres",        desc: "Nema kopiranih programa sa interneta. Svaka nedjelja je smišljena za tebe, sa jasnom progresijom: znaš tačno šta radiš i zašto."        },
              { num: "03", title: "Praćenje & korekcije", desc: "Plan je samo početak. Pratim svaki trening, mijenjam ono što ne radi i javljam se prije nego što ti stigneš da odustaneš." },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 120} className="h-full">
                <TiltCard className="gt-glare gt-cut-lg group relative flex h-full flex-col overflow-hidden bg-white p-8 shadow-[0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.11)]">
                  <div className="absolute right-6 top-5 select-none font-heading text-[72px] font-bold leading-none text-header/[0.05] transition-colors group-hover:text-theme/[0.10]" aria-hidden="true">
                    {item.num}
                  </div>
                  <div className="relative z-10">
                    <div className="mb-5 h-1.5 w-10 rounded-full bg-theme" />
                    <h3 className="mb-3 text-header">{item.title}</h3>
                    <p className="text-sm leading-7 text-txt">{item.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 md:items-stretch">
            {[
              { Icon: DumbbellIcon, title: "Uživo (1:1)",  desc: "U sali, oči u oči. Ispravljam tehniku uživo, prije nego što greška postane navika."       },
              { Icon: OrbitIcon,    title: "Online (1:1)", desc: "Isti sistem, gdje god da si. Video-provjere forme i plan koji se prilagođava tvom danu." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 120} className="h-full">
                <div className="gt-dark-card gt-cut-lg flex h-full items-center gap-6 p-8 transition-all hover:-translate-y-1">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center gt-cut-sm border-2 border-theme/60 bg-white/[0.05] text-theme">
                    <item.Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-white">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ RESULTS ══════════════════════════════ */}
      <section id="results" className="section-padding relative">
        <div className="gt-orb gt-orb--red h-[420px] w-[420px] -right-40 top-1/3" aria-hidden="true" />
        <div className="gt-trans-text" aria-hidden="true">REZULTAT</div>

        <div className={`${cx} relative z-10`}>
          <Reveal>
            <div className="mb-12 text-center">
              <Eyebrow index="03" label="Dokaz" className="mx-auto" />
              <h2 className="mx-auto">Stvarni <span className="font-serif text-[0.85em] font-normal italic text-theme">rezultati</span></h2>
              <p className="mt-4 text-txt">Realno • Mjerljivo • Održivo</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Coverflow items={TESTIMONIALS} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════ CASE STUDY ═══════════════════════════ */}
      <section id="case-study" className="section-padding section-bg-2 relative">
        <div className="gt-orb gt-orb--ember h-[380px] w-[380px] -left-32 bottom-0" aria-hidden="true" />
        <div className={`${cx} relative z-10`}>
          <Reveal>
            <Eyebrow index="04" label="Studija slučaja" />
            <h2 className="max-w-2xl">Kako je Marko skinuo <span className="font-serif text-[0.85em] font-normal italic text-theme">20 kilograma</span></h2>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <Reveal variant="scale">
              <div className="gt-cut-lg relative aspect-[4/5] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
                <Image
                  src="/images/transformations/client-3.jpg"
                  alt="Marko prije i poslije transformacije, sa 104kg na 84kg"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div className="gt-cut-md mb-8 grid grid-cols-2 gap-x-4 gap-y-5 border border-gray-100 bg-white p-6 sm:grid-cols-4">
                  {([["104kg","Početna kilaža"],["84kg","Završna kilaža"],["7","Mjeseci"],["0","Povreda"]] as const).map(([big, small]) => (
                    <div key={small}>
                      <div className="font-heading text-lg font-bold text-theme sm:text-xl">{big}</div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-txt sm:text-[11px]">{small}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="space-y-6">
                <Reveal delay={80}>
                  <div>
                    <h4 className="mb-2 text-header">Izazov</h4>
                    <p className="leading-7 text-txt">Marko je došao sa 104kg, bez ijednog treninga iza sebe i sa dvije neuspjele dijete koje je odustao poslije mjesec dana. Cilj: da skine kilograme bez da opet odustane.</p>
                  </div>
                </Reveal>
                <Reveal delay={160}>
                  <div>
                    <h4 className="mb-2 text-header">Pristup</h4>
                    <p className="leading-7 text-txt">Krenuli smo polako: tri treninga sedmično i plan ishrane koji nije zahtijevao gladovanje, uz redovne korekcije kad je motivacija padala. Brzina nikad nije išla na račun doslednosti.</p>
                  </div>
                </Reveal>
                <Reveal delay={240}>
                  <div>
                    <h4 className="mb-2 text-header">Rezultat</h4>
                    <p className="leading-7 text-txt">Za sedam mjeseci: 104kg → 84kg, bez povreda i bez jo-jo efekta. Danas Marko trenira samostalno i nikad se nije vratio na staru težinu.</p>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={320}>
                <blockquote className="gt-cut-md mt-8 border-l-4 border-theme bg-theme/5 p-6">
                  <p className="font-serif text-lg italic leading-8 text-header">&ldquo;Prvi put mi je neko dao plan koji sam stvarno mogao da izdržim.&rdquo;</p>
                  <footer className="mt-3 text-sm font-semibold text-txt">— Marko</footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FAQ ════════════════════════════════ */}
      <section id="faq" className="section-padding relative">
        <div className={`${cx} relative z-10`}>
          <Reveal>
            <div className="mb-14 text-center">
              <Eyebrow index="05" label="Pitanja" className="mx-auto" />
              <h2 className="mx-auto">Prije nego <span className="font-serif text-[0.85em] font-normal italic text-theme">pitaš</span></h2>
            </div>
          </Reveal>

          <div className="mx-auto max-w-2xl space-y-4">
            {FAQS.map((item, i) => (
              <Reveal key={item.q} delay={i * 80}>
                <FaqItem q={item.q} a={item.a} />
              </Reveal>
            ))}
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      </section>

      {/* ══════════════════════════ CTA BANNER ═══════════════════════════ */}
      <section className="relative overflow-hidden bg-cover bg-fixed bg-center py-32" style={{ backgroundImage: "url('/images/hero/sergej-hero.jpg')" }}>
        <div className="absolute inset-0 bg-[#08090b]/92" />

        <div className={`${cx} relative z-10`}>
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow index="06" label="Spreman?" light />
              <h2 className="text-white">Sljedeći korak je <span className="font-serif text-[0.85em] font-normal italic text-white/90">jedna poruka</span></h2>

              <p className="mt-6 max-w-xl leading-8 text-white/65">
                Prvi razgovor je besplatan i bez obaveze. Pričamo o cilju i vidimo da li se uklapamo.
                Ako da, kreće plan. Ako ne, bar znaš na čemu si.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
                {["Raspored oko tvog života","Direktna linija do mene","Plan pisan za tebe","Korekcije iz nedjelje u nedjelju","Bez gotovih šablona","Rezultat koji traje"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base font-semibold text-white/85 sm:text-lg">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-theme/20 text-theme">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <ThemeBtn href="#contact" className="w-full sm:w-auto">KONTAKTIRAJ ME</ThemeBtn>
                <ThemeBtn onClick={openWhatsApp} variant="border" className="w-full sm:w-auto">WHATSAPP UPIT</ThemeBtn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CONTACT ══════════════════════════════ */}
      <section id="contact" className="section-padding relative">
        <div className="gt-orb gt-orb--ember h-[380px] w-[380px] -left-20 bottom-0" aria-hidden="true" />
        <div className={`${cx} relative z-10`}>

          <Reveal>
            <div className="mb-16 text-center">
              <Eyebrow index="07" label="Kontakt" className="mx-auto" />
              <h2 className="mx-auto">Pošalji <span className="font-serif text-[0.85em] font-normal italic text-theme">upit</span></h2>
              <p className="mx-auto mt-5 max-w-2xl leading-8 text-txt">
                Napiši cilj, iskustvo i kad ti odgovara termin. Javljam se sa konkretnim prijedlogom, ne generičkim odgovorom.
              </p>
              <div className="mx-auto mt-6 inline-flex items-center gap-2 gt-cut-sm border border-theme/25 bg-theme/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-theme">
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-theme" />
                Odgovaram u roku od 24h
              </div>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">

            <Reveal variant="left" className="gt-dark-card gt-cut-lg p-8 sm:p-10">
              <h3 className="mb-8 text-white">Kontakt info</h3>

              {[
                { Icon: PhoneIcon, label: "Telefon", value: PHONE_DISPLAY, href: `tel:+${PHONE_E164}`, target: undefined },
                { Icon: PinIcon,   label: "Adresa",  value: ADDRESS,        href: MAPS_LINK,           target: "_blank"  },
              ].map((item, i) => (
                <div key={item.label} className={`flex gap-5 py-6 ${i > 0 ? "border-t border-white/[0.08]" : ""}`}>
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center gt-cut-sm bg-white/[0.08] text-theme">
                    <item.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{item.label}</p>
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      className="text-base font-semibold text-white transition hover:text-theme"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}

              <div className="mt-2 border-t border-white/[0.08] pt-7">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Zaprati</p>
                <div className="grid grid-cols-1 gap-3">
                  <a href={SERGEJ_IG} target="_blank" rel="noopener noreferrer"
                    className="gt-cut-sm flex h-16 items-center justify-center gap-2 bg-white/[0.07] text-base font-bold text-white transition hover:bg-theme">
                    <InstagramIcon className="h-5 w-5" /> Instagram
                  </a>
                  <a href={GYM_IG} target="_blank" rel="noopener noreferrer" title="Teretana"
                    className="gt-cut-sm flex h-16 items-center justify-center gap-2 bg-white/[0.07] text-base font-bold text-white transition hover:bg-theme">
                    <DumbbellIcon className="h-5 w-5" /> Teretana
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120} className="gt-soft-card gt-cut-lg p-8 sm:p-10">
              <h3 className="mb-8 text-header">Pošalji poruku</h3>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (form.website) return; // honeypot popunjen → tiho ignoriši, vjerovatno bot
                const subject = encodeURIComponent(`Upit – ${form.goal} – ${form.name || "Anonimno"}`);
                const body = encodeURIComponent(`Ime: ${form.name || "-"}\nEmail: ${form.email || "-"}\nVrsta saradnje: ${form.mode}\nCilj: ${form.goal}\n\nPoruka:\n${form.message || "-"}`);
                window.location.href = `mailto:janjicsergejcoaching@gmail.com?subject=${subject}&body=${body}`;
                router.push("/hvala");
              }}>
                {/* Honeypot — sakriven od ljudi, botovi ga obično popune */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                />

                <div className="grid gap-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <input
                      id="contact-name" name="name" required minLength={2}
                      className="w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header placeholder:text-txt/50 focus:border-theme"
                      placeholder="Ime *"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    />
                    <input
                      id="contact-phone" name="phone" type="tel"
                      className="w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header placeholder:text-txt/50 focus:border-theme"
                      placeholder="Telefon (opciono)"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <select
                      id="contact-mode" name="mode"
                      className="w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header focus:border-theme"
                      value={form.mode}
                      onChange={(e) => setForm((p) => ({ ...p, mode: e.target.value as typeof form.mode }))}
                    >
                      <option value="Uživo (1:1)">Uživo (1:1)</option>
                      <option value="Online (1:1)">Online (1:1)</option>
                    </select>
                    <select
                      id="contact-goal" name="goal"
                      className="w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header focus:border-theme"
                      value={form.goal}
                      onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value as typeof form.goal }))}
                    >
                      <option value="Mršavljenje">Mršavljenje</option>
                      <option value="Mišićna masa">Mišićna masa</option>
                      <option value="Kondicija">Kondicija</option>
                      <option value="Rekompozicija">Rekompozicija</option>
                      <option value="Povratak u formu">Povratak u formu</option>
                    </select>
                  </div>

                  <textarea
                    id="contact-message" name="message" required minLength={10}
                    className="min-h-[180px] w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header placeholder:text-txt/50 focus:border-theme"
                    placeholder="Poruka (iskustvo, ograničenja, termini...) *"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />

                  <div className="pt-2">
                    <ThemeBtn type="submit" className="w-full !justify-center">POŠALJI PORUKU</ThemeBtn>
                  </div>

                  <p className="text-xs text-txt/50">
                    * obavezna polja. Klikom na dugme otvara se tvoj mail sa pripremljenom porukom.
                  </p>
                </div>
              </form>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-8">
            <div className="gt-cut-lg relative h-[320px] w-full overflow-hidden border border-gray-100">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokacija Sergeja Janjića (Personal Coaching)"
              />
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="gt-cut-sm absolute bottom-4 right-4 inline-flex items-center gap-2 bg-theme px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5"
              >
                <PinIcon className="h-4 w-4" /> Otvori u mapama
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════ FOOTER ══════════════════════════════ */}
      <footer className="relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/hero/sergej-hero.jpg')" }}>
        <div className="absolute inset-0 bg-[#08090b]/97" />

        <div className="relative z-10">
          <div className={`${cx} py-20 sm:py-24`}>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">

              <div>
                <h3 className="mb-10 text-2xl font-bold text-white">Kontakt info</h3>
                <ul className="space-y-8">
                  {[
                    { Icon: PinIcon,   label: "Adresa",  value: ADDRESS,       href: MAPS_LINK,            target: "_blank"  },
                    { Icon: PhoneIcon, label: "Telefon", value: PHONE_DISPLAY, href: `tel:+${PHONE_E164}`, target: undefined },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-5">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center gt-cut-sm bg-white/[0.08] text-theme">
                        <item.Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{item.label}</p>
                        <a
                          href={item.href}
                          target={item.target}
                          rel={item.target ? "noopener noreferrer" : undefined}
                          className="text-sm font-semibold text-white/75 transition hover:text-theme"
                        >{item.value}</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a href="#hero" className="mb-7 flex items-center gap-3">
                  <div className="gt-cut-sm flex h-11 w-11 items-center justify-center bg-theme">
                    <span className="font-heading text-lg font-bold text-white">S</span>
                  </div>
                  <div>
                    <div className="font-heading text-sm font-bold text-white">Sergej Janjić</div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-theme">Personal Coaching</div>
                  </div>
                </a>

                <p className="mb-7 max-w-sm text-sm leading-7 text-white/55">
                  1:1 coaching • uživo i online • Banja Luka. Mirno, precizno i
                  sistemski, da napredak bude stabilan, ne slučajan.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a href={SERGEJ_IG} target="_blank" rel="noopener noreferrer"
                    className="gt-cut-sm inline-flex h-11 items-center justify-center gap-2 border border-white/[0.10] bg-white/[0.04] px-5 text-sm font-semibold text-white/70 transition hover:border-theme/40 hover:text-theme">
                    <InstagramIcon className="h-4 w-4" /> Instagram
                  </a>
                  <a href="#contact"
                    className="gt-cut-sm inline-flex h-11 items-center justify-center gap-2 border border-white/[0.10] bg-white/[0.04] px-5 text-sm font-semibold text-white/70 transition hover:border-theme/40 hover:text-theme">
                    Kontakt
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.07]">
            <div className={`${cx} flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between`}>
              <p className="text-sm text-white/50">
                © {new Date().getFullYear()} <b className="text-white/65">Sergej Janjić</b>. Sva prava zadržana.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
                <Link href="/privacy" className="transition hover:text-theme">Politika privatnosti</Link>
                <Link href="/terms" className="transition hover:text-theme">Uslovi korišćenja</Link>
                <a href="#contact" className="transition hover:text-theme">Kontakt</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <MobileActionBar onWhatsApp={openWhatsApp} />
    </>
  );
}
