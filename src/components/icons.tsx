// Authentic SVG brand and technology logos
// All SVGs are cleanly formatted, responsive, and theme-compatible.

interface IconProps {
  className?: string;
  size?: number | string;
}

// ─────────────────────────────────────────────────────────────
// Cloud, Technology & Open Source Companies
// ─────────────────────────────────────────────────────────────

export function GitHubIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function AWSIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.924 9.967c0-.708.57-1.162 1.492-1.162.77 0 1.492.292 2.055.77l.79-.894a4.135 4.135 0 0 0-2.845-.985c-1.867 0-3.003 1.083-3.003 2.502 0 2.228 2.825 1.83 2.825 3.01 0 .768-.67 1.182-1.63 1.182-.947 0-1.815-.394-2.427-.966l-.79.888a4.57 4.57 0 0 0 3.217 1.183c2.004 0 3.14-1.025 3.14-2.523-.02-2.248-2.824-1.87-2.824-3.005zm5.717-2.15l-1.836 7.427h1.492l.493-2.148h2.094l.474 2.148h1.51l-1.855-7.427h-2.372zm.75 3.963l.633-2.738.612 2.738h-1.245zm5.402-3.963l-1.472 5.578-1.452-5.578h-1.284l2.173 7.427h1.166l1.472-5.46 1.472 5.46h1.166l2.193-7.427h-1.343l-1.472 5.578-1.473-5.578h-1.141z"
        fill="currentColor"
      />
      <path
        d="M2.936 17.518c3.967 2.923 9.428 3.199 14.154 1.123.633-.276 1.324.237 1.107.868-4.502 3.687-11.365 2.564-16.12-.907-.375-.276-.02-.828.444-.652.138-.138.277-.295.415-.432z"
        fill="#FF9900"
      />
      <path
        d="M17.848 18.05c-.474-.61-3.023-.314-4.228-.157-.355.039-.415-.295-.118-.512 1.954-1.34 5.084-.965 5.46-.493.394.493-.099 3.626-1.954 5.105-.296.236-.572.118-.454-.217.434-1.123 1.638-3.371 1.294-3.726z"
        fill="#FF9900"
      />
    </svg>
  );
}

export function AWSAcademyIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5" fill="#232F3E" />
      <path
        d="M6.2 13.5c2.4 1.8 5.7 2.8 8.7 2.8 3.8 0 7.2-1.3 9.8-3.6.3-.3.4-.2.2.2-2.8 3.3-7.2 4.6-11.2 4.6-3.4 0-6.8-1-9.4-3.2-.2-.2-.2-.5.1-.6.5-.2 1.4-.2 1.8-.2z"
        fill="#FF9900"
      />
      <path
        d="M8.2 6.5h2.4l3.2 7h-2.1l-.6-1.5H8.7l-.6 1.5H6.2l2-7zm1.1 4h1.4l-.7-2-.7 2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function OracleIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16.4 5H7.6C3.4 5 0 8.4 0 12.6s3.4 7.6 7.6 7.6h8.8c4.2 0 7.6-3.4 7.6-7.6S20.6 5 16.4 5zm-.2 11.4H7.8c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8h8.4c2.1 0 3.8 1.7 3.8 3.8s-1.7 3.8-3.8 3.8z"
        fill="#C74634"
      />
    </svg>
  );
}

export function MicrosoftIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
      <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
      <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
    </svg>
  );
}

export function NetflixIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 2v20l4.5-1.5V2H4z" fill="#B81D24" />
      <path d="M15.5 2v20L20 20.5V2h-4.5z" fill="#B81D24" />
      <path d="M4 2l11.5 20h4.5L8.5 2H4z" fill="#E50914" />
    </svg>
  );
}

export function IBMIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 3h4v1.5H2V3zm0 2.5h4V7H2V5.5zm0 2.5h4V9.5H2V8zm0 2.5h4V12H2v-1.5zm0 2.5h4V14.5H2V13zm0 2.5h4V17H2v-1.5zm0 2.5h4V19.5H2V18zm0 2.5h4V22H2v-1.5zM8 3h8v1.5H8V3zm0 2.5h8V7H8V5.5zm0 2.5h8V9.5H8V8zm0 2.5h8V12H8v-1.5zm0 2.5h8V14.5H8V13zm0 2.5h8V17H8v-1.5zm0 2.5h8V19.5H8V18zm0 2.5h8V22H8v-1.5zM18 3h4v1.5h-4V3zm0 2.5h4V7h-4V5.5zm0 2.5h4V9.5h-4V8zm0 2.5h4V12h-4v-1.5zm0 2.5h4V14.5h-4V13zm0 2.5h4V17h-4v-1.5zm0 2.5h4V19.5h-4V18zm0 2.5h4V22h-4v-1.5z"
        fill="#0062FF"
      />
    </svg>
  );
}

export function GoogleIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Certifications & Learning Platforms
// ─────────────────────────────────────────────────────────────

export function NPTELIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {/* Outer concentric sunburst/wheel emblem representing IIT/NPTEL */}
      <circle cx="12" cy="12" r="10" fill="#003366" />
      <circle cx="12" cy="12" r="7.5" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="5" fill="#E65100" />
      <path
        d="M12 4.8v2.4M12 16.8v2.4M4.8 12h2.4M16.8 12h2.4M6.9 6.9l1.7 1.7M15.4 15.4l1.7 1.7M6.9 17.1l1.7-1.7M15.4 8.6l1.7-1.7"
        stroke="#003366"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
    </svg>
  );
}

export function INIIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {/* Institute of National Importance emblem: Classical academic pillar and laurel */}
      <rect width="24" height="24" rx="5" fill="#0284C7" />
      <path
        d="M4 19h16v1.5H4V19zm2-1.5h12v-1H6v1zm2-1v-8h1.8v8H8zm3.1 0v-8h1.8v8h-1.8zm3.1 0v-8H16v8h-1.8zM6 7.5l6-3 6 3v1H6v-1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Competitive Programming Platforms
// ─────────────────────────────────────────────────────────────

export function LeetCodeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.607L9.4 8.528l4.993-4.908a1.376 1.376 0 0 0-.91-2.62z"
        fill="#FFA116"
      />
      <path
        d="M9.833 10.9a1.38 1.38 0 0 0-1.38 1.38v.02c0 .762.618 1.38 1.38 1.38h10.79a1.38 1.38 0 0 0 1.38-1.38v-.02a1.38 1.38 0 0 0-1.38-1.38z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CodeforcesIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.5 7.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-3 0V9a1.5 1.5 0 0 1 1.5-1.5z"
        fill="#FFC107"
      />
      <path
        d="M12 3a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-3 0v-15A1.5 1.5 0 0 1 12 3z"
        fill="#2196F3"
      />
      <path
        d="M19.5 12a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-3 0v-6a1.5 1.5 0 0 1 1.5-1.5z"
        fill="#F44336"
      />
    </svg>
  );
}

export function AtCoderIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#222222" />
      <path
        d="M12 5L6 18h3.2l1.3-3h3l1.3 3H18L12 5zm-.1 3.8l1.4 3.2h-2.8l1.4-3.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function CodeChefIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#5B4638" />
      <path
        d="M12 6c-2.2 0-4 1.8-4 4 0 .9.3 1.7.8 2.4C7.7 13.1 7 14.5 7 16h10c0-1.5-.7-2.9-1.8-3.6.5-.7.8-1.5.8-2.4 0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function CodolioIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {/* Official Codolio Polygon Mark */}
      <polygon points="12 2 2 7 12 12 22 7 12 2" fill="#7C3AED" />
      <polyline
        points="2 17 12 22 22 17"
        stroke="#7C3AED"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="2 12 12 17 22 12"
        stroke="#A78BFA"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function OSCIIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function ContestCompassIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#2563EB" />
      <polygon points="12 4 14.5 10.5 20 12 14.5 13.5 12 20 9.5 13.5 4 12 9.5 10.5 12 4" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="2" fill="#F59E0B" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Technology Logos
// ─────────────────────────────────────────────────────────────

export function JavaIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8.8 19.4c2.8.2 5.8-.2 7.8-.8.6-.2 1.1.2.9.8-.3.7-2.1 1.2-4.1 1.3-3.2.1-5.6-.6-5.4-1.1.1-.1.4-.2.8-.2zm-.4-2.3c2.4.2 5.1-.1 6.8-.7.5-.2 1 .2.8.7-.3.7-1.8 1.1-3.6 1.2-2.8.1-4.8-.5-4.7-1 .1-.1.3-.2.7-.2zm5.7-4.2c.4 1-.2 1.9-1.5 2.5-1.5.7-3.6.7-5.1.3-.4-.1-.5-.4-.2-.5 1.3-.4 2.8-.4 4.1-.7 1.3-.3 2.1-.9 2.7-1.6zm2.3-3.6c.5.9-.1 2-1.6 2.8-1.8 1-4.5.9-6.3.3-.4-.1-.5-.4-.2-.5 1.6-.4 3.5-.4 5.2-.8 1.4-.4 2.2-1.1 2.9-1.8zm-1.8-6.1c1.5 1.3 1.2 3.1-.3 4.5-1.1 1-2.7 1.6-4.3 1.8-.4 0-.5-.3-.2-.5 1.3-.7 2.4-1.7 2.9-2.7.5-.9.4-2.1-.2-2.8-.2-.3 1.3-.7 2.1-.3z"
        fill="#EA2D2E"
      />
      <path
        d="M17.4 16.3c.7-.6 1.5-1.6 1.5-2.8 0-1.5-1.2-2.3-2.6-2.5.3-.4.5-.8.5-1.3 0-1.4-1.3-2.3-3.2-2.3-1.2 0-2.3.4-3 .9-.3-.5-.7-.8-1.3-.8-1.1 0-1.9.9-1.9 2 0 .5.2 1 .5 1.4-1.7.5-2.8 1.6-2.8 3.1 0 1.2.8 2.2 2 2.7-.4.6-.6 1.3-.6 2 0 2.2 2.8 3.4 7.2 3.4 4.3 0 7.4-1.3 7.4-3.5 0-1.1-.6-1.8-1.7-2.3z"
        fill="#5382A1"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export function PythonIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11.9 2c-5.2 0-4.9 2.3-4.9 2.3l.01 2.4h5v.7H4.5S2 7.1 2 12.3s2.2 5.1 2.2 5.1h1.3v-1.8s-.1-2.2 2.1-2.2h5.1s2 0 2-2V4.4s.4-2.4-2.8-2.4zm-1.4 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"
        fill="#3776AB"
      />
      <path
        d="M12.1 22c5.2 0 4.9-2.3 4.9-2.3l-.01-2.4h-5v-.7h7.5s2.5.3 2.5-4.9-2.2-5.1-2.2-5.1h-1.3v1.8s.1 2.2-2.1 2.2h-5.1s-2 0-2 2v9.3s-.4 2.4 2.8 2.4zm1.4-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function JavaScriptIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M6.5 18.5l2-1.2c.4.8.9 1.4 1.8 1.4.9 0 1.5-.4 1.5-1.3v-6.9h2.5v6.9c0 2.2-1.3 3.3-3.5 3.3-1.9 0-3.3-1-4.3-2.2zm9.1-7.1h2.5c.3 1.2 1.3 1.9 2.6 1.9 1.2 0 1.9-.6 1.9-1.4 0-.9-.7-1.3-2.1-1.9-2.2-.9-3.6-1.9-3.6-3.9 0-2 1.6-3.6 4-3.6 2 0 3.4.8 4.2 2.3l-2 1.3c-.4-.8-1-1.3-2.2-1.3-1 0-1.6.5-1.6 1.2 0 .8.6 1.2 1.9 1.7 2.4 1 3.9 1.9 3.9 4.1 0 2.3-1.8 3.8-4.4 3.8-2.6 0-4.3-1.3-5.1-3.2z"
        fill="#000000"
      />
    </svg>
  );
}

export function TypeScriptIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M11.5 8.5H5.8v2.4h1.7v8.6h2.4v-8.6h1.6V8.5zm4.2 3.8h2.3c.3 1 1.1 1.6 2.3 1.6 1.1 0 1.7-.5 1.7-1.2 0-.8-.6-1.1-1.8-1.6-2-.8-3.2-1.6-3.2-3.4 0-1.8 1.4-3.2 3.6-3.2 1.9 0 3.1.8 3.8 2.1l-1.9 1.2c-.4-.7-.9-1.1-1.9-1.1-.9 0-1.4.4-1.4 1 0 .7.5 1 1.7 1.5 2.1.8 3.4 1.6 3.4 3.5 0 2.1-1.6 3.4-4 3.4-2.4 0-3.9-1.2-4.6-2.9l2-1.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ReactIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" fill="none" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(120 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  );
}

export function HTML5Icon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" fill="#E34F26" />
      <path d="M12 3.7v17.4l5.9-2.2 1.4-15.2H12z" fill="#EF652A" />
      <path
        d="M7.4 6.5h9.2l-.2 2.3h-6.8l.2 2.3h6.3l-.6 6.5-3.5 1-3.5-1-.2-2.5h2.3l.1 1.3 1.3.4 1.3-.4.1-1.7H7.7L7.4 6.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function CSS3Icon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" fill="#1572B6" />
      <path d="M12 3.7v17.4l5.9-2.2 1.4-15.2H12z" fill="#33A9DC" />
      <path
        d="M7.4 6.5h9.2l-.7 7.7-3.9 1.1-3.9-1.1-.2-2.7h2.3l.1 1.4 1.7.5 1.7-.5.2-2.1H7.8l-.2-2.3h8.8l.2-2H7.4V6.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function SpringBootIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5" fill="#6DB33F" />
      <path
        d="M20.2 10.4c-.4-4.8-4.4-8.4-9.2-8.4C6 2 2 6 2 11c0 4.1 2.8 7.6 6.8 8.6.4.1.8.1 1.2.1 4.5 0 8.3-3.2 9.1-7.6.2-.7.6-1.1 1.1-1.7z"
        fill="#5EA132"
      />
      <path
        d="M12 4.5C7.9 4.5 4.5 7.9 4.5 12c0 3.3 2.2 6.1 5.3 7 3.9 1.2 8-1 9.2-4.9.4-1.2.4-2.4.2-3.6-1.5.3-3 .2-4.4-.3-2.3-.9-3.8-2.9-4.2-5.3-.2-.1.4-.4 1.4-.4zm-1.8 7c.7 2.1 2.3 3.7 4.4 4.3 1.1.3 2.2.4 3.4.1-.7 2.7-3.2 4.6-6 4.6-1.5 0-2.8-.5-3.9-1.4 1.5-.7 2.7-2 3.3-3.6.4-1 .5-2.1.3-3.2-.5-.3-1-.6-1.5-.8z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function MySQLIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M17.8 7.3c-.9-1.2-2.3-2-3.8-2.2-2.3-.3-4.5.8-5.7 2.7C7.2 9.5 7 11.4 7.6 13.2c.5 1.5 1.5 2.8 2.8 3.6 1.4.8 3.1 1.1 4.7.7 1.5-.4 2.8-1.4 3.7-2.7l-1.6-1.1c-.6.9-1.5 1.5-2.5 1.8-1.1.3-2.3.1-3.3-.5-.9-.5-1.6-1.4-1.9-2.5-.4-1.2-.2-2.6.4-3.7.8-1.3 2.3-2.1 3.9-1.9 1.1.1 2.1.7 2.7 1.6l1.4-1.2z"
        fill="#00758F"
      />
      <path
        d="M19.5 10c-.3-1.5-1.1-2.9-2.3-3.8l-1.1 1.5c.8.7 1.4 1.6 1.6 2.7.2 1.1 0 2.2-.6 3.1l1.5 1.1c.8-1.3 1.1-2.9.9-4.6z"
        fill="#F29111"
      />
    </svg>
  );
}

export function GitIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.8 2.8c.6-.2 1.3-.1 1.8.4.5.5.7 1.2.5 1.8l2.7 2.7c.6-.2 1.3 0 1.8.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.4-2.1L12.8 10v4.7c.2.2.4.5.4.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.6.4-1.1.9-1.4V9.6L8.5 7.1 2.4 13.2c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1v-.1-.2z"
        fill="#F05032"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Technology / Brand Icon Resolver Helper
// ─────────────────────────────────────────────────────────────

export function TechnologyIcon({
  name,
  className = "w-3.5 h-3.5",
}: {
  name: string;
  className?: string;
}) {
  const norm = name.toLowerCase().trim();
  if (norm.includes("java") && !norm.includes("javascript")) return <JavaIcon className={className} />;
  if (norm.includes("python")) return <PythonIcon className={className} />;
  if (norm.includes("typescript")) return <TypeScriptIcon className={className} />;
  if (norm.includes("javascript")) return <JavaScriptIcon className={className} />;
  if (norm.includes("react")) return <ReactIcon className={className} />;
  if (norm === "html" || norm.includes("html5")) return <HTML5Icon className={className} />;
  if (norm === "css" || norm.includes("css3") || norm.includes("tailwind")) return <CSS3Icon className={className} />;
  if (norm.includes("spring")) return <SpringBootIcon className={className} />;
  if (norm.includes("mysql") || norm.includes("sql") || norm.includes("database")) return <MySQLIcon className={className} />;
  if (norm === "git") return <GitIcon className={className} />;
  if (norm.includes("github")) return <GitHubIcon className={className} />;
  if (norm.includes("aws")) return <AWSIcon className={className} />;
  if (norm.includes("oracle")) return <OracleIcon className={className} />;
  if (norm.includes("contest compass")) return <ContestCompassIcon className={className} />;
  return null;
}
