import React from 'react';
import './BookListEntry.css';
import { Draggable } from 'react-beautiful-dnd';


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
            <p>
              <strong> Title: </strong>
              {props.book.title}
            </p>
          </div>
          <button className="add-delete" onClick={() => props.listUpdate(props.columnId, props.book.id, props.index)}>
            {(props.columnId === 'column-1') ? '+ Add' : '- Remove'}
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default BookListEntry
