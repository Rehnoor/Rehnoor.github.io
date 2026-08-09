import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  return (
    <AnimatedSection
      as="div"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </AnimatedSection>
  );
}
