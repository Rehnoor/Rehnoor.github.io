import ProjectGrid from "@/components/projects/ProjectGrid";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export const metadata = {
  title: `Projects — ${site.name}`,
  description: "Software projects by Rehnoor Saini — full-stack apps, databases, and machine learning.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        A running list of things I've built. Each one links out to the source
        on GitHub.
      </p>
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
