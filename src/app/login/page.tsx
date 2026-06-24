"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/layout/Logo";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Credenciales incorrectas");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="justify-center" />
          <p className="text-warm-black/50 mt-4 text-sm">Panel de administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-sm border border-warm-black/5 space-y-5"
        >
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-warm-black mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-warm-black/10 focus:outline-none focus:ring-2 focus:ring-mustard/50 focus:border-mustard transition-colors"
              placeholder="admin@landbienesraices.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-black mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-warm-black/10 focus:outline-none focus:ring-2 focus:ring-mustard/50 focus:border-mustard transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mustard text-warm-black py-3 rounded-xl font-semibold hover:bg-mustard-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-warm-black/40">
          <Link href="/" className="hover:text-mustard transition-colors">
            ← Volver al sitio
          </Link>
        </p>
      </div>
    </div>
  );
}