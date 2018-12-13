import React, { Component } from 'react';
import './App.css';

import BookList from './bookList/BookList';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: 'Jehwa Shin',
      books: null
    }
    this.setBooks = this.setBooks.bind(this);
    this.update = this.update.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.getBooks();
  }

  setBooks(books) {
    this.setState({
      books: books
    })
  }

  getBooks() {
    axios.get('/books')
      .then((data) => this.setBooks(data.data))
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

  onDragEnd(result) {
    // console.log(result);
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if(
      // dnd at the same position
      destination.droppableId === source.droppableId &&
      destination.index === source.index
      ) {
        return;
      }
      
      // const column = this.state.books.columns[source.droppableId];
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

  render() {
    if(this.state.books) {
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="App">
            <h1>
              Welcome to {this.state.username}'s books wishlist
            </h1>
            <div className="books">
              {this.state.books.columnOrder.map(columnId => {
                const column = this.state.books.columns[columnId];
                const books = column.bookIds.map(bookId => this.state.books.books[bookId])

                return <BookList key={column.id} column={column} books={books} />
                })
              }
            </div>
          </div>
        </DragDropContext>
      );
    } else {
      return (
        <div className="App">
          <h1>
            Welcome to {this.state.username}'s books wishlist
          </h1>
        </div>
      )
    }
  }
}

export default App;

  // {/* // {Object.keys(this.state.books).map((colName, index) => 
  // //   <BookList 
  // //   column={colName} 
  // //   books={this.state.books[colName]} 
  // //   key={index}
  // //   update={this.update.bind(this)}/>)} */}