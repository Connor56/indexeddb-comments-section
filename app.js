
// Get references to our form and list
const commentForm = document.getElementById("comment-form");
const nameInput = document.getElementById("name-input");
const commentInput = document.getElementById("comment-input");
const commentsList = document.getElementById("comments-list");

// Listen for form submission
commentForm.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create a comment object with the input values
  const newComment = {
    name: nameInput.value,
    comment: commentInput.value,
    timestamp: new Date(),
  };

  console.log("New comment submitted:", newComment);

  // Clear the form fields
  nameInput.value = "";
  commentInput.value = "";
});
