import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { AuthError } from "@supabase/supabase-js";
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
    <div>
      <form onSubmit={handleLoginForm}>
        {errorMessage && <p>{errorMessage}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">{isRegistering ? "Sign Up" : "Sign In"}</button>
        <button type="button" onClick={() => setIsRegistering((prev) => !prev)}>
          {isRegistering ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
