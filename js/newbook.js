const form = document.querySelector(".form-group");
const cancelBtn = document.querySelector("#cancel");
const notification = document.querySelector(".notification");

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  setId(id) {
    this.id = id;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e.target.title.value);
  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const readStatus = e.target.readstatus.value === "yes" ? true : false;
  const book = new Book(title, author, pages, readStatus);
  saveData(book);
  notification.textContent = "Book saved to library!";
  setTimeout(() => {
    notification.textContent = "";
  }, 2500);

  // clear form inputs after adding book to database
  e.target.title.value = "";
  e.target.author.value = "";
  e.target.pages.value = "";
  e.target.readstatus.value = "";
});

function saveData(book) {
  let data = localStorage.getItem("data");
  if (data === null) {
    book.setId(0);
    localStorage.setItem("data", JSON.stringify([book]));
    return;
  }
  data = JSON.parse(data);
  book.setId(data.length);
  data.push(book);
  console.log(data);
  console.log(book);
  localStorage.setItem("data", JSON.stringify(data));
  populateTable(data);
}

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
