import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function CursorSpotlight() {
  const prefersReduced = useReducedMotion();
  const [isTouchDevice] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches
  );
  const [isVisible, setIsVisible] = useState(false);

  // Ambient spotlight follows with smooth inertia
  const spotX = useSpring(0, { stiffness: 75, damping: 24 });
  const spotY = useSpring(0, { stiffness: 75, damping: 24 });

  useEffect(() => {
    if (isTouchDevice || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      spotX.set(e.clientX);
      spotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spotX, spotY, isVisible, isTouchDevice, prefersReduced]);

  if (prefersReduced || isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-30 w-[680px] h-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-75 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen blur-3xl"
      style={{
        x: spotX,
        y: spotY,
        background:
          "radial-gradient(circle, rgba(37, 99, 235, 0.14) 0%, rgba(124, 58, 237, 0.08) 38%, rgba(6, 182, 212, 0.04) 60%, transparent 75%)",
      }}
      aria-hidden="true"
    />
  );
}
