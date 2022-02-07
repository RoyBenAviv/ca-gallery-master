'use strict';

const STORAGE_KEY = 'bookDB';
const PAGE_SIZE = 3;
var gPageIdx = 0;
var gBooks;
var gDecPrice = true;
var gDecTitle = true;

_createBooks();

function setPage(num) {

    if (num === 'prev') gPageIdx--;
    else if (num === 'next') gPageIdx++;
    else gPageIdx = num;

    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx--;
    if (gPageIdx * PAGE_SIZE < 0) gPageIdx++;
}

function getBooks() {
    var books = gBooks;

    const startIdx = gPageIdx * PAGE_SIZE;
    books = books.slice(startIdx, startIdx + PAGE_SIZE);

    return books;
}

function setSort(sortBy) {

    if (sortBy === 'price') {
        gDecPrice = !gDecPrice;
        var mult = (gDecPrice) ? -1 : 1;
        gBooks.sort((a, b) => (b.price - a.price) * mult);
    }
    if (sortBy === 'title') {
        gDecTitle = !gDecTitle;
        var mult = (gDecTitle) ? -1 : 1;
        gBooks.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1) * mult);
    }
}

function getBookById(bookId) {
    const book = gBooks.find((book) => bookId === book.id);
    return book;
}

function addBook(title, price, image, rating) {
    const book = _createBook(title, price, image, rating);
    gBooks.unshift(book);
    _saveBooksToStorage();
    return book;
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => bookId === book.id);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function updateBook(bookId, newPirce) {
    const book = gBooks.find(book => bookId === book.id);
    book.price = newPirce;
    _saveBooksToStorage();
    return book;
}

function updateRating(bookId, rating) {
    const book = gBooks.find(book => bookId === book.id);
    book.rating += rating;
    if (book.rating < 0) return book.rating++;
    if (book.rating > 5) return book.rating--;
    _saveBooksToStorage();
    return book;
}

function _createBook(title, price, image = "cover", rating = 0) {
    return {
        id: makeId(),
        title,
        price,
        description: makeLorem(),
        image,
        rating
    };
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = [
            _createBook('Harry Potter', 145, 'harry-potter'),
            _createBook('Crime and Punishment', 135, 'crime-and-punishment'),
            _createBook('Game of Thrones', 175, 'game-of-thrones'),
            _createBook('The Da-Vinci Code', 150, 'the-divinci-code'),
            _createBook('Peter Pan', 120, 'peter-pan')
        ];
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}