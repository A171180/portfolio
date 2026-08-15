import { motion } from "motion/react";
import { TiltCard } from "@/components/ui3d/TiltCard";

const CARDS = [
  {
    k: "01",
    title: "Studying",
    body: "B.Sc. Computer Science at Chandigarh University — fundamentals in the day, building at night.",
  },
  {
    k: "02",
    title: "Building with AI",
    body: "I enjoy building things quickly with AI, then refining what survives real use.",
  },
  {
    k: "03",
    title: "Experimenting",
    body: "Ideas become small working products: websites, apps, automations, prototypes.",
  },
  {
    k: "04",
    title: "Full Stack",
    body: "Interface, API, data and deployment — I like owning the whole path.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground">About</p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold leading-tight tracking-tight">
          I&apos;m a Computer Science student focused on becoming a Full Stack Developer — turning
          concepts into working websites and applications.
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <TiltCard className="glass-panel h-full rounded-2xl p-6" intensity={7}>
                <span className="font-mono text-[10px] text-primary">{c.k}</span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
