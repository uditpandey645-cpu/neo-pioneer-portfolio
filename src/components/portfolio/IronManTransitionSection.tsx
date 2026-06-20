import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import videoAsset from "@/assets/ironman-transition.mp4.asset.json";

export function IronManTransitionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smoothed progress for buttery scrub
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  // Text fade timings tied to scroll progress
  const headlineOpacity = useTransform(smoothed, [0.05, 0.18, 0.45, 0.55], [0, 1, 1, 0]);
  const headlineY = useTransform(smoothed, [0.05, 0.2], [40, 0]);
  const subOpacity = useTransform(smoothed, [0.55, 0.65, 0.82, 0.9], [0, 1, 1, 0]);
  const subY = useTransform(smoothed, [0.55, 0.7], [30, 0]);
  const fadeOverlay = useTransform(smoothed, [0.85, 1], [0, 1]);
  const vignette = useTransform(smoothed, [0, 0.5, 1], [0.7, 0.4, 0.85]);

  // Scroll-driven video scrubbing
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    let target = 0;
    let current = 0;

    const onLoaded = () => {
      setDuration(v.duration || 0);
      setReady(true);
      v.pause();
    };
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("loadeddata", onLoaded);

    const unsub = smoothed.on("change", (p) => {
      if (!v.duration) return;
      // Map 0.1 - 0.9 of section progress to full video range
      const mapped = Math.max(0, Math.min(1, (p - 0.1) / 0.8));
      target = mapped * v.duration;
    });

    const tick = () => {
      if (v.duration) {
        current += (target - current) * 0.25;
        if (Math.abs(target - current) > 0.001) {
          try {
            v.currentTime = current;
          } catch {}
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      unsub();
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("loadeddata", onLoaded);
    };
  }, [smoothed]);

  return (
    <section
      ref={sectionRef}
      aria-label="Beyond Software — cinematic transition"
      className="relative w-full"
      style={{ height: "320vh" }}
    >
      {/* Sticky cinematic stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* The video itself */}
        <video
          ref={videoRef}
          src={videoAsset.url}
          muted
          playsInline
          preload="auto"
          {...({ "webkit-playsinline": "true" } as Record<string, string>)}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{
            transform: "translate3d(0,0,0)",
            willChange: "transform, opacity",
            filter: "contrast(1.05) saturate(1.05)",
          }}
        />

        {/* Color & vignette blend with site theme */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)",
            opacity: vignette,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, oklch(0.7 0.18 220 / 14%), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, oklch(0.55 0.22 25 / 10%), transparent 55%)",
          }}
        />

        {/* HUD: corner brackets */}
        <div aria-hidden className="absolute inset-6 pointer-events-none">
          {([
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ] as const).map((c, i) => (
            <div
              key={i}
              className={`absolute w-10 h-10 border-[color:var(--cyan)]/40 ${c}`}
            />
          ))}
        </div>

        {/* HUD: rotating rings */}
        <div aria-hidden className="absolute top-8 right-8 w-24 h-24 pointer-events-none opacity-50">
          <div className="absolute inset-0 rounded-full border border-[color:var(--cyan)]/40 animate-spin-slow" />
          <div
            className="absolute inset-2 rounded-full border border-dashed border-[color:var(--gold)]/40 animate-spin-slow"
            style={{ animationDirection: "reverse" }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-display text-[10px] tracking-widest text-[color:var(--cyan)]">
            J.A.R.V.I.S
          </div>
        </div>

        {/* HUD: telemetry */}
        <div
          aria-hidden
          className="absolute bottom-6 left-6 font-mono text-[10px] tracking-widest text-[color:var(--cyan)]/70 pointer-events-none space-y-0.5"
        >
          <div>// SEQUENCE 03 · TRANSITION</div>
          <div>
            FRAME {ready ? Math.floor(Math.min(1, Math.max(0, (videoRef.current?.currentTime ?? 0) / (duration || 1))) * 1000).toString().padStart(4, "0") : "----"}
          </div>
          <div>STATUS · {ready ? "STREAM LOCKED" : "BUFFERING"}</div>
        </div>

        {/* HUD: scan line */}
        <div
          aria-hidden
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[color:var(--cyan)]/10 to-transparent animate-scan pointer-events-none"
        />

        {/* Cinematic text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <motion.div
            style={{ opacity: headlineOpacity, y: headlineY }}
            className="max-w-4xl"
          >
            <div className="font-display text-[10px] md:text-xs tracking-[0.5em] text-[color:var(--cyan)] mb-4">
              // CHAPTER 03
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-black leading-[0.95] neon-text">
              BEYOND <span className="iron-text">SOFTWARE</span>
            </h2>
            <p className="mt-5 text-base md:text-xl text-muted-foreground font-display tracking-wide">
              Transforming Ideas Into Intelligent Machines
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: subOpacity, y: subY }}
            className="absolute bottom-[14%] max-w-3xl px-6"
          >
            <div className="font-display text-[10px] md:text-xs tracking-[0.5em] text-[color:var(--gold)] mb-3">
              // INCOMING
            </div>
            <h3 className="font-display text-4xl md:text-7xl font-black iron-text leading-none">
              MARK 50
            </h3>
            <p className="mt-3 text-sm md:text-base text-muted-foreground tracking-wide">
              IoT Powered Intelligent Helmet
            </p>
          </motion.div>
        </div>

        {/* Final blend into next section */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: fadeOverlay,
            background:
              "linear-gradient(180deg, transparent 40%, oklch(0.4 0.2 25 / 35%) 80%, var(--background) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--background))",
          }}
        />
      </div>
    </section>
  );
}

export default IronManTransitionSection;
