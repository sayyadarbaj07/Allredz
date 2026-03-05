import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginUserMutation } from "../redux/Api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/Slice/authSlice";

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser] = useLoginUserMutation();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await loginUser(form).unwrap();

            if (!res.isAdmin) {
                setError("Access Denied: This login is for administrators only.");
                setLoading(false);
                return;
            }

            const token = res.token;

            localStorage.setItem("token", token);
            localStorage.setItem("role", "admin");

            dispatch(setCredentials(res));
            navigate("/dashboardlayout", { replace: true });

        } catch (err) {
            setError(err?.data?.message || "Invalid Admin Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-gray-950">
            {/* Left Decorative Panel */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#7b1d1d] via-[#4a0e0e] to-gray-950 flex-col items-center justify-center p-16 relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-red-400" />
                    <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full border border-red-300" />
                    <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-red-400 blur-2xl" />
                </div>
                <div className="relative z-10 text-center">
                    <div className="text-7xl mb-6">🌶️</div>
                    <h2 className="text-4xl font-black text-white leading-tight">Allredz Masala</h2>
                    <p className="text-red-300 mt-3 text-lg">Admin Control Center</p>
                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                        {["Orders", "Products", "Users"].map((item) => (
                            <div key={item} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <p className="text-white font-semibold text-sm">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Login Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-8">
                        <span className="text-5xl">🌶️</span>
                        <h2 className="text-2xl font-black text-white mt-2">Allredz Masala</h2>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-white">Admin Portal</h1>
                        <p className="text-gray-400 mt-1">Secure access for administrators only.</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-900/40 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                            <span className="text-red-400 text-lg mt-0.5">🔒</span>
                            <p className="text-red-300 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="admin@allredz.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition pr-12"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-xs font-medium uppercase tracking-wide"
                                >
                                    {showPass ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-red-900/40 active:scale-95 transition-all duration-200 disabled:opacity-50 text-base tracking-wide"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : "🔐 Access Dashboard"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <Link to="/" className="text-gray-400 hover:text-red-400 transition text-sm font-medium">
                            ← Back to Storefront
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
