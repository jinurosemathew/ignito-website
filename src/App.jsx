import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Rocket, Terminal, Cpu, Globe, ChevronRight, User, Satellite, ShieldCheck, Bot, Palette, Radio, Timer, MapPin, Users } from 'lucide-react';

/* ---------------------------------------------------------
   STAR BACKGROUND
--------------------------------------------------------- */
function StarBackground(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#fff" size={0.003} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

/* ---------------------------------------------------------
   ORB STAR WISPS — travel together with the orb
--------------------------------------------------------- */
function OrbWisps() {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(1800), { radius: 2.2 }));
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x -= delta * 0.05;
  });
  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled>
      <PointMaterial transparent color="#a5f3fc" size={0.012} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  );
}

/* ---------------------------------------------------------
   CELESTIAL ORB
--------------------------------------------------------- */
function CelestialOrb() {
  const group = useRef();
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.6) * 0.15;
      group.current.rotation.y = t * 0.15;
    }
  });
  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <OrbWisps />
      <mesh><icosahedronGeometry args={[1.15, 2]} /><meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.45} /></mesh>
      <mesh scale={0.68}><icosahedronGeometry args={[1, 1]} /><meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.55} /></mesh>
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]}><torusGeometry args={[1.5, 0.01, 8, 100]} /><meshBasicMaterial color="#67e8f9" transparent opacity={0.6} /></mesh>
      <mesh><sphereGeometry args={[0.22, 32, 32]} /><meshStandardMaterial color="#e9d5ff" emissive="#a78bfa" emissiveIntensity={2} roughness={0.3} /></mesh>
    </group>
  );
}

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const events = [
  {
    t: "Code Nebula",
    i: <Terminal className="w-7 h-7 text-cyan-300" />,
    d: "A 24-hour competitive programming sprint through data structures, algorithms, and system design puzzles.",
    meta: [{ icon: <Timer className="w-3.5 h-3.5" />, label: "24 hrs" }, { icon: <Users className="w-3.5 h-3.5" />, label: "Solo / Duo" }],
  },
  {
    t: "Hardware Orbit",
    i: <Bot className="w-7 h-7 text-purple-300" />,
    d: "Design and pilot autonomous rovers through obstacle courses, then face off in a combat-bot arena finale.",
    meta: [{ icon: <Timer className="w-3.5 h-3.5" />, label: "2 days" }, { icon: <Users className="w-3.5 h-3.5" />, label: "Teams of 4" }],
  },
  {
    t: "Cyber Void",
    i: <ShieldCheck className="w-7 h-7 text-pink-300" />,
    d: "Capture-the-flag style cyber-defense challenge simulating live intrusions across a mock satellite network.",
    meta: [{ icon: <Timer className="w-3.5 h-3.5" />, label: "8 hrs" }, { icon: <Users className="w-3.5 h-3.5" />, label: "Teams of 3" }],
  },
  {
    t: "Signal Relay",
    i: <Radio className="w-7 h-7 text-cyan-300" />,
    d: "A hardware-meets-networking challenge: build a working relay to transmit data across a simulated deep-space link.",
    meta: [{ icon: <Timer className="w-3.5 h-3.5" />, label: "6 hrs" }, { icon: <Users className="w-3.5 h-3.5" />, label: "Teams of 2" }],
  },
  {
    t: "Orbit Design Lab",
    i: <Palette className="w-7 h-7 text-purple-300" />,
    d: "A rapid UI/UX sprint to design a mission-control dashboard, judged on usability, clarity, and visual craft.",
    meta: [{ icon: <Timer className="w-3.5 h-3.5" />, label: "5 hrs" }, { icon: <Users className="w-3.5 h-3.5" />, label: "Solo" }],
  },
  {
    t: "Deep Space Quiz",
    i: <Satellite className="w-7 h-7 text-pink-300" />,
    d: "A fast-paced trivia gauntlet spanning astronomy, computer science history, and general tech knowledge.",
    meta: [{ icon: <Timer className="w-3.5 h-3.5" />, label: "2 hrs" }, { icon: <Users className="w-3.5 h-3.5" />, label: "Teams of 2" }],
  },
];

const competitions = [
  { name: "Interstellar Hackathon", prize: "₹50,000", tag: "SOFTWARE", venue: "Main Auditorium", desc: "Build a working prototype overnight around this year's theme: sustainable space tech." },
  { name: "Rover Wars", prize: "₹30,000", tag: "ROBOTICS", venue: "Open Arena", desc: "Autonomous and RC-hybrid rovers battle through terrain and combat rounds." },
  { name: "UI/UX Space Station", prize: "₹15,000", tag: "DESIGN", venue: "Design Studio", desc: "Design an end-to-end product experience for a fictional space-tourism app." },
  { name: "Quantum Circuit Sprint", prize: "₹20,000", tag: "HARDWARE", venue: "Electronics Lab", desc: "Rapid-fire circuit design and debugging challenges against the clock." },
];

const commanders = [
  { name: "Dr. Stella Nova", role: "Quantum Computing Lead", company: "CyberDyne Systems" },
  { name: "Orion Vance", role: "Chief Security Officer", company: "Aegis Cybernetics" },
  { name: "Lyra Chen", role: "AI Research Director", company: "NeuralNet Corp" },
];

/* ---------------------------------------------------------
   MAIN APP
--------------------------------------------------------- */
export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
        .font-orbit { font-family: 'Orbitron', sans-serif; }
      `}</style>

      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 3]} intensity={1.2} color="#a78bfa" />
          <StarBackground />
          <CelestialOrb />
        </Canvas>
      </div>

      <div className="relative z-10">

        {/* --- NAV --- */}
        <nav className="fixed top-0 w-full border-b border-white/10 bg-black/20 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rocket className="text-cyan-400 w-6 h-6" />
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">IGNITO'26</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-mono tracking-widest uppercase text-purple-300/70">
              <a href="#home" className="hover:text-cyan-400">Home</a>
              <a href="#events" className="hover:text-cyan-400">Events</a>
              <a href="#competitions" className="hover:text-cyan-400">Competitions</a>
              <a href="#commanders" className="hover:text-cyan-400">Commanders</a>
              <a href="#contact" className="hover:text-cyan-400">Contact</a>
            </div>
          </div>
        </nav>

        {/* --- HERO --- */}
        <section id="home" className="min-h-screen relative flex flex-col items-center justify-center px-4 pt-16">
          <div className="text-center">
            <h1 className="font-orbit text-5xl md:text-7xl font-bold uppercase tracking-wide leading-tight">
              <span
                className="text-white"
                style={{
                  textShadow: `
                    0 1px 0 #67e8f9,
                    0 2px 0 #38bdf8,
                    0 3px 0 #22d3ee,
                    0 4px 6px rgba(0,0,0,0.6),
                    0 0 24px rgba(103,232,249,0.5)
                  `,
                }}
              >
                Ignito
              </span>{' '}
              <span
                className="text-cyan-300"
                style={{
                  textShadow: `
                    0 1px 0 #a78bfa,
                    0 2px 0 #8b5cf6,
                    0 3px 0 #7c3aed,
                    0 4px 6px rgba(0,0,0,0.6),
                    0 0 28px rgba(167,139,250,0.6)
                  `,
                }}
              >
                2026
              </span>
            </h1>
            <p className="text-gray-400 mt-4 text-base md:text-lg font-light max-w-xl mx-auto">
              Explore the digital cosmos. Join the frontier of tech exploration.
            </p>
          </div>

          {/* Date block, bottom-left */}
          <div className="hidden sm:flex absolute left-6 md:left-16 bottom-14 items-stretch gap-4">
            <div className="w-px bg-cyan-400/50" />
            <div className="font-mono">
              <p className="text-xs tracking-[0.35em] uppercase text-cyan-300/70 mb-1">February</p>
              <p className="text-3xl md:text-4xl font-bold text-white tracking-wide">12, 13, 14</p>
            </div>
          </div>

          {/* College name block, bottom-right */}
          <div className="hidden sm:flex absolute right-6 md:right-16 bottom-14 items-stretch gap-4 text-right">
            <div className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-purple-300/70 leading-relaxed">
              <p>Astra</p>
              <p>Institute of</p>
              <p>Technology</p>
            </div>
            <div className="w-px bg-purple-400/50" />
          </div>
        </section>

        {/* --- EVENTS --- */}
        <section id="events" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-black uppercase tracking-widest">Planetary Sectors</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm">
              Six sectors, six kinds of challenge — pick your arena and stake your claim on the leaderboard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {events.map((e, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">{e.i}</div>
                <h3 className="text-xl font-bold mb-2">{e.t}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{e.d}</p>
                <div className="flex gap-4 text-xs font-mono text-cyan-300/70">
                  {e.meta.map((m, j) => (
                    <span key={j} className="flex items-center gap-1">{m.icon} {m.label}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- COMPETITIONS --- */}
        <section id="competitions" className="py-24 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-purple-300 uppercase tracking-widest">Active Missions</h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm">
                Flagship competitions with real prize pools. Choose your mission and deploy your best team.
              </p>
            </div>
            <div className="space-y-4">
              {competitions.map((c, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-5">
                      <div className="text-3xl font-black text-white/15 font-mono">0{i + 1}</div>
                      <div>
                        <span className="text-xs font-mono text-cyan-400 block mb-1">{c.tag}</span>
                        <h3 className="text-xl font-bold">{c.name}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-xs text-gray-500 uppercase font-bold block">Prize Pool</span>
                        <span className="font-mono text-purple-300">{c.prize}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {c.venue}</span>
                    <span className="text-gray-500">{c.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- COMMANDERS --- */}
        <section id="commanders" className="py-24 px-4 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-widest">Mission Commanders</h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto text-sm">
            Guest speakers and industry veterans joining us to share what they've learned at the edge of the field.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commanders.map((c, i) => (
              <div key={i} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-1">
                  <div className="w-full h-full bg-[#0a0518] rounded-full flex items-center justify-center">
                    <User className="w-9 h-9 text-white/60" />
                  </div>
                </div>
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="text-cyan-400 font-mono text-xs mt-1 mb-2">{c.role}</p>
                <p className="text-gray-500 text-sm">{c.company}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section id="contact" className="py-24 px-4 max-w-xl mx-auto">
          <h2 className="text-4xl font-black mb-8 text-center uppercase tracking-widest">Sub-Space Transmission</h2>
          <form className="space-y-4">
            <input className="w-full p-4 bg-black/50 border border-white/20 rounded-lg" placeholder="Pilot Name" />
            <textarea className="w-full p-4 bg-black/50 border border-white/20 rounded-lg" placeholder="Message" rows="4" />
            <button className="w-full py-4 bg-cyan-600 rounded-lg font-bold">SEND TRANSMISSION</button>
          </form>
        </section>

        <footer className="py-8 text-center text-gray-500 font-mono border-t border-white/10">© 2026 IGNITO Techfest.</footer>
      </div>
    </div>
  );
}