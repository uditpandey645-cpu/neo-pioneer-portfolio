// Decorative animated tech/circuit background — pure SVG, GPU friendly.
export function TechCircuitBg() {
  const nodes = [
    { cx: 14, cy: 22, d: "0s" },
    { cx: 82, cy: 18, d: "0.6s" },
    { cx: 28, cy: 70, d: "1.1s" },
    { cx: 74, cy: 78, d: "1.6s" },
    { cx: 50, cy: 12, d: "0.3s" },
    { cx: 50, cy: 92, d: "1.3s" },
    { cx: 8, cy: 52, d: "0.9s" },
    { cx: 92, cy: 50, d: "0.4s" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* drifting grid */}
      <div
        className="absolute inset-0 opacity-40 animate-grid-drift"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.82 0.18 200 / 14%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.18 200 / 14%) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 55%, transparent 85%)",
        }}
      />
      {/* circuit lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="circuit-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.18 200)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.82 0.15 85)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {[
          "M0,30 L30,30 L40,40 L70,40 L80,30 L100,30",
          "M0,70 L25,70 L35,60 L65,60 L75,70 L100,70",
          "M20,0 L20,25 L30,35 L30,65 L20,75 L20,100",
          "M80,0 L80,25 L70,35 L70,65 L80,75 L80,100",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#circuit-stroke)"
            strokeWidth="0.4"
            strokeDasharray="3 4"
            className="animate-circuit-flow"
            style={{ animationDelay: `${i * 0.7}s`, opacity: 0.7 }}
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="0.9"
            fill="oklch(0.95 0.2 200)"
            className="animate-node-pulse"
            style={{ animationDelay: n.d, transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
        ))}
      </svg>
    </div>
  );
}
