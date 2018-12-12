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
      books: {}
    }
    this.setBooks = this.setBooks.bind(this);
    this.update = this.update.bind(this);
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
    let to = from === 'Book List' ? 'Wish List' : 'Book List';
    let currentBooks = this.state.books;
    let book = this.state.books[from][bookId];

    delete currentBooks[from][bookId];
    currentBooks[to][bookId] = book;

    this.setState({
      books: currentBooks
    })
  }

  onDragEnd(result) {
    //TODO: reorder each colum; bookList and wishList
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <h1>
            Welcome to {this.state.username}'s books wishlist
          </h1>
          <div className="books">
            {Object.keys(this.state.books).map((colName, index) => 
              <BookList 
              column={colName} 
              books={this.state.books[colName]} 
              key={index}
              update={this.update.bind(this)}/>)}
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default App;
