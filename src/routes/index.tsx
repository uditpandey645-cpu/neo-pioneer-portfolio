import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Download, ArrowRight, ExternalLink, Cpu, Brain, Bot, Wifi, Eye, Code2, Zap, Radio, Hand, ScanFace, Rocket } from "lucide-react";
import { useState } from "react";
import { ParticleField } from "@/components/portfolio/ParticleField";
import { Typing } from "@/components/portfolio/Typing";
import { HoloHelmet } from "@/components/portfolio/HoloHelmet";
import { IronManTransitionSection } from "@/components/portfolio/IronManTransitionSection";
import { ResumeModal } from "@/components/portfolio/ResumeModal";
import { Counter } from "@/components/portfolio/Counter";
import { TechCircuitBg } from "@/components/portfolio/TechCircuitBg";
import { toast } from "sonner";
import uditAsset from "@/assets/udit.jpg.asset.json";
import uditCutoutAsset from "@/assets/udit-cutout.png.asset.json";
import resqlinkAsset from "@/assets/resqlink.png.asset.json";
import gestyxraAsset from "@/assets/gestyxra.png.asset.json";
import presentxAsset from "@/assets/presentx.jpg.asset.json";
import resumeAsset from "@/assets/Udit_Pandey_Resume_v2.pdf.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Udit Pandey — AI Engineer, Robotics & IoT Innovator" },
      { name: "description", content: "Portfolio of Udit Pandey. Building Resqlink, Gestyxra, PresentX and a Mark 50 Iron Man helmet. Full Stack Developer, AI Engineer, Robotics Innovator." },
      { property: "og:title", content: "Udit Pandey — AI, Robotics & IoT" },
      { property: "og:description", content: "Intelligent software, AI systems, robotics and IoT solutions." },
      { property: "og:image", content: uditAsset.url },
      { name: "twitter:image", content: uditAsset.url },
    ],
  }),
  component: Portfolio,
});

const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/udit-pandey-b30191384",
  github: "https://github.com/uditpandey645-cpu",
  instagram: "https://www.instagram.com/_udit__pandey_?utm_source=qr&igsh=MTZ1cDFzeWVvODNhMw==",
  email: "uditpandey645@gmail.com",
};

const projects = [
  {
    id: "resqlink",
    name: "Resqlink",
    tagline: "Disaster Communication, Off-Grid",
    desc: "Resqlink is a disaster communication platform that works even when communication towers fail. It uses peer-to-peer networking to enable emergency communication during disasters.",
    features: ["Disaster alerts", "Offline communication", "Peer-to-peer networking", "Emergency response", "Community coordination"],
    stack: ["React", "WebRTC", "Node.js", "PWA", "Tailwind"],
    live: "https://resqlinkref.vercel.app/",
    github: "https://github.com/uditpandey645-cpu",
    icon: Radio,
    accent: "from-cyan-400 to-blue-500",
    image: resqlinkAsset.url,
  },
  {
    id: "gestyxra",
    name: "Gestyxra",
    tagline: "Touchless 3D Modeling",
    desc: "Gestyxra is a touchless 3D modeling platform controlled entirely through hand gestures. Users rotate, manipulate and inspect models with natural hand movements.",
    features: ["Gesture recognition", "Touchless control", "Computer vision", "3D model interaction", "Real-time tracking"],
    stack: ["MediaPipe", "Three.js", "React", "TensorFlow.js", "WebGL"],
    live: "https://gestyxra.vercel.app/",
    github: "https://github.com/uditpandey645-cpu",
    icon: Hand,
    accent: "from-fuchsia-400 to-cyan-400",
    image: gestyxraAsset.url,
  },
  {
    id: "presentx",
    name: "PresentX",
    tagline: "AI Facial Attendance",
    desc: "PresentX is an AI-powered facial recognition attendance system. Attendance is automatically recorded through camera-based recognition and stored digitally.",
    features: ["Face recognition", "Automated attendance", "Digital record management", "Analytics dashboard", "Classroom monitoring"],
    stack: ["Python", "OpenCV", "FaceNet", "React", "Supabase"],
    live: "https://presen-x.vercel.app/",
    github: "https://github.com/uditpandey645-cpu",
    icon: ScanFace,
    accent: "from-emerald-400 to-cyan-500",
    image: presentxAsset.url,
  },
];


const skills = [
  { name: "Web Development", icon: Code2, items: ["React", "Next.js", "TypeScript", "Node"] },
  { name: "Artificial Intelligence", icon: Brain, items: ["LLMs", "Agents", "RAG", "Prompting"] },
  { name: "Machine Learning", icon: Cpu, items: ["PyTorch", "TF", "scikit-learn", "MLOps"] },
  { name: "Robotics", icon: Bot, items: ["Arduino", "ROS", "Servos", "Control"] },
  { name: "IoT", icon: Wifi, items: ["ESP32", "MQTT", "BLE", "Sensors"] },
  { name: "Computer Vision", icon: Eye, items: ["OpenCV", "MediaPipe", "YOLO", "Detection"] },
];

function Portfolio() {
  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <ParticleField />
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none z-0" />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <ProjectsIntro />

        {projects.map((p, i) => (
          <ProjectSection key={p.id} p={p} index={i} />
        ))}
        <IronManTransitionSection />
        <HelmetSection />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#helmet", label: "Mark 50" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass rounded-full px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-display font-bold tracking-widest text-sm neon-text">UDIT.P</a>
          <ul className="hidden md:flex gap-7 text-sm tracking-wide">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} className="text-muted-foreground hover:text-[color:var(--cyan)] transition">{l.label}</a></li>
            ))}
          </ul>
          <a href={`mailto:${SOCIALS.email}`} className="text-xs font-display tracking-widest px-4 py-2 rounded-full bg-[color:var(--cyan)] text-[color:var(--primary-foreground)] hover:glow-cyan transition">HIRE ME</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 px-4">
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} url={resumeAsset.url} />
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="mx-auto max-w-6xl grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-display tracking-widest text-[color:var(--cyan)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[color:var(--cyan)] animate-pulse" /> SYSTEM ONLINE
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-7xl font-black leading-[1.05]">
            UDIT <span className="iron-text">PANDEY</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5 text-xl md:text-2xl font-display tracking-wide">
            <Typing words={[
              "Full Stack Developer",
              "AI Engineer",
              "Robotics Innovator",
              "IoT Architect",
            ]} className="neon-text" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            I build intelligent software, AI systems, robotics projects and innovative IoT solutions that solve real-world challenges — from off-grid disaster networks to a JARVIS-powered Mark 50 helmet.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 bg-[color:var(--cyan)] text-[color:var(--primary-foreground)] px-6 py-3 rounded-full font-display tracking-widest text-xs hover:glow-cyan transition">
              VIEW PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <button type="button" onClick={() => setResumeOpen(true)} className="glass inline-flex items-center gap-2 px-6 py-3 rounded-full font-display tracking-widest text-xs hover:glow-cyan transition">
              <Eye className="w-4 h-4" /> RESUME
            </button>
            <a href="#contact" className="glass-iron inline-flex items-center gap-2 px-6 py-3 rounded-full font-display tracking-widest text-xs hover:glow-iron transition">
              <Mail className="w-4 h-4" /> CONTACT
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 flex gap-4">
            {[
              { Icon: Github, href: SOCIALS.github, label: "GitHub" },
              { Icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
              { Icon: Instagram, href: SOCIALS.instagram, label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="glass w-11 h-11 rounded-full flex items-center justify-center text-[color:var(--cyan)] hover:glow-cyan transition">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative">
          <div className="relative mx-auto w-full max-w-[460px] aspect-[3/4]">
            {/* glow halos */}
            <div className="absolute -inset-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.18_200/35%),transparent_70%)] blur-2xl animate-orbit-glow" />
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_bottom,oklch(0.65_0.22_25/30%),transparent_70%)] blur-2xl animate-orbit-glow" style={{ animationDelay: "1.2s" }} />

            {/* laser border frame */}
            <div className="laser-frame absolute inset-0 animate-hero-float">
              <div className="relative w-full h-full rounded-[1.4rem] overflow-hidden bg-gradient-to-b from-[oklch(0.18_0.05_250)] via-[oklch(0.14_0.04_260)] to-[oklch(0.1_0.03_270)]">
                {/* animated tech circuit backdrop */}
                <TechCircuitBg />
                {/* radial spotlight behind subject */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,oklch(0.82_0.18_200/25%),transparent_60%)]" />
                {/* the cutout — large, no frame */}
                <img
                  src={uditCutoutAsset.url}
                  alt="Udit Pandey"
                  className="absolute inset-x-0 bottom-0 mx-auto h-[105%] w-auto object-contain drop-shadow-[0_0_25px_oklch(0.82_0.18_200/45%)]"
                />
                {/* scan line */}
                <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[color:var(--cyan)]/30 to-transparent animate-scan pointer-events-none" />
                {/* corner brackets */}
                {[
                  "top-3 left-3 border-l-2 border-t-2",
                  "top-3 right-3 border-r-2 border-t-2",
                  "bottom-3 left-3 border-l-2 border-b-2",
                  "bottom-3 right-3 border-r-2 border-b-2",
                ].map((cls) => (
                  <span key={cls} className={`absolute w-6 h-6 border-[color:var(--cyan)] ${cls}`} />
                ))}
              </div>
            </div>

            {/* floating tech chips */}
            {[Zap, Cpu, Bot, Rocket].map((Icon, i) => (
              <div
                key={i}
                className="absolute glass w-12 h-12 rounded-xl flex items-center justify-center text-[color:var(--cyan)] animate-float z-10"
                style={{
                  top: ["6%", "18%", "68%", "78%"][i],
                  left: ["-6%", "92%", "-8%", "94%"][i],
                  animationDelay: `${i * 0.7}s`,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsIntro() {
  return (
    <section id="projects" className="relative py-24 px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="font-display text-xs tracking-[0.4em] text-[color:var(--cyan)]">// PROJECT INDEX</div>
        <h2 className="font-display text-4xl md:text-6xl font-black mt-3">Builds & <span className="iron-text">Experiments</span></h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">Four signature projects spanning AI, disaster tech, computer vision and a real-world IoT Iron Man helmet.</p>
      </motion.div>
    </section>
  );
}

function ProjectSection({ p, index }: { p: typeof projects[number]; index: number }) {
  const Icon = p.icon;
  const reverse = index % 2 === 1;
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };
  return (
    <section className="relative py-14 md:py-20 px-4">
      <div className={`mx-auto max-w-7xl grid md:grid-cols-2 gap-8 lg:gap-10 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="glass tilt-card rounded-3xl aspect-[5/4] p-5 md:p-6 relative overflow-hidden glow-cyan">
            <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br ${p.accent} opacity-30 blur-3xl`} />
            <div className="relative h-full flex flex-col">
              <div className="flex items-center gap-2 font-display text-xs tracking-widest text-[color:var(--cyan)]">
                PROJECT 0{index + 1}
                <span className="flex-1 h-px bg-[color:var(--cyan)]/30" />
              </div>
              <div className="flex-1 flex items-center justify-center py-3">
                {p.image ? (
                  <div className={`w-full h-full max-h-[440px] rounded-2xl bg-gradient-to-br ${p.accent} p-[2px] animate-float`}>
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-card">
                      <img src={p.image} alt={`${p.name} preview`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ) : (
                  <div className={`w-56 h-56 rounded-3xl bg-gradient-to-br ${p.accent} p-[2px] animate-float`}>
                    <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center">
                      <Icon className="w-24 h-24 text-[color:var(--cyan)]" strokeWidth={1.2} />
                    </div>
                  </div>
                )}
              </div>
              <div className="font-display text-3xl md:text-4xl font-black neon-text">{p.name}</div>
              <div className="text-xs tracking-widest text-muted-foreground mt-1">{p.tagline.toUpperCase()}</div>
            </div>
            <div className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-[color:var(--cyan)]/15 to-transparent animate-scan pointer-events-none" />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={item} className="font-display text-xs tracking-[0.4em] text-[color:var(--cyan)] mb-3">
            // PROJECT 0{index + 1}
          </motion.div>
          <motion.h3 variants={item} className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02]">
            {p.name}
          </motion.h3>
          <motion.p variants={item} className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            {p.desc}
          </motion.p>
          <motion.div variants={item} className="mt-6">
            <div className="font-display text-xs tracking-widest text-[color:var(--cyan)] mb-3">FEATURES</div>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm md:text-base">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="text-[color:var(--cyan)] mt-0.5">▸</span>{f}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={item} className="mt-6">
            <div className="font-display text-xs tracking-widest text-[color:var(--cyan)] mb-3">TECH STACK</div>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span key={t} className="glass px-3 py-1 rounded-full text-xs">{t}</span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
            <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[color:var(--cyan)] text-[color:var(--primary-foreground)] px-5 py-2.5 rounded-full font-display tracking-widest text-xs hover:glow-cyan transition">
              LIVE SITE <ExternalLink className="w-4 h-4" />
            </a>
            <a href={p.github} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display tracking-widest text-xs hover:glow-cyan transition">
              <Github className="w-4 h-4" /> GITHUB
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HelmetSection() {
  return (
    <section id="helmet" className="relative min-h-screen py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at center, oklch(0.4 0.2 25 / 25%), transparent 60%)" }} />
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="font-display text-xs tracking-[0.4em] text-[color:var(--gold)]">// SIGNATURE BUILD</div>
          <h2 className="font-display text-5xl md:text-7xl font-black mt-3">MARK <span className="iron-text">50</span></h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            A highly realistic IoT-powered Iron Man helmet inspired by the Mark 50 suit — voice command, mobile control, manual override and an automated faceplate.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <HoloHelmet />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass-iron rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between font-display text-xs tracking-widest text-[color:var(--gold)] mb-4">
                <span>J.A.R.V.I.S.</span><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[color:var(--cyan)] animate-pulse" /> LIVE</span>
              </div>
              <div className="space-y-2 font-mono text-xs text-[color:var(--cyan)]/90">
                <div>&gt; booting helmet.os v5.0 …</div>
                <div>&gt; arc reactor: <span className="text-[color:var(--gold)]">stable</span></div>
                <div>&gt; faceplate servo: <span className="text-[color:var(--gold)]">ready</span></div>
                <div>&gt; awaiting voice command_</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Voice Command", "Wake-word + STT"],
                ["Mobile App", "BLE + custom UI"],
                ["Manual Control", "Tactile override"],
                ["Auto Faceplate", "Servo-driven open"],
                ["Arc Reactor", "RGB + diffuser"],
                ["HUD Visor", "Edge-lit acrylic"],
              ].map(([t, s]) => (
                <div key={t} className="glass-iron rounded-xl p-4 hover:glow-iron transition">
                  <div className="font-display text-sm font-bold text-[color:var(--gold)]">{t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["ESP32", "Servo Motors", "Bluetooth LE", "React Native", "Arduino", "3D Print"].map((t) => (
                <span key={t} className="glass-iron px-3 py-1 rounded-full text-xs">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Build timeline */}
        <div className="mt-20">
          <div className="font-display text-xs tracking-[0.4em] text-[color:var(--cyan)] text-center">// BUILD PROCESS</div>
          <h3 className="font-display text-3xl md:text-4xl font-black text-center mt-2">From Concept to <span className="iron-text">JARVIS</span></h3>
          <div className="mt-10 grid md:grid-cols-4 gap-4">
            {[
              { t: "Design", d: "3D modeling and reference research" },
              { t: "Fabrication", d: "Print, sand and paint shell" },
              { t: "Electronics", d: "Wiring servos, LEDs and ESP32" },
              { t: "JARVIS OS", d: "Voice + mobile control firmware" },
            ].map((s, i) => (
              <motion.div key={s.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5 relative">
                <div className="font-display text-xs text-[color:var(--gold)] tracking-widest">PHASE 0{i + 1}</div>
                <div className="font-display text-xl font-bold mt-1">{s.t}</div>
                <div className="text-sm text-muted-foreground mt-2">{s.d}</div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full border-2 border-[color:var(--cyan)]/50 flex items-center justify-center text-xs font-display text-[color:var(--cyan)]">{i + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <div className="font-display text-xs tracking-[0.4em] text-[color:var(--cyan)]">// CAPABILITIES</div>
          <h2 className="font-display text-4xl md:text-6xl font-black mt-3">Skill <span className="iron-text">Matrix</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group glass rounded-2xl p-6 hover:glow-cyan transition relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[color:var(--cyan)]/10 blur-2xl group-hover:bg-[color:var(--cyan)]/30 transition" />
                <Icon className="w-10 h-10 text-[color:var(--cyan)]" strokeWidth={1.4} />
                <div className="font-display text-xl font-bold mt-4">{s.name}</div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {s.items.map((it) => (
                    <span key={it} className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--cyan)]/10 text-[color:var(--cyan)]">{it}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const stats = [
    { v: 25, s: "+", label: "Projects Built" },
    { v: 30, s: "+", label: "Technologies Learned" },
    { v: 5, s: "+", label: "Hackathon Wins" },
  ];
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl glass rounded-3xl p-10 glow-cyan grid sm:grid-cols-3 gap-6 text-center">
        {stats.map((st) => (
          <div key={st.label}>
            <div className="font-display text-5xl md:text-6xl font-black iron-text">
              <Counter to={st.v} suffix={st.s} />
            </div>
            <div className="mt-2 text-xs tracking-[0.3em] text-muted-foreground font-display">{st.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="font-display text-xs tracking-[0.4em] text-[color:var(--cyan)]">// TRANSMIT</div>
          <h2 className="font-display text-4xl md:text-6xl font-black mt-3">Let's <span className="iron-text">Connect</span></h2>
          <p className="mt-3 text-muted-foreground">Open to collaborations, internships, and bold projects.</p>
        </div>
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Message transmitted. I'll reply soon.");
              (e.currentTarget as HTMLFormElement).reset();
              setTimeout(() => setSent(false), 2500);
            }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <div>
              <label className="text-xs font-display tracking-widest text-[color:var(--cyan)]">NAME</label>
              <input required defaultValue="" placeholder="Your name" className="mt-1 w-full bg-transparent border-b border-[color:var(--cyan)]/30 focus:border-[color:var(--cyan)] outline-none py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-display tracking-widest text-[color:var(--cyan)]">EMAIL</label>
              <input type="email" required placeholder="you@domain.com" className="mt-1 w-full bg-transparent border-b border-[color:var(--cyan)]/30 focus:border-[color:var(--cyan)] outline-none py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-display tracking-widest text-[color:var(--cyan)]">MESSAGE</label>
              <textarea required rows={4} placeholder="Tell me about your idea…" className="mt-1 w-full bg-transparent border-b border-[color:var(--cyan)]/30 focus:border-[color:var(--cyan)] outline-none py-2 text-sm resize-none" />
            </div>
            <button type="submit" className="w-full bg-[color:var(--cyan)] text-[color:var(--primary-foreground)] font-display tracking-widest text-xs py-3 rounded-full hover:glow-cyan transition">
              {sent ? "TRANSMITTED ✓" : "SEND TRANSMISSION"}
            </button>
          </form>
          <div className="space-y-3">
            <a href={`mailto:${SOCIALS.email}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-cyan transition">
              <Mail className="w-6 h-6 text-[color:var(--cyan)]" />
              <div>
                <div className="font-display text-sm">Email</div>
                <div className="text-xs text-muted-foreground">{SOCIALS.email}</div>
              </div>
            </a>
            {[
              { Icon: Linkedin, href: SOCIALS.linkedin, name: "LinkedIn", h: "udit-pandey-b30191384" },
              { Icon: Github, href: SOCIALS.github, name: "GitHub", h: "uditpandey645-cpu" },
              { Icon: Instagram, href: SOCIALS.instagram, name: "Instagram", h: "@_udit__pandey_" },
            ].map(({ Icon, href, name, h }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-cyan transition">
                <Icon className="w-6 h-6 text-[color:var(--cyan)]" />
                <div>
                  <div className="font-display text-sm">{name}</div>
                  <div className="text-xs text-muted-foreground">{h}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-[color:var(--cyan)]/15">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-xs tracking-[0.3em] text-muted-foreground">© 2026 UDIT PANDEY · ALL SYSTEMS NOMINAL</div>
        <div className="flex gap-3">
          {[
            { Icon: Github, href: SOCIALS.github },
            { Icon: Linkedin, href: SOCIALS.linkedin },
            { Icon: Instagram, href: SOCIALS.instagram },
            { Icon: Mail, href: `mailto:${SOCIALS.email}` },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer" className="glass w-9 h-9 rounded-full flex items-center justify-center text-[color:var(--cyan)] hover:glow-cyan transition">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
