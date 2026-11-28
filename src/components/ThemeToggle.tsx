import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const prefersReduced = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={prefersReduced ? undefined : { scale: 1.05 }}
      whileTap={prefersReduced ? undefined : { scale: 0.94 }}
      className={`relative inline-flex items-center justify-center gap-2 h-8 ${
        showLabel ? "px-3.5" : "w-8"
      } rounded-full text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white bg-slate-900/[0.04] hover:bg-slate-900/[0.08] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? "dark" : "light"}
            initial={prefersReduced ? false : { opacity: 0, rotate: -50, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, rotate: 50, scale: 0.7 }}
            transition={{ duration: prefersReduced ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Sun className="w-[15px] h-[15px] text-amber-400" />
            ) : (
              <Moon className="w-[15px] h-[15px] text-slate-700" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs font-medium tracking-tight">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </motion.button>
  );
}
