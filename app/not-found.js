import Link from "next/link";
import Minigame from "@/components/errors/Minigame";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-32 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        Looks like you took a wrong turn somewhere over the Pacific.
      </h1>
      <p className="text-foreground/70">
        This page doesn't exist — or it's hiking a trail I haven't mapped yet.
        Either way, there's nothing to see here.
      </p>
      <Minigame />
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        Take me home
      </Link>
    </div>
  );
}
