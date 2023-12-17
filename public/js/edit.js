const editFormHandler = async (event) => {
    event.preventDefault();
  
    const postId = document.querySelector('#post-id').value; // Ensure this matches the actual ID of the hidden input in your form
    const updatedTitle = document.querySelector('input[name="title"]').value;
    const updatedBody = document.querySelector('textarea[name="updated-comment-body"]').value;
  
    if (updatedBody) {
      try {
        await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: updatedTitle,
            body: updatedBody,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Redirect to the post details page after updating
        window.location.href = `/dashboard`;
      } catch (error) {
        console.error('Error updating post:', error);
        // Handle the error (e.g., display a message to the user)
      }
    }
  };
  
  document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);