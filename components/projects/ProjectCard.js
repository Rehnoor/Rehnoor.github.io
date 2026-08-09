import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-elevated transition-colors hover:border-accent"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="text-sm leading-relaxed text-foreground/70">
          {project.description}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-foreground/70"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
