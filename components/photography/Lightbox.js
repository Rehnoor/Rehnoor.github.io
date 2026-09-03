"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const TONES = [
  "from-[#5A9FFF] to-[#1A1A2E]",
  "from-[#E94560] to-[#1A1A2E]",
  "from-[#94C2FF] to-[#16213E]",
  "from-[#0F3460] to-[#5A9FFF]",
  "from-[#E94560] to-[#0F3460]",
  "from-[#1A1A2E] to-[#94C2FF]",
];

export default function Lightbox({ photo, onClose, onPrev, onNext }) {
  const mediaRef = useRef(null);
  const [mediaWidth, setMediaWidth] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  // Measure the rendered photo so the caption blocks can match its exact
  // width — the image's width is fluid (driven by its own aspect ratio),
  // so a fixed max-width on the caption wouldn't reliably share its edges.
  // Also resets the "loaded" gate on every photo change: a placeholder
  // (no src) has nothing to wait for, everything else waits for the real
  // <Image> to fire onLoad — or, for a photo already in the browser cache
  // (prev/next between photos you've already viewed), for `.complete` to
  // already be true right after mount, so it doesn't spin needlessly.
  useEffect(() => {
    setMediaWidth(null);
    const hasSrc = Boolean(photo?.src);
    setImageLoaded(!hasSrc);
    const el = mediaRef.current;
    if (!el) return;
    if (hasSrc && el.complete && el.naturalWidth > 0) {
      setImageLoaded(true);
    }
    const observer = new ResizeObserver(([entry]) => {
      setMediaWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [photo?.slug, photo?.src]);

  const captionStyle = mediaWidth
    ? { width: mediaWidth, maxWidth: mediaWidth }
    : undefined;

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white sm:right-8 sm:top-8"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white sm:left-8"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <motion.div
            key={photo.slug}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="flex max-h-full w-full max-w-6xl flex-col items-center gap-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Camera/lens sits above the photo, left-aligned to match its
                edge (via captionStyle). Hidden until the photo has actually
                loaded — nothing to caption yet otherwise. */}
            {imageLoaded && (photo.camera || photo.lens) && (
              <div
                className="flex w-full max-w-2xl shrink-0 flex-col items-center gap-1 text-center text-xs text-white/70 sm:items-start sm:text-left sm:text-sm"
                style={captionStyle}
              >
                {photo.camera && (
                  <span className="flex min-w-0 max-w-full items-center gap-1.5">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <span className="break-words">{photo.camera}</span>
                  </span>
                )}
                {photo.lens && (
                  <span className="flex min-w-0 max-w-full items-center gap-1.5">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <circle cx="12" cy="12" r="8" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="break-words">{photo.lens}</span>
                  </span>
                )}
              </div>
            )}

            <div className="relative shrink-0">
              {photo.src ? (
                <Image
                  ref={mediaRef}
                  src={photo.src}
                  alt={photo.alt}
                  width={2000}
                  height={1500}
                  sizes="92vw"
                  priority
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                  // aspect-[4/3] matches the width/height above and only
                  // acts as a placeholder — the browser swaps to the real
                  // photo's aspect ratio once it loads. Without it, the box
                  // collapses to ~0 while the (often uncached) image is
                  // still fetching, since w-auto/h-auto alone has nothing
                  // to size against yet.
                  className={`block h-auto max-h-[72vh] w-auto max-w-full rounded-xl object-contain transition-opacity duration-200 ${
                    imageLoaded ? "opacity-100" : "aspect-[4/3] opacity-0"
                  }`}
                />
              ) : (
                <div
                  ref={mediaRef}
                  className={`aspect-[4/5] w-full max-w-xl rounded-xl bg-gradient-to-br ${TONES[(photo.tone ?? 0) % TONES.length]}`}
                />
              )}

              {photo.src && !imageLoaded && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 animate-spin text-white/70"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="status"
                    aria-label="Loading photo"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Title/location sits below the photo in normal flow, never on
                top of it, centered to match its width (captionStyle). Same
                white-on-black-backdrop styling and loaded-gate as above. */}
            {imageLoaded && (
              <div
                className="flex w-full max-w-2xl shrink-0 flex-col items-center gap-1 text-center text-white"
                style={captionStyle}
              >
                <p className="max-w-full break-words font-display text-base font-semibold sm:text-lg">
                  {photo.title}
                </p>
                {photo.placeholder && (
                  <p className="text-xs text-white/60 sm:text-sm">
                    Placeholder — photo coming soon
                  </p>
                )}
                {photo.location && (
                  <span className="flex min-w-0 max-w-full items-center gap-1.5 text-xs text-white/70 sm:text-sm">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="break-words">{photo.location}</span>
                  </span>
                )}
              </div>
            )}
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
            className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white sm:right-8"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
