import { ShieldCheck, Lock, Fingerprint, RefreshCcw, CheckCircle2 } from "lucide-react";

function TrustSection() {
  const protocols = [
    {
      icon: <Lock size={20} />,
      title: "End-to-End Encryption",
      desc: "Every transaction is processed through a 256-bit encrypted tunnel."
    },
    {
      icon: <Fingerprint size={20} />,
      title: "Hardware Authenticity",
      desc: "Direct manufacturer verification. No third-party resellers."
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Secure_Escrow Protocol",
      desc: "Funds are shielded until tracking confirms delivery to your perimeter."
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#05070a] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.5em]">System_Integrity</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
            Zero_Trust. <br />
            <span className="text-gray-800">Verified_Security.</span>
          </h2>
        </div>

        {/* CORE PROTOCOLS GRID */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {protocols.map((item, idx) => (
            <div key={idx} className="bg-[#0b0f1a] border border-white/5 p-10 rounded-[2.5rem] hover:border-cyan-500/30 transition-all group">
              <div className="text-cyan-500 mb-8 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-black italic uppercase tracking-tight mb-4 text-white">
                {item.title.replace(/ /g, "_")}
              </h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase leading-relaxed tracking-widest">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* THE TERMINAL LOG & DIAGNOSTICS */}
        <div className="grid lg:grid-cols-2 gap-16 items-center bg-[#0b0f1a]/30 border border-white/5 p-8 md:p-16 rounded-[4rem]">
          <div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Diagnostic_Loop</h3>
            <div className="space-y-4">
              {[
                "Source verification via global hubs",
                "50-point diagnostic check",
                "Tamper-evident packaging logs"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 size={16} className="text-cyan-500" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual Terminal */}
          <div className="bg-[#05070a] border border-white/10 rounded-[2rem] p-8 font-mono text-[10px] shadow-2xl">
            <div className="text-cyan-500 mb-2">{">"} INITIALIZING_DIAGNOSTIC...</div>
            <div className="text-white/20 mb-2">SCANNING_SERIAL_NUMBER: BN-9920-X</div>
            <div className="text-green-500 mb-2">{">"} AUTHENTIC_HARDWARE_CONFIRMED</div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center opacity-40">
              <span className="uppercase">Secure_Node_Active</span>
              <RefreshCcw size={12} className="animate-spin" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TrustSection;