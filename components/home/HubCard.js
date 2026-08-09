import Link from "next/link";

export default function HubCard({ href, eyebrow, title, description, cta }) {
  return (
    <Link
      href={href}
      data-reveal
      className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-elevated p-8 transition-colors hover:border-accent sm:p-10"
    >
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          {title}
        </h2>
        <p className="text-foreground/70">{description}</p>
      </div>
      <span className="flex items-center gap-2 text-sm font-medium text-accent">
        {cta}
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
