// Fetch all books from the API
fetch('http://localhost:3000/api/books')
  .then(response => response.json())
  .then(books => {
    const booksContainer = document.getElementById('books');

    // Display each book on the UI
    books.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <hr>
      `;
      booksContainer.appendChild(bookElement);
    });
  })
  .catch(error => console.log(error));