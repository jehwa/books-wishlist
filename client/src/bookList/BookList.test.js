import React from 'react';
import ReactDOM from 'react-dom';
import BookList from './BookList';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialMockData, booksList } from '../__mock__/mockTestData';

it('renders booklist without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DragDropContext onDragEnd={()=>{}}>
      <BookList column={initialMockData.columns['column-1']} books={booksList}/>
    </DragDropContext>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});
