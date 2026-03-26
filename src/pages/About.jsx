import Navbar from "../components/Navbar";
import { Shield, Zap, Cpu, Globe, Users, Code } from "lucide-react";

function About() {
  const values = [
    { icon: <Cpu size={32} />, title: "Silicon_Standard", desc: "Only the highest grade components enter our ecosystem." },
    { icon: <Shield size={32} />, title: "Encrypted_Trust", desc: "Your data and deployments are secured by industry-leading protocols." },
    { icon: <Zap size={32} />, title: "Instant_Sync", desc: "Zero-latency logistics from our terminal to your front door." },
    { icon: <Globe size={32} />, title: "Global_Node", desc: "A worldwide network of enthusiasts and engineers." },
  ];

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans selection:bg-cyan-500 pb-20">
      <Navbar />

      <main className="pt-40 px-6">
        {/* HERO SECTION */}
        <section className="max-w-[1200px] mx-auto text-center mb-32">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">
              System_Manifesto_v3.0
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-8">
            The_Next_Step_In <br />
            <span className="text-cyan-500">Digital_Evolution.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-sm md:text-base font-medium leading-relaxed uppercase tracking-wider">
            ByteNext isn't just a marketplace. It is a high-performance protocol 
            designed to bridge the gap between cutting-edge hardware and the 
            visionaries who use it.
          </p>
        </section>

        {/* BENTO VALUES GRID */}
        <section className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40">
          {values.map((item, idx) => (
            <div key={idx} className="bg-[#0b0f1a] border border-white/5 rounded-[3rem] p-10 hover:border-cyan-500/30 transition-all group">
              <div className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[11px] font-bold uppercase leading-relaxed tracking-widest">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* MISSION STRIP */}
        {/* BLENDED MISSION SECTION */}
{/* MINIMALIST MISSION SECTION */}
<section className="py-40 px-6 border-t border-white/5 bg-[#05070a]">
  <div className="max-w-[1200px] mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-start gap-16">
      
      {/* LEFT: MINIMAL HEADING */}
      <div className="max-w-md">
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-6">
          Built_By_Engineers. <br />
          <span className="text-cyan-500">Driven_By_Code.</span>
        </h2>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] leading-relaxed">
          Curated hardware for the next generation of builders. <br /> 
          Zero bloat. Pure performance.
        </p>
      </div>

      {/* RIGHT: DATA POINTS (NO BOXES) */}
      <div className="flex gap-12 md:gap-24">
        <div>
          <div className="text-5xl font-black italic tracking-tighter text-white">10K+</div>
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/40 mt-2">Nodes_Linked</div>
        </div>
        
        <div>
          <div className="text-5xl font-black italic tracking-tighter text-white">99.9%</div>
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/40 mt-2">Uptime_Rate</div>
        </div>
      </div>

    </div>
  </div>
</section>

        {/* TEAM / CALL TO ACTION */}
        <section className="max-w-[1000px] mx-auto text-center">
           <Users className="mx-auto text-cyan-500 mb-8" size={48} />
           <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6">
              Join_The_Network
           </h2>
           <p className="text-gray-500 text-xs font-black uppercase tracking-[0.3em] mb-10">
              Ready to upgrade your deployment?
           </p>
           <button 
             onClick={() => window.location.href = '/shop'}
             className="px-12 py-5 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-2xl hover:bg-white transition-all hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] active:scale-95"
           >
              Initialize_Shopping_Protocol
           </button>
        </section>
      </main>

      {/* FOOTER DETAIL */}
      <footer className="mt-40 border-t border-white/5 py-10 text-center opacity-20">
         <span className="text-[8px] font-black uppercase tracking-[1em]">ByteNext_Systems_International_2026</span>
      </footer>
    </div>
  );
}

export default About;