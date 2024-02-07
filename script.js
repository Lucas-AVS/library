const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  myLibrary.push(this);
  //   this.info = function () {
  //     console.log(
  //       `${this.title} by ${this.author}, ${this.pages} pages, ${
  //         read ? "already read" : "not read yet"
  //       }`
  //     );
  //   };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

function addBookToLibrary() {
  // do stuff here
}

function displayLibrary() {
  var libraryList = document.getElementById("library-list");
  libraryList.innerHTML = "";

  myLibrary.forEach((book) => {
    var li = document.createElement("li");
    var h1 = document.createElement("h1");
    var author = document.createElement("p");
    var pages = document.createElement("p");

    h1.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages + "pages";

    li.appendChild(h1);
    li.appendChild(author);
    li.appendChild(pages);

    libraryList.appendChild(li);
  });
}

displayLibrary();

// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
