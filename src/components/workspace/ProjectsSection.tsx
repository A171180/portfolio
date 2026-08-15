import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { TiltCard } from "@/components/ui3d/TiltCard";

export function ProjectsSection({ highlight }: { highlight: string[] }) {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Projects</p>
        <h2 className="mt-4 max-w-xl font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold tracking-tight">
          Things I built, and what they taught me.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => {
            const dim = highlight.length > 0 && !highlight.includes(p.slug);
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                animate={{ opacity: dim ? 0.35 : 1 }}
              >
                <TiltCard
                  as="button"
                  ariaLabel={`Open case study: ${p.name}`}
                  onClick={() => setOpenProject(p)}
                  className="glass-panel group h-full w-full rounded-3xl p-6 text-left"
                  intensity={9}
                >
                  <div
                    className="grid-floor relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-2xl"
                    style={{ background: "var(--gradient-cream)" }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-70 transition-transform duration-700 group-hover:scale-110"
                      style={{ background: "radial-gradient(circle at 30% 30%, var(--glow), transparent 65%)" }}
                    />
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                      0{i + 1} / case study
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1 font-body text-sm text-muted-foreground">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-glass-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-block font-body text-[10px] uppercase tracking-[0.28em] text-primary">
                    Read case study →
                  </span>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpenProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${openProject.name} case study`}
          >
            <motion.div
              initial={{ y: 40, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel my-auto w-full max-w-2xl rounded-3xl p-7 sm:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{openProject.name}</h3>
                  <p className="mt-1 font-body text-sm text-muted-foreground">{openProject.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenProject(null)}
                  className="rounded-full border border-glass-line px-3 py-1.5 font-mono text-[10px] uppercase"
                >
                  Close
                </button>
              </div>

              <dl className="mt-7 space-y-5">
                {[
                  ["Overview", openProject.overview],
                  ["Problem", openProject.problem],
                  ["Solution", openProject.solution],
                  ["Development", openProject.development],
                  ["Result", openProject.result],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">{k}</dt>
                    <dd className="mt-1.5 font-body text-sm leading-relaxed text-foreground">{v}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Tech stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {openProject.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-glass-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              {(openProject.github || openProject.live) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {openProject.github && (
                    <a
                      href={openProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-glass-line px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.24em]"
                    >
                      GitHub
                    </a>
                  )}
                  {openProject.live && (
                    <a
                      href={openProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-primary px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.24em] text-primary-foreground"
                    >
                      Live demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
