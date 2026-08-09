import Link from "next/link";

export const metadata = {
  title: "Forbidden",
  robots: { index: false },
};

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-black px-6 py-32 text-center text-white">
      <p className="font-mono text-sm tracking-[0.3em] text-secondary">
        SECURITY CLEARANCE REQUIRED
      </p>
      <h1 className="font-display text-4xl font-bold text-secondary sm:text-5xl">
        ACCESS DENIED
      </h1>
      <p className="max-w-md text-white/70">
        You have triggered a security protocol that does not exist, guarded
        by a firewall that is also fictional. Nice try, though.
      </p>
      <p className="font-mono text-xs text-white/40">
        (relax — there's no real security here, this page is just for fun)
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-secondary hover:text-secondary"
      >
        Retreat to safety
      </Link>
    </div>
  );
}
