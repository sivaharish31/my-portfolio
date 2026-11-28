import { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Mail, ArrowRight, Check, Copy, MessageSquare } from "lucide-react";
import { GitHubIcon, LinkedInIcon, CodolioIcon } from "./icons";
import { config } from "../data/portfolio";
import { MaskedHeading, Magnetic, SectionWatermark } from "./MotionPrimitives";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-14 sm:py-16 md:py-20 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden transition-colors duration-300 border-t border-slate-800"
      aria-labelledby="contact-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      <SectionWatermark text="10 // CONTACT" align="left" direction="right" tone="dark" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        <div className="max-w-3xl min-w-0">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-400 bg-blue-950/70 border border-blue-800 uppercase">
              <MessageSquare className="w-3.5 h-3.5" />
              Get in Touch
            </span>
          </motion.div>

          {/* Heading */}
          <h2
            id="contact-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] break-words"
          >
            <MaskedHeading>Have an interesting opportunity?</MaskedHeading>{" "}
            <span className="text-slate-400 font-normal">
              <MaskedHeading delay={0.2}>Let's connect.</MaskedHeading>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
          >
            I am always glad to connect with fellow software engineers, open-source maintainers, and teams building meaningful products. Whether discussing backend engineering, algorithms, or future engineering roles — feel free to reach out.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 mb-14"
          >
            <Magnetic strength={0.22}>
              <motion.a
                href={`mailto:${config.email}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer group max-w-full"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{config.email}</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
                aria-label="Copy Email to Clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Address</span>
                  </>
                )}
              </motion.button>
            </Magnetic>
          </motion.div>

          {/* Verified Social Profile Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 pt-8 border-t border-slate-800 min-w-0"
          >
            <motion.a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <GitHubIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors mb-2" />
              <p className="text-sm font-semibold text-white">GitHub</p>
              <p className="text-xs text-slate-300 font-mono mt-0.5">@sivaharish31</p>
            </motion.a>

            <motion.a
              href={config.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <LinkedInIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors mb-2" />
              <p className="text-sm font-semibold text-white">LinkedIn</p>
              <p className="text-xs text-slate-300 font-mono mt-0.5">in/ssivaharish</p>
            </motion.a>

            <motion.a
              href={config.codolio}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all group focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <CodolioIcon className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors mb-2" />
              <p className="text-sm font-semibold text-white">Codolio</p>
              <p className="text-xs text-slate-300 font-mono mt-0.5">Coding Profile</p>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
