"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-32 text-center">
      <p className="font-mono text-sm text-accent">500</p>
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        Well, that's not supposed to happen.
      </h1>
      <p className="text-foreground/70">
        Something broke on this page. It's probably my fault, not yours.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
