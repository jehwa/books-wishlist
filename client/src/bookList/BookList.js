import React from 'react';
import './BookList.css';
import { Droppable } from 'react-beautiful-dnd';

import BookListEntry from './BookListEntry';

function BookList(props) {
  return (
    <div className="list-container">
      <h3>
        {props.column}
      </h3>
      <div>
        {Object.keys(props.books).map((bookId, index) => 
          <BookListEntry 
          key={bookId} 
          index={index}
          book={props.books[bookId]}
          category={props.column} 
          update={props.update}/>
          )
        }
      </div>
    </div>   
  )
}

export default BookList