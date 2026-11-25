import React, { useState, useEffect } from "react";
import type { Book } from "../types/book";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import MyBookList from "../components/MyBookList";

function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    setError(null);
    const fetchBooks = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) {
          setError(error.message);
        } else {
          setBooks((data as Book[]) ?? []);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong loading your books...",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [user]);
  return (
  <div>
    <section>
        {/* Conditional States */}
        {isLoading && <p>Placing your Books on the Library...</p>}
        {error && !isLoading && <p>Error ID:{error}</p>}
        {books.length === 0 && !isLoading && !error && <p>Add your First Book to your Library :)</p>}
        {/* MyBookList Component */}
        <MyBookList books={books}/>
    </section>
  </div>
  );
}

export default Dashboard;
