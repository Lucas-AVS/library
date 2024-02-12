let myLibrary = [];

let index = 0;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = "book-" + index;
  index++;
  myLibrary.push(this);
}

function displayBook(book) {
  var li = document.createElement("li");
  var h1 = document.createElement("h1");
  var author = document.createElement("p");
  var pages = document.createElement("p");
  var isReadBtn = document.createElement("button");
  isReadBtn.className = "isReadBtn";
  var removeBook = document.createElement("button");
  removeBook.className = "removeBook";

  li.id = book.id;
  h1.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages + " pages";
  {
    book.read
      ? (isReadBtn.textContent = "Read")
      : (isReadBtn.textContent = "Not read");
  }
  {
    book.read
      ? (isReadBtn.style.backgroundColor = "#4CAF50")
      : (isReadBtn.style.backgroundColor = "#FF847C");
  }
  removeBook.textContent = "Remove";

  li.appendChild(h1);
  li.appendChild(author);
  li.appendChild(pages);
  isReadBtn.setAttribute("data-book-id", li.id);
  isReadBtn.addEventListener("click", handleReadStatus);
  li.appendChild(isReadBtn);
  removeBook.setAttribute("data-book-id", li.id);
  removeBook.addEventListener("click", handleDeleteBook);
  li.appendChild(removeBook);

  return li;
}

function displayLibrary() {
  var libraryList = document.getElementById("library-list");
  libraryList.innerHTML = "";

  myLibrary.forEach((book) => {
    var bookElement = displayBook(book);
    libraryList.appendChild(bookElement);
  });
}

displayLibrary();

// Modal --------
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// --------------

document
  .getElementsByClassName("submit-form")[0]
  .addEventListener("click", handleNewBook);

function resetFormInput() {
  modal.style.display = "none";
  document.getElementById("new-book-title").value = "";
  document.getElementById("new-book-author").value = "";
  document.getElementById("new-book-pages").value = "";
  document.getElementById("is-read").checked = false;
}

function validateForm() {
  var title = document.getElementById("new-book-title").value;
  var author = document.getElementById("new-book-author").value;
  var pages = document.getElementById("new-book-pages").value;

  if (!title || !author || !pages) {
    alert("Please fill in all required fields.");
    return false;
  }

  return true;
}

function handleNewBook() {
  if (!validateForm()) {
    return;
  }
  var newBookTitle = document.getElementById("new-book-title").value;
  var newBookAuthor = document.getElementById("new-book-author").value;
  var newBookPages = document.getElementById("new-book-pages").value;
  var isRead = document.getElementById("is-read").checked;
  new Book(newBookTitle, newBookAuthor, newBookPages, isRead);
  console.log(myLibrary);
  resetFormInput();
  displayLibrary();
}

function handleReadStatus(event) {
  var bookId = event.target.getAttribute("data-book-id");
  var currentBook = myLibrary.find((book) => book.id === bookId);
  if (currentBook) {
    currentBook.read = !currentBook.read;
    displayLibrary();
  } else {
    console.log("ERROR: Book not found for ID ", bookId);
  }
}

function handleDeleteBook(event) {
  var bookId = event.target.getAttribute("data-book-id");
  var currentBook = myLibrary.find((book) => book.id === bookId);
  if (currentBook) {
    let myNewLibrary = myLibrary.filter((book) => book !== currentBook);
    myLibrary = myNewLibrary;
    displayLibrary();
  } else {
    console.log("ERROR: Book not found for ID ", bookId);
  }
}
