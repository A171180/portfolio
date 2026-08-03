import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import linen from "@/assets/linen-sage.jpg";

type Props = {
  onOpen: () => void;
  onSecretNotes: () => void;
  onEveningToggle: () => void;
  onBookmark: () => void;
};

export function CoverScene({ onOpen, onSecretNotes, onEveningToggle, onBookmark }: Props) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 90, damping: 14 });
  const sy = useSpring(ry, { stiffness: 90, damping: 14 });
  const sheen = useTransform(sy, [-8, 8], ["18%", "82%"]);
  const [opening, setOpening] = useState(false);
  const sweep = useTransform(
    sheen,
    (v) =>
      `linear-gradient(105deg, transparent 0%, color-mix(in oklab, var(--cream) 70%, transparent) ${v}, transparent 100%)`,
  );
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (holdRef.current) clearTimeout(holdRef.current);
    };
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 2200);
  };

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <div aria-hidden className="dry-brush pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--light-warm), transparent 70%)" }}
      />

      <div className="relative" style={{ perspective: 1400 }}>
        <motion.div
          className="relative"
          style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
          animate={opening ? { scale: 1.18, y: -18, rotateY: -6 } : { scale: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* soft shadow on the desk */}
          <div
            aria-hidden
            className="absolute -bottom-8 left-1/2 h-10 w-[86%] -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: "var(--shadow-tint)" }}
          />

          {/* inner first page peeking */}
          <div className="paper-sheet absolute inset-y-3 left-4 right-2 rounded-r-xl rounded-l-sm" />

          {/* linen cover */}
          <motion.button
            type="button"
            aria-label="Open the diary and begin the journey"
            onClick={open}
            onPointerDown={() => {
              holdRef.current = setTimeout(onEveningToggle, 3000);
            }}
            onPointerUp={() => { if (holdRef.current) clearTimeout(holdRef.current); }}
            onPointerLeave={() => { if (holdRef.current) clearTimeout(holdRef.current); }}
            className="cursor-feather relative block h-[62vh] max-h-[560px] w-[min(78vw,400px)] origin-left overflow-hidden rounded-r-2xl rounded-l-sm shadow-lift"
            style={{ transformStyle: "preserve-3d" }}
            animate={opening ? { rotateY: -158 } : { rotateY: 0 }}
            transition={{ duration: 1.9, ease: [0.22, 1, 0.28, 1] }}
          >
            <img
              src={linen}
              alt=""
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="linen-weave absolute inset-0 opacity-60" />
            <div className="absolute inset-0 bg-[linear-gradient(150deg,color-mix(in_oklab,var(--cream)_18%,transparent),transparent_45%,color-mix(in_oklab,var(--sage-deep)_35%,transparent))]" />

            {/* light sweep follows cursor */}
            <motion.div
              aria-hidden
              className="absolute inset-0 opacity-70 mix-blend-soft-light"
              style={{ background: sweep }}
            />

            {/* stitched cream trim */}
            <div className="absolute inset-3 rounded-[10px] border border-dashed border-cream/70" />

            {/* debossed title */}
            <div className="absolute inset-x-0 top-[24%] px-8 text-center">
              <p className="font-display text-3xl font-semibold text-cream drop-shadow-[0_1px_0_var(--sage-deep)] sm:text-4xl">
                Aditya Sharma
              </p>
              <p className="mt-3 font-script text-2xl text-cream drop-shadow-[0_1px_1px_var(--sage-deep)]">
                “Every Expert Was Once a Beginner.”
              </p>
              <div className="mx-auto mt-6 h-px w-20 bg-cream/60" />
              <p className="mt-6 font-body text-[11px] uppercase tracking-[0.34em] text-cream/85">
                A Diary of Becoming a Developer
              </p>
            </div>

            {/* wrap-tie closure — double click for developer notes */}
            <span
              role="button"
              tabIndex={0}
              aria-label="Wrap tie (double click for developer notes)"
              onDoubleClick={(e) => {
                e.stopPropagation();
                onSecretNotes();
              }}
              className="cursor-glow absolute right-0 top-[74%] h-3 w-16 rounded-l-full bg-tan/90 shadow-card"
            />
          </motion.button>

          {/* bookmark ribbon */}
          <button
            type="button"
            aria-label="Jump to projects"
            onClick={onBookmark}
            className="cursor-ribbon animate-sway absolute -top-3 right-10 h-28 w-6 rounded-b-md bg-tan shadow-card"
          >
            <span className="sr-only">Projects</span>
            <span className="absolute bottom-0 left-0 h-3 w-full [clip-path:polygon(0_0,100%_0,50%_100%)] bg-background/70" />
          </button>
        </motion.div>

        {/* drifting leaf */}
        <motion.span
          aria-hidden
          className="absolute -right-10 top-0 h-4 w-6 rounded-[60%_10%_60%_10%] bg-sage-soft/80"
          initial={{ y: -160, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: 420, x: -80, rotate: 220, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="mt-16 font-body text-xs uppercase tracking-[0.4em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : [0, 1, 0.55, 1] }}
        transition={{ delay: 1.2, duration: 4, repeat: opening ? 0 : Infinity }}
      >
        Click to Begin My Journey
      </motion.p>
      <p className="mt-4 max-w-sm text-center font-script text-lg text-muted-foreground">
        hold the cover for three seconds… some things only happen in the evening
      </p>
    </section>
  );
}
