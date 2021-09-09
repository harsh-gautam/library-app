const form = document.querySelector(".form-group");
const cancelBtn = document.querySelector("#cancel");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e.target.title.value);
  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const readStatus = e.target.readstatus.value === "yes" ? true : false;
  saveData({ title, author, pages, readStatus });
  alert("Book saved to library!");

  // clear form inputs after adding book to database
  e.target.title.value = "";
  e.target.author.value = "";
  e.target.pages.value = "";
  e.target.readstatus.value = "";
  populateTable();
});

function saveData(book) {
  let data = localStorage.getItem("data");
  if (data === null) {
    book["id"] = 0;
    localStorage.setItem("data", JSON.stringify([book]));
    return;
  }
  data = JSON.parse(data);
  book["id"] = data.length;
  data.push(book);
  localStorage.setItem("data", JSON.stringify(data));
}

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
