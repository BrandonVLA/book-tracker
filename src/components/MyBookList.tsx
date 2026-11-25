import React from 'react'
import BookCard from './BookCard'
import type { Book } from '../types/book'

interface MyBookListProps {
    books: Book[],
}

function MyBookList({books}: MyBookListProps) {

  return (
    <div>
      {books.length > 0 ? (books.map((book: Book) => (
        <BookCard
        key={book.id}
        book={book}
        />
      ))) :  'No books added yet. Start now!'}
    </div>
  )
}

export default MyBookList
