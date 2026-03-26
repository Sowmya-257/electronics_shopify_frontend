import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch the actual count from the API
  useEffect(() => {
    if (token) {
      API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        // Calculate total quantity of all items in cart
        const count = res.data?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
        setCartCount(count);
      })
      .catch(() => setCartCount(0));
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-white/5 px-8 py-5">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-black transition-transform group-hover:rotate-12">
            B
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
            ByteNext
          </h1>
        </Link>

         {/* PRIMARY NAVIGATION */}
         <div className="hidden md:flex items-center gap-10">
           <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors">
             Shop_Market
           </Link>
           <Link to="/about" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors">
             About_Protocol
           </Link>
           <Link to="/contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors">
             Contact_Support
           </Link>
         </div>

        <div className="flex items-center gap-6 relative">
          

          <Link to="/cart" className="relative text-gray-400 hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            
            {/* Dynamic Cart Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-cyan-500 text-[10px] font-bold text-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="hidden sm:block text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1f2e] border border-white/5 rounded-lg shadow-lg z-50">
                {token ? (
                  // User is logged in
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a3040] transition-colors" onClick={() => setIsDropdownOpen(false)}>My Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a3040] transition-colors" onClick={() => setIsDropdownOpen(false)}>My Orders</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2a3040] transition-colors">Logout</button>
                  </>
                ) : (
                  // User is logged out
                  <>
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a3040] transition-colors" onClick={() => setIsDropdownOpen(false)}>Login</Link>
                    <Link to="/register" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a3040] transition-colors" onClick={() => setIsDropdownOpen(false)}>Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;






// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { ShoppingBag, User, Search, LogOut, Package, Info, Mail } from "lucide-react";

// function Navbar() {
//   const [cartCount, setCartCount] = useState(0);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       API.get("/cart", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(res => {
//         const count = res.data?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
//         setCartCount(count);
//       })
//       .catch(() => setCartCount(0));
//     }
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsDropdownOpen(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05070a]/70 backdrop-blur-xl border-b border-white/5 px-6 py-4">
//       <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
//         {/* BRAND LOGO */}
//         <Link to="/" className="flex items-center gap-3 group">
//           <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black transition-all group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
//             BN
//           </div>
//           <span className="text-xl font-black tracking-tighter uppercase italic text-white group-hover:text-cyan-400 transition-colors">
//             ByteNext
//           </span>
//         </Link>

//         {/* PRIMARY NAVIGATION */}
//         <div className="hidden md:flex items-center gap-10">
//           <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors">
//             Shop_Market
//           </Link>
//           <Link to="/about" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors">
//             About_Protocol
//           </Link>
//           <Link to="/contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors">
//             Contact_Support
//           </Link>
//         </div>

//         {/* ACTION TERMINAL */}
//         <div className="flex items-center gap-6">
//           <button className="text-gray-500 hover:text-cyan-400 transition-colors">
//             <Search size={18} />
//           </button>

//           <Link to="/cart" className="relative text-gray-500 hover:text-cyan-400 transition-colors">
//             <ShoppingBag size={20} />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-cyan-500 text-[8px] font-black text-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {/* PROFILE SYSTEM */}
//           <div className="relative">
//             <button 
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:border-cyan-500/50 hover:text-white transition-all focus:outline-none"
//             >
//               <User size={18} />
//             </button>

//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-4 w-56 bg-[#0b0f1a] border border-white/10 rounded-[2rem] p-2 shadow-2xl overflow-hidden backdrop-blur-2xl">
//                 {token ? (
//                   <>
//                     <Link to="/profile" className="flex items-center gap-3 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-2xl transition-all" onClick={() => setIsDropdownOpen(false)}>
//                       <User size={14} /> My_Account
//                     </Link>
//                     <Link to="/orders" className="flex items-center gap-3 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-2xl transition-all" onClick={() => setIsDropdownOpen(false)}>
//                       <Package size={14} /> Deployment_Logs
//                     </Link>
//                     <div className="h-[1px] bg-white/5 my-2 mx-4"></div>
//                     <button onClick={handleLogout} className="flex items-center gap-3 w-full px-5 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-2xl transition-all text-left">
//                       <LogOut size={14} /> Terminate_Session
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/login" className="flex items-center gap-3 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all" onClick={() => setIsDropdownOpen(false)}>Login_Access</Link>
//                     <Link to="/register" className="flex items-center gap-3 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all" onClick={() => setIsDropdownOpen(false)}>Register_Node</Link>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;