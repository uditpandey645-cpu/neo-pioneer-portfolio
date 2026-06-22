/**
 * AmbientBackground
 * Subtle, low-cost animated backdrop matching the iron/cyan theme.
 * - Fixed to viewport, pointer-events none
 * - CSS-only animations (transform/opacity) → GPU friendly
 * - Three slowly drifting blurred orbs + faint grid + slow vignette pulse
 */
export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.82 0.18 200 / 6%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.18 200 / 6%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      {/* drifting orbs */}
      <div className="ab-orb ab-orb-1" />
      <div className="ab-orb ab-orb-2" />
      <div className="ab-orb ab-orb-3" />

      {/* slow vignette breath */}
      <div className="ab-vignette" />

      <style>{`
        .ab-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.45;
          will-change: transform;
        }
        .ab-orb-1 {
          width: 46vw; height: 46vw;
          left: -10vw; top: -10vw;
          background: radial-gradient(circle, oklch(0.82 0.18 200 / 55%), transparent 70%);
          animation: ab-drift-1 26s ease-in-out infinite;
        }
        .ab-orb-2 {
          width: 38vw; height: 38vw;
          right: -8vw; top: 30vh;
          background: radial-gradient(circle, oklch(0.55 0.22 25 / 40%), transparent 70%);
          animation: ab-drift-2 32s ease-in-out infinite;
        }
        .ab-orb-3 {
          width: 42vw; height: 42vw;
          left: 20vw; bottom: -15vw;
          background: radial-gradient(circle, oklch(0.45 0.15 260 / 45%), transparent 70%);
          animation: ab-drift-3 38s ease-in-out infinite;
        }
        .ab-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, oklch(0.08 0.02 260 / 70%) 100%);
          animation: ab-breath 14s ease-in-out infinite;
        }
        @keyframes ab-drift-1 {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(6vw, 4vh, 0) scale(1.08); }
        }
        @keyframes ab-drift-2 {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-5vw, -3vh, 0) scale(1.1); }
        }
        @keyframes ab-drift-3 {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(4vw, -5vh, 0) scale(1.05); }
        }
        @keyframes ab-breath {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-orb, .ab-vignette { animation: none; }
        }
      `}</style>
    </div>
  );
}
