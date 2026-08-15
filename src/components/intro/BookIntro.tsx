import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";
import linen from "@/assets/linen-sage.jpg";

type Props = {
  /** called when the book-to-digital transition finishes */
  onEnter: () => void;
  onPageTurn: () => void;
  reduced: boolean;
};

const FLOATERS = [
  { text: "FULL STACK DEVELOPER", left: "-8%", top: "18%", delay: 0.4 },
  { text: "C++ • PYTHON • JAVASCRIPT", left: "62%", top: "38%", delay: 0.7 },
  { text: "BUILDING IDEAS INTO WORKING PRODUCTS", left: "2%", top: "78%", delay: 1 },
];


/**
 * Phase 1: a cinematic premium book. Click opens it, the first chapter floats
 * above the open pages, then "Next Chapter" turns the page and morphs the
 * paper into the digital workspace.
 */
export function BookIntro({ onEnter, onPageTurn, reduced }: Props) {
  const [stage, setStage] = useState<"closed" | "opening" | "chapter" | "turning" | "morph">("closed");
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 80, damping: 15 });
  const sy = useSpring(ry, { stiffness: 80, damping: 15 });
  const sheen = useTransform(sy, [-9, 9], ["12%", "88%"]);
  const sweep = useTransform(
    sheen,
    (v) =>
      `linear-gradient(105deg, transparent 0%, color-mix(in oklab, var(--cream) 72%, transparent) ${v}, transparent 100%)`,
  );

  const ms = (n: number) => (reduced ? Math.min(n, 260) : n);

  const open = () => {
    if (stage !== "closed") return;
    onPageTurn();
    setStage("opening");
    setTimeout(() => setStage("chapter"), ms(1900));
  };

  const next = () => {
    if (stage !== "chapter") return;
    onPageTurn();
    setStage("turning");
    setTimeout(() => setStage("morph"), ms(1200));
    setTimeout(onEnter, ms(2600));
  };

  const opened = stage !== "closed";

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 18);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {/* cinematic stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full opacity-80 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--light-warm), transparent 70%)" }}
      />
      <motion.div
        aria-hidden
        className="grid-floor pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] [mask-image:linear-gradient(to_top,black,transparent)]"
        animate={{ opacity: stage === "morph" ? 0.9 : 0.12 }}
        transition={{ duration: 1.2 }}
      />

      {/* camera push-in wrapper */}
      <motion.div
        className="relative"
        style={{ perspective: 1500 }}
        animate={
          stage === "closed"
            ? { scale: 1, y: 0 }
            : stage === "opening"
              ? { scale: 1.1, y: -10 }
              : stage === "chapter"
                ? { scale: 1.04, y: 8 }
                : stage === "turning"
                  ? { scale: 1.14, y: 0, rotateX: 8 }
                  : { scale: 2.6, y: 60, rotateX: 26, opacity: 0 }
        }
        transition={{ duration: reduced ? 0.3 : stage === "morph" ? 1.5 : 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}>
          {/* grounded shadow */}
          <div
            aria-hidden
            className="absolute -bottom-10 left-1/2 h-12 w-[88%] -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: "var(--shadow-tint)" }}
          />

          {/* open spread underneath the cover */}
          <div className="relative h-[62vh] max-h-[560px] w-[min(80vw,410px)]">
            <div className="paper-sheet absolute inset-y-2 left-3 right-1 rounded-r-2xl rounded-l-sm" />
            {/* page thickness */}
            <div
              aria-hidden
              className="absolute inset-y-4 right-0 w-2 rounded-r-md"
              style={{ background: "linear-gradient(90deg, var(--paper-aged), var(--cream))" }}
            />

            {/* the page that turns */}
            <motion.div
              aria-hidden
              className="paper-sheet absolute inset-y-2 left-3 right-1 origin-left rounded-r-2xl"
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              animate={
                stage === "turning" || stage === "morph"
                  ? { rotateY: -168, skewY: 1.5 }
                  : { rotateY: 0, skewY: 0 }
              }
              transition={{ duration: reduced ? 0.25 : 1.3, ease: [0.32, 0.9, 0.2, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-r-2xl"
                animate={{ opacity: stage === "morph" ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  background:
                    "linear-gradient(120deg, color-mix(in oklab, var(--sage-soft) 40%, transparent), transparent 60%)",
                }}
              />
            </motion.div>

            {/* glowing page edge during the morph */}
            <motion.div
              aria-hidden
              className="absolute inset-y-2 left-3 right-1 rounded-r-2xl"
              animate={{ opacity: stage === "morph" ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ boxShadow: "0 0 60px 6px var(--glow)" }}
            />

            {/* the linen cover */}
            <motion.button
              type="button"
              aria-label="Open the book and enter the portfolio"
              onClick={open}
              className="absolute inset-0 origin-left overflow-hidden rounded-r-2xl rounded-l-sm shadow-lift"
              style={{ transformStyle: "preserve-3d" }}
              animate={opened ? { rotateY: -162 } : { rotateY: 0 }}
              transition={{ duration: reduced ? 0.25 : 1.8, ease: [0.22, 1, 0.28, 1] }}
            >
              <img
                src={linen}
                alt=""
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
              <div className="linen-weave absolute inset-0 opacity-55" />
              <div className="absolute inset-0 bg-[linear-gradient(150deg,color-mix(in_oklab,var(--cream)_16%,transparent),transparent_45%,color-mix(in_oklab,var(--sage-deep)_38%,transparent))]" />
              <motion.div
                aria-hidden
                className="absolute inset-0 opacity-70 mix-blend-soft-light"
                style={{ background: sweep }}
              />
              <div className="absolute inset-4 rounded-[10px] border border-cream/40" />
              <div className="absolute inset-x-0 top-[30%] px-8 text-center">
                <p className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                  Aditya Sharma
                </p>
                <div className="mx-auto mt-5 h-px w-16 bg-cream/50" />
                <p className="mt-5 font-body text-[11px] uppercase tracking-[0.4em] text-cream/85">
                  Full Stack Developer
                </p>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Chapter 01 — floating 3D UI above the open pages */}
        <AnimatePresence>
          {stage === "chapter" && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 40, z: 0 }}
                animate={{ opacity: 1, y: -30 }}
                exit={{ opacity: 0, y: -70 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute left-1/2 top-0 w-[min(88vw,540px)] -translate-x-1/2 text-center font-display text-2xl font-semibold tracking-tight sm:text-4xl"
              >
                HELLO, I&apos;M ADITYA
              </motion.h1>

              {FLOATERS.map((f) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, delay: reduced ? 0 : f.delay }}
                  className="glass-panel animate-float absolute left-1/2 top-1/2 whitespace-nowrap rounded-full px-4 py-2 font-body text-[10px] uppercase tracking-[0.22em] text-foreground"
                  style={{ translateX: f.x, translateY: f.y }}
                >
                  {f.text}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* controls */}
      <div className="relative z-10 mt-14 flex min-h-14 flex-col items-center">
        <AnimatePresence mode="wait">
          {stage === "closed" && (
            <motion.p
              key="hint"
              exit={{ opacity: 0 }}
              animate={{ opacity: reduced ? 1 : [0.35, 1, 0.35] }}
              transition={{ duration: 3.5, repeat: reduced ? 0 : Infinity }}
              className="font-body text-xs uppercase tracking-[0.4em] text-muted-foreground"
            >
              Click the book to begin
            </motion.p>
          )}
          {stage === "chapter" && (
            <motion.button
              key="next"
              type="button"
              onClick={next}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-panel rounded-full px-6 py-3 font-body text-[11px] uppercase tracking-[0.3em] text-foreground transition hover:glow-ring"
            >
              Next Chapter →
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* morph flash into the workspace */}
      <AnimatePresence>
        {stage === "morph" && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="grid-floor pointer-events-none absolute inset-0 z-20"
            style={{ background: "radial-gradient(circle at 50% 60%, var(--glow), transparent 70%)" }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
