// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { Link } from "react-router-dom";

// function Home() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     API.get("/products").then(res => setProducts(res.data.products));
//   }, []);

//   return (
//     <div className="bg-[#0b0f1a] min-h-screen text-white font-sans">
//       <Navbar />
//       <Hero />

//       <main className="max-w-[1400px] mx-auto px-8 py-16">
//         <h2 className="text-3xl font-bold mb-12 tracking-tight uppercase border-l-4 border-cyan-400 pl-4">
//           Featured Products
//         </h2>

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
//           {products.map((p) => (
//             <div key={p._id} className="bg-[#161b2c] p-6 rounded-[2.5rem] border border-gray-800 transition-all hover:border-cyan-500/50 group flex flex-col shadow-2xl">
              
//               {/* Product Image Container */}
//               <div className="bg-[#1c2336] rounded-[2rem] flex items-center justify-center mb-6 overflow-hidden aspect-square relative">
//                 <img
//                   src={p.images?.[0]}
//                   alt={p.title}
//                   className="h-3/4 w-3/4 object-contain transition-transform duration-700 group-hover:scale-110"
//                   onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Electronics"; }}
//                 />
//               </div>

//               {/* Text details (This was missing in your screenshot) */}
//               <div className="px-2 flex-grow mb-6">
//                 <h3 className="text-lg font-extrabold uppercase tracking-wide truncate mb-1">
//                   {p.title}
//                 </h3>
//                 <div className="flex text-yellow-400 text-xs mb-3">★★★★★</div>
//                 <p className="text-2xl font-black text-white">₹{p.price.toLocaleString()}</p>
//               </div>

//               {/* Action Button */}
//               <Link to={`/product/${p._id}`}>
//                 <button className="bg-[#46b3e6] hover:bg-cyan-400 text-black font-extrabold w-full py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(70,179,230,0.2)] uppercase text-sm tracking-widest">
//                   Add to Cart
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Home;








import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import Features from "../components/Features";
import CategoryHub from "../components/CategoryHub";
import TrustSection from "../components/TrustSection";
import Footer from "../components/Footer";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data.products));
  }, []);

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans selection:bg-pink-500">
      <Navbar />
      <Hero />
      <Features />
      <CategoryHub />
      <TrustSection />
      <Footer />
    </div>
  );
}

export default Home;