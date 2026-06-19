import { motion } from "framer-motion";
import { useState } from "react";
import helmetAsset from "@/assets/helmet.jpg.asset.json";

export function HoloHelmet() {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setRot({ x: -py * 25, y: px * 35 });
  };

  return (
    <div className="relative w-full max-w-[640px] mx-auto" style={{ perspective: "1400px" }}>
      {/* Holographic rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[110%] h-[110%] rounded-full border border-[color:var(--cyan)]/30 animate-spin-slow" />
        <div className="absolute w-[90%] h-[90%] rounded-full border border-[color:var(--gold)]/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
        <div className="absolute w-[70%] h-[70%] rounded-full border border-dashed border-[color:var(--cyan)]/40 animate-spin-slow" style={{ animationDuration: "15s" }} />
      </div>

      <div
        onMouseMove={onMove}
        onMouseLeave={() => setRot({ x: 0, y: 0 })}
        className="relative aspect-square glass-iron rounded-3xl overflow-hidden glow-iron"
      >
        {/* Scan line */}
        <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[color:var(--cyan)]/30 to-transparent animate-scan pointer-events-none z-20" />

        {/* HUD corners */}
        {[
          "top-3 left-3 border-t-2 border-l-2",
          "top-3 right-3 border-t-2 border-r-2",
          "bottom-3 left-3 border-b-2 border-l-2",
          "bottom-3 right-3 border-b-2 border-r-2",
        ].map((c, i) => (
          <div key={i} className={`absolute w-10 h-10 border-[color:var(--cyan)] ${c}`} />
        ))}

        <motion.img
          src={helmetAsset.url}
          alt="Mark 50 Iron Man Helmet build by Udit Pandey"
          className="w-full h-full object-cover"
          animate={{ rotateX: rot.x, rotateY: rot.y, scale }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Telemetry */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-display text-xs text-[color:var(--cyan)] tracking-[0.3em] z-20">
          MARK · L · ACTIVE
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between font-display text-[10px] text-[color:var(--cyan)]/80 tracking-widest z-20">
          <span>PWR 98%</span>
          <span>ARC ◉ ONLINE</span>
          <span>JARVIS OK</span>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button onClick={() => setScale((s) => Math.min(1.4, s + 0.1))} className="glass px-4 py-2 rounded-lg font-display text-xs tracking-widest text-[color:var(--cyan)] hover:glow-cyan transition">ZOOM +</button>
        <button onClick={() => setScale((s) => Math.max(0.8, s - 0.1))} className="glass px-4 py-2 rounded-lg font-display text-xs tracking-widest text-[color:var(--cyan)] hover:glow-cyan transition">ZOOM −</button>
        <button onClick={() => { setScale(1); setRot({ x: 0, y: 0 }); }} className="glass px-4 py-2 rounded-lg font-display text-xs tracking-widest text-[color:var(--cyan)] hover:glow-cyan transition">RESET</button>
      </div>
    </div>
  );
}
