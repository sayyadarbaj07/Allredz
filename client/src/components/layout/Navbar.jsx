import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Load and listen for cart changes
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(count);
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    // Also check on focuses/navigates
    window.addEventListener("focus", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("focus", updateCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-[#8b1c1c] text-white p-4 sticky top-0 z-50 shadow-lg font-sans">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
          <span className="bg-white text-[#8b1c1c] px-2 py-0.5 rounded-lg not-italic shadow-sm">A</span>
          ALLREDZ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center font-bold tracking-wide">
          <Link to="/" className="text-sm uppercase hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/products" className="text-sm uppercase hover:text-yellow-400 transition-colors">Products</Link>
          <Link to="/about" className="text-sm uppercase hover:text-yellow-400 transition-colors">About</Link>

          {/* Premium Cart Icon */}
          <Link to="/cart" className="relative group p-2 hover:bg-white/10 rounded-xl transition-all">
            <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#8b1c1c] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#8b1c1c] shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>

          {token ? (
            <div className="flex items-center gap-4 ml-2 pl-6 border-l border-white/20">
              <button
                onClick={() => navigate(role === "admin" ? "/dashboardlayout" : "/user-dashboard")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              >
                {role === "admin" ? <LayoutDashboard size={18} /> : <User size={18} />}
                {role === "admin" ? "Admin" : "Profile"}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-xl text-red-200 hover:text-white transition-all text-sm uppercase "
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-[#8b1c1c] px-6 py-2 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all shadow-lg active:scale-95"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative p-2">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#8b1c1c] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#8b1c1c]">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#7a1818] rounded-2xl mt-4 p-4 flex flex-col space-y-2 border border-white/10 shadow-2xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-3 font-bold hover:bg-white/10 rounded-xl transition-colors">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="px-4 py-3 font-bold hover:bg-white/10 rounded-xl transition-colors">Products</Link>

          <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
            {!token ? (
              <Link to="/login" onClick={() => setIsOpen(false)} className="bg-white text-[#8b1c1c] py-4 text-center rounded-xl font-black uppercase tracking-widest">Login</Link>
            ) : (
              <>
                <button
                  onClick={() => { setIsOpen(false); navigate(role === "admin" ? "/dashboardlayout" : "/user-dashboard"); }}
                  className="bg-yellow-500 text-black py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="border border-white/20 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
