import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCart = () => {
    API.get("/cart", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    await API.delete("/cart", {
      headers: { Authorization: `Bearer ${token}` },
      data: { productId }
    });
    fetchCart();
  };

  // Calculate Subtotal
  const subtotal = cart?.items?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-10 py-32">
        <div className="flex items-end gap-4 mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">
            Your <span className="text-gray-500">Cart</span>
          </h1>
          <span className="text-cyan-400 font-bold mb-2 tracking-widest text-xs">
            [{cart?.items?.length || 0} ITEMS]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart?.items?.length > 0 ? (
              cart.items.map(item => (
                <div key={item.product._id} className="group bg-[#0b0f1a] border border-white/5 p-6 rounded-[2rem] flex items-center gap-6 hover:border-cyan-500/30 transition-all duration-500">
                  
                  {/* Product Image Box */}
                  <div className="w-32 h-32 bg-[#161b2c] rounded-2xl flex items-center justify-center p-4 shrink-0 overflow-hidden">
                    <img 
                      src={item.product.images?.[0]} 
                      alt={item.product.title} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-black uppercase tracking-tight mb-1">{item.product.title}</h3>
                    <p className="text-cyan-400 font-bold text-sm tracking-widest mb-4">QTY: {item.quantity}</p>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => removeItem(item.product._id)}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-red-500 transition-colors"
                      >
                        [ Remove Item ]
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-2xl font-black tracking-tighter">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">₹{item.product.price.toLocaleString()} each</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-[#0b0f1a] rounded-[3rem] border border-dashed border-white/10">
                <p className="text-gray-500 uppercase tracking-widest font-bold mb-6">Your cart is empty</p>
                <Link to="/" className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-cyan-400 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111625] p-8 rounded-[2.5rem] border border-cyan-500/20 sticky top-32">
              <h2 className="text-xl font-black uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 uppercase font-bold tracking-widest">Subtotal</span>
                  <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 uppercase font-bold tracking-widest">Shipping</span>
                  <span className="text-cyan-400 font-bold uppercase tracking-widest">Free</span>
                </div>
                <div className="h-[1px] bg-white/5 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase font-black tracking-widest">Total</span>
                  <span className="text-4xl font-black tracking-tighter text-white">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-5 rounded-2xl transition-all shadow-[0_10px_20px_rgba(34,211,238,0.2)] active:scale-95 uppercase text-xs tracking-[0.2em]"
              >
                Proceed to Checkout
              </button>
              
              <p className="text-[9px] text-gray-500 text-center mt-6 uppercase tracking-widest leading-loose">
                Secure checkout powered by Electra Encryption <br />
                256-bit SSL Protected
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Cart;