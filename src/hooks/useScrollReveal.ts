import { useLayoutEffect, useEffect, type RefObject } from "react";
import { gsap } from "../lib/animations";
import { useReducedMotion } from "./useReducedMotion";

// Use useLayoutEffect in browser, useEffect in SSR
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Reusable GSAP ScrollTrigger hook with automatic lifecycle cleanup via gsap.context.
 * Automatically disables transforms when prefers-reduced-motion is enabled.
 */
export function useScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  animationFn: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const prefersReduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReduced || !scopeRef.current) {
      return;
    }

    const ctx = gsap.context((context) => {
      animationFn(context);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReduced, ...deps]);
}

/**
 * Animated counter hook that smoothly counts up to target value using GSAP
 */
export function animateCounter(
  target: { val: number },
  endValue: number,
  onUpdate: (latest: number) => void,
  duration = 1.6
) {
  return gsap.to(target, {
    val: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      onUpdate(Math.round(target.val));
    },
  });
}
