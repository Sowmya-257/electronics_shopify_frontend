import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginToast = toast.loading("AUTHENTICATING_CREDENTIALS...");

    try {
      const res = await API.post("/auth/login", { email, password });
      
      // Store token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("ACCESS_GRANTED: Welcome back.", { id: loginToast });
      
      // Navigate to home or shop after a brief delay
      setTimeout(() => navigate("/shop"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "ACCESS_DENIED: Invalid Credentials", { id: loginToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans selection:bg-cyan-500">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <main className="flex items-center justify-center px-6 pt-32 pb-20">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-[450px] relative z-10">
          <div className="bg-[#0b0f1a] border border-white/5 rounded-[3rem] p-12 shadow-2xl backdrop-blur-xl">
            
            {/* Header */}
            <div className="text-center mb-10">
              
              <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                User_Login
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">
                  Identify (Email)
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm placeholder:text-gray-700"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">
                  Access_Key (Password)
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm placeholder:text-gray-700"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all mt-4
                  ${loading 
                    ? "bg-gray-800 text-gray-600 cursor-wait" 
                    : "bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-95"
                  }`}
              >
                {loading ? "Verifying..." : "Initialize_Access"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-10 text-center border-t border-white/5 pt-8">
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                New to the network?{" "}
                <Link to="/register" className="text-cyan-500 hover:text-white transition-colors ml-1">
                  Create_Account
                </Link>
              </p>
            </div>

          </div>
          
          {/* Subtle bottom detail */}
          <div className="mt-8 flex justify-between items-center px-8 opacity-20">
             <span className="text-[8px] font-black uppercase tracking-widest">ByteNext_OS v3.0</span>
             <div className="flex gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;