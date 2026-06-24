/**
 * AICoreRings — futuristic AI/robotics rotating rings around the profile image.
 * Pure SVG + CSS. No particles. Subtle, premium, professional.
 */
export function AICoreRings() {
  return (
    <div className="pointer-events-none absolute -inset-[14%] z-20" aria-hidden>
      {/* Outer dashed ring — slow rotation */}
      <div className="absolute inset-[-8%] animate-spin-slow" style={{ animationDuration: "42s" }}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.82 0.18 200)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="oklch(0.82 0.18 200)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(0.82 0.15 85)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="96" fill="none" stroke="url(#ringGrad)" strokeWidth="0.6" strokeDasharray="2 4" />
          {/* tick marks */}
          {Array.from({ length: 48 }).map((_, i) => {
            const a = (i / 48) * Math.PI * 2;
            const x1 = 100 + Math.cos(a) * 92;
            const y1 = 100 + Math.sin(a) * 92;
            const x2 = 100 + Math.cos(a) * (i % 4 === 0 ? 86 : 89);
            const y2 = 100 + Math.sin(a) * (i % 4 === 0 ? 86 : 89);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.82 0.18 200)" strokeOpacity={i % 4 === 0 ? 0.7 : 0.3} strokeWidth="0.5" />;
          })}
        </svg>
      </div>

      {/* Mid ring — counter rotation, with orbiting nodes */}
      <div className="absolute inset-[2%] animate-spin-slow" style={{ animationDuration: "28s", animationDirection: "reverse" }}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="oklch(0.82 0.18 200 / 35%)" strokeWidth="0.4" strokeDasharray="14 6" />
          {/* orbiting nodes */}
          {[0, 90, 180, 270].map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            const cx = 100 + Math.cos(a) * 80;
            const cy = 100 + Math.sin(a) * 80;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="2.4" fill="oklch(0.82 0.18 200)" />
                <circle cx={cx} cy={cy} r="5" fill="none" stroke="oklch(0.82 0.18 200 / 60%)" strokeWidth="0.5" />
              </g>
            );
          })}
        </svg>
      </div>


      {/* Arc segments — HUD style */}
      <div className="absolute inset-[-3%] animate-spin-slow" style={{ animationDuration: "60s", animationDirection: "reverse" }}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M 100 8 A 92 92 0 0 1 188 70" fill="none" stroke="oklch(0.82 0.18 200)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 100 192 A 92 92 0 0 1 12 130" fill="none" stroke="oklch(0.65 0.22 25 / 80%)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Neural network nodes — subtle, top-right and bottom-left */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60">
        <g stroke="oklch(0.82 0.18 200 / 40%)" strokeWidth="0.3" fill="none">
          <line x1="160" y1="30" x2="180" y2="50" />
          <line x1="180" y1="50" x2="170" y2="78" />
          <line x1="160" y1="30" x2="170" y2="78" />
          <line x1="20" y1="150" x2="40" y2="170" />
          <line x1="40" y1="170" x2="30" y2="185" />
        </g>
        {[
          [160, 30], [180, 50], [170, 78],
          [20, 150], [40, 170], [30, 185],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.4" fill="oklch(0.82 0.18 200)" className="animate-node-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </svg>
    </div>
  );
}
