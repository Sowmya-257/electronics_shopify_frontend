import { useState } from "react";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { Send, MessageSquare, Phone, MapPin, Globe, Terminal, Mail } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "TECHNICAL_ENQUIRY",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("TRANSMITTING_UPLINK...");
    
    // Simulate API Call
    setTimeout(() => {
      toast.success("SIGNAL_RECEIVED: We will contact you shortly.", { id: loadingToast });
      setFormData({ name: "", email: "", subject: "TECHNICAL_ENQUIRY", message: "" });
    }, 2000);
  };

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans selection:bg-cyan-500 pb-20">
      <Navbar />
      <Toaster position="bottom-right" />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-20 pt-40">
        <div className="grid grid-cols-12 gap-12">
          
          {/* LEFT: System Info (The Sidebar) */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div>
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-4 block">
                Communication_Nodes
              </span>
              <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none mb-6">
                Get_In_ <br />Touch
              </h1>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-loose">
                Established encrypted channels for hardware support, 
                partnership protocols, and general network inquiries.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#111625] flex items-center justify-center text-cyan-500 border border-white/5 group-hover:border-cyan-500/50 transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Email_Uplink</p>
                  <p className="text-sm font-bold">support@bytenext.io</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#111625] flex items-center justify-center text-cyan-500 border border-white/5 group-hover:border-cyan-500/50 transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Voice_Channel</p>
                  <p className="text-sm font-bold">+1 (888) BYTE-NEXT</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#111625] flex items-center justify-center text-cyan-500 border border-white/5 group-hover:border-cyan-500/50 transition-all">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Physical_Node</p>
                  <p className="text-sm font-bold">Silicon Valley, CA / Remote_Core</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Terminal Form */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-[#0b0f1a] border border-white/5 rounded-[3.5rem] p-8 lg:p-16 shadow-2xl relative overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <Terminal size={40} className="text-cyan-500" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">User_Identification</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Full Name"
                      className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      value={formData.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">Return_Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Email Address"
                      className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      value={formData.email}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">Subject_Protocol</label>
                  <select 
                    className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    value={formData.subject}
                  >
                    <option value="TECHNICAL_ENQUIRY">TECHNICAL_ENQUIRY</option>
                    <option value="ORDER_LOGISTICS">ORDER_LOGISTICS</option>
                    <option value="PARTNERSHIP_REQUEST">PARTNERSHIP_REQUEST</option>
                    <option value="OTHER">OTHER_SYSTEM_ISSUE</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">Data_Payload (Message)</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Enter your message here..."
                    className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm resize-none"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    value={formData.message}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-cyan-500 transition-all flex items-center justify-center gap-4 group active:scale-95"
                >
                  <Send size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  Broadcast_Signal
                </button>
              </form>
            </div>
            
            <div className="mt-8 flex justify-between items-center px-10 opacity-20">
               <span className="text-[8px] font-black uppercase tracking-widest">Encryption: AES-256-GCM</span>
               <span className="text-[8px] font-black uppercase tracking-widest">Status: Terminal_Live</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Contact;