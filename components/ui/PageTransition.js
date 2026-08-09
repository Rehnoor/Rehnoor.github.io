"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

// Next.js route navigations run inside a React transition, and
// AnimatePresence's mount/unmount-driven exit animation can't reliably
// coordinate with that: the new route's DOM can commit and paint at full
// opacity before Motion's effects apply the "hidden" starting state, so
// content flashes in, then the exit/enter animation replays late (the
// "double render" flicker). Native ViewTransition avoids the race — the
// browser snapshots the old and new DOM atomically and crossfades between
// them, so there's nothing for a JS effect to lose a timing race against.
export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} name="page-content" default="none">
      {children}
    </ViewTransition>
  );
}
