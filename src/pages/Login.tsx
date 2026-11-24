import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { AuthError } from "@supabase/supabase-js";
import { BookOpen, LockKeyhole, Mail } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    let authError: AuthError | null = null;
    setErrorMessage("");
    if (isRegistering) {
      const { error } = await supabase.auth.signUp({ email, password });
      authError = error;
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      authError = error;
    }

    if (authError) {
      setErrorMessage(authError.message);
      return;
    }
  };

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 flex items-center justify-center">
      <section className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <BookOpen size={24} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Book Tracker</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isRegistering ? "Create your account" : "Sign in to your library"}
          </p>
        </div>

        <form onSubmit={handleLoginForm} className="space-y-4">
          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <LockKeyhole
                size={18}
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete={isRegistering ? "new-password" : "current-password"}
                required
                className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer"
          >
            {isRegistering ? "Create account" : "Sign in"}
          </button>

          <p className="text-center text-sm text-slate-600">
            {isRegistering ? "Already have an account?" : "New to Book Tracker?"}{" "}
            <button
              type="button"
              onClick={() => {
                setErrorMessage("");
                setIsRegistering((prev) => !prev);
              }}
              className="font-semibold text-slate-900 underline-offset-4 hover:underline cursor-pointer"
            >
              {isRegistering ? "Sign in" : "Create account"}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
