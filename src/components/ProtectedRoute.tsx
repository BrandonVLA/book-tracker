import { use, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Read current session state from AuthContext
  const { user, loading } = useAuth();

  // Wait until supabase finishes checking the initial session
  if (loading) {
    return <div> Loading Session...</div>;
  }

  // Redirect unauthenticated visitors to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to private views when authenticated
  return <>{children}</>;
}

export default ProtectedRoute;
