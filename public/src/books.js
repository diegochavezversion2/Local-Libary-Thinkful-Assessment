function findAuthorById(authors = [], id = null) {
  return authors.find((authorObj) => authorObj.id === id);
}

function findBookById(books = [], id = null) {
  return books.find((bookObj) => bookObj.id === id);
}

function partitionBooksByBorrowedStatus(books =[]) {
  const booksReturned = books.filter((bookObj) => {
    const returnedOrNot = bookObj.borrows[0].returned;
    return returnedOrNot === true;
  })
  const booksOut = books.filter((bookObj) => {
    const returnedOrNot = bookObj.borrows[0].returned;
    return returnedOrNot === false;
  })
  return [booksOut, booksReturned]
}

function getBorrowersForBook(book = {}, accounts = []) {
  return book.borrows.map((borrow) => {
    let accountTotal = accounts.find((account) => {
      return account.id === borrow.id;
    })
    return { ...borrow, ...accountTotal}; 
  })
  .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
