function populateTable() {
  const booksData = JSON.parse(localStorage.getItem("data"));
  if (booksData === null) alert("Failed to retrieve books data");
  const table = document.querySelector(".books-table");
  for(let book in booksData){
    const trTag = createTag(book)
    table.appendChild(trTag)
  }
}
 