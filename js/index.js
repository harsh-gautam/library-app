const originalData = JSON.parse(localStorage.getItem("data"));
populateTable(originalData);
const removeBookBtn = document.querySelectorAll(".remove-book");

function populateTable(booksData) {
  if (booksData === null) alert("Failed to retrieve books data");
  const table = document.querySelector(".books-table > tbody");
  table.innerHTML = "";
  for (let book in booksData) {
    const trTag = createTag(booksData[book]);
    table.appendChild(trTag);
  }
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
      readBtn.textContent = book[key] ? "Completed" : "Not Completed";
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

function handleRead(e) {}

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
