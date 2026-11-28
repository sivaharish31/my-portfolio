import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Standard animation curves and durations for consistent feel across the portfolio.
 */
export const MOTION_CONFIG = {
  ease: [0.16, 1, 0.3, 1] as const, // Custom cubic bezier for smooth decelerating spring
  fastEase: [0.22, 1, 0.36, 1] as const,
  duration: {
    instant: 0.15,
    fast: 0.25,
    normal: 0.5,
    slow: 0.75,
  },
};
