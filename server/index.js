const express = require('express')
const books = require('./books.json');
const app = express()
const port = 5000


app.get('/books', (req, res) => {
  // let mapedBooks = {'Book List' : {}, 'Wish List': {}};
  // books.forEach(book => {
  //   mapedBooks["Book List"][book.id] = book;
  // })
  // res.json(mapedBooks);

  let mapedBooks = {
    'books': {},
    'columns': {
      'column-1':{'id': 'column-1', title: 'Book List', bookIds:[]}, 
      'column-2':{'id': 'column-2', title: 'Wish List', bookIds:[]}, 
    },
    'columnOrder' : ['column-1', 'column-2']
  }

  books.forEach(book => {
    mapedBooks.books[book.id] = book;
    mapedBooks.columns['column-1'].bookIds.push(book.id);
  })
  res.json(mapedBooks);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))