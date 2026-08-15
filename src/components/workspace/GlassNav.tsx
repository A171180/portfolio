import photo from "@/assets/aditya.jpg.asset.json";
import { NAV, type SectionId } from "@/data/portfolio";

type Props = {
  active: SectionId;
  onJump: (id: SectionId) => void;
  evening: boolean;
  onEvening: () => void;
  muted: boolean;
  onMute: () => void;
};

export function GlassNav({ active, onJump, evening, onEvening, muted, onMute }: Props) {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <nav className="glass-panel mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full px-3 py-2">
        <button
          type="button"
          onClick={() => onJump("home")}
          className="flex items-center gap-2 pl-1"
          aria-label="Aditya Sharma — home"
        >
          <img
            src={photo.url}
            alt="Portrait of Aditya Sharma"
            className="h-8 w-8 rounded-full object-cover object-top glow-ring"
            loading="lazy"
          />
          <span className="font-display text-sm font-semibold tracking-tight">Aditya Sharma</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => onJump(n.id)}
                aria-current={active === n.id ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.2em] transition ${
                  active === n.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onEvening}
            className="rounded-full border border-glass-line px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.18em] text-foreground"
          >
            {evening ? "Day" : "Night"}
          </button>
          <button
            type="button"
            onClick={onMute}
            aria-pressed={!muted}
            className="rounded-full border border-glass-line px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.18em] text-foreground"
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
        </div>
      </nav>

      {/* compact mobile section switcher */}
      <ul className="glass-panel mx-auto mt-2 flex max-w-md items-center justify-between gap-1 rounded-full px-2 py-1.5 md:hidden">
        {NAV.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => onJump(n.id)}
              aria-current={active === n.id ? "page" : undefined}
              className={`rounded-full px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.14em] transition ${
                active === n.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
