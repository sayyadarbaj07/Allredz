import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const quickActions = [
    { label: "Shop Now", icon: "🛍️", path: "/products", color: "from-orange-500 to-red-600" },
    { label: "My Orders", icon: "📦", path: "/ordersummary", color: "from-red-600 to-rose-700" },
    { label: "View Cart", icon: "🛒", path: "/cart", color: "from-rose-500 to-pink-600" },
    { label: "Support", icon: "💬", path: "/contact", color: "from-pink-600 to-red-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef6ed] via-[#fff] to-[#fde8d8]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#7b1d1d] via-[#9b2c2c] to-[#7b1d1d] py-12 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white rounded-full" />
          <div className="absolute bottom-[-60px] left-[10%] w-80 h-80 bg-orange-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm font-semibold uppercase tracking-widest mb-1">Welcome back</p>
            <h1 className="text-4xl font-black text-white">
              {user?.name || "User"} 👋
            </h1>
            <p className="text-red-200 mt-2 text-sm">{user?.email}</p>
          </div>
          <div className="hidden md:flex w-16 h-16 bg-white/10 border-2 border-white/20 rounded-2xl items-center justify-center text-3xl">
            🌶️
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Account Info Cards */}
        <section>
          <h2 className="text-lg font-black text-gray-700 uppercase tracking-widest mb-4">My Account</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: user?.name, icon: "👤" },
              { label: "Email Address", value: user?.email, icon: "📧" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
                  <p className="text-gray-800 font-semibold mt-0.5">{item.value || "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-black text-gray-700 uppercase tracking-widest mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`group bg-gradient-to-br ${action.color} text-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-200 flex flex-col items-center gap-2`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{action.icon}</span>
                <span className="font-bold text-sm">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="bg-gradient-to-r from-[#7b1d1d] to-[#b91c1c] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <p className="text-red-200 text-sm font-semibold">Exclusive Offer 🎉</p>
            <h3 className="text-white text-2xl font-black mt-1">Fresh Spices, Delivered!</h3>
            <p className="text-red-200 text-sm mt-1">Shop our premium masala collection today.</p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-[#7b1d1d] font-black px-6 py-3 rounded-xl hover:bg-red-50 active:scale-95 transition-all shadow-md flex-shrink-0"
          >
            Shop Now →
          </button>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
