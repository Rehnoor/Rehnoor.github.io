import PhotoGrid from "@/components/photography/PhotoGrid";
import { site } from "@/data/site";
import { photos, photoTags } from "@/data/photos";

export const metadata = {
  title: `Photography — ${site.name}`,
  description: "A photography showcase by Rehnoor Saini.",
};

export default function PhotographyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        Photography
      </h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        Some snapshots of my adventures. Moments I paused to slow down and capture beauty in the chaos around us.
      </p>
      <div className="mt-12">
        <PhotoGrid photos={photos} tags={photoTags} />
      </div>
    </div>
  );
}
