import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { Package, Truck, Clock, CheckCircle, ArrowRight, Box } from "lucide-react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        // Ensure this matches your backend route: /api/orders/my-orders
        const res = await API.get("/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        toast.error("COMM_LINK_FAILURE: Could not retrieve logs.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return (
    <div className="bg-[#05070a] h-screen flex items-center justify-center">
      <div className="text-cyan-500 font-black tracking-[1em] animate-pulse text-xs uppercase">Scanning_Logistics_Core</div>
    </div>
  );

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans selection:bg-cyan-500 pb-20">
      <Navbar />
      <Toaster position="bottom-right" />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-20 pt-32">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Logistics_Terminal</span>
            </div>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Deployment_History</h1>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-[#111625] border border-white/5 px-6 py-4 rounded-2xl text-right">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Total_Deployments</p>
              <p className="text-2xl font-black italic text-white">{orders.length}</p>
            </div>
          </div>
        </header>

        {/* Orders List */}
        <div className="grid gap-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-[#0b0f1a] border border-white/5 rounded-[3rem] p-8 lg:p-10 hover:border-cyan-500/30 transition-all group relative overflow-hidden shadow-2xl"
              >
                {/* Subtle Background ID */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[12rem] font-black text-white/[0.02] pointer-events-none select-none italic">
                   {order._id.slice(-4)}
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
                  {/* Left Side: Identity & Items */}
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-20 h-20 bg-[#111625] rounded-3xl flex items-center justify-center border border-cyan-500/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <Box className="text-cyan-500" size={32} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-[10px] font-black bg-white/5 px-3 py-1 rounded-full text-gray-400 uppercase tracking-widest border border-white/5">
                          REF_{order._id.slice(-12)}
                        </span>
                        <span className="text-[10px] font-bold text-gray-600 uppercase">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-black italic uppercase tracking-tight mb-4">
                         {order.orderItems?.[0]?.name || "System_Asset" } 
                         {order.orderItems?.length > 1 && <span className="text-cyan-500 ml-2">+{order.orderItems.length - 1} More</span>}
                      </h2>

                      <div className="flex flex-wrap gap-2">
                        {order.status === 'Delivered' ? (
                          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-1 rounded-full text-green-500 text-[9px] font-black uppercase tracking-widest">
                            <CheckCircle size={10} /> Delivered_Success
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1 rounded-full text-cyan-500 text-[9px] font-black uppercase tracking-widest">
                            <Clock size={10} className="animate-spin-slow" /> Transit_Processing
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Financials & Actions */}
                  <div className="flex flex-col justify-between items-start lg:items-end gap-6 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">
                    <div className="lg:text-right">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-1">Transfer_Value</p>
                      <p className="text-5xl font-black italic tracking-tighter text-white">₹{order.totalAmount?.toLocaleString()}</p>
                    </div>

                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-[400px] border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Package className="text-gray-700" size={32} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest italic text-gray-500">No_Active_Deployments</h3>
              <p className="text-gray-700 text-[10px] font-bold uppercase mt-2 max-w-[200px]">The database currently holds no logistics records for this node.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;