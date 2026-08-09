"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// A small buffer past the true fold line. Next.js can mount a route's
// content twice in quick succession during navigation, and each mount
// measures element position independently — a few px of layout variance
// between those two measurements shouldn't be able to flip an element
// between "already visible" and "hidden, animate in on scroll" (that
// disagreement is what caused content to flash/reset). Elements need to
// be clearly below the fold, not just barely, to get the reveal treatment.
const FOLD_BUFFER = 80;

/**
 * Fades + slides its children up as they scroll into view. Each direct
 * child that has the `data-reveal` attribute is staggered individually;
 * otherwise the whole container reveals as one block. Content already
 * visible at mount is left alone immediately (no animation, no flash) —
 * PageTransition already handles the "just arrived" fade for that.
 */
export default function AnimatedSection({
  children,
  className = "",
  as: Tag = "div",
  stagger = 0.08,
  ...props
}) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray("[data-reveal]", scope.current);
      const els = targets.length ? targets : Array.from(scope.current.children);

      const belowFold = els.filter(
        (el) => el.getBoundingClientRect().top > window.innerHeight + FOLD_BUFFER
      );
      if (belowFold.length === 0) return;

      gsap.from(belowFold, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope }
  );

  return (
    <Tag ref={scope} className={className} {...props}>
      {children}
    </Tag>
  );
}
