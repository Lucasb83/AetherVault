"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin/editor");
    } else {
      setError("Contraseña incorrecta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-bg-card border border-line rounded-2xl p-8 space-y-4"
      >
        <h1 className="font-serif text-2xl mb-2">Panel admin</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoFocus
          className="w-full bg-bg-soft border border-line rounded-lg px-4 py-2.5 outline-none focus:border-accent/50"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full bg-accent text-white font-semibold rounded-lg py-2.5 hover:bg-accent-glow transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
