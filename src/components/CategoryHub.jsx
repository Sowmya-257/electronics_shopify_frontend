import { Smartphone, Laptop, Speaker, Plug } from "lucide-react";

function CategoryHub() {
  const categories = [
    { name: "Mobile", icon: <Smartphone size={22} />, gridPos: "md:col-span-1" },
    { name: "Laptops", icon: <Laptop size={22} />, gridPos: "md:col-span-1" },
    { name: "Audio", icon: <Speaker size={22} />, gridPos: "md:col-span-1" },
    { name: "Accessories", icon: <Plug size={22} />, gridPos: "md:col-span-1" }
  ];

  return (
    <section className="py-24 px-6 bg-[#05070a] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Minimalist Top Label */}
        <div className="flex flex-col items-center mb-16 space-y-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/40">
            System_Architecture_Nodes
          </span>
        </div>

        {/* The Hub Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-px md:bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {categories.map((cat, i) => (
            <div 
              key={i}
              className="relative group py-16 px-8 bg-[#05070a] flex flex-col items-center justify-center transition-all duration-700 hover:bg-white/[0.02]"
            >
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08)_0%,transparent_70%)]"></div>

              {/* Icon with Floating Animation */}
              <div className="relative mb-6 text-gray-500 group-hover:text-cyan-400 group-hover:-translate-y-1 transition-all duration-500">
                {cat.icon}
                {/* Small shadow under icon */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-500/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Label */}
              <h3 className="relative text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                {cat.name}
              </h3>

              {/* Vertical Divider (Desktop Only) */}
              {i !== categories.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Status Ticker */}
        <div className="mt-8 flex justify-center items-center gap-10 opacity-20">
           <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <span className="text-[7px] font-bold uppercase tracking-widest text-white">Inventory_Sync_Active</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
              <span className="text-[7px] font-bold uppercase tracking-widest text-white">Protocol_v2.0</span>
           </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryHub;