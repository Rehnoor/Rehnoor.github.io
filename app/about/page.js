import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { site, skills } from "@/data/site";

export const metadata = {
  title: `About — ${site.name}`,
  description: site.bio,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">About Me</h1>

      <AnimatedSection
        as="div"
        className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start"
      >
        <div
          data-reveal
          className="relative h-40 w-40 flex-none overflow-hidden rounded-full border border-border sm:h-48 sm:w-48"
        >
          <Image
            src="/images/profile/rehnoor.jpg"
            alt="Rehnoor Saini"
            fill
            sizes="192px"
            className="object-cover"
            priority
          />
        </div>
        <p data-reveal className="text-lg leading-relaxed text-foreground/80">
          {site.bio}
        </p>
      </AnimatedSection>

      <h2 className="mt-20 font-display text-2xl font-semibold">
        My Expertise
      </h2>
      <AnimatedSection
        as="div"
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
      >
        {skills.map((skill) => (
          <div
            key={skill.title}
            data-reveal
            className="rounded-2xl border border-border bg-elevated p-6"
          >
            <div className="text-3xl">{skill.icon}</div>
            <h3 className="mt-4 font-display text-lg font-semibold">
              {skill.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              {skill.description}
            </p>
          </div>
        ))}
      </AnimatedSection>
    </div>
  );
}
