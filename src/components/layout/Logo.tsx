import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-warm-black";
  const accentColor = variant === "light" ? "text-mustard" : "text-mustard";

  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="w-10 h-10 shrink-0"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="22" fill="#D4A017" opacity="0.15" />
        <path
          d="M14 28c2-8 8-14 16-16 2 6-1 12-6 16-3 2-7 2-10 0z"
          fill="#D4A017"
        />
        <path
          d="M30 12c4 2 8 6 10 12-3-1-6-1-8 0 1-4 0-8-2-12z"
          fill="#1A1A1A"
        />
        <circle cx="28" cy="16" r="1.5" fill="#1A1A1A" />
        <path
          d="M18 30c-1 2-1 4 0 6"
          stroke="#D4A017"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-display text-2xl font-bold tracking-tight ${textColor}`}>
          L<span className={accentColor}>A</span>ND
        </span>
        <span className={`text-[10px] tracking-[0.2em] uppercase ${variant === "light" ? "text-white/70" : "text-warm-black/60"}`}>
          Bienes Raíces
        </span>
      </div>
    </Link>
  );
}