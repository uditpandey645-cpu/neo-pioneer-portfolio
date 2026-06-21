import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const PRIMARY = "#CC8066";
const SURFACE = "#191C21";
const TEXT_PRIMARY = "#111827";
const TEXT_SECONDARY = "#4B5563";
const BORDER = "#E5E7EB";

const chartData = Array.from({ length: 24 }).map((_, i) => ({
  i,
  v: 50 + Math.sin(i / 2.2) * 22 + Math.cos(i / 1.3) * 8,
}));

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.2,
        color: PRIMARY,
        background: "rgba(204,128,102,0.12)",
        border: "1px solid rgba(204,128,102,0.35)",
        letterSpacing: "0.04em",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: PRIMARY, boxShadow: `0 0 8px ${PRIMARY}` }}
      />
      {children}
    </span>
  );
}

function CardShell({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4 }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden"
      style={{
        background: SURFACE,
        borderRadius: 8,
        padding: 24,
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
        minHeight: 320,
        color: "#fff",
      }}
    >
      {children}
    </motion.div>
  );
}

function CognitiveCard() {
  return (
    <CardShell index={0}>
      <div className="flex items-center justify-between">
        <Badge>REAL-TIME</Badge>
        <span
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          72% LOAD
        </span>
      </div>

      <div className="mt-5">
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          Cognitive Load Tracking
        </h3>
        <p
          className="mt-2"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          Real-time mental bandwidth metrics.
        </p>
      </div>

      <div className="mt-auto pt-6 -mx-2 h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="cogLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#5eead4" />
              </linearGradient>
            </defs>
            <YAxis hide domain={[0, 100]} />
            <Line
              type="monotone"
              dataKey="v"
              stroke="url(#cogLine)"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={1400}
              style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.55))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardShell>
  );
}

function NeuralCard() {
  const nodes = [
    { x: 30, y: 40 },
    { x: 90, y: 80 },
    { x: 160, y: 30 },
    { x: 220, y: 90 },
    { x: 70, y: 130 },
    { x: 180, y: 150 },
    { x: 260, y: 60 },
    { x: 130, y: 170 },
  ];
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [1, 4], [3, 5], [4, 5], [2, 6], [5, 7], [4, 7],
  ];

  return (
    <CardShell index={1}>
      <div className="flex items-center justify-between">
        <Badge>LIVE MAP</Badge>
        <span
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          08 NODES
        </span>
      </div>

      <div className="mt-5">
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          Neural Pathway Mapping
        </h3>
        <p
          className="mt-2"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          Visualizing thought patterns and flow states.
        </p>
      </div>

      <div className="mt-auto pt-6">
        <svg viewBox="0 0 290 200" className="w-full h-[120px]">
          <defs>
            <linearGradient id="edge" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="url(#edge)"
              strokeWidth={1.2}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.05 }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={3.5}
              fill={i % 3 === 0 ? PRIMARY : "#22d3ee"}
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
            />
          ))}
        </svg>
      </div>
    </CardShell>
  );
}

function FocusCard() {
  const value = 78;
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <CardShell index={2}>
      <div className="flex items-center justify-between">
        <Badge>AI-DRIVEN</Badge>
        <span
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          SESSION 03
        </span>
      </div>

      <div className="mt-5">
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          Adaptive Focus Protocols
        </h3>
        <p
          className="mt-2"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          Dynamic session tuning based on your cognitive state.
        </p>
      </div>

      <div className="mt-auto pt-6 flex items-center justify-center">
        <div className="relative w-[120px] h-[120px]">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="6"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={PRIMARY}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${PRIMARY})` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 26,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {value}%
            </span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 10,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
              }}
            >
              FOCUS
            </span>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

export function NeuroSyncSection() {
  const navLinks = ["Features", "Integrations", "Enterprise", "Pricing"];

  return (
    <section
      aria-label="NeuroSync — Master Your Mind"
      className="relative w-full"
      style={{
        background: "#FFFFFF",
        color: TEXT_PRIMARY,
        fontFamily: "Inter, sans-serif",
        paddingTop: 80,
        paddingBottom: 80,
        isolation: "isolate",
      }}
    >
      {/* ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(204,128,102,0.08), rgba(204,128,102,0) 70%)",
        }}
      />

      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        {/* Nav */}
        <nav
          className="flex items-center justify-between mb-16"
          style={{ color: TEXT_PRIMARY }}
        >
          <div
            className="flex items-center gap-2"
            style={{ fontWeight: 600, fontSize: 16 }}
          >
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: PRIMARY, boxShadow: `0 0 10px ${PRIMARY}` }}
            />
            NeuroSync
          </div>
          <ul
            className="hidden md:flex items-center gap-8"
            style={{ color: TEXT_SECONDARY, fontSize: 14 }}
          >
            {navLinks.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: TEXT_SECONDARY }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="inline-flex items-center gap-2 transition-transform hover:scale-[1.02]"
            style={{
              background: PRIMARY,
              color: "#fff",
              borderRadius: 9999,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Get Started
          </a>
        </nav>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mx-auto"
          style={{ maxWidth: 880 }}
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 6.5vw, 64px)",
              lineHeight: 1.04,
              letterSpacing: 0,
              color: TEXT_PRIMARY,
            }}
          >
            Think Faster.
            <br />
            Master Your Mind.
          </h1>
          <p
            className="mt-6 mx-auto"
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: TEXT_SECONDARY,
              maxWidth: 560,
            }}
          >
            Cognitive performance tools built for deep work.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 transition-transform hover:scale-[1.02]"
              style={{
                background: PRIMARY,
                color: "#fff",
                borderRadius: 9999,
                padding: "12px 22px",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 transition-colors"
              style={{
                background: "transparent",
                color: TEXT_PRIMARY,
                border: `1px solid ${BORDER}`,
                borderRadius: 9999,
                padding: "12px 22px",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Watch Demo
            </a>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div
          className="mt-16 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <CognitiveCard />
          <NeuralCard />
          <FocusCard />
        </div>
      </div>
    </section>
  );
}

export default NeuroSyncSection;
