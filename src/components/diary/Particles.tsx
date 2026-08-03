import { useEffect, useMemo, useRef, useState } from "react";

type Season = "spring" | "summer" | "autumn" | "winter";

function currentSeason(): Season {
  const m = new Date().getMonth();
  if (m < 2 || m === 11) return "winter";
  if (m < 5) return "spring";
  if (m < 8) return "summer";
  return "autumn";
}

/**
 * Ambient dust / paper-fibre particles. Drifts gently with the cursor and
 * shifts tone with the season and evening mode.
 */
export function Particles({ evening }: { evening: boolean }) {
  const season = useMemo(currentSeason, []);
  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() =>
        setDrift({
          x: (e.clientX / window.innerWidth - 0.5) * 26,
          y: (e.clientY / window.innerHeight - 0.5) * 18,
        }),
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const motes = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: 2 + ((i * 7) % 5),
        delay: (i % 12) * 1.1,
        duration: 14 + ((i * 5) % 16),
      })),
    [],
  );

  const tone = evening
    ? "bg-sage-soft/60"
    : season === "autumn"
      ? "bg-tan/70"
      : season === "winter"
        ? "bg-cream/80"
        : "bg-tan/50";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ transform: `translate3d(${drift.x}px, ${drift.y}px, 0)`, transition: "transform 1.6s ease-out" }}
    >
      {motes.map((m, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${tone} blur-[0.5px]`}
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            animation: `drift-up ${m.duration}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
      {evening && (
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--sage-soft)_22%,transparent),transparent_70%)]" />
      )}
    </div>
  );
}
