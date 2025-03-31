document.addEventListener("DOMContentLoaded", function () {
    const commentInput = document.getElementById("comment-input");
    const submitComment = document.getElementById("submit-comment");
    const commentList = document.getElementById("comment-list");

    // Fetch comments and likes from data.json
    async function fetchData() {
        const response = await fetch("data.json");
        const data = await response.json();

        likeCount.textContent = data.likes;

        // Render predefined comments
        commentList.innerHTML = "";
        data.comments.forEach(comment => {
            const commentElement = document.createElement("p");
            commentElement.textContent = `Commenter: ${comment}`;
            commentList.appendChild(commentElement);
        });

        // Add user's own comment if exists in localStorage
        const userComment = localStorage.getItem("userComment");
        if (userComment) {
            const userCommentElement = document.createElement("p");
            userCommentElement.textContent = `Your Comment: ${userComment}`;
            commentList.appendChild(userCommentElement);
        }
    }

    // Submit a comment and store it in localStorage
    async function submitCommentHandler() {
        const commentText = commentInput.value.trim();
        if (commentText) {
            localStorage.setItem("userComment", commentText);  // Store user comment in localStorage
            commentInput.value = "";
            fetchData(); // Re-fetch and display all comments (including the user's)
        }
    }

    // Initial load
    fetchData();

    submitComment.addEventListener("click", submitCommentHandler);
});
