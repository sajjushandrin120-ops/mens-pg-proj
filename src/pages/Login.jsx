// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(form.email, form.password);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center px-4">
      <div className="bg-[#1A1F2B] border border-[#252B38] rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-white text-2xl font-bold mb-1">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-6">Sign in to your Zion PG account</p>

        {error && (
          <p className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#0A0C10] border border-[#252B38] rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/60"
              placeholder="admin@zionpg.com"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-1.5">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-[#0A0C10] border border-[#252B38] rounded px-3 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/60"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 transition mt-2"
          >
            Login
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-4">
          Hint: admin@zionpg.com / zion123
        </p>
      </div>
    </div>
  );
}

export default Login;