let bookFunctions = require("./books.js");

function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts =[]) {
  return accounts.length;
}

function getBooksBorrowedCount(books = []) {
  //returns a number 
  //look through the books array
  //look at the first element of the borrows array
  //if the returned key is false, add 1 to the total 
  const totalCheckedOut = books.reduce((total, book) => {
    const recentCheckout = book.borrows[0];
    if (recentCheckout.returned === false) {
      total++;
    }
    return total;
  }, 0)
  return totalCheckedOut;
}

//look at each book, for each book, look at the genres key
//look at the common genres array, if the current genre is not in that array, push new object, else, count ++

function getMostCommonGenres(books = []) {
  let commonGenres = [];
  books.forEach((book) => {
    const {genre} = book;
    let foundObject = commonGenres.find((genreObj) => {
      return genreObj.name === genre;
    })
    if (foundObject === undefined) {
      let newObj = {name: genre, count: 1};
      commonGenres.push(newObj);
    } else {
      foundObject.count++;
    }
  })
  let sortedCommonGenres = commonGenres.sort((elementA, elementB) => {
    return elementB.count - elementA.count;
  })
  return sortedCommonGenres.slice(0, 5)
}

function getMostPopularBooks(books = []) {
  let popularBooks = [];
  books.forEach((book) => {
    const {borrows, title} = book;
    const bookWithCount = {name: title, count: borrows.length}
    popularBooks.push(bookWithCount)
  })
  const sortedPopularBooks = popularBooks.sort((elementA, elementB) => {
    return elementB.count - elementA.count;
  }) 
  return sortedPopularBooks.slice(0, 5);
}

//loop through each book, 

function getMostPopularAuthors(books = [], authors = []) {
  let authorsWithPop = [];
  books.forEach((book) => {
    const {authorId, borrows} = book;
    const matchingAuthor = bookFunctions.findAuthorById(authors, authorId);
    const formattedName = combineNameHelper(matchingAuthor.name.first, matchingAuthor.name.last);
    let authorObj = {name: formattedName, count: borrows.length};
    const foundObject = authorsWithPop.find((author) => {
      return author.name === formattedName;
    })
    if (foundObject === undefined) {
      authorsWithPop.push(authorObj);
    } else {
      foundObject.count += borrows.length;
    }
  })
  const sortedAuthorsWithPop = authorsWithPop.sort((elementA, elementB) => {
    return elementB.count - elementA.count;
  })
  return sortedAuthorsWithPop.slice(0, 5);
}

function combineNameHelper(first, last) {
  return `${first} ${last}`;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
