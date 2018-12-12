const express = require('express')
const books = require('./books.json');
const app = express()
const port = 5000


app.get('/books', (req, res) => {
  let mapedBooks = {'Book List' : {}, 'Wish List': {}};
  books.forEach(book => {
    mapedBooks["Book List"][book.id] = book;
  })
  res.json(mapedBooks);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))