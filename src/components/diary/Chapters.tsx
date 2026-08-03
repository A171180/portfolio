import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ---------------------------------- shared --------------------------------- */

export const CHAPTERS = [
  { id: "hello", label: "Hello", n: "01" },
  { id: "journey", label: "Journey", n: "02" },
  { id: "skills", label: "Skills", n: "03" },
  { id: "projects", label: "Projects", n: "04" },
  { id: "achievements", label: "Awards", n: "05" },
  { id: "education", label: "Notes", n: "06" },
  { id: "future", label: "Ahead", n: "07" },
  { id: "contact", label: "Write", n: "08" },
] as const;

function Page({
  id,
  n,
  title,
  kicker,
  children,
  bright = 0,
}: {
  id: string;
  n: string;
  title: string;
  kicker: string;
  children: React.ReactNode;
  bright?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <section id={id} ref={ref} className="scroll-mt-24 px-4 py-10 sm:px-8">
      <motion.article
        initial={{ opacity: 0, y: 40, rotateX: 4 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="paper-sheet bracket-frame mx-auto max-w-5xl rounded-2xl p-7 sm:p-14"
        style={{ filter: `brightness(${1 + bright * 0.03}) saturate(${1 - bright * 0.05})` }}
      >
        <header className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Chapter {n}
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
          </div>
          <p className="font-script text-2xl text-primary">{kicker}</p>
        </header>
        {children}
      </motion.article>
    </section>
  );
}

/* ------------------------------- Ch 1 — Hello ------------------------------ */

const INTRO =
  "I'm Aditya Sharma — a Full Stack & Cloud Developer. This diary holds the messy sketches, the late-night bugs, and the small wins that turned curiosity into craft.";

export function ChapterHello({ onPenClick }: { onPenClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(INTRO.slice(0, i));
      if (i >= INTRO.length) clearInterval(t);
    }, 26);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <Page id="hello" n="01" title="Hello, I'm Aditya" kicker="page one, finally">
      <div ref={ref} className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="relative">
          <p className="font-script text-2xl leading-relaxed text-foreground sm:text-3xl">
            {typed}
            <span className="ml-0.5 inline-block h-6 w-[2px] animate-pulse bg-primary align-middle" />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Full Stack", "Cloud", "TypeScript", "Curious by default"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-primary/40 bg-accent px-4 py-1.5 text-xs font-medium tracking-wide text-accent-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onPenClick}
            className="cursor-glow mt-10 flex items-center gap-3 text-left"
          >
            <span className="block h-1.5 w-24 rotate-[-8deg] rounded-full bg-foreground" />
            <span className="font-script text-lg text-muted-foreground">
              click the pen — it likes to write code
            </span>
          </button>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -left-6 top-2 h-24 w-24 rounded-full border-[6px] border-tan/50 opacity-70"
          />
          <div className="ml-auto w-[86%] -rotate-2 rounded-lg bg-secondary p-5 shadow-card">
            <p className="font-script text-xl text-foreground">
              note to self: ship it, then make it beautiful.
            </p>
          </div>
          <svg viewBox="0 0 200 120" className="mt-8 w-full" role="img" aria-label="sage line doodles">
            <g fill="none" stroke="var(--sage)" strokeWidth="1.4" strokeLinecap="round">
              <path d="M12 96c22-46 46-8 64-38s40 22 62-8" />
              <circle cx="150" cy="34" r="12" />
              <path d="M26 30h34M26 40h22" />
              <rect x="96" y="70" width="34" height="26" rx="4" />
            </g>
          </svg>
        </div>
      </div>
    </Page>
  );
}

/* ------------------------------ Ch 2 — Journey ----------------------------- */

const MILESTONES = [
  { year: "2019", title: "First line of code", note: "A Python print statement that felt like magic." },
  { year: "2021", title: "Built for people", note: "First real project used by classmates." },
  { year: "2023", title: "Into the cloud", note: "Deployments, pipelines, and 3 a.m. rollbacks." },
  { year: "2024", title: "Full stack", note: "React front ends wired to services I own end to end." },
  { year: "2026", title: "Still becoming", note: "The diary keeps a few blank pages on purpose." },
];

export function ChapterJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = 1 - (r.bottom - window.innerHeight * 0.4) / (r.height + window.innerHeight * 0.4);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Page id="journey" n="02" title="My Journey" kicker="a map, not a résumé">
      <div ref={ref} className="relative pl-14">
        <div className="absolute bottom-2 left-6 top-2 w-px bg-border" />
        <div
          className="absolute left-6 top-2 w-px bg-primary transition-all duration-300"
          style={{ height: `${progress * 100}%` }}
        />
        <div
          className="absolute left-6 z-10 -translate-x-1/2 transition-all duration-300"
          style={{ top: `calc(${progress * 100}% - 10px)` }}
          aria-hidden
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-card shadow-card">
            <span className="block h-3 w-[2px] rotate-45 rounded-full bg-primary" />
          </div>
        </div>

        <ol className="space-y-10">
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-14 top-1 flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-primary/60 bg-secondary text-[10px] font-semibold tracking-widest text-primary">
                {m.year}
              </span>
              <h3 className="text-xl font-semibold">{m.title}</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{m.note}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Page>
  );
}

/* ------------------------------- Ch 3 — Skills ---------------------------- */

const SKILLS = [
  { name: "Python", object: "Magic wand", years: "5 yrs", projects: "Automation, data tools, APIs", fun: "Still writes one-liners for fun." },
  { name: "C++", object: "Sword", years: "4 yrs", projects: "Algorithms, competitive programming", fun: "Pointers stopped being scary in 2022." },
  { name: "JavaScript", object: "Compass", years: "4 yrs", projects: "Interfaces, tooling, animations", fun: "Event loop diagrams on napkins." },
  { name: "React", object: "Floating crystal", years: "3 yrs", projects: "Dashboards, portfolios, design systems", fun: "Loves a well-named component." },
  { name: "Cloud", object: "Sky map", years: "2 yrs", projects: "CI/CD, serverless, observability", fun: "Names servers after mountains." },
  { name: "SQL", object: "Treasure chest", years: "3 yrs", projects: "Schema design, query tuning", fun: "Once turned 9s into 90ms." },
];

function SkillGlyph({ kind }: { kind: string }) {
  const common = { fill: "none", stroke: "var(--sage-deep)", strokeWidth: 1.5, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
      {kind === "Magic wand" && (
        <g {...common}>
          <path d="M14 50 46 18" />
          <path d="M46 12v8M52 18h-8M50 24l4 4" />
        </g>
      )}
      {kind === "Sword" && (
        <g {...common}>
          <path d="M20 46 44 18" />
          <path d="M14 52l6-6M24 40h14M32 32l8 8" />
        </g>
      )}
      {kind === "Compass" && (
        <g {...common}>
          <circle cx="32" cy="32" r="18" />
          <path d="M24 40l6-16 10 6z" />
        </g>
      )}
      {kind === "Floating crystal" && (
        <g {...common}>
          <path d="M32 12l14 14-14 24-14-24z" />
          <path d="M18 26h28M32 12v38" />
        </g>
      )}
      {kind === "Sky map" && (
        <g {...common}>
          <path d="M12 44c8-10 14 6 22-4s12 4 18-2" />
          <circle cx="22" cy="20" r="3" />
          <circle cx="42" cy="26" r="2" />
        </g>
      )}
      {kind === "Treasure chest" && (
        <g {...common}>
          <rect x="14" y="26" width="36" height="22" rx="3" />
          <path d="M14 34h36M32 34v6" />
          <path d="M18 26c2-8 26-8 28 0" />
        </g>
      )}
    </svg>
  );
}

export function ChapterSkills() {
  return (
    <Page id="skills" n="03" title="Skills" kicker="tools tucked between pages" bright={1}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="cursor-feather group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
          >
            <SkillGlyph kind={s.object} />
            <h3 className="mt-4 text-lg font-semibold">{s.name}</h3>
            <p className="font-script text-lg text-muted-foreground">{s.object}</p>
            <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
              <div className="rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{s.years}</p>
                <p className="mt-1">{s.projects}</p>
                <p className="mt-2 font-script text-base text-primary">{s.fun}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

/* ------------------------------ Ch 4 — Projects --------------------------- */

const PROJECTS = [
  {
    name: "Atlas Cloud Console",
    stack: ["React", "TypeScript", "AWS", "Terraform"],
    story: "A control room for our deployments — logs, metrics and rollbacks in one calm surface.",
    lesson: "Boring, predictable infrastructure is a feature.",
  },
  {
    name: "Inkwell CMS",
    stack: ["Next.js", "Postgres", "Prisma"],
    story: "A writing-first CMS for a student magazine, built around editors instead of developers.",
    lesson: "Interview your users before writing schemas.",
  },
  {
    name: "Trailmark",
    stack: ["Python", "FastAPI", "SQL"],
    story: "A route-planning API for hiking clubs, with elevation-aware suggestions.",
    lesson: "Caching turned a 9-second call into 90 milliseconds.",
  },
];

export function ChapterProjects() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Page id="projects" n="04" title="Projects" kicker="sealed, then opened" bright={2}>
      <div className="space-y-6">
        {PROJECTS.map((p) => {
          const isOpen = open === p.name;
          return (
            <div key={p.name} className="rounded-2xl border border-border bg-secondary/60 shadow-card">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : p.name)}
                className="cursor-glow flex w-full items-center gap-5 p-6 text-left"
              >
                <span className="relative flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-card shadow-card">
                  <span className="absolute inset-x-0 top-0 h-7 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-secondary" />
                  <span className="relative z-10 h-5 w-5 rounded-full bg-primary" />
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-semibold">{p.name}</span>
                  <span className="font-script text-lg text-muted-foreground">
                    {isOpen ? "folding back up…" : "click to unfold the envelope"}
                  </span>
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid gap-6 px-6 pb-7 md:grid-cols-[1fr_1.2fr]">
                  <div className="relative h-40">
                    <div className="absolute left-2 top-3 h-32 w-44 -rotate-6 rounded-xl border-4 border-card bg-accent shadow-card" />
                    <div className="dry-brush absolute left-10 top-0 h-32 w-44 rotate-3 rounded-xl border-4 border-card bg-secondary shadow-lift" />
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.story}</p>
                    <p className="mt-3 font-script text-lg text-primary">Lesson: {p.lesson}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-accent px-3 py-1 text-[11px] font-medium tracking-wide text-accent-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-4 text-sm font-medium">
                      <a href="#projects" className="ink-underline cursor-glow">
                        Live demo
                      </a>
                      <a href="#projects" className="ink-underline cursor-glow">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

/* ---------------------------- Ch 5 — Achievements ------------------------- */

const AWARDS = [
  { title: "Hackathon Winner", detail: "Built a campus accessibility map in 36 hours." },
  { title: "Cloud Practitioner", detail: "Certified — then immediately broke a staging cluster." },
  { title: "Open Source", detail: "Merged fixes into tooling used by thousands." },
  { title: "Dean's List", detail: "Two consecutive years, coffee-powered." },
];

export function ChapterAchievements() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Page id="achievements" n="05" title="Achievements" kicker="quiet little medals" bright={3}>
      <div className="grid gap-5 sm:grid-cols-2">
        {AWARDS.map((a, i) => (
          <button
            key={a.title}
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="cursor-glow rounded-2xl border border-border bg-card p-6 text-left shadow-card transition hover:shadow-lift"
          >
            <div className="flex items-center gap-4">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-accent">
                <span className="h-4 w-4 rounded-full bg-primary" />
                <span className="absolute -bottom-3 h-4 w-3 bg-tan [clip-path:polygon(0_0,100%_0,50%_100%)]" />
              </span>
              <h3 className="font-semibold">{a.title}</h3>
            </div>
            <motion.p
              initial={false}
              animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
              className="overflow-hidden text-sm text-muted-foreground"
            >
              <span className="mt-4 block">{a.detail}</span>
            </motion.p>
          </button>
        ))}
      </div>
    </Page>
  );
}

/* ----------------------------- Ch 6 — Education --------------------------- */

export function ChapterEducation() {
  return (
    <Page id="education" n="06" title="Education" kicker="class notes, mostly legible" bright={4}>
      <div className="ruled-lines rounded-2xl border border-border bg-card p-7">
        <ul className="space-y-8">
          {[
            {
              school: "B.Tech, Computer Science",
              years: "2022 — 2026",
              current: true,
              notes: ["Systems, networks and distributed computing", "Built the department's project archive"],
            },
            {
              school: "Senior Secondary — Science",
              years: "2020 — 2022",
              current: false,
              notes: ["Physics + maths, first taste of algorithms"],
            },
          ].map((e) => (
            <li key={e.school} className="relative pl-6">
              {e.current && (
                <span className="animate-sway absolute -left-9 -top-8 h-20 w-4 rounded-b bg-tan shadow-card" aria-hidden />
              )}
              <h3 className="text-lg font-semibold">
                <mark className="bg-accent px-1 text-accent-foreground">{e.school}</mark>
              </h3>
              <p className="font-script text-lg text-muted-foreground">{e.years}</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {e.notes.map((n) => (
                  <li key={n}>— {n}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

/* ------------------------------ Ch 7 — Future ----------------------------- */

export function ChapterFuture() {
  return (
    <Page id="future" n="07" title="Future Goals" kicker="the ink gets sharper" bright={5}>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
        <svg aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 opacity-40" viewBox="0 0 120 120">
          <g fill="none" stroke="var(--sage-soft)" strokeWidth="1">
            <path d="M0 20h60v30h40M0 60h30v40h50M60 0v30h40" />
            <circle cx="60" cy="50" r="3" />
            <circle cx="100" cy="30" r="3" />
            <circle cx="80" cy="100" r="3" />
          </g>
        </svg>
        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            ["Depth over breadth", "Go deeper on distributed systems and platform engineering."],
            ["Teach what I learn", "Write clearly enough that beginners feel invited in."],
            ["Design fluency", "Build interfaces that feel considered, not decorated."],
            ["Ship something lasting", "A tool people quietly rely on for years."],
          ].map(([t, d]) => (
            <li key={t} className="border-l border-primary/40 pl-4">
              <h3 className="font-display text-lg font-semibold tracking-tight">{t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

/* ------------------------------ Ch 8 — Contact ---------------------------- */

export function ChapterContact({ onSent }: { onSent: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <Page id="contact" n="08" title="Write Back" kicker="the last page is yours" bright={6}>
      <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The diary is a modern surface now — but the handwriting is still mine. Tell me what
            you're building and I'll write back.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="font-medium">aditya.sharma@example.com</p>
            <p className="text-muted-foreground">github.com/adityasharma · linkedin.com/in/adityasharma</p>
          </div>
        </div>
        <form
          className="relative rounded-2xl border border-border bg-card p-6 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            onSent();
          }}
        >
          <div className="space-y-4">
            {[
              { label: "Your name", type: "text" },
              { label: "Email", type: "email" },
            ].map((f) => (
              <label key={f.label} className="block">
                <span className="font-script text-lg text-muted-foreground">{f.label}</span>
                <input
                  required
                  type={f.type}
                  className="mt-1 w-full border-0 border-b border-border bg-transparent pb-2 text-sm outline-none focus:border-primary"
                />
              </label>
            ))}
            <label className="block">
              <span className="font-script text-lg text-muted-foreground">A note</span>
              <textarea
                required
                rows={3}
                className="ruled-lines mt-1 w-full resize-none border-0 bg-transparent text-sm outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="cursor-glow mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Fold into a paper plane
          </button>

          {sent && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
            >
              <motion.div
                initial={{ y: 40, opacity: 0, rotate: -8 }}
                animate={{ y: -220, opacity: [0, 1, 1, 0], rotate: 14 }}
                transition={{ duration: 2.4, ease: "easeOut" }}
              >
                <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden>
                  <path d="M4 24 44 6 30 42 22 30z" fill="var(--cream)" stroke="var(--sage-deep)" strokeWidth="1.4" />
                  <path d="M4 24l26 6" stroke="var(--sage)" strokeWidth="1.2" fill="none" />
                </svg>
              </motion.div>
            </motion.div>
          )}
          {sent && (
            <p className="mt-4 text-center font-script text-xl text-primary">
              sent — it's already in the air ✉
            </p>
          )}
        </form>
      </div>
    </Page>
  );
}
