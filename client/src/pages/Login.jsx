import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginUserMutation } from "../redux/Api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/Slice/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(form).unwrap();
      const token = res.token;
      const isAdmin = res.isAdmin;
      localStorage.setItem("token", token);
      localStorage.setItem("role", isAdmin ? "admin" : "user");
      dispatch(setCredentials(res));
      if (isAdmin) {
        navigate("/dashboardlayout", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }
    } catch (err) {
      setError(err?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1a0505] via-[#3b0d0d] to-[#6b1414]">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-red-800 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 bg-orange-600 opacity-20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <span className="text-3xl">🌶️</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Allredz Masala</h1>
          <p className="text-red-200 mt-1 text-sm">Welcome back! Please sign in.</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          {error && (
            <div className="mb-5 bg-red-500/20 border border-red-400/40 rounded-xl p-3 flex items-center gap-2">
              <span className="text-red-300 text-sm font-medium">⚠️ {error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-red-100 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-red-100 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition backdrop-blur-sm pr-12"
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
              className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-red-900/50 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-red-200 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-white font-bold hover:text-red-300 transition underline underline-offset-2">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
