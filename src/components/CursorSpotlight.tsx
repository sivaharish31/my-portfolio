import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function CursorSpotlight() {
  const prefersReduced = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsTouchDevice(!hasFinePointer);

    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
  }, [mouseX, mouseY, isVisible]);

  if (prefersReduced || isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-30 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen blur-3xl"
      style={{
        x: mouseX,
        y: mouseY,
        background:
          "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.04) 40%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
