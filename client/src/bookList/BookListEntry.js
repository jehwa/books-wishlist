import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './BookListEntry.css';


function BookListEntry(props) {
  return (
    <div className="book-container">
      <div className="book-info">
        Title: {props.book.title}
        Author: {props.book.author}
        Description: {props.book.description}
        Genre: {props.book.genre}
      </div>
      <button onClick={() => props.update(props.book.id, props.category)}>
        {props.category === 'Book List' ? '+Add' : '-Delete'}
      </button>
    </div>
  )
}

export default BookListEntry