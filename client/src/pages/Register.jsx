import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/Api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password }).unwrap();
      navigate("/login");
    } catch (err) {
      setError(err?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1a0505] via-[#3b0d0d] to-[#6b1414]">
      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-red-800 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 bg-orange-600 opacity-20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <span className="text-3xl">🌶️</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h1>
          <p className="text-red-200 mt-1 text-sm">Join Allredz Masala today.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          {error && (
            <div className="mb-5 bg-red-500/20 border border-red-400/40 rounded-xl p-3">
              <span className="text-red-300 text-sm font-medium">⚠️ {error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-red-100 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-red-100 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-red-100 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-400 transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-300 hover:text-white transition text-sm"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-60 text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-red-200 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-white font-bold hover:text-red-300 transition underline underline-offset-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
