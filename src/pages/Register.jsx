import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const registerToast = toast.loading("PROVISIONING_NEW_USER...");

    try {
      await API.post("/auth/register", formData);
      
      toast.success("ACCOUNT_CREATED: Access Granted.", { id: registerToast });
      
      // Redirect to login after successful registration
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "REGISTRATION_FAILED: System Error", { id: registerToast });
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-[500px] relative z-10">
          <div className="bg-[#0b0f1a] border border-white/5 rounded-[3.5rem] p-10 lg:p-14 shadow-2xl backdrop-blur-xl">
            
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                Create_Account
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">
                  Full_Legal_Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm placeholder:text-gray-700"
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">
                  Communication_Address (Email)
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm placeholder:text-gray-700"
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4">
                  Encryption_Key (Password)
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500/50 outline-none transition-all text-sm placeholder:text-gray-700"
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all mt-6
                  ${loading 
                    ? "bg-gray-800 text-gray-600 cursor-wait" 
                    : "bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] active:scale-95"
                  }`}
              >
                {loading ? "Initializing..." : "Register_Network_User"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-12 text-center border-t border-white/5 pt-8">
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                Already registered?{" "}
                <Link to="/login" className="text-cyan-500 hover:text-white transition-colors ml-1">
                  Access_Terminal
                </Link>
              </p>
            </div>

          </div>
          
          {/* Decorative Elements */}
          <div className="mt-8 flex justify-between items-center px-10 opacity-30">
             <div className="flex gap-4">
                <span className="text-[8px] font-black uppercase">Secure</span>
                <span className="text-[8px] font-black uppercase">Encrypted</span>
             </div>
             <span className="text-[8px] font-black uppercase tracking-widest">ByteNext_Systems_v3.0</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;