import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // admin / user

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully!");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-[#7b1d1d] text-white px-8 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div
        className="text-2xl font-extrabold tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        Allredz
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 font-medium">
        <li>
          <button
            onClick={() => navigate("/")}
            className="hover:text-yellow-400 transition"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-yellow-400 transition"
          >
            Products
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/about")}
            className="hover:text-yellow-400 transition"
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/contact")}
            className="hover:text-yellow-400 transition"
          >
            Contact
          </button>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-3xl" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-[#7b1d1d] flex flex-col items-center gap-6 py-6 md:hidden z-50 font-medium shadow-lg">
          <li>
            <button
              onClick={() => navigate("/")}
              className="hover:text-yellow-400 transition"
            >
              Home
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/products")}
              className="hover:text-yellow-400 transition"
            >
              Products
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/about")}
              className="hover:text-yellow-400 transition"
            >
              About
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-yellow-400 transition"
            >
              Contact
            </button>
          </li>

          {token && (
            <li>
              <button
                onClick={() => navigate(role === "admin" ? "/dashboardlayout" : "/user-dashboard")}
                className="hover:text-yellow-400 transition"
              >
                Dashboard
              </button>
            </li>
          )}

          {/* Mobile Login / Logout */}
          {!token ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </ul>
      )}

      {/* Desktop Right Section */}
      <div className="hidden md:flex gap-4 items-center">
        {token && (
          <button
            onClick={() => navigate(role === "admin" ? "/dashboardlayout" : "/user-dashboard")}
            className="hover:text-yellow-400 transition font-medium mr-4"
          >
            Dashboard
          </button>
        )}
        {!token ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
