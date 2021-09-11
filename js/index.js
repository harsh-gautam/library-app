const originalData = JSON.parse(localStorage.getItem("data"));
populateTable(originalData);
const removeBookBtn = document.querySelectorAll(".remove-book");

function populateTable(booksData) {
  if (booksData === null) return;
  const table = document.querySelector(".books-table > tbody");
  table.innerHTML = "";
  for (let book in booksData) {
    const trTag = createTag(booksData[book]);
    table.appendChild(trTag);
  }
  showInfo();
}

function createTag(book) {
  let tr = document.createElement("tr");
  for (let key in book) {
    if (key === "id") {
      tr.id = book[key];
      continue;
    }
    let value = book[key];
    let td = document.createElement("td");
    td.textContent = value;

    if (key === "readStatus") {
      let readBtn = document.createElement("button");
      readBtn.classList.add(book[key] ? "completed" : "not-completed");
      readBtn.textContent = book[key] ? "Completed" : "Completed?";
      readBtn.value = book[key] ? "c" : "nc";
      readBtn.addEventListener("click", handleRead);
      td.textContent = "";
      td.appendChild(readBtn);
    }

    tr.appendChild(td);
  }
  let removeTd = document.createElement("td");
  let removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-book");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", handleRemove);
  removeTd.appendChild(removeBtn);
  tr.appendChild(removeTd);
  return tr;
}

removeBookBtn.forEach((btn) => {
  btn.addEventListener("click", handleRemove);
});

function handleRemove(e) {
  const parentTr = e.target.parentNode.parentNode;
  const id = parentTr.id;
  parentTr.remove();
  const originalData = JSON.parse(localStorage.getItem("data"));
  let newData = [...originalData];
  newData = newData.filter((book) => {
    if (book["id"] !== Number(id)) return book;
  });
  localStorage.setItem("data", JSON.stringify(newData));
}

function handleRead(e) {
  const id = e.target.parentNode.parentNode.id;
  let newData = [...originalData];
  if (e.target.textContent === "Completed") {
    e.target.classList.toggle("completed");
    e.target.textContent = "Completed?";
    newData = newData.map((book) => {
      if (book.id == id) book.readStatus = false;
      return book;
    });
  } else {
    e.target.classList.toggle("completed");
    e.target.textContent = "Completed";
    newData = newData.map((book) => {
      if (book.id == id) book.readStatus = true;
      return book;
    });
  }
  localStorage.setItem("data", JSON.stringify(newData));
  showInfo();
}

function showInfo() {
  const total = document.querySelector(".total");
  const booksRead = document.querySelector(".books-read");
  const booksUnread = document.querySelector(".books-unread");
  const data = [...JSON.parse(localStorage.getItem("data"))];
  total.textContent = data.length;
  booksRead.textContent = data.filter((book) => book.readStatus).length;
  booksUnread.textContent = data.filter((book) => !book.readStatus).length;
}

const modal = document.querySelector("#newbook-modal");
const modalTrigger = document.querySelector("#newbook");

modalTrigger.addEventListener("click", () => {
  modal.style.display = "block";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// TODO: Implement Sorting function
const sortTitleBtn = document.querySelector(".sort-title");
const sortAuthorBtn = document.querySelector(".sort-author");
const sortPagesBtn = document.querySelector(".sort-pages");

sortTitleBtn.addEventListener("click", () => {
  const sortedData = [...JSON.parse(localStorage.getItem("data"))];
  sortedData.sort((curr, next) => {
    if (curr.title > next.title) return 1;
    else return -1;
  });
  populateTable(sortedData);
});

sortAuthorBtn.addEventListener("click", () => {
  const sortedData = [...JSON.parse(localStorage.getItem("data"))];
  sortedData.sort((curr, next) => {
    if (curr.author > next.author) return 1;
    else return -1;
  });
  populateTable(sortedData);
});

sortPagesBtn.addEventListener("click", () => {
  const sortedData = [...JSON.parse(localStorage.getItem("data"))];
  sortedData.sort((curr, next) => {
    if (Number(curr.pages) > Number(next.pages)) return 1;
    else return -1;
  });
  populateTable(sortedData);
});
