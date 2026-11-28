import { useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, ChevronRight, Flame } from "lucide-react";
import { GitHubIcon, LinkedInIcon, CodolioIcon } from "./icons";
import { config } from "../data/portfolio";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { gsap } from "../lib/animations";
import { Magnetic } from "./MotionPrimitives";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const HEADLINE_WORDS_BEFORE = ["Building", "software"];
const HEADLINE_WORDS_GRADIENT = ["that", "solves"];
const HEADLINE_WORDS_AFTER = ["real", "problems."];

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const prefersReduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Coordinated GSAP Entrance Timeline + Scroll-Driven Exit Parallax
  useIsomorphicLayoutEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-status", {
        y: 18,
        opacity: 0,
        scale: 0.94,
        duration: 0.65,
      })
        .from(
          ".hero-word",
          {
            y: "115%",
            opacity: 0,
            rotateZ: 1.5,
            duration: 0.85,
            stagger: 0.055,
          },
          "-=0.4"
        )
        .from(
          ".hero-copy",
          {
            y: 22,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          {
            y: 18,
            opacity: 0,
            scale: 0.96,
            duration: 0.6,
          },
          "-=0.45"
        )
        .from(
          ".hero-social",
          {
            y: 14,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-portrait-reveal",
          {
            clipPath: "inset(14% 0% 0% 0%)",
            opacity: 0,
            y: 28,
            scale: 0.97,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
          },
          0.2
        )
        .from(
          ".hero-portrait-glow",
          {
            opacity: 0,
            scale: 0.85,
            duration: 1.1,
            ease: "power2.out",
          },
          0.18
        )
        .from(
          ".hero-floating-badge",
          {
            y: 16,
            opacity: 0,
            scale: 0.92,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-scroll-cue",
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
          },
          "-=0.3"
        );

      // Scroll-driven depth transition out of Hero on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (heroContentRef.current) {
          gsap.to(heroContentRef.current, {
            y: -44,
            opacity: 0.3,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-slate-950 dark:via-slate-900/70 dark:to-slate-950 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-14"
      aria-label="Introduction"
    >
      {/* Static Background Atmosphere & Layered Glows */}
      <div
        className="absolute inset-0 bg-subtle-grid opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[480px] ambient-glow-blue blur-3xl pointer-events-none opacity-80 dark:opacity-75"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-6 w-[540px] h-[540px] ambient-glow-purple blur-3xl pointer-events-none opacity-65 dark:opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-4 left-10 w-[440px] h-[380px] ambient-glow-cyan blur-3xl pointer-events-none opacity-55 dark:opacity-45"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div
        ref={heroContentRef}
        className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 w-full min-w-0"
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-w-0">
          {/* Left Column: Personal Brand & Intro (7 cols) */}
          <div className="lg:col-span-7 max-w-2xl min-w-0 w-full">
            {/* Status Pill */}
            <div className="mb-5 hero-status">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/70 shadow-xs backdrop-blur-sm max-w-full">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-blue-900 dark:text-blue-300 uppercase leading-snug">
                  Engineering Student · Open-Source Contributor
                </span>
              </div>
            </div>

            {/* Expressive Masked Word-by-Word Headline */}
            <h1 className="text-[2.15rem] sm:text-5xl lg:text-[3.85rem] font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-5 break-words">
              {HEADLINE_WORDS_BEFORE.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom mr-[0.24em] pb-[0.06em]"
                >
                  <span className="hero-word inline-block">{word}</span>
                </span>
              ))}
              {HEADLINE_WORDS_GRADIENT.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom mr-[0.24em] pb-[0.06em]"
                >
                  <span className="hero-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                    {word}
                  </span>
                </span>
              ))}
              {HEADLINE_WORDS_AFTER.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom mr-[0.24em] last:mr-0 pb-[0.06em]"
                >
                  <span className="hero-word inline-block">{word}</span>
                </span>
              ))}
            </h1>

            {/* Introduction Paragraph */}
            <p className="hero-copy text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-3 break-words">
              Hi, I'm{" "}
              <strong className="text-slate-950 dark:text-white font-bold">
                Sivaharish
              </strong>{" "}
              — a Computer Science & Engineering student at{" "}
              <span className="text-slate-900 dark:text-slate-200 font-semibold">
                St. Joseph's College of Engineering
              </span>
              , Chennai (Class of 2029).
            </p>

            {/* Supporting Context */}
            <p className="hero-copy text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-7 max-w-xl break-words">
              Aspiring Software Development Engineer focused on Java programming, data structures & algorithms, and practical backend architecture with verified code contributions to established open-source projects.
            </p>

            {/* Magnetic Action Button */}
            <div className="hero-cta flex items-center gap-3.5 mb-7">
              <Magnetic strength={0.26}>
                <motion.button
                  onClick={() => scrollTo("projects", -84)}
                  className="relative inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">Explore My Work</span>
                  <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/20 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    aria-hidden="true"
                  />
                </motion.button>
              </Magnetic>
            </div>

            {/* Social Profile Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-slate-200/80 dark:border-slate-800">
              <Magnetic strength={0.2} className="hero-social">
                <a
                  href={config.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white border border-transparent dark:border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <GitHubIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>GitHub</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.2} className="hero-social">
                <a
                  href={config.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white border border-transparent dark:border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.2} className="hero-social">
                <a
                  href={config.codolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white border border-transparent dark:border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <CodolioIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Codolio</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.18} className="hero-social max-w-full">
                <a
                  href={`mailto:${config.email}`}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white border border-transparent dark:border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 max-w-full truncate"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{config.email}</span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Prominent Transparent Portrait Composition (5 cols) */}
          <div className="lg:col-span-5 relative flex items-end justify-center min-w-0 w-full">
            {/* Subtle Multi-Layered Ambient Glow Behind Portrait */}
            <div
              className="hero-portrait-glow absolute inset-x-4 bottom-4 top-8 rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/20 dark:from-blue-500/25 dark:via-indigo-500/20 dark:to-purple-500/25 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="hero-portrait-glow absolute bottom-6 left-1/2 -translate-x-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-cyan-400/15 dark:bg-blue-400/15 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Portrait Container */}
            <div className="hero-portrait-reveal relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[430px] mx-auto select-none">
              <img
                src="/images/sivaharish-portrait.png"
                alt="Portrait of Sivaharish"
                width={557}
                height={1024}
                decoding="async"
                fetchPriority="high"
                className="w-full h-auto max-h-[380px] sm:max-h-[460px] lg:max-h-[540px] object-contain object-bottom mx-auto [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
              />
            </div>

            {/* Floating Credibility Callout */}
            <div className="hero-floating-badge hidden sm:flex absolute bottom-4 left-0 lg:-left-4 items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border border-slate-200/80 dark:border-slate-800/90 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <Flame className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Netflix · Microsoft · Google · AWS · IBM Contributor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <button
        type="button"
        className="hero-scroll-cue mt-6 mx-auto flex flex-col items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-3 py-1"
        onClick={() => scrollTo("about", -84)}
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] group-hover:tracking-[0.3em] transition-all">
          Scroll to Explore
        </span>
        <div className="w-5 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex justify-center pt-1.5">
          <motion.span
            animate={prefersReduced ? undefined : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
          />
        </div>
      </button>
    </section>
  );
}
