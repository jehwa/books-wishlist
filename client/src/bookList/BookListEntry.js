import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


function BookListEntry(props) {
  return (
    <div>
      {props.book.title}
      <button onClick={() => props.update(props.book.id, props.category)}>
      +Add
       </button>
    </div>
  )
}

export default BookListEntry