const form = document.querySelector(".form-group");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e.target.title.value);
  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const readStatus = e.target.readstatus.value;
  console.log(title, author, pages, readStatus);
});
