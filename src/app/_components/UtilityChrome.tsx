import Link from "next/link";

// ─── Shared header/footer za utility stranice (privacy, terms, 404) ──────────
// Namjerno jednostavnije od glavnog page.tsx headera — bez scroll-hide logike,
// cursor efekata i mobilne drawer animacije. Server komponenta, bez hookova.

const PHONE_DISPLAY = "+387 66 457 157";
const PHONE_E164 = "38766457157";

export function UtilityHeader() {
  return (
    <header className="border-b border-white/[0.08] bg-[#08090b]">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-8 py-5 sm:px-10 lg:px-14">
        <Link href="/" className="flex items-center gap-3">
          <div className="gt-cut-sm flex h-10 w-10 items-center justify-center bg-theme">
            <span className="font-heading text-base font-bold text-white">S</span>
          </div>
          <div className="leading-tight">
            <div className="font-heading text-sm font-bold text-white">Sergej Janjić</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-theme">Personal Coaching</div>
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70 transition hover:text-theme sm:text-sm"
        >
          ← Nazad na početnu
        </Link>
      </div>
    </header>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://sergejjanjic.com${item.href}` } : {}),
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-txt/60">
        {items.map((item, i) => (
          <span key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition hover:text-theme">{item.label}</Link>
            ) : (
              <span className="text-header">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}

export function UtilityFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#08090b] py-14">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-8 sm:px-10 lg:px-14 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} <b className="text-white/65">Sergej Janjić</b>. Sva prava zadržana.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
          <Link href="/" className="transition hover:text-theme">Početna</Link>
          <Link href="/privacy" className="transition hover:text-theme">Politika privatnosti</Link>
          <Link href="/terms" className="transition hover:text-theme">Uslovi korišćenja</Link>
          <a href={`tel:+${PHONE_E164}`} className="transition hover:text-theme">{PHONE_DISPLAY}</a>
        </div>
      </div>
    </footer>
  );
}
