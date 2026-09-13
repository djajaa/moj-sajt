"use client";

import { useEffect, useRef } from "react";

// ─── Preloader ("REGISTAR") ─────────────────────────────────────────────────
// Riječ SISTEM se ispisuje u pet vodoravnih traka koje su namjerno razmaknute
// kao loše poravnan otisak. Kako napredak raste, trake sjedaju na svoje mjesto
// jedna po jedna (srednja zadnja, pa se riječ zatvara od sredine), a broj u
// donjem desnom uglu je jedino što se pomjera kontinuirano. Kad je 100%
// dostignuto, riječ ne nestaje: fizički odleti i slegne se tačno na poziciju
// prve riječi hero naslova (isti tekst, "SISTEM"), dok se crni zastor diže
// dijagonalno i otkriva stranicu iza sebe.
//
// Komponenta namjerno ne drži napredak u React stanju: sve što se mijenja
// svaki frejm (brojke, zaključavanje traka, skala bloka) piše se direktno
// kroz ref-ove, pa se roditelj (Home, ~1700 linija JSX-a) ne re-renderuje
// 60 puta u sekundi dok se ovo vrti. Roditelj dobija tačno dva poziva:
// onExitStart (riječ kreće da leti, otkopčaj ostatak heroa) i onGone
// (animacija gotova, ukloni ovaj sloj iz stabla).

const RUN_MS       = 1300; // trajanje brojanja 0 → 100, linearno, bez ubrzanja na kraju
const HARD_CAP_MS  = 2100; // apsolutni plafon čekanja na hero sliku, posjetilac nikad ne čeka duže
const HOLD_MS      = 170;  // tišina na 100% prije nego krene izlazak
const FONT_GATE_MS = 400;  // koliko najduže čekamo da se font ustali prije prvog crteža
const HERO_IMAGE   = "/images/hero/sergej-hero.jpg";

// Prag napretka (0 do 1) na kojem se koja traka (po indeksu, od vrha ka dnu)
// uglavi na mjesto. Redoslijed zaključavanja je 1, 0, 3, 4, 2: srednja traka
// (2) zadnja, pa se riječ zatvara na sredini, ne odozgo naniže kao roleta.
const LOCK_AT: readonly number[] = [0.40, 0.25, 0.94, 0.62, 0.80];

// Diskretna skala bloka po broju već zaključanih traka (0 do 5). Ne prati se
// svaki frejm: mijenja se tačno pet puta, u istom trenutku kad i zaključavanje,
// tako da je brojač jedino kontinuirano pokretno na cijelom ekranu.
const SCALE_BY_LOCKED: readonly number[] = [1.045, 1.035, 1.024, 1.013, 1.004, 1.0];

export default function Preloader({
  onExitStart,
  onGone,
}: {
  onExitStart: () => void;
  onGone: () => void;
}) {
  const rootRef   = useRef<HTMLDivElement | null>(null);
  const blockRef  = useRef<HTMLDivElement | null>(null);
  const wordRef   = useRef<HTMLDivElement | null>(null);
  const bandRefs  = useRef<Array<HTMLSpanElement | null>>([]);
  const digitRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Provjeri sinhrono, prije prve animacije: ako korisnik traži manje
    // pokreta, preskoči kompletnu predstavu. CSS medijski upit ispod je
    // druga linija odbrane za slučaj da se ovaj efekat izvrši kasno.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onExitStart();
      onGone();
      return;
    }

    document.body.style.overflow = "hidden";

    let cancelled = false;
    let raf = 0;
    let imgReady = false;
    let lastDigits = "";

    // Pokreni preuzimanje hero fotografije čim se ovo montira, ne čekaj da
    // korisnik dođe do nje skrolom. Zastor se ne smije podići na praznu sliku.
    const img = new window.Image();
    img.src = HERO_IMAGE;
    const markImgReady = () => { imgReady = true; };
    if (typeof img.decode === "function") {
      img.decode().then(markImgReady).catch(markImgReady);
    } else {
      img.onload = markImgReady;
      img.onerror = markImgReady;
    }

    const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    const fontTimeout = new Promise((resolve) => setTimeout(resolve, FONT_GATE_MS));

    const setDigits = (pct: number) => {
      const s = String(pct).padStart(3, "0");
      if (s === lastDigits) return;
      lastDigits = s;
      digitRefs.current.forEach((el, i) => { if (el) el.textContent = s[i]; });
    };

    let lockedCount = 0;
    const lockBand = (i: number) => {
      const band = bandRefs.current[i];
      if (!band || band.dataset.locked === "1") return;
      band.style.willChange = "transform";
      band.dataset.locked = "1";
      window.setTimeout(() => { band.style.willChange = ""; }, 420);
      lockedCount += 1;
      blockRef.current?.style.setProperty("--pl-scale", String(SCALE_BY_LOCKED[lockedCount] ?? 1));
    };

    const beginExit = () => {
      if (cancelled) return;
      root.dataset.state = "exit";

      // Riječ ne nestaje: fizički se preseli na poziciju prve riječi hero
      // naslova (FLIP tehnika, jedno mjerenje geometrije, jednom).
      const word = wordRef.current;
      const target = document.querySelector<HTMLElement>("[data-pl-target]");
      let matched = false;
      if (word && target) {
        const a = word.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        if (a.width > 1 && b.width > 1) {
          const scale = b.width / a.width;
          // Ako je razmjer van razumnog opsega, mjerenje je vjerovatno
          // pogrešno (font još nije spreman, layout se pomjerio) — umjesto
          // da riječ odleti na pogrešno mjesto, koristi siguran izlaz ispod.
          if (scale > 0.15 && scale < 1.6) {
            const dx = b.left - a.left;
            const dy = b.top - a.top;
            word.style.transformOrigin = "0 0";
            word.style.transition = "transform 620ms var(--ease-out-expo), opacity 150ms linear 460ms";
            requestAnimationFrame(() => {
              word.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
            });
            matched = true;
          }
        }
      }
      if (!matched && word) {
        word.style.transition = "transform 420ms var(--ease-out-expo), opacity 300ms linear 220ms";
        word.style.transform = "scale(1.5)";
        word.style.opacity = "0";
      }

      onExitStart();

      // Namjerno setTimeout a ne transitionend: ako tab ode u pozadinu ili
      // event ne stigne iz bilo kog razloga, stranica ne smije ostati
      // zaglavljena sa zaključanim skrolom.
      window.setTimeout(() => {
        if (cancelled) return;
        document.body.style.overflow = "";
        onGone();
      }, 720);
    };

    const finish = () => {
      for (let i = 0; i < LOCK_AT.length; i++) lockBand(i); // sigurnosna mreža
      setDigits(100);
      window.setTimeout(beginExit, HOLD_MS);
    };

    const start = (startTime: number) => {
      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed  = now - startTime;
        const p        = Math.min(1, elapsed / RUN_MS);
        const timeDone = p >= 1;
        const imgDone  = imgReady || elapsed > HARD_CAP_MS;

        setDigits(timeDone ? (imgDone ? 100 : 99) : Math.round(p * 100));
        LOCK_AT.forEach((t, i) => { if (p >= t) lockBand(i); });

        if (timeDone && imgDone) { finish(); return; }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    Promise.race([fontsReady, fontTimeout]).then(() => {
      if (!cancelled) start(performance.now());
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="gt-pl" data-state="run" aria-hidden="true" role="presentation">
      <div className="gt-pl-panel" />
      <div className="gt-pl-stage">
        <div ref={blockRef} className="gt-pl-block">
          <div className="gt-pl-meta">
            SERGEJ JANJIĆ <span aria-hidden="true">/</span> BANJA LUKA
          </div>
          <div ref={wordRef} className="gt-pl-word">
            <span className="gt-pl-word-sizer" aria-hidden="true">SISTEM</span>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                ref={(el) => { bandRefs.current[i] = el; }}
                className="gt-pl-band"
                data-i={i}
              >
                SISTEM
              </span>
            ))}
          </div>
          <div className="gt-pl-count">
            {[0, 1, 2].map((i) => (
              <span key={i} ref={(el) => { digitRefs.current[i] = el; }}>0</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
