import React from "react";
import type { Book } from "../types/book";
import booksPlaceholder from "../assets/books.png";
interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <div>
      {book.cover_url ? (
        <img src={book.cover_url} alt={book.cover_url} />
      ) : (
        <div>
          <img src={booksPlaceholder} alt="books_example" />
        </div>
      )}
      <h3>Title: {book.title}</h3>
      <h4>Author: {book.author}</h4>
      <p>Reading Status: {book.status}</p>
      <p>Published Date: {book.published_date}</p>
    </div>
  );
}

export default BookCard;
