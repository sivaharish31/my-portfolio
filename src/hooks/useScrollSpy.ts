import { useState, useEffect } from "react";

/**
 * Tracks which section is currently in view for navigation highlighting.
 * Uses getBoundingClientRect for reliable absolute document positioning
 * and includes bottom-of-page detection for terminal sections.
 */
export function useScrollSpy(sectionIds: string[], offset = 120): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled near the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollPosition < 80) {
        setActiveSection(sectionIds[sectionIds.length - 1] ?? "");
        return;
      }

      // Check sections from top to bottom against current viewport offset
      const currentScrollY = window.scrollY + offset;
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= currentScrollY) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
