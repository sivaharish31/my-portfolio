import { Mail, ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon, CodolioIcon, OSCIIcon } from "./icons";
import { config } from "../data/portfolio";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const NAV_SHORTCUTS = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Open Source", href: "opensource" },
  { label: "Problem Solving", href: "competitive" },
  { label: "Contact", href: "contact" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-14 min-w-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 min-w-0">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-3 min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-xs">
                <span className="text-white text-xs font-bold">SH</span>
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Sivaharish
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Computer Science & Engineering Student at St. Joseph's College of Engineering, Chennai. Java programmer and open-source contributor.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400">
              Expected Graduation: 2029
            </div>
          </div>

          {/* Nav shortcuts (3 cols) */}
          <div className="lg:col-span-3 min-w-0">
            <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_SHORTCUTS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles (4 cols) */}
          <div className="lg:col-span-4 min-w-0">
            <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase mb-4">
              Developer Profiles
            </p>
            <div className="space-y-2.5">
              <a
                href={config.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
              >
                <GitHubIcon className="w-4 h-4 text-slate-400" />
                GitHub · @sivaharish31
              </a>
              <a
                href={config.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
              >
                <LinkedInIcon className="w-4 h-4 text-slate-400" />
                LinkedIn · ssivaharish
              </a>
              <a
                href={config.codolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
              >
                <CodolioIcon className="w-4 h-4 text-slate-400" />
                Codolio · Sivaharish
              </a>
              <a
                href={config.osci}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
              >
                <OSCIIcon className="w-4 h-4 text-slate-400" />
                OSCI Dashboard
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                {config.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-400 break-words">
            © {CURRENT_YEAR} Sivaharish. All rights reserved. Built with React, TypeScript, Tailwind CSS, & Motion.
          </p>
          <button
            onClick={() => scrollTo("hero")}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
