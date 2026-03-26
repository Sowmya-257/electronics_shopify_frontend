import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSync = (e) => {
    e.preventDefault();
    if (!email) return;

    // Simulate network sync
    setStatus("PROTOCOL_ACCEPTED: YOU HAVE BEEN ADDED TO THE NETWORK.");
    setEmail("");

    // Clear message after 4 seconds
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <footer className="bg-[#05070a] pt-24 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-default">
              <div className="w-5 h-5 border-2 border-cyan-500 flex items-center justify-center">
                <div className="w-1 h-1 bg-cyan-500 animate-pulse"></div>
              </div>
              <span className="text-xl font-black italic tracking-tighter uppercase text-white">ByteNext</span>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase leading-loose tracking-[0.2em] max-w-xs">
              Next-generation hardware deployment. Delivering verified nodes to your perimeter.
            </p>
            <div className="flex gap-4">
              {["TW", "GH", "IN"].map((platform) => (
                <a key={platform} href="#" className="text-[10px] font-black text-gray-600 hover:text-cyan-500 transition-colors tracking-widest">
                  [{platform}]
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Directory */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Directory</h4>
            <ul className="space-y-4">
              {["Shop_All", "Mobile_Units", "Compute_Nodes", "Audio_Uplink"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-cyan-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Info */}
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">System_Info</h4>
            <ul className="space-y-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <li className="hover:text-cyan-500 cursor-pointer transition-colors">Trust_Center</li>
              <li className="hover:text-cyan-500 cursor-pointer transition-colors">Return_Protocol</li>
              <li className="hover:text-cyan-500 cursor-pointer transition-colors">Privacy_Shield</li>
            </ul>
          </div>

          {/* Column 4: Newsletter Uplink with Popup */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Subscribe_Uplink</h4>
            
            <div className="relative group">
              {/* Terminal Popup Notification */}
              {status && (
                <div className="absolute -top-12 left-0 right-0 bg-cyan-500 text-black text-[9px] font-black p-2 rounded-lg animate-bounce uppercase tracking-tighter text-center">
                  {status}
                </div>
              )}

              <form onSubmit={handleSync} className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="USER@DOMAIN.COM" 
                  className="w-full bg-[#0b0f1a] border border-white/10 rounded-2xl py-4 px-5 text-[10px] font-mono text-cyan-500 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-800 uppercase"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-4 bg-white text-black rounded-xl text-[9px] font-black uppercase hover:bg-cyan-500 transition-all active:scale-95"
                >
                  Sync
                </button>
              </form>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600">Global_Nodes_Active</span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">
              © 2026_BYTENEXT_CORP
            </span>
            <span className="hidden md:block text-[9px] font-mono text-gray-800 tracking-tighter uppercase">
              [Status: Nominal] // [Zone: IN-EAST-1]
            </span>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-6 py-3 bg-[#0b0f1a] border border-white/10 rounded-full hover:border-cyan-500/50 transition-all"
          >
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-cyan-500">Back_To_Top</span>
            <span className="text-gray-500 group-hover:text-cyan-500 transition-transform">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;