import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Circle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useScrolled } from "../hooks/useScrolled";
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

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);
  const scrolled = useScrolled(20);

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-3 sm:pt-3.5">
      <div
        className={`max-w-[1140px] mx-auto h-[58px] sm:h-[60px] px-3.5 sm:px-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "glass-panel shadow-sm border border-slate-200/90 dark:border-slate-800/90 dark:bg-slate-900/80"
            : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60"
        }`}
      >
        {/* Logo / Monogram */}
        <motion.button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 sm:gap-2.5 group text-left cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-blue-600 dark:to-indigo-600 flex items-center justify-center shadow-xs overflow-hidden group-hover:shadow-blue-500/20 group-hover:shadow-md transition-shadow">
            <span className="text-white text-xs font-bold tracking-tight">SH</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white tracking-tight leading-none">
              Sivaharish
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 font-mono tracking-tight mt-0.5">
              CSE · 2029
            </span>
          </div>
        </motion.button>

        {/* Desktop Nav Items */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-100/70 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800"
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`relative px-2.5 xl:px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "text-slate-950 dark:text-white font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-xs border border-slate-200/70 dark:border-slate-700/80"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          {config.available && (
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/90 dark:bg-emerald-950/60 rounded-full border border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
                {config.availabilityText}
              </span>
            </div>
          )}

          {/* Theme Toggle Button */}
          <ThemeToggle />

          <div className="flex items-center gap-1 pl-1">
            <a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href={config.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile controls (Theme Toggle + Hamburger) */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <button
            className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            role="region"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden mt-2 p-4 rounded-2xl glass-panel shadow-lg border border-slate-200/90 dark:border-slate-800 max-w-[1140px] mx-auto bg-white/95 dark:bg-slate-900/95"
          >
            {config.available && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200 dark:border-emerald-800/80 w-fit mb-3">
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {config.availabilityText}
                </span>
              </div>
            )}
            <div className="space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    scrollTo(item.href);
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    activeSection === item.href
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <a
                  href={config.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white py-1.5"
                >
                  <GitHubIcon className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={config.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white py-1.5"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>

              <ThemeToggle showLabel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
