import { addComment } from "./persistence.js";

// Get references to our form and list
const commentForm = document.getElementById("comment-form");
const nameInput = document.getElementById("name-input");
const commentInput = document.getElementById("comment-input");
const commentsList = document.getElementById("comments-list");

// UPDATE the form submit listener
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newComment = {
    name: nameInput.value,
    comment: commentInput.value,
    timestamp: new Date(),
  };

  // Call our new function to save it
  addComment(newComment);

  nameInput.value = "";
  commentInput.value = "";
});
