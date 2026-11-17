import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";

function App() {
  const [status, setStatus] = useState<string>(
    "Verificando conexion con Supabase...",
  );

  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }
        console.log("Datos de sesion de Supabase: ", data);
        setStatus("Conexion exitosa con Supabase! 🚀");
      } catch (error: any) {
        setStatus(`Error de conexion: {error.message}`);
      }
    }
    checkConnection();
  }, []);
  return (
    <>
      <h1>BookTracker-MVP</h1>
      <p>{status}</p>
    </>
  );
}

export default App;
