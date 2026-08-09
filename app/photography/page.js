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
        A growing collection shot on the side — hikes, flights, and cities
        along the way. This gallery is scaffolded with placeholders for now;
        real photos are on their way.
      </p>
      <div className="mt-12">
        <PhotoGrid photos={photos} tags={photoTags} />
      </div>
    </div>
  );
}
