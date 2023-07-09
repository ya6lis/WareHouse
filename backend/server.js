require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();


app.use(express.json());
app.use(cors())

// Sample book data (replace with database integration)
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Retrieve all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.listen(process.env.PORT, (error) => {
    error
        ? console.log(error)
        : console.log(`Listening port ${process.env.PORT}`);
});
