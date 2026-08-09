"use client";

import { useMemo, useState } from "react";
import PhotoTile from "./PhotoTile";
import Lightbox from "./Lightbox";

export default function PhotoGrid({ photos, tags }) {
  const [activeTag, setActiveTag] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(
    () =>
      activeTag === "all"
        ? photos
        : photos.filter((photo) => photo.tags.includes(activeTag)),
    [photos, activeTag]
  );

  const openPhoto = openIndex !== null ? filtered[openIndex] : null;

  function close() {
    setOpenIndex(null);
  }

  function step(delta) {
    setOpenIndex((i) => (i === null ? null : (i + delta + filtered.length) % filtered.length));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTag === "all"
              ? "border-accent bg-accent text-white"
              : "border-border text-foreground/70 hover:border-accent"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              activeTag === tag
                ? "border-accent bg-accent text-white"
                : "border-border text-foreground/70 hover:border-accent"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((photo, index) => (
          <PhotoTile
            key={photo.slug}
            photo={photo}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={index < 4}
            onClick={() => setOpenIndex(index)}
          />
        ))}
      </div>

      <Lightbox
        photo={openPhoto}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
  );
}
