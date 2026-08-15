import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact.functions";
import { LINKS } from "@/data/portfolio";

export function ContactSection({ onSent }: { onSent: () => void }) {
  const send = useServerFn(sendContactMessage);
  const [pending, setPending] = useState(false);
  const [flying, setFlying] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setPending(true);
    try {
      await send({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      form.reset();
      setFlying(true);
      onSent();
      setTimeout(() => setFlying(false), 1800);
      toast.success("Message sent — I'll get back to you soon.");
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error && err.message.includes("delivered")
          ? err.message
          : "Please check your details and try again.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="contact" className="relative px-5 py-28">
      <div className="mx-auto max-w-4xl">
        <p className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Contact</p>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,5vw,3.2rem)] font-semibold tracking-tight">
          Let&apos;s Build Something
        </h2>
        <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
          Have an idea, project, or experiment in mind? Let&apos;s turn it into something real.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={submit} className="glass-panel relative rounded-3xl p-6 sm:p-8">
            <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-primary" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              minLength={2}
              className="mt-2 w-full rounded-xl border border-glass-line bg-card/60 px-4 py-3 font-body text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            <label
              className="mt-5 block font-mono text-[10px] uppercase tracking-[0.24em] text-primary"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-glass-line bg-card/60 px-4 py-3 font-body text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            <label
              className="mt-5 block font-mono text-[10px] uppercase tracking-[0.24em] text-primary"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-glass-line bg-card/60 px-4 py-3 font-body text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            <button
              type="submit"
              disabled={pending}
              className="mt-7 rounded-full bg-primary px-6 py-3 font-body text-[11px] uppercase tracking-[0.26em] text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send"}
            </button>

            <AnimatePresence>
              {flying && (
                <motion.svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: [0, 1, 1, 0], x: 260, y: -180, scale: 0.4, rotate: 18 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute bottom-10 left-10 h-7 w-7 text-primary"
                >
                  <path d="M2 12 22 3l-7 18-3.5-6.5L2 12Z" fill="currentColor" />
                </motion.svg>
              )}
            </AnimatePresence>
          </form>

          <div className="space-y-3">
            {[
              { label: "GitHub", href: LINKS.github },
              { label: "LinkedIn", href: LINKS.linkedin },
              { label: "Email", href: LINKS.email },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass-panel flex items-center justify-between rounded-2xl px-5 py-4 font-body text-sm transition hover:glow-ring"
              >
                <span>{l.label}</span>
                <span aria-hidden className="font-mono text-primary">
                  →
                </span>
              </a>
            ))}
            <p className="pt-2 font-body text-xs leading-relaxed text-muted-foreground">
              Physical → Interactive → Digital → Developer → Projects → Connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
