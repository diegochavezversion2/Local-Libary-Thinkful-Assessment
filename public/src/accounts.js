function findAccountById(accounts = [], id = "") {
  return accounts.find((accountObj) => accountObj.id === id)
}

function sortAccountsByLastName(accounts = []) {
  return accounts.sort((account1, account2) => {
    if (account1.name.last > account2.name.last) {
    return 1
    } else {
      return -1
    }
  })
}

function getTotalNumberOfBorrows(account = {}, books = []) {
  let totalNumberOfBorrows = 0;
  for (let book of books) {
    for (let borrow of book.borrows) {
      if (account.id === borrow.id) {
        totalNumberOfBorrows += 1;
      }
    }
  }
  return totalNumberOfBorrows;
}

//look for given account id 
//result is an array 
//look at all the books and for each book, look at the borrows array and find the matching id but only if it was not returned
//if all is true, push book object to answer but first need to add author object to book object
//to do that, look at book author id and find it in the authors array

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  const {id} = account;
  const booksCheckedOutByStudent = [];
  books.forEach((book) => {
    const recentBorrow = book.borrows[0]
    if (recentBorrow.id === id && recentBorrow.returned === false) {
      const matchingAuthor = authors.find((author) => {
        return book.authorId === author.id
      })
      book.author = matchingAuthor;
      booksCheckedOutByStudent.push(book)
    }
  })
  return booksCheckedOutByStudent;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
