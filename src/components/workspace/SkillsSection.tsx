import { motion } from "motion/react";
import { useState } from "react";
import { PROJECTS, SKILL_GROUPS, type Skill } from "@/data/portfolio";

export function SkillsSection({ onHighlight }: { onHighlight: (slugs: string[]) => void }) {
  const [open, setOpen] = useState<string | null>(null);

  const projectNames = (s: Skill) =>
    s.projects.map((slug) => PROJECTS.find((p) => p.slug === slug)?.name).filter(Boolean).join(", ");

  return (
    <section id="skills" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Skills / Stack</p>
        <h2 className="mt-4 max-w-xl font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold tracking-tight">
          The tools I actually build with.
        </h2>
        <p className="mt-3 font-body text-sm text-muted-foreground">
          Hover a node to see what I use it for — select one to highlight the projects behind it.
        </p>

        <div className="mt-12 space-y-8">
          {SKILL_GROUPS.map((g) => (
            <div key={g.group}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{g.group}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {g.items.map((s) => {
                  const isOpen = open === s.name;
                  return (
                    <motion.button
                      key={s.name}
                      type="button"
                      onClick={() => {
                        setOpen(isOpen ? null : s.name);
                        onHighlight(isOpen ? [] : s.projects);
                      }}
                      whileHover={{ y: -4 }}
                      onHoverStart={() => setOpen(s.name)}
                      className={`glass-panel max-w-xs rounded-2xl px-4 py-3 text-left transition ${
                        isOpen ? "glow-ring" : ""
                      }`}
                    >
                      <span className="font-display text-sm font-semibold tracking-tight">{s.name}</span>
                      <motion.span
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-2 block font-body text-xs leading-relaxed text-muted-foreground">
                          {s.use}
                        </span>
                        {s.projects.length > 0 && (
                          <span className="mt-1.5 block font-mono text-[10px] text-primary">
                            {projectNames(s)}
                          </span>
                        )}
                      </motion.span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
