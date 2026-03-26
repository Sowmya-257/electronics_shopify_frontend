import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast"; // 1. Import Toast

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    }).catch(() => {
      toast.error("SYSTEM_ERROR: Failed to fetch core assets."); // 2. Error toast
      setLoading(false);
    });
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("AUTH_REQUIRED: Please login to continue."); // 3. Auth toast
      return navigate("/login");
    }

    setIsAdding(true);
    const loadingToast = toast.loading("INITIALIZING_TRANSFER..."); // 4. Loading toast

    try {
      await API.post("/cart", { productId: id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      
      toast.success("ASSET_DEPLOYED: Success!", { id: loadingToast }); // 5. Success toast
      
      // Small delay before navigation for better UX
      setTimeout(() => navigate("/cart"), 1000);
    } catch (err) {
      toast.error("TRANSFER_DENIED: Sync failed.", { id: loadingToast }); // 6. Fail toast
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return (
    <div className="bg-[#05070a] h-screen flex items-center justify-center">
      <div className="text-cyan-500 font-black tracking-[1em] animate-pulse">LOADING_CORE_ASSETS</div>
    </div>
  );

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans selection:bg-cyan-500 pb-20">
      <Navbar />
      
      {/* 7. Toaster Component (Customized for your theme) */}
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#0b0f1a',
          color: '#22d3ee',
          border: '1px solid rgba(34,211,238,0.2)',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '900',
          letterSpacing: '0.1em'
        }
      }} />

      <main className="max-w-[1600px] mx-auto px-6 lg:px-20 pt-32">
        <div className="grid grid-cols-12 gap-6">
          
          {/* 1. HERO IMAGE CARD (Full Card Display) */}
          <div className="col-span-12 lg:col-span-7 bg-[#0b0f1a] rounded-[3rem] border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[600px] group shadow-2xl">
            {/* The image now fills the space gracefully */}
            <img 
              src={product.images?.[0]} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" 
              alt={product.title}
            />
            
            {/* Gradient Overlay for that high-end look */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent opacity-80"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center p-12 h-full w-full">
                {/* Floating labels over image */}
                <div className="absolute top-10 left-10 flex items-center gap-2">
                   <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_cyan]"></div>
                   <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase italic">Live Feed</span>
                </div>
            </div>
          </div>

          {/* 2. COMMAND CENTER */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#111625] rounded-[3rem] border border-cyan-500/10 p-10 flex flex-col justify-between h-full shadow-2xl backdrop-blur-md">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Hardware / {product.category}</span>
                  <div className="bg-cyan-500 text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(34,211,238,0.3)]">In Stock</div>
                </div>
                <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8">
                  {product.title}
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-10 italic border-l-2 border-white/5 pl-6">
                  {product.description || "Optimized for peak performance and extreme thermal efficiency."}
                </p>
              </div>

              <div className="flex items-end justify-between border-t border-white/5 pt-8">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Unit Valuation</span>
                  <span className="text-6xl font-black tracking-tighter italic text-cyan-400">₹{product.price?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Interaction Box */}
            <div className="bg-[#0b0f1a] rounded-[3rem] border border-white/5 p-8 flex flex-col sm:flex-row gap-4 items-center shadow-xl">
               <div className="flex bg-[#05070a] border border-white/10 rounded-2xl p-2 h-16 w-full sm:w-auto items-center">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 font-black text-xl hover:text-cyan-400 transition-colors">–</button>
                  <span className="w-12 text-center font-black">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-12 font-black text-xl hover:text-cyan-400 transition-colors">+</button>
               </div>
               
               <button 
                onClick={addToCart}
                disabled={isAdding}
                className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all 
                  ${isAdding ? 'bg-gray-800 text-gray-600' : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-95'}
                `}
               >
                 {isAdding ? "STREAMING..." : "DEPLOY TO CART"}
               </button>
            </div>
          </div>

          {/* 3. TECHNICAL SPECS */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
             {[
               { label: "Warranty", val: "24 Months" },
               { label: "Delivery", val: "Global Priority" },
               { label: "Material", val: "Aerospace Grade" },
               { label: "Security", val: "End-to-End" }
             ].map((spec, i) => (
               <div key={i} className="bg-[#0b0f1a] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center group hover:border-cyan-500/30 transition-all cursor-default">
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">{spec.label}</span>
                  <p className="text-xs font-black uppercase tracking-widest text-white group-hover:text-cyan-400">{spec.val}</p>
               </div>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Product;