populateTable();
const removeBookBtn = document.querySelectorAll(".remove-book");

function populateTable() {
  const booksData = JSON.parse(localStorage.getItem("data"));
  if (booksData === null) alert("Failed to retrieve books data");
  const table = document.querySelector(".books-table > tbody");
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
    if (key === "readStatus") value = book[key] ? "Completed" : "Not Read Yet";
    let td = document.createElement("td");
    td.textContent = value;
    tr.appendChild(td);
  }
  let removeTd = document.createElement("td");
  let removeBtn = document.createElement("button");
  removeBtn.value = "remove";
  removeBtn.classList.add("remove-book");
  removeBtn.textContent = "Remove";
  removeTd.appendChild(removeBtn);
  tr.appendChild(removeTd);
  return tr;
}

removeBookBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parentTr = e.target.parentNode.parentNode;
    console.log(parentTr);
  });
});
