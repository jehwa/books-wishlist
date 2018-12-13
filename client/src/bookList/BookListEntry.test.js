import React from 'react';
import ReactDOM from 'react-dom';
import BookListEntry from './BookListEntry';
import { DragDropContext } from 'react-beautiful-dnd';
import { booksList } from '../__mock__/mockTestData';

const mockColumnId = 'columnone'
const mockIndex = 1;

it('renders booklist entry without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DragDropContext onDragEnd={() => {}}>
      <BookListEntry book={booksList[0]} columnId={mockColumnId} index={mockIndex}/>
    </DragDropContext>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});


