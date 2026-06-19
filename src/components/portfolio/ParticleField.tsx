import { useEffect, useRef } from "react";

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 60 : 130;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4 * dpr,
      vy: (Math.random() - 0.5) * 0.4 * dpr,
      r: (Math.random() * 1.5 + 0.5) * dpr,
    }));

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX * dpr;
      mouse.current.y = e.clientY * dpr;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d = Math.hypot(dx, dy);
        if (d < 140 * dpr) {
          p.vx += (dx / d) * 0.05;
          p.vy += (dy / d) * 0.05;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120,220,255,0.7)";
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110 * dpr) {
            ctx.strokeStyle = `rgba(100,200,255,${0.15 * (1 - d / (110 * dpr))})`;
            ctx.lineWidth = dpr * 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden />;
}
