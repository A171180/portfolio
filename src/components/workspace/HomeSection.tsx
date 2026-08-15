import { motion } from "motion/react";
import photo from "@/assets/aditya.jpg.asset.json";
import { CONSTELLATION, type SectionId } from "@/data/portfolio";

export function HomeSection({ onJump }: { onJump: (id: SectionId) => void }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 pt-32 pb-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
          >
            Chandigarh University · B.Sc. Computer Science
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[0.95] tracking-tight"
          >
            Aditya Sharma
          </motion.h1>

          <p className="mt-3 font-display text-xl text-primary sm:text-2xl">Full Stack Developer</p>

          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-muted-foreground">
            I build, experiment, and turn ideas into working digital experiences.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onJump("projects")}
              className="rounded-full bg-primary px-6 py-3 font-body text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition hover:opacity-90"
            >
              Explore My Work
            </button>
            <button
              type="button"
              onClick={() => onJump("contact")}
              className="glass-panel rounded-full px-6 py-3 font-body text-[11px] uppercase tracking-[0.24em] text-foreground transition hover:glow-ring"
            >
              Contact Me
            </button>
          </div>

          {/* technology constellation */}
          <div className="relative mt-14 h-40 max-w-lg">
            {CONSTELLATION.map((tech, i) => {
              const a = (i / CONSTELLATION.length) * Math.PI * 2;
              return (
                <motion.span
                  key={tech}
                  className="glass-panel absolute rounded-full px-3 py-1.5 font-mono text-[10px] text-foreground"
                  style={{
                    left: `${50 + Math.cos(a) * 40}%`,
                    top: `${50 + Math.sin(a) * 38}%`,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.12 }}
                >
                  {tech}
                </motion.span>
              );
            })}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl"
              style={{ background: "var(--glow)" }}
            />
          </div>
        </div>

        {/* floating oval portrait */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-[min(78vw,340px)]"
        >
          <div
            aria-hidden
            className="absolute -inset-8 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
          />
          <div className="animate-float oval-frame relative aspect-[3/4]">
            <img
              src={photo.url}
              alt="Aditya Sharma standing on a rooftop"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, transparent 40%, color-mix(in oklab, var(--sage-deep) 26%, transparent))",
              }}
            />
          </div>
          <span
            aria-hidden
            className="glass-panel absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 font-mono text-[10px]"
          >
            builds with AI · ships fast
          </span>
        </motion.div>
      </div>
    </section>
  );
}
