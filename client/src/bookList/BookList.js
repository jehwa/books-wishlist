import React from 'react';
import './BookList.css';
import { Droppable } from 'react-beautiful-dnd';

import BookListEntry from './BookListEntry';

function BookList(props) {
  return (
    <div className="list-container">
      <h3>
        {props.column.title}
      </h3>
      <Droppable droppableId={props.column.id}>
        
        {(provided, snapshot) => (
          <div 
            className="book-list-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.books.map((book, index) =>
              <BookListEntry
              columnId={props.column.id}
              key={book.id}
              index={index}
              book={book}
              listUpdate={props.listUpdate}
              />
            )}
            {provided.placeholder}
          </div>
        )}

      </Droppable>
    </div>   
  )
}

export default BookList


// {/* {Object.keys(props.books).map((bookId, index) => 
//   <BookListEntry 
//   key={bookId} 
//   index={index}
//   book={props.books[bookId]}
//   category={props.column} 
//   update={props.update}/>
//   )
// } */}