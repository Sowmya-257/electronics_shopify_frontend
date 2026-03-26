import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for API Parameters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  // Fetch data whenever filters change
  useEffect(() => {
    setLoading(true);
    // Building the query string based on your API structure
    const query = `/products?search=${search}&category=${category}&sort=${sort}&page=${page}`;
    
    API.get(query)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, category, sort, page]);

  return (
    <div className="bg-[#05070a] min-h-screen text-white font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-10 py-32">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">
            Market<span className="text-gray-500 font-medium">Place</span>
          </h1>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by model or brand..."
              className="w-full bg-[#0b0f1a] border border-white/10 rounded-2xl py-4 px-6 focus:border-cyan-500 outline-none transition-all text-xs tracking-widest uppercase"
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute right-5 top-4 opacity-30">🔍</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDEBAR: ADVANCED FILTERS */}
          <aside className="w-full lg:w-72 space-y-10">
            
            {/* 1. Category Filter */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-cyan-400">Category</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {["", "Mobile", "Laptops", "Audio", "Accessories"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {setCategory(cat); setPage(1);}}
                    className={`text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                      category === cat 
                      ? "bg-cyan-500 border-cyan-500 text-black shadow-lg shadow-cyan-500/20" 
                      : "border-white/5 hover:border-white/20 text-gray-400"
                    }`}
                  >
                    {cat === "" ? "All Products" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Sorting Options */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-cyan-400">Sort By</h3>
              <select 
                className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl p-3 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-cyan-500"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* 3. Status Box */}
            <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem]">
              <p className="text-[9px] font-black uppercase tracking-widest text-cyan-400 mb-2">Inventory Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">All Items Authentic</span>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: PRODUCT GRID */}
          <div className="flex-grow">
            {loading ? (
              <div className="h-96 flex items-center justify-center text-cyan-500 font-black animate-pulse uppercase tracking-[0.5em]">
                Loading Gear...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.length > 0 ? products.map((p) => (
                  <Link 
                    to={`/product/${p._id}`} 
                    key={p._id} 
                    className="group bg-[#0b0f1a] border border-white/5 rounded-[2.5rem] overflow-hidden transition-all hover:-translate-y-2 hover:border-cyan-500/30"
                  >
                    <div className="h-64 bg-[#111625] flex items-center justify-center p-10">
                      <img src={p.images?.[0]} alt="" className="h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xs font-black uppercase tracking-widest truncate w-40">{p.title}</h3>
                        <span className="text-[8px] bg-white/5 px-2 py-1 rounded text-gray-500 font-bold uppercase">{p.category}</span>
                      </div>
                      <p className="text-3xl font-black tracking-tighter italic">₹{p.price?.toLocaleString()}</p>
                      <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500 transition-all">
                        View Product
                      </button>
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-full py-20 text-center text-gray-600 uppercase font-black tracking-widest">
                    No products found matching your search.
                  </div>
                )}
              </div>
            )}
            
            {/* Pagination Controls */}
            <div className="mt-16 flex justify-center gap-4">
               <button 
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className="px-6 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 disabled:opacity-20"
                disabled={page === 1}
               >
                 Prev
               </button>
               <span className="flex items-center px-4 font-black text-cyan-400 italic">0{page}</span>
               <button 
                onClick={() => setPage(prev => prev + 1)}
                className="px-6 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5"
               >
                 Next
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Shop;