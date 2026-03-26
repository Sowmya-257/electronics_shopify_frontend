import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch cart one last time to show the total
    API.get("/cart", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCart(res.data));
  }, [token]);

  const subtotal = cart?.items?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await API.post(
        "/orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // You could redirect to a "Success" page here
      alert("Order placed successfully!");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-10 py-32">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">
            Secure <span className="text-gray-500">Checkout</span>
          </h1>
          <div className="h-1 w-20 bg-cyan-500 mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Information Forms */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">01. Shipping Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-[#0b0f1a] border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none transition-all" />
                <input type="text" placeholder="Last Name" className="bg-[#0b0f1a] border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none transition-all" />
                <input type="text" placeholder="Address" className="col-span-2 bg-[#0b0f1a] border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none transition-all" />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">02. Payment Method</h2>
              <div className="bg-[#111625] border border-cyan-500/30 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-4 h-4 rounded-full border-4 border-cyan-500 bg-black"></div>
                <span className="text-sm font-bold uppercase tracking-widest">Pay on Delivery / Digital Wallet</span>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">03. Review Items</h2>
              <div className="space-y-4">
                {cart?.items?.map(item => (
                  <div key={item.product._id} className="flex items-center gap-4 bg-[#0b0f1a]/50 p-3 rounded-xl border border-white/5">
                    <img src={item.product.images?.[0]} alt="" className="w-12 h-12 object-contain bg-[#161b2c] rounded-lg" />
                    <div className="flex-grow">
                      <p className="text-[10px] font-black uppercase truncate w-40">{item.product.title}</p>
                      <p className="text-[10px] text-gray-500 font-bold">QTY: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-black">₹{item.product.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="relative">
            <div className="sticky top-32 bg-gradient-to-b from-[#111625] to-[#05070a] border border-white/10 p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-center">Order Summary</h3>
              
              <div className="space-y-4 mb-10 text-sm">
                <div className="flex justify-between text-gray-400 uppercase font-bold tracking-widest text-[10px]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 uppercase font-bold tracking-widest text-[10px]">
                  <span>Shipping Cost</span>
                  <span className="text-cyan-400">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400 uppercase font-bold tracking-widest text-[10px]">
                  <span>Tax (GST)</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="border-t border-white/5 pt-6 mt-6 flex justify-between items-end">
                  <span className="font-black uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-4xl font-black tracking-tighter text-cyan-400">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={placeOrder}
                disabled={loading || cart?.items?.length === 0}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl
                  ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-cyan-500 hover:shadow-cyan-500/20 active:scale-95'}
                `}
              >
                {loading ? "Processing..." : "Confirm & Place Order"}
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-[9px] text-gray-500 uppercase font-bold tracking-widest">
                <svg className="w-3 h-3 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                AES-256 Bit Secure Encryption
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Checkout;