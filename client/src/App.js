import React, { Component } from 'react';
import './App.css';

import BookList from './bookList/BookList';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Jehwa Shin',
      books: null
    }
    this.update = this.update.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.clearWishList = this.clearWishList.bind(this);
    this.listUpdate = this.listUpdate.bind(this);
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    axios.get('/books')
      .then(res => this.setState({books: res.data}))
      .catch(err => {throw err})
  }

  update(bookId, from){
    const to = (from === 'Book List') ? 'Wish List' : 'Book List';
    const currentBooks = this.state.books;
    const book = this.state.books[from][bookId];

    delete currentBooks[from][bookId];
    currentBooks[to][bookId] = book;

    this.setState({
      books: currentBooks
    })
  }

  listUpdate(colId, bookId, indexFrom) {
    const from = colId;
    const to = colId === 'column-1' ? 'column-2' : 'column-1';
  
    const fromColumn = this.state.books.columns[from];
    const toColumn = this.state.books.columns[to];
  
    const newFromBookIds = Array.from(fromColumn.bookIds);
    newFromBookIds.splice(indexFrom, 1);
    
    const newToBookIds = Array.from(toColumn.bookIds);
    newToBookIds.unshift(bookId);
  
    const newfromColumn = {
      ...fromColumn,
      bookIds: newFromBookIds
    }
  
    const newToColumn = {
      ...toColumn,
      bookIds: newToBookIds
    }
  
    const newBookState = {
      ...this.state.books,
      columns: {
        ...this.state.books.columns,
        [from]: newfromColumn,
        [to]: newToColumn
      }
    }
  
    this.setState({ books: newBookState });

  }

  onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
      ) {
        return;
      }
      
      const start = this.state.books.columns[source.droppableId];
      const finish = this.state.books.columns[destination.droppableId];

      if(start === finish) {
        const newBookIds = Array.from(start.bookIds);
        newBookIds.splice(source.index, 1);
        newBookIds.splice(destination.index, 0, draggableId);
  
        const newColumn = {
          ...start,
          'bookIds': newBookIds
        }
  
        const newBookState = {
          ...this.state.books,
          columns: {
            ...this.state.books.columns,
            [newColumn.id]: newColumn
          }
        }
  
        this.setState({books: newBookState});
        return;
      }

      const startBookIds = Array.from(start.bookIds);
      startBookIds.splice(source.index, 1);
      const newStart = {
        ...start,
        bookIds: startBookIds,
      }

      const finishBookIds = Array.from(finish.bookIds);
      finishBookIds.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        bookIds: finishBookIds
      }

      const newBookState = {
        ...this.state.books,
        columns: {
          ...this.state.books.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      this.setState({books: newBookState});
  }

  clearWishList() {

    const bookColumn = this.state.books.columns['column-1'];
    const wishColumn = this.state.books.columns['column-2']
    const currentBookList = bookColumn.bookIds;
    const currentWishList = wishColumn.bookIds;
    const wholeBookList = [...currentWishList, ...currentBookList];
    
    const newBookColumn = {
      ...bookColumn,
      bookIds: wholeBookList
    }

    const newWishColumn = {
      ...wishColumn,
      bookIds: []
    }

    const newBookState = {
      ...this.state.books,
      columns: {
        ...this.state.books.columns,
        'column-1': newBookColumn,
        'column-2': newWishColumn
      }
    }

    this.setState({
      books: newBookState
    })

  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <h1>
            Welcome to {this.state.username}'s books wishlist
          </h1>
          <button onClick={this.clearWishList}> Clear Wish List! </button>
          { this.state.books ? (
            <div className="books">
              {this.state.books.columnOrder.map(columnId => {
                const column = this.state.books.columns[columnId];
                const books = column.bookIds.map(bookId => this.state.books.books[bookId])

                return <BookList 
                  key={column.id} 
                  column={column} 
                  books={books} 
                  listUpdate={this.listUpdate}
                  />
                })
              }
            </div>
          ) : (<h5> Loading... </h5>)}
        </div>
      </DragDropContext>
    )
  }
}

export default App;
