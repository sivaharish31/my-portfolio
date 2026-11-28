import React, { useEffect, useCallback, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/animations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { SmoothScrollContext } from "../hooks/useSmoothScroll";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const scrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    if (typeof window === "undefined") return;

    if (prefersReduced || !lenisRef.current) {
      if (typeof target === "string") {
        const id = target.startsWith("#") ? target.slice(1) : target;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
      }
      return;
    }

    let targetEl: HTMLElement | null = null;
    if (typeof target === "string") {
      const id = target.startsWith("#") ? target : `#${target}`;
      targetEl = document.querySelector(id);
    } else {
      targetEl = target;
    }

    if (targetEl) {
      lenisRef.current.scrollTo(targetEl, {
        offset,
        duration: 1.2,
      });
    }
  }, [prefersReduced]);

  const getLenis = useCallback(() => lenisRef.current, []);

  return (
    <SmoothScrollContext.Provider value={{ getLenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
