import Image from "next/image";

const TONES = [
  "from-[#5A9FFF] to-[#1A1A2E]",
  "from-[#E94560] to-[#1A1A2E]",
  "from-[#94C2FF] to-[#16213E]",
  "from-[#0F3460] to-[#5A9FFF]",
  "from-[#E94560] to-[#0F3460]",
  "from-[#1A1A2E] to-[#94C2FF]",
];

export default function PhotoTile({ photo, sizes, priority = false, onClick }) {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      type={onClick ? "button" : undefined}
      onClick={onClick}
      data-reveal
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-black text-left"
    >
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div
          className={`h-full w-full bg-gradient-to-br ${TONES[(photo.tone ?? 0) % TONES.length]} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
        />
      )}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="text-white">
          <p className="font-display text-sm font-semibold">{photo.title}</p>
          {photo.placeholder && (
            <p className="text-xs text-white/70">Placeholder — photo coming soon</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
