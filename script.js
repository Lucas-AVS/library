const myLibrary = [];

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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit3 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

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
  removeBook.textContent = "Remove";

  li.appendChild(h1);
  li.appendChild(author);
  li.appendChild(pages);
  isReadBtn.setAttribute("data-book-id", li.id);
  isReadBtn.addEventListener("click", handleReadStatus);
  li.appendChild(isReadBtn);
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
  console.log("Clicked book ID:", bookId);

  var currentBook = myLibrary.find(
    (book) => "book-" + myLibrary.indexOf(book) === bookId
  );

  if (currentBook) {
    currentBook.read = !currentBook.read;
    console.log("Updated read status:", currentBook.title, currentBook.read);
    displayLibrary();
  } else {
    console.log("Book not found for ID:", bookId);
  }
}
