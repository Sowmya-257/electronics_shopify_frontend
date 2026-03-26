import { Zap, Shield, Cpu, Globe, ArrowUpRight } from "lucide-react";

function Features() {
  const features = [
    {
      id: "01",
      icon: <Zap size={20} />,
      title: "Hyper_Threaded_Logistics",
      desc: "Zero-latency delivery protocols. Your hardware moves at the speed of light from our node to yours.",
      size: "col-span-12 md:col-span-8",
      accent: "text-cyan-500"
    },
    {
      id: "02",
      icon: <Shield size={20} />,
      title: "Secure_Layer",
      desc: "Encrypted transactions.",
      size: "col-span-12 md:col-span-4",
      accent: "text-white"
    },
    {
      id: "03",
      icon: <Cpu size={20} />,
      title: "Vetted_Hardware",
      desc: "Every unit undergoes a 50-point system diagnostic before deployment.",
      size: "col-span-12 md:col-span-4",
      accent: "text-white"
    },
    {
      id: "04",
      icon: <Globe size={20} />,
      title: "Global_Network_Access",
      desc: "Join an elite collective of 10,000+ verified nodes worldwide. Seamless cross-border hardware sourcing.",
      size: "col-span-12 md:col-span-8",
      accent: "text-cyan-500"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#05070a]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            
            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9]">
              Built_To_Outperform <br /> 
              <span className="text-gray-800">Standard_Retail.</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Protocol_Status</p>
            <p className="text-xs font-black text-green-500 uppercase italic">All_Systems_Nominal</p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {features.map((item) => (
            <div 
              key={item.id}
              className={`${item.size} group bg-[#0b0f1a] border border-white/5 rounded-[2.5rem] p-10 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden shadow-2xl`}
            >
              {/* Subtle ID Watermark */}
              <span className="absolute top-8 right-10 text-[10px] font-black text-white/10 group-hover:text-cyan-500/20 transition-colors">
                {item.id}
              </span>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 ${item.accent} group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4 group-hover:text-cyan-400 transition-colors">
                    {item.title.replace(/_/g, " ")}
                  </h3>
                  <p className="text-gray-500 text-xs font-bold uppercase leading-relaxed tracking-widest max-w-sm">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                   <span className="text-[9px] font-black uppercase tracking-widest text-cyan-500">Initialize_Module</span>
                   <ArrowUpRight size={14} className="text-cyan-500" />
                </div>
              </div>

              {/* Decorative Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/5 blur-[100px] group-hover:bg-cyan-500/10 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;