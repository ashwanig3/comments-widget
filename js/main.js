document.addEventListener("DOMContentLoaded", () => {
  var container = document.querySelector(".container");
  var form = new Comments();
  container.innerHTML = form.displayForm();
  form.init();
});
const commentArea = document.querySelector(".comments-container");
