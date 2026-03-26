import { Link } from "react-router-dom";

const headphoneHero = "https://img.freepik.com/premium-photo/headphones_920207-9739.jpg";

function Hero() {
  return (
    <div className="relative bg-[#0b0f1a] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -mr-40 -mt-40"></div>
      
      <div className="max-w-[1400px] mx-auto px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
        
        {/* Left: Text */}
        <div className="lg:w-1/2 z-10 text-center lg:text-left">
          <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter uppercase">
            Sound Without <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Limits.
            </span>
          </h1>
          <p className="text-gray-400 text-xl mb-10 max-w-lg mx-auto lg:mx-0">
            The new QUANTUM Elite ANC Headphones. <br />
            Wireless, Adaptive Noise Cancelling, 40-hour Battery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            
            <Link to="/shop">
            <button className="bg-white text-black font-black px-12 py-4 rounded-full hover:bg-cyan-400 transition-all duration-300 uppercase text-xs tracking-widest shadow-xl">
                Shop Now
            </button>
            </Link>
            <button className="border border-gray-700 px-10 py-4 rounded-full text-lg hover:bg-white/5 transition-all">
              Explore Features
            </button>
          </div>
        </div>

        {/* Right: The Headphone Image */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full scale-75"></div>
          <img 
            src={headphoneHero} 
            alt="Premium Headphones" 
            className="relative z-10 w-full max-w-lg h-auto object-contain scale-110 lg:scale-125 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;