import React, { Component } from 'react';
import './App.css';

import BookList from './bookList/BookList';
import WishList from './wishList/WishList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: 'Jehwa Shin',
      bookList: [{name: 'book1'}, {name: 'book2'}]
    }
  }
  render() {
    return (
      <div className="App">
        <h1>
          Welcome to {this.state.username}'s books wishlist
        </h1>
        <div className="list-container">
          <div>
            <BookList />
          </div>
          <div>
            <WishList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
