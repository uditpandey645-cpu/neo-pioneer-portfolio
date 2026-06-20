import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import videoAsset from "@/assets/ironman-transition.mp4.asset.json";

export function IronManTransitionSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAutoPlayedRef = useRef(false);
  const isPlayingRef = useRef(false);

  const playForward = useCallback(() => {
    const v = videoRef.current;
    if (!v || isPlayingRef.current) return;
    isPlayingRef.current = true;
    if (v.currentTime >= v.duration - 0.05) v.currentTime = 0;
    v.play().catch(() => {});
  }, []);

  const handleEnded = useCallback(() => {
    isPlayingRef.current = false;
  }, []);

  // Autoplay once on first visit
  useEffect(() => {
    const v = videoRef.current;
    const s = sectionRef.current;
    if (!v || !s) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (
            e.isIntersecting &&
            e.intersectionRatio > 0.5 &&
            !hasAutoPlayedRef.current
          ) {
            hasAutoPlayedRef.current = true;
            playForward();
          }
        }
      },
      { threshold: [0, 0.5, 0.75, 1] }
    );
    io.observe(s);
    return () => {
      io.disconnect();
    };
  }, [playForward]);

  const handleClick = () => {
    // Ignore clicks while video is already playing
    if (isPlayingRef.current) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    playForward();
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Beyond Software — cinematic transition"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={videoAsset.url}
        muted
        playsInline
        preload="auto"
        onClick={handleClick}
        onEnded={handleEnded}
        aria-hidden="true"
        {...({ "webkit-playsinline": "true" } as Record<string, string>)}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer select-none"
        style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      />

      {/* Subtle theme blend */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.7 0.18 220 / 12%), transparent 60%)",
        }}
      />

      {/* HUD corners */}
      <div aria-hidden className="absolute inset-6 pointer-events-none">
        {(["top-0 left-0 border-t border-l","top-0 right-0 border-t border-r","bottom-0 left-0 border-b border-l","bottom-0 right-0 border-b border-r"] as const).map((c,i)=>(
          <div key={i} className={`absolute w-10 h-10 border-[color:var(--cyan)]/40 ${c}`} />
        ))}
      </div>

      <div aria-hidden className="absolute top-8 right-8 w-20 h-20 pointer-events-none opacity-60">
        <div className="absolute inset-0 rounded-full border border-[color:var(--cyan)]/40 animate-spin-slow" />
        <div className="absolute inset-2 rounded-full border border-dashed border-[color:var(--gold)]/40 animate-spin-slow" style={{ animationDirection: "reverse" }} />
        <div className="absolute inset-0 flex items-center justify-center font-display text-[9px] tracking-widest text-[color:var(--cyan)]">J.A.R.V.I.S</div>
      </div>

      <div aria-hidden className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[color:var(--cyan)]/10 to-transparent animate-scan pointer-events-none" />

      {/* Headline — bottom aligned */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-16 md:bottom-20 flex flex-col items-center text-center px-6 pointer-events-none"
      >
        <div className="font-display text-[10px] md:text-xs tracking-[0.5em] text-[color:var(--cyan)] mb-3">// CHAPTER 03</div>
        <h2 className="font-display text-3xl md:text-5xl font-black leading-[0.95] neon-text">
          BEYOND <span className="iron-text">SOFTWARE</span>
        </h2>
        <p className="mt-3 text-sm md:text-lg text-muted-foreground font-display tracking-wide">
          Transforming Ideas Into Intelligent Machines
        </p>
      </motion.div>

      {/* Bottom blend into next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, var(--background))" }}
      />
    </section>
  );
}

export default IronManTransitionSection;
