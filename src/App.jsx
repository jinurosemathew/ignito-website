import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
// Added 'User' to the imports here for the new Commanders section!
import { Rocket, Terminal, Cpu, Globe, ChevronRight, Menu, X, User } from 'lucide-react';

// --- 3D STARFIELD COMPONENT ---
function StarBackground(props) {
  const ref = useRef();
  // Generate random points in a 3D sphere
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    // Make the stars rotate slowly for a space travel effect
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-200 selection:bg-cyan-500/30">
      
      {/* 3D Canvas Background - Fixed behind everything */}
      <div className="fixed inset-0 z-0 bg-space-dark">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarBackground />
        </Canvas>
      </div>

      {/* Main Content Overlay - Must have z-index to sit above the 3D canvas */}
      <div className="relative z-10">
        
        {/* --- NAVIGATION BAR --- */}
        <nav className="fixed top-0 w-full border-b border-white/10 bg-black/20 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <Rocket className="text-cyan-400 w-6 h-6 animate-pulse" />
                <span className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  IGNITO'26
                </span>
              </div>
              
              {/* Desktop Nav - Commanders link added here */}
              <div className="hidden md:flex space-x-8 text-sm font-mono tracking-widest uppercase">
                <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
                <a href="#events" className="hover:text-purple-400 transition-colors">Events</a>
                <a href="#competitions" className="hover:text-cyan-400 transition-colors">Competitions</a>
                <a href="#commanders" className="hover:text-cyan-400 transition-colors">Commanders</a>
                <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Dropdown - Commanders link added here */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#0a0518]/95 backdrop-blur-xl border-b border-white/10">
              <div className="px-2 pt-2 pb-3 space-y-1 font-mono text-center">
                <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-cyan-400">HOME</a>
                <a href="#events" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-cyan-400">EVENTS</a>
                <a href="#competitions" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-cyan-400">COMPETITIONS</a>
                <a href="#commanders" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-cyan-400">COMMANDERS</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-cyan-400">CONTACT</a>
              </div>
            </div>
          )}
        </nav>

        {/* --- HERO SECTION --- */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-sm backdrop-blur-sm">
              SYSTEM ONLINE // LAUNCH SEQUENCE INITIATED
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-tight">
              Explore the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Digital Cosmos
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
              Join the brightest minds in the galaxy at IGNITO 2026. A 3-day interstellar journey through technology, innovation, and intense competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#events" className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                  View Missions <ChevronRight className="w-4 h-4" />
                </span>
              </a>
              <a href="#contact" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors">
                Contact HQ
              </a>
            </div>
          </div>
        </section>

        {/* --- EVENTS / SECTORS SECTION --- */}
        <section id="events" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4">Planetary Sectors</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Code Nebula", desc: "Push the limits of algorithmic logic in our 24-hour coding sprint.", icon: <Terminal className="w-8 h-8 text-cyan-400" /> },
              { title: "Hardware Orbit", desc: "Build autonomous rovers and combat bots to conquer the arena.", icon: <Cpu className="w-8 h-8 text-purple-400" /> },
              { title: "Cyber Void", desc: "Defend against simulated cosmic threats in the capture-the-flag challenge.", icon: <Globe className="w-8 h-8 text-pink-400" /> }
            ].map((event, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group">
                <div className="mb-6 p-4 rounded-xl bg-white/5 inline-block group-hover:scale-110 transition-transform">
                  {event.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                <p className="text-gray-400 leading-relaxed">{event.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- COMPETITIONS SECTION --- */}
        <section id="competitions" className="py-24 px-4 bg-black/40 backdrop-blur-md border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Active Missions</h2>
                <p className="text-gray-400">Select a competition to deploy your skills.</p>
              </div>
              <button className="px-6 py-2 border border-purple-500/50 text-purple-400 rounded-full font-mono text-sm hover:bg-purple-500/10 transition-colors">
                VIEW ALL DIRECTIVES
              </button>
            </div>

            <div className="space-y-6">
              {[
                { name: "Interstellar Hackathon", prize: "₹50,000", tag: "SOFTWARE" },
                { name: "Rover Wars", prize: "₹30,000", tag: "ROBOTICS" },
                { name: "UI/UX Space Station", prize: "₹15,000", tag: "DESIGN" }
              ].map((comp, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors group">
                  <div className="flex items-center gap-6 w-full sm:w-auto mb-4 sm:mb-0">
                    <div className="text-3xl font-black text-white/20 group-hover:text-cyan-500/50 transition-colors font-mono">0{i+1}</div>
                    <div>
                      <span className="text-xs font-mono text-cyan-400 mb-1 block">{comp.tag}</span>
                      <h3 className="text-xl font-bold">{comp.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xs text-gray-500 uppercase font-bold block">Prize Pool</span>
                      <span className="font-mono text-lg text-purple-300">{comp.prize}</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MISSION COMMANDERS (SPEAKERS) SECTION --- */}
        <section id="commanders" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4">Mission Commanders</h2>
            <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Learn from the veterans of the digital cosmos. Guest speakers and industry leaders.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Stella Nova", role: "Quantum Computing Lead", company: "CyberDyne Systems" },
              { name: "Orion Vance", role: "Chief Security Officer", company: "Aegis Cybernetics" },
              { name: "Lyra Chen", role: "AI Research Director", company: "NeuralNet Corp" }
            ].map((speaker, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-1 mb-6 group-hover:scale-110 transition-transform">
                  <div className="w-full h-full bg-[#0a0518] rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                <p className="text-cyan-400 font-mono text-xs mb-3">{speaker.role}</p>
                <p className="text-gray-500 text-sm">{speaker.company}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-24 px-4 max-w-3xl mx-auto text-center">
          <Terminal className="w-12 h-12 mx-auto text-cyan-400 mb-6" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-8">Sub-Space Transmission</h2>
          
          <div className="bg-black/60 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-left">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 font-mono text-xs text-gray-500">ignito-comm-channel.exe</span>
            </div>
            
            <form className="space-y-6 font-mono text-sm" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-cyan-400 mb-2">&gt;&gt; IDENTIFICATION (NAME):</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 focus:border-cyan-400 focus:outline-none py-2 text-white placeholder-white/20" placeholder="Enter pilot name..." />
              </div>
              <div>
                <label className="block text-cyan-400 mb-2">&gt;&gt; TRANSMISSION DATA (MESSAGE):</label>
                <textarea rows="4" className="w-full bg-transparent border border-white/20 focus:border-cyan-400 focus:outline-none p-4 rounded-lg text-white placeholder-white/20 mt-2 resize-none" placeholder="Type your message here..."></textarea>
              </div>
              <button className="w-full py-4 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-bold tracking-widest transition-colors border border-cyan-500/50 rounded-lg">
                SEND TRANSMISSION
              </button>
            </form>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-white/10 bg-black/50 py-8 text-center text-sm text-gray-500 font-mono backdrop-blur-md">
          <p>© 2026 IGNITO Techfest. End of Transmission.</p>
        </footer>

      </div>
    </div>
  );
}