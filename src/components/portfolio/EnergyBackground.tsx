import { useEffect, useRef } from "react";

/**
 * EnergyBackground
 * Fixed full-viewport animated background: flowing energy waves,
 * drifting glow particles, and occasional lightning streaks.
 * Pure Canvas2D for 60fps on desktop + mobile.
 */
export default function EnergyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    let running = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const isMobile = width < 768;
    const particleCount = isMobile ? 40 : 90;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05,
      hue: 190 + Math.random() * 80, // cyan -> purple
      a: Math.random() * 0.5 + 0.25,
    }));

    // Wave layers (parallax)
    const layers = [
      { amp: 60, freq: 0.006, speed: 0.0006, yOff: 0.7, color: "rgba(56,189,248,0.10)" }, // cyan
      { amp: 80, freq: 0.004, speed: 0.0004, yOff: 0.78, color: "rgba(139,92,246,0.10)" }, // purple
      { amp: 110, freq: 0.0028, speed: 0.0003, yOff: 0.86, color: "rgba(37,99,235,0.12)" }, // blue
    ];

    // Lightning
    type Bolt = { points: { x: number; y: number }[]; life: number; maxLife: number };
    let bolts: Bolt[] = [];
    let nextBoltAt = performance.now() + 1500 + Math.random() * 2500;

    const makeBolt = (): Bolt => {
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.4;
      const endX = startX + (Math.random() - 0.5) * width * 0.5;
      const endY = startY + height * (0.4 + Math.random() * 0.4);
      const segs = 14;
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i <= segs; i++) {
        const t = i / segs;
        const x = startX + (endX - startX) * t + (Math.random() - 0.5) * 40;
        const y = startY + (endY - startY) * t + (Math.random() - 0.5) * 18;
        pts.push({ x, y });
      }
      return { points: pts, life: 0, maxLife: 420 + Math.random() * 280 };
    };

    const drawBolt = (b: Bolt) => {
      const k = b.life / b.maxLife;
      const alpha = Math.sin(k * Math.PI); // ease in/out
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `rgba(180,220,255,${0.9 * alpha})`;
      ctx.shadowColor = "rgba(120,180,255,1)";
      ctx.shadowBlur = 24;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      b.points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();
      // core
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.restore();
    };

    const drawWave = (
      t: number,
      layer: (typeof layers)[number],
    ) => {
      const { amp, freq, speed, yOff, color } = layer;
      const baseY = height * yOff;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 8) {
        const y =
          baseY +
          Math.sin(x * freq + t * speed) * amp +
          Math.sin(x * freq * 2.1 + t * speed * 1.7) * amp * 0.35;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, baseY - amp, 0, height);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "rgba(2,6,23,0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // glowing crest line
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const y =
          baseY +
          Math.sin(x * freq + t * speed) * amp +
          Math.sin(x * freq * 2.1 + t * speed * 1.7) * amp * 0.35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color.replace(/0?\.\d+\)/, "0.45)");
      ctx.shadowColor = color.replace(/0?\.\d+\)/, "0.9)");
      ctx.shadowBlur = 18;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    let last = performance.now();
    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(50, now - last);
      last = now;

      // base wash
      ctx.globalCompositeOperation = "source-over";
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#05060f");
      bg.addColorStop(0.5, "#070a1c");
      bg.addColorStop(1, "#02030a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // ambient glow
      const rg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.7,
      );
      rg.addColorStop(0, "rgba(56,90,200,0.18)");
      rg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, width, height);

      // waves back -> front
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < layers.length; i++) drawWave(now, layers[i]);

      // particles
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue},90%,70%,${p.a})`;
        ctx.shadowColor = `hsla(${p.hue},90%,70%,0.9)`;
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // lightning
      if (!reduceMotion && now >= nextBoltAt) {
        bolts.push(makeBolt());
        if (Math.random() < 0.4) bolts.push(makeBolt());
        nextBoltAt = now + 2200 + Math.random() * 4200;
      }
      bolts = bolts.filter((b) => {
        b.life += dt;
        if (b.life >= b.maxLife) return false;
        drawBolt(b);
        return true;
      });

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ contain: "strict" }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* soft vignette for content readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}
