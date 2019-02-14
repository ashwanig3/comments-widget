class Comments {
  constructor() {
    this.comments = JSON.parse(localStorage.getItem("comments")) || [];
  }

  displayForm() {
    return `
    <form class="add-comment-form">
        <input type="text" required name="comment" placeholder="Comment">
        <input type="text" required name="author"  placeholder="Author">
        <button>Submit</button>
    </form>
    <div class="comments-container">

    </div>
    `;
  }

  addComment() {
    const form = document.querySelector(".add-comment-form");

    form.addEventListener("submit", e => {
      e.preventDefault();
      var userData = Object.values(e.target).reduce((acc, val) => {
        acc[val.name] = val.value;
        return acc;
      }, {});
      userData.id = this.comments.length;
      userData.createdAt = new Date();
      userData.replies = [];
      this.comments.push(userData);
      this.setIntoLocalStorage(this.comments);
      const commentArea = document.querySelector(".comments-container");

      this.displayComments(this.comments, commentArea);
    });
  }

  displayComments(arr, parent) {
    parent.innerHTML = "";
    const nodes = arr
      .map(
        (v, id) =>
          `<li id="reply-${v.id}" class="reply-box">
            <span class="author-name">${v.author}</span>
            <span class="author-comment">${v.comment}</span>
            <span class="date">${new Date(v.createdAt).toDateString()}</span>
            <div class="reply-area-${id}">
                ${v.replies
                  .map(
                    reply =>
                      `<div class="reply-item">
                            <span class="author-name reply-author">${
                              reply.replyAuthor
                            }</span>
                            <span class="author-comment">${reply.reply}</span>
                        <span class="date">${new Date(
                          reply.createdAt
                        ).toDateString()}</span>
                        </div></div>`
                  )
                  .join(" ")}
            </div>
            <input type="text" class="reply" required name="Reply" placeholder="reply">
            <input type="text" class="reply-author" required name="author"  placeholder="Author">
            <button class="submit-btn btn-${v.id}">Reply</button>
        </li>`
      )
      .join("");
    parent.innerHTML = nodes;
  }

  addReplies() {
    const container = document.querySelector(".comments-container");
    container.addEventListener("click", e => {
      if (e.target.classList.contains("submit-btn")) {
        const parentId = `reply-${e.target.classList[1].slice(4)}`;
        var reply = document.querySelector(`#${parentId} > input.reply`);
        var replyAuthor = document.querySelector(
          `#${parentId} > .reply-author`
        );
        var replyObj = {
          reply: reply.value,
          replyAuthor: replyAuthor.value,
          createdAt: new Date()
        };
        this.comments[e.target.classList[1].slice(4)].replies.push(replyObj);
        this.setIntoLocalStorage(this.comments);
        const commentArea = document.querySelector(".comments-container");
        this.displayComments(this.comments, commentArea);
      }
    });
  }

  setIntoLocalStorage(arr) {
    localStorage.setItem("comments", JSON.stringify(arr));
  }

  init() {
    this.addComment();
    const commentArea = document.querySelector(".comments-container");
    this.displayComments(this.comments, commentArea);
    this.addReplies();
  }
}
