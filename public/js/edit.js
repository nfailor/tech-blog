const editFormHandler = async function (event) {
  event.preventDefault();

  const postId = document.querySelector("#post-id").value;
  const updatedTitle = document.querySelector(
    'input[name="updatedTitle"]'
  ).value;
  const updatedBody = document.querySelector(
    'textarea[name="updatedBody"]'
  ).value;

  if (updatedTitle && updatedBody) {
    try {
      await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: updatedTitle,
          body: updatedBody,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Redirect to the dashboard after updating
      window.location.href = `/dashboard`;
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle the error (e.g., display a message to the user)
    }
  }
};

document
  .querySelector("#editPostForm")
  .addEventListener("submit", editFormHandler);

// Add a deletePostHandler function
const deletePostHandler = async function (event) {
  event.preventDefault();

  // Get the post ID
  const postIdElement = document.querySelector("#post-id");

  if (postIdElement) {
    const postId = postIdElement.value;

    // Confirm with the user before deleting
    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
      try {
        // Use the fetch API to send a DELETE request to the server
        await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

      } catch (err) {
        console.error(err);
      }
    }
  } else {
    console.error("Error: #post-id element not found");
  }

  // Redirect to the dashboard or another appropriate page after deleting
  window.location.href = "/dashboard";
};

// Attach the deletePostHandler to the delete button
document.querySelector("#deletePostBtn").addEventListener("click", deletePostHandler);
