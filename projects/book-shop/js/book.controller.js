'use strict';

function onInit() {
    _createBooks();
    renderPageBtn()
    renderBooks();
}

function renderBooks() {
    var books = getBooks();

    var strHtmls = books.map(book => {
        return `
        <tr>
           <td class="sort-id">${book.id}</td>
           <td><img class="book-img" src="images/${book.image}.jpg"></td>
           <td class="sort-title">${book.title}</td>    
           <td>${book.rating}</td>
           <td>${book.price} <span class="price-symbol">&#8362;<span></td>    
           <td class="actions">
                 <button onclick="onReadBook('${book.id}')" class="read">Read</button>
                 <span class="new-price" id="id-'${book.id}'">
                 <input type="number" name="new-price ${book.id}" placeholder="New price"/>
                 <i onclick="onUpdateBook('${book.id}')" class="fas fa-check-circle"></i>
                 </span>
                 <button onclick="openUpdateModal('${book.id}')">Update</button>
                 <button onclick="onDeleteBook('${book.id}')">Delete</button>
            </td>    
        </tr>`;
    });

    document.querySelector('.books-table').innerHTML = strHtmls.join('');
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function openBookModal() {
    document.querySelector('.add-book-modal').style.display = "block";
}

function closeBookModal() {
    document.querySelector('.add-book-modal').style.display = "none";
}

function onAddBook() {

    const elTitle = document.querySelector('input[name=title]');
    const elPrice = document.querySelector('input[name=price]');
    const elRating = document.querySelector('input[name=rating]');
    const title = elTitle.value;
    const price = elPrice.value;
    const rating = elRating.value;

    if (!(title && price) && !(rating > 0 || rating <= 5)) return;

    addBook(title, price, 'cover', rating);
    elTitle.value = ''
    elPrice.value = ''
    elRating.value = ''
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h2').innerText = book.title;
    elModal.querySelector('img').src = `images/${book.image}.jpg`;
    elModal.querySelector('h4 span').innerText = book.price;
    elModal.querySelector('.rate').innerHTML = `<span class="number">
	<span class="minus" onclick="onUpdateRating('${book.id}', -1)">-</span>
	<input type="text" value="${book.rating}" min="1" max="5"/>
	<span class="plus" onclick="onUpdateRating('${book.id}', 1)">+</span>
    </span>`;
    elModal.querySelector('p').innerText = book.description;
    elModal.classList.toggle('open');
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open');
}

function onUpdateBook(bookId) {
    const elUpdate = document.querySelector(`[name="new-price ${bookId}"]`)
    const newPrice = elUpdate.value
    if (!newPrice) return
    
        updateBook(bookId, newPrice);
        renderBooks();
}

function onUpdateRating(bookId, rating) {
    var book = getBookById(bookId);
    const elRating = document.querySelector('.rate input');
    updateRating(bookId, rating);
    elRating.value = book.rating;
    renderBooks();
}

function openUpdateModal(bookId) {
    var elNewPrice = document.getElementById(`id-'${bookId}'`);
    elNewPrice.classList.toggle('open-price');
}

function onSetSortBy(sortBy) {
    setSort(sortBy)
    renderBooks();
}

function onChangePage(num) {
    setPage(num)
    renderBooks();
}

function renderPageBtn() {
    var elBtnContainer = document.querySelector('.button-container')

    for(var i = 0; i < Math.ceil(gBooks.length / PAGE_SIZE); i++) {
        elBtnContainer.innerHTML += `<button onclick="onChangePage(${i})">${i+1}</button>`
    }
}