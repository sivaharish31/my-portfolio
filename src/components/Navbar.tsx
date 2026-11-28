import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useScrolled } from "../hooks/useScrolled";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { config } from "../data/portfolio";

const NAV_ITEMS = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Open Source", href: "opensource" },
  { label: "Problem Solving", href: "competitive" },
  { label: "Certifications", href: "certifications" },
  { label: "Contact", href: "contact" },
];

const SECTION_IDS = NAV_ITEMS.map((n) => n.href);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [manualActive, setManualActive] = useState<string | null>(null);
  const activeSection = useScrollSpy(SECTION_IDS);
  const scrolled = useScrolled(24);
  const prefersReduced = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const currentActive =
    manualActive && manualActive !== activeSection ? manualActive : activeSection;

  // Reset manual active on direct scroll interaction
  useEffect(() => {
    const handleUserScroll = () => {
      setManualActive(null);
    };
    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchmove", handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchmove", handleUserScroll);
    };
  }, []);

  const { scrollTo: smoothScrollTo, getLenis } = useSmoothScroll();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [menuOpen, getLenis]);

  const scrollTo = (id: string) => {
    setManualActive(id);
    smoothScrollTo(id, id === "hero" ? 0 : -84);
  };

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Close mobile drawer on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        const toggleBtn = document.getElementById("mobile-menu-toggle");
        if (toggleBtn && toggleBtn.contains(e.target as Node)) return;
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={prefersReduced ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3.5 sm:pt-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full lg:w-fit max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-3rem)] mx-auto h-[50px] sm:h-[52px] px-2.5 sm:px-3 rounded-full flex items-center justify-between lg:justify-center lg:gap-3 xl:gap-4 transition-[background-color,border-color,box-shadow] duration-300 ${
            scrolled
              ? "bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/70 shadow-[0_8px_30px_rgb(15,23,42,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
              : "bg-white/60 dark:bg-slate-950/55 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/60"
          }`}
        >
          {/* Minimal SH Brand Mark */}
          <motion.button
            type="button"
            onClick={() => scrollTo("hero")}
            whileHover={prefersReduced ? undefined : { scale: 1.05 }}
            whileTap={prefersReduced ? undefined : { scale: 0.95 }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-[11.5px] tracking-tighter shadow-xs hover:shadow-md transition-shadow cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            aria-label="SH — Return to Home"
          >
            SH
          </motion.button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentActive === item.href;
              return (
                <button
                  type="button"
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-2.5 xl:px-3 py-1.5 text-[12.5px] tracking-tight rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap ${
                    isActive
                      ? "text-slate-950 dark:text-white font-semibold"
                      : "text-slate-600 dark:text-slate-400 font-medium hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-slate-900/[0.06] dark:bg-white/[0.1] rounded-full"
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right-Side Controls (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            <ThemeToggle />

            <div
              className="h-3.5 w-px bg-slate-200/90 dark:bg-slate-800 mx-0.5"
              aria-hidden="true"
            />

            <a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.05] dark:hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-[15px] h-[15px]" />
            </a>
            <a
              href={config.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.05] dark:hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-[15px] h-[15px]" />
            </a>
          </div>

          {/* Mobile Controls (< lg) */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <ThemeToggle />
            <motion.button
              type="button"
              id="mobile-menu-toggle"
              whileTap={prefersReduced ? undefined : { scale: 0.94 }}
              className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-full text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white bg-slate-900/[0.06] hover:bg-slate-900/[0.1] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-xs font-semibold"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-3.5 h-3.5" />
                  <span>Menu</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Floating Glass Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={mobileMenuRef}
              id="mobile-navigation"
              role="region"
              aria-label="Mobile Navigation"
              initial={prefersReduced ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: prefersReduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto lg:hidden mt-2.5 p-3 rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.16)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-200/90 dark:border-slate-700/80 max-w-[440px] mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl max-h-[calc(100dvh-5.5rem)] overflow-y-auto"
            >
              <nav aria-label="Mobile sections" className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentActive === item.href;
                  return (
                    <button
                      type="button"
                      key={item.href}
                      onClick={() => {
                        setMenuOpen(false);
                        requestAnimationFrame(() => {
                          scrollTo(item.href);
                        });
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-[13px] tracking-tight rounded-2xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold"
                          : "text-slate-700 dark:text-slate-200 font-medium hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-600"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-3 mt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <a
                    href={config.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                  <a
                    href={config.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                </div>

                <ThemeToggle showLabel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Backdrop Scrim */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/20 dark:bg-black/45 backdrop-blur-[2px] lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
