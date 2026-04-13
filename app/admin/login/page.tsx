"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111] p-8 flex flex-col gap-5">
        <h1 className="text-white text-xl font-semibold">Admin Login</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full rounded-lg bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm outline-none focus:border-white/30"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-lg bg-white text-black text-sm font-medium py-2.5 hover:bg-white/90 transition-all disabled:opacity-50"
        >
          {loading ? "Checking…" : "Sign in →"}
        </button>
      </div>
    </main>
  );
}