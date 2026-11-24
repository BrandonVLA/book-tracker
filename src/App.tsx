import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

// Placeholder pages until we build the real views
function LoginPage() {
  const { user } = useAuth();

  // Send already signed-in users straight to their library
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <div>Login and Register Page</div>;
}

function LibraryPage() {
  return <div>Virtual Library</div>;
}

function RecommendationsPage() {
  return <div>Reading Recommendations</div>;
}

function App() {
  // const [status, setStatus] = useState<string>(
  //   "Verificando conexion con Supabase...",
  // );

  // useEffect(() => {
  //   async function checkConnection() {
  //     try {
  //       const { data, error } = await supabase.auth.getSession();

  //       if (error) {
  //         throw error;
  //       }
  //       console.log("Datos de sesion de Supabase: ", data);
  //       setStatus("Conexion exitosa con Supabase! 🚀");
  //     } catch (error: any) {
  //       setStatus(`Error de conexion: ${error.message}`);
  //     }
  //   }
  //   checkConnection();
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LibraryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <RecommendationsPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
