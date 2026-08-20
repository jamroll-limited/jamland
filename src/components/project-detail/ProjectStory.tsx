import type { Project } from "@/types/project";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

export function ProjectStory({ project }: { project: Project }) {
  return (
    <div>
      <Reveal>
        <Eyebrow className="text-moss">The Story</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">{project.tagline}</h2>
      </Reveal>

      <div className="mt-8 flex flex-col gap-5">
        {project.story.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 24)} delay={0.1 + index * 0.05}>
            <p className="leading-relaxed text-ink/70">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      {project.highlights.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {project.highlights.map((point, index) => (
            <Reveal key={point} delay={0.1 + index * 0.04}>
              <li className="flex items-start gap-2.5 text-sm text-ink/70">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-moss" />
                {point}
              </li>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
