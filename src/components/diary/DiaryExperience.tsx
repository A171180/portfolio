import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { CoverScene } from "./CoverScene";
import { Particles } from "./Particles";
import { useAmbience } from "./useAmbience";
import {
  CHAPTERS,
  ChapterAchievements,
  ChapterContact,
  ChapterEducation,
  ChapterFuture,
  ChapterHello,
  ChapterJourney,
  ChapterProjects,
  ChapterSkills,
} from "./Chapters";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "About me", href: "#hello" },
  { label: "Projects", href: "#projects" },
  { label: "Contact me", href: "#contact" },
];

const CODE_LINES = [
  "const growth = chapters.reduce((a, c) => a + c.lessons, 0);",
  "while (curious) { learn(); ship(); rest(); }",
  "export const becoming = async () => await Promise.all(dreams);",
  "git commit -m 'today I finally understood closures'",
  "if (bug) { console.log('feature, actually'); }",
];

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function DiaryExperience() {
  const [opened, setOpened] = useState(false);
  const [evening, setEvening] = useState(false);
  const [notes, setNotes] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [penLine, setPenLine] = useState<string | null>(null);
  const [idle, setIdle] = useState(false);
  const [closing, setClosing] = useState(false);
  const { muted, toggleMute, pageTurn, blip, restartBed } = useAmbience();

  /* evening mode class + rain bed */
  useEffect(() => {
    document.documentElement.classList.toggle("evening", evening);
    if (!muted) restartBed(evening);
  }, [evening, muted, restartBed]);

  /* konami code */
  useEffect(() => {
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq = [...seq, e.key].slice(-KONAMI.length);
      if (seq.join("|").toLowerCase() === KONAMI.join("|").toLowerCase()) setTerminal(true);
      if (e.key === "Escape") {
        setTerminal(false);
        setNotes(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* idle cat paw */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reset = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 22000);
    };
    reset();
    window.addEventListener("pointermove", reset);
    window.addEventListener("scroll", reset, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointermove", reset);
      window.removeEventListener("scroll", reset);
    };
  }, []);

  /* closing moment at the very bottom */
  useEffect(() => {
    if (!opened) return;
    const onScroll = () => {
      const bottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 24;
      setClosing(bottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [opened]);

  const jump = useCallback(
    (id: string) => {
      pageTurn();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [pageTurn],
  );

  const enter = useCallback(
    (target?: string) => {
      setOpened(true);
      pageTurn();
      if (target) setTimeout(() => jump(target), 500);
    },
    [jump, pageTurn],
  );

  return (
    <div id="top" className="relative min-h-screen">
      <Particles evening={evening} />

      {/* slim modern header */}
      <header className="sticky top-0 z-40 border-b border-primary/30 bg-primary/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <span className="font-display text-sm font-semibold tracking-tight text-primary-foreground">
            Aditya Sharma
          </span>
          <ul className="hidden gap-6 sm:flex">
            {NAV.map((n) => (
              <li key={n.label}>
                <button
                  type="button"
                  onClick={() => (n.href === "#top" ? jump("top") : enter(n.href.slice(1)))}
                  className="cursor-ribbon text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/90 transition hover:text-primary-foreground"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEvening((e) => !e)}
              className="cursor-glow rounded-full border border-primary-foreground/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground"
            >
              {evening ? "Daylight" : "Evening"}
            </button>
            <button
              type="button"
              onClick={() => toggleMute(evening)}
              aria-pressed={!muted}
              className="cursor-glow rounded-full border border-primary-foreground/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-foreground"
            >
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>
        </nav>
      </header>

      {!opened ? (
        <CoverScene
          onOpen={() => enter("hello")}
          onSecretNotes={() => setNotes(true)}
          onEveningToggle={() => setEvening((e) => !e)}
          onBookmark={() => enter("projects")}
        />
      ) : (
        <main className="relative z-10 pb-32">
          {/* chapter tabs in the margin */}
          <aside className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => jump(c.id)}
                className="cursor-ribbon group flex items-center justify-end gap-2 rounded-l-md bg-primary/85 py-1.5 pl-3 pr-2 text-[10px] uppercase tracking-[0.2em] text-primary-foreground transition hover:pl-5"
              >
                <span className="opacity-70">{c.n}</span>
                <span className="hidden group-hover:inline">{c.label}</span>
              </button>
            ))}
          </aside>

          <div className="mx-auto max-w-6xl px-2 pt-10">
            <p className="mb-6 text-center font-script text-2xl text-muted-foreground">
              the diary is open — scroll to turn the pages
            </p>
          </div>

          <ChapterHello
            onPenClick={() => {
              blip(660, 0.12);
              setPenLine(CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)]);
              setTimeout(() => setPenLine(null), 5000);
            }}
          />
          <ChapterJourney />
          <ChapterSkills />
          <ChapterProjects />
          <ChapterAchievements />
          <ChapterEducation />
          <ChapterFuture />
          <ChapterContact onSent={() => blip(880, 0.4, "triangle")} />

          {/* final emotional moment */}
          <section className="relative mt-10 flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
            <motion.div
              animate={closing ? { rotateX: 18, scale: 0.92, opacity: 0.9 } : { rotateX: 0, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="linen-weave h-40 w-64 rounded-r-xl rounded-l-sm bg-primary shadow-lift"
            >
              <div className="absolute inset-3 rounded-md border border-dashed border-primary-foreground/50" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: closing ? 1 : 0.25 }}
              transition={{ duration: 1.4 }}
              className="mt-12 max-w-lg font-display text-2xl font-medium tracking-tight"
            >
              “Every chapter ends… but the journey continues.”
            </motion.p>
          </section>
        </main>
      )}

      {/* pen writing a line of code */}
      <AnimatePresence>
        {penLine && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-border bg-card px-5 py-3 shadow-lift"
          >
            <code className="animate-write font-mono text-xs text-foreground">{penLine}</code>
          </motion.div>
        )}
      </AnimatePresence>

      {/* idle cat paw */}
      <AnimatePresence>
        {idle && (
          <motion.div
            aria-hidden
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            className="fixed bottom-24 right-0 z-40"
          >
            <svg viewBox="0 0 60 40" className="h-12 w-16">
              <g fill="var(--tan)" stroke="var(--ink)" strokeWidth="1">
                <ellipse cx="34" cy="24" rx="16" ry="11" />
                <circle cx="20" cy="14" r="4" />
                <circle cx="30" cy="10" r="4" />
                <circle cx="41" cy="11" r="4" />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* secret developer's notes */}
      <AnimatePresence>
        {notes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6 backdrop-blur-sm"
            onClick={() => setNotes(false)}
          >
            <motion.div
              initial={{ rotate: -3, y: 30 }}
              animate={{ rotate: 0, y: 0 }}
              className="paper-sheet max-w-lg rounded-2xl p-8"
            >
              <h3 className="font-script text-3xl text-primary">Developer&apos;s Notes</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Things nobody sees: the four rewrites, the deleted folder, the evening I almost
                quit and the morning I didn&apos;t. Also — the Konami code does something.
              </p>
              <p className="mt-4 font-script text-xl">— A.S.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* retro terminal, sage on cream */}
      <AnimatePresence>
        {terminal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6"
            onClick={() => setTerminal(false)}
          >
            <div className="w-full max-w-xl rounded-xl border border-primary bg-card p-6 font-mono text-xs text-primary shadow-lift">
              <p>aditya@diary:~$ whoami</p>
              <p className="text-muted-foreground">a developer still becoming one</p>
              <p className="mt-3">aditya@diary:~$ cat secret.txt</p>
              <p className="text-muted-foreground">
                you found the hidden terminal. press Esc to return to the pages.
              </p>
              <p className="mt-3 animate-pulse">_</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
