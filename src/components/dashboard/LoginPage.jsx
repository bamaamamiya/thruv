import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      // Try logging in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");  // Redirect to the dashboard if login successful
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-20 flex items-center justify-center">
  <div className="w-full max-w-md bg-zinc-900/70 border border-zinc-700 rounded-2xl p-8 shadow-xl backdrop-blur-lg">
    <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">
      🔐 Login Akun
    </h2>

    {error && (
      <div className="bg-red-500/10 text-red-400 text-sm px-4 py-2 rounded-lg mb-4 border border-red-500/30">
        {error}
      </div>
    )}

    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black font-bold text-lg py-2 rounded-lg hover:bg-gray-200 transition"
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
};

export default LoginPage;
