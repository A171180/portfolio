import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
  as?: "div" | "button";
  ariaLabel?: string;
};

/** A light-weight 3D tilt surface used for panels, cards and project tiles. */
export function TiltCard({
  children,
  className = "",
  intensity = 10,
  onClick,
  as = "div",
  ariaLabel,
}: Props) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 140,
    damping: 16,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 140,
    damping: 16,
  });

  const Comp = as === "button" ? motion.button : motion.div;

  return (
    <div style={{ perspective: 1000 }} className="contents">
      <Comp
        type={as === "button" ? "button" : undefined}
        aria-label={ariaLabel}
        onClick={onClick}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        className={className}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
      </Comp>
    </div>
  );
}
