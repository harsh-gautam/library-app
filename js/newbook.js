const form = document.querySelector(".form-group");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e.target.title.value);
  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const readStatus = e.target.readstatus.value === "yes" ? true : false;
  saveData({ title, author, pages, readStatus });
  alert("Book saved to library!");
  // TODO: clear form inputs
});

function saveData(book) {
  let data = localStorage.getItem("data");
  if (data === null) {
    localStorage.setItem("data", JSON.stringify([book]));
    return;
  }
  data = JSON.parse(data);
  data.push(book);
  localStorage.setItem("data", JSON.stringify(data));
}
