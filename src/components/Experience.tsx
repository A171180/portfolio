import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { BookIntro } from "@/components/intro/BookIntro";
import { Cursor } from "@/components/ui3d/Cursor";
import { GlassNav } from "@/components/workspace/GlassNav";
import { HomeSection } from "@/components/workspace/HomeSection";
import { AboutSection } from "@/components/workspace/AboutSection";
import { SkillsSection } from "@/components/workspace/SkillsSection";
import { ProjectsSection } from "@/components/workspace/ProjectsSection";
import { ContactSection } from "@/components/workspace/ContactSection";
import { Particles } from "@/components/diary/Particles";
import { useAmbience } from "@/components/diary/useAmbience";
import { NAV, type SectionId } from "@/data/portfolio";

export function Experience() {
  const [phase, setPhase] = useState<"intro" | "workspace">("intro");
  const [active, setActive] = useState<SectionId>("home");
  const [evening, setEvening] = useState(false);
  const [highlight, setHighlight] = useState<string[]>([]);
  const [reduced, setReduced] = useState(false);
  const { muted, toggleMute, pageTurn, blip, restartBed } = useAmbience();

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("evening", evening);
    if (!muted) restartBed(evening);
  }, [evening, muted, restartBed]);

  /* track the active section for the nav */
  useEffect(() => {
    if (phase !== "workspace") return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.6] },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [phase]);

  const jump = useCallback(
    (id: SectionId) => {
      pageTurn();
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [pageTurn, reduced],
  );

  return (
    <div className="relative min-h-screen">
      <Cursor />
      <Particles evening={evening} />
      <Toaster />

      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <BookIntro
              reduced={reduced}
              onPageTurn={pageTurn}
              onEnter={() => setPhase("workspace")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, scale: reduced ? 1 : 1.04, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: reduced ? 0.2 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* the workspace environment */}
            <div
              aria-hidden
              className="grid-floor pointer-events-none fixed inset-0 opacity-60 [mask-image:radial-gradient(90%_70%_at_50%_35%,black,transparent)]"
            />
            <div
              aria-hidden
              className="pointer-events-none fixed left-1/2 top-0 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
            />

            <GlassNav
              active={active}
              onJump={jump}
              evening={evening}
              onEvening={() => setEvening((e) => !e)}
              muted={muted}
              onMute={() => toggleMute(evening)}
            />

            <main className="relative z-10">
              <HomeSection onJump={jump} />
              <AboutSection />
              <SkillsSection
                onHighlight={(slugs) => {
                  setHighlight(slugs);
                  blip(620, 0.08);
                }}
              />
              <ProjectsSection highlight={highlight} />
              <ContactSection onSent={() => blip(880, 0.35, "triangle")} />
              <footer className="border-t border-glass-line px-5 py-10 text-center font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Aditya Sharma — Full Stack Developer
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
