import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-foreground/70 sm:flex-row sm:justify-between">
        <p>
          &copy; {year} {site.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <Image
              src="/icons/In-Blue-128@2x.png"
              alt=""
              width={20}
              height={20}
              className="dark:hidden"
            />
            <Image
              src="/icons/In-White-128@2x.png"
              alt=""
              width={20}
              height={20}
              className="hidden dark:block"
            />
          </a>
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <Image
              src="/icons/github-mark.png"
              alt=""
              width={20}
              height={20}
              className="dark:hidden"
            />
            <Image
              src="/icons/github-mark-white.png"
              alt=""
              width={20}
              height={20}
              className="hidden dark:block"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
