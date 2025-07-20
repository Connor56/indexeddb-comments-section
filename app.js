import { addComment, fetchComments } from "./persistence.js";

// Get references to our form and list
const commentForm = document.getElementById("comment-form");
const nameInput = document.getElementById("name-input");
const commentInput = document.getElementById("comment-input");
const commentsList = document.getElementById("comments-list");

// UPDATE the form submit listener
commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newComment = {
    name: nameInput.value,
    comment: commentInput.value,
    timestamp: new Date(),
  };

  // Call our new function to save it
  addComment(newComment);

  // Render the comments
  await renderComments();

  nameInput.value = "";
  commentInput.value = "";
});

// NEW: Function to render a single comment to the DOM
function renderComment(comment) {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  // Store the comment's ID on the element for easy deletion
  commentDiv.setAttribute("data-id", comment.id);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("comment-content");
  contentDiv.innerHTML = `
        <p class="author">${comment.name}</p>
        <p>${comment.comment}</p>
    `;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";

  commentDiv.appendChild(contentDiv);
  commentDiv.appendChild(deleteButton);
  commentsList.appendChild(commentDiv);
}

async function renderComments() {
  commentsList.innerHTML = "";

  const comments = await fetchComments();
  comments.forEach(renderComment);
}

setTimeout(renderComments, 100);
