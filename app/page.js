import Link from "next/link";
import HeroGradient from "@/components/home/HeroGradient";
import HubCard from "@/components/home/HubCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import PhotoTile from "@/components/photography/PhotoTile";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { photos } from "@/data/photos";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredPhotos = photos.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <HeroGradient />
        <div className="absolute inset-0 bg-background/10 dark:bg-background/30" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-32">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-6xl">
            {site.name}
          </h1>
          <p className="max-w-xl text-lg text-white/90 drop-shadow-sm">
            {site.tagline}
          </p>
          <p className="max-w-xl text-sm italic text-white/70">{site.quote}</p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <AnimatedSection
          as="div"
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <HubCard
            href="/projects"
            eyebrow="Software"
            title="What I've Built"
            description="My passion projects — see the code behind them on GitHub."
            cta="View projects"
          />
          <HubCard
            href="/photography"
            eyebrow="Photography"
            title="What I've Captured"
            description="Landscapes, cities, and everything in between, shot on the side while going on adventures."
            cta="View gallery"
          />
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold">
            Featured Projects
          </h2>
          <Link href="/projects" className="text-sm font-medium text-accent">
            All projects →
          </Link>
        </div>
        <ProjectGrid projects={featuredProjects} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold">
            From the Gallery
          </h2>
          <Link href="/photography" className="text-sm font-medium text-accent">
            Full gallery →
          </Link>
        </div>
        <AnimatedSection
          as="div"
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {featuredPhotos.map((photo) => (
            <PhotoTile
              key={photo.slug}
              photo={photo}
              sizes="(min-width: 640px) 25vw, 50vw"
            />
          ))}
        </AnimatedSection>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-20 text-center">
          <h2 className="font-display text-2xl font-semibold">
            Want to get in touch with me?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Say hello
          </Link>
        </div>
      </section>
    </>
  );
}
