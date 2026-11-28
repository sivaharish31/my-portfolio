import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { gsap } from "../lib/animations";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/**
 * Magnetic wrapper that gently pulls interactive elements toward the cursor on desktop.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [finePointer] = useState(isFinePointer);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !finePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (prefersReduced || !finePointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked word-by-word typography reveal for editorial section headings.
 */
export function MaskedHeading({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  const words = children.split(" ");

  if (prefersReduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0 pb-[0.06em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 0.65,
              delay: delay + idx * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Interactive card with dynamic cursor-tracking spotlight gradient and subtle 3D tilt.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.14)",
  tiltStrength = 5,
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  tiltStrength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [finePointer] = useState(isFinePointer);
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0, active: false });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [tiltStrength, -tiltStrength]),
    { stiffness: 220, damping: 24 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-tiltStrength, tiltStrength]),
    { stiffness: 220, damping: 24 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !finePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    mouseX.set(localX / rect.width - 0.5);
    mouseY.set(localY / rect.height - 0.5);
    setSpotPos({ x: localX, y: localY, active: true });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSpotPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReduced || !finePointer
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
      className={`relative [perspective:1000px] ${className}`}
    >
      {/* Dynamic cursor-following radial spotlight */}
      {!prefersReduced && finePointer && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0"
          style={{
            opacity: spotPos.active ? 1 : 0,
            background: `radial-gradient(480px circle at ${spotPos.x}px ${spotPos.y}px, ${spotlightColor}, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/**
 * Subtle editorial background watermark that scrubs horizontally on scroll on desktop.
 */
export function SectionWatermark({
  text,
  direction = "left",
  align = "right",
  tone = "default",
}: {
  text: string;
  direction?: "left" | "right";
  align?: "left" | "right";
  tone?: "default" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReduced || !ref.current) return;
    const el = ref.current;
    const parent = el.closest("section");
    if (!parent) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          el,
          { x: direction === "left" ? 60 : -60 },
          {
            x: direction === "left" ? -60 : 60,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          el,
          { x: direction === "left" ? 28 : -28 },
          {
            x: direction === "left" ? -28 : 28,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [prefersReduced, direction]);

  return (
    <div
      ref={ref}
      className={`block absolute top-6 sm:top-8 lg:top-10 ${
        align === "right" ? "right-0" : "left-0"
      } text-[3.25rem] sm:text-[5rem] lg:text-[7.5rem] font-black tracking-tighter ${
        tone === "dark"
          ? "text-white/[0.04]"
          : "text-slate-900/[0.065] dark:text-white/[0.035]"
      } select-none pointer-events-none whitespace-nowrap z-0`}
      aria-hidden="true"
    >
      {text}
    </div>
  );
}
