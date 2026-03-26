import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { User, Package, Shield, LogOut, Settings, CreditCard } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        // Replace with your actual endpoints
        const userRes = await API.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } });
        setUser(userRes.data);
        
        const orderRes = await API.get("/orders/my-orders", { headers: { Authorization: `Bearer ${token}` } });
        setOrders(orderRes.data);
      } catch (err) {
        toast.error("DATA_SYNC_FAILED: Could not retrieve profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("SESSION_TERMINATED: Logged out.");
    setTimeout(() => navigate("/login"), 1000);
  };

  if (loading) return (
    <div className="bg-[#05070a] h-screen flex items-center justify-center">
      <div className="text-cyan-500 font-black tracking-[1em] animate-pulse uppercase text-xs">Accessing_User_Node...</div>
    </div>
  );

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans selection:bg-cyan-500 pb-20">
      <Navbar />
      <Toaster position="bottom-right" />

      <main className="max-w-[1600px] mx-auto px-6 lg:px-20 pt-32">
        <div className="grid grid-cols-12 gap-6">
          
          {/* 1. USER IDENTITY CARD (Large Bento) */}
          <div className="col-span-12 lg:col-span-4 bg-[#0b0f1a] border border-white/5 rounded-[3rem] p-10 flex flex-col items-center text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            
            <div className="w-32 h-32 rounded-full bg-[#111625] border-2 border-cyan-500/20 flex items-center justify-center mb-6 relative">
              <User size={48} className="text-cyan-500" />
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0b0f1a] animate-pulse"></div>
            </div>

            <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">{user?.name || "Access_User"}</h2>
            <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase mb-8">{user?.email}</p>

            <div className="w-full space-y-3">
              
              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <LogOut size={14} /> Terminate_Session
              </button>
            </div>
          </div>

          {/* 2. STATS & ACTIVITY DASHBOARD */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            
            {/* Top Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-[#111625] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-40">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active_Orders</span>
                  <div className="flex items-end justify-between">
                    <span className="text-5xl font-black italic text-cyan-500">{orders.length}</span>
                    <Package size={24} className="opacity-20" />
                  </div>
               </div>
               <div className="bg-[#111625] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-40">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Security_Level</span>
                  <div className="flex items-end justify-between">
                    <span className="text-5xl font-black italic text-cyan-500">A+</span>
                    <Shield size={24} className="opacity-20" />
                  </div>
               </div>
               <div className="bg-[#111625] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between h-40">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Tier_Status</span>
                  <div className="flex items-end justify-between">
                    <span className="text-5xl font-black italic text-cyan-500 italic">VIP</span>
                    <CreditCard size={24} className="opacity-20" />
                  </div>
               </div>
            </div>

            {/* 3. ORDER TERMINAL (Recent History) */}
            <div className="bg-[#0b0f1a] border border-white/5 rounded-[3.5rem] p-10 flex-grow shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] italic text-white/40">Order_Deployment_Logs</h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-cyan-500 border border-cyan-500/20 px-3 py-1 rounded-full">System_Stable</span>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {orders.map((order, idx) => (
                    <div key={idx} className="bg-[#05070a] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center group hover:border-cyan-500/30 transition-all">
                      <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 bg-[#111625] rounded-xl flex items-center justify-center font-black text-xs border border-white/5">#{idx + 1}</div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-white">Ref_{order._id.slice(-8)}</p>
                          <p className="text-[9px] font-bold text-gray-600 uppercase">Deployed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex gap-8 items-center w-full md:w-auto justify-between md:justify-end">
                        <span className="text-xl font-black italic tracking-tighter">₹{order.totalAmount?.toLocaleString()}</span>
                        <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-500 text-[9px] font-black uppercase tracking-widest border border-cyan-500/20">
                          {order.status || "Processing"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">No_Active_Logs_Found</p>
                  <button onClick={() => navigate("/shop")} className="mt-4 text-cyan-500 text-[9px] font-black uppercase tracking-widest hover:text-white transition-all underline decoration-cyan-500/30">Go_To_Market</button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;