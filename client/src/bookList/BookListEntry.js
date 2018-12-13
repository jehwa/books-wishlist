import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './BookListEntry.css';


function BookListEntry(props) {
  return (
    <Draggable draggableId={props.book.id} index={props.index}>
      {(provided) => (
        <div className="book-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="book-info">
            Title: {props.book.title}
            {/* Author: {props.book.author}
            Description: {props.book.description}
            Genre: {props.book.genre} */}
          </div>
          <button onClick={() => props.listUpdate(props.columnId, props.book.id, props.index)}>
            {(props.columnId === 'column-1') ? '+Add' : '-Remove'}
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default BookListEntry