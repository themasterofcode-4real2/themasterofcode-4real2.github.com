document.addEventListener("DOMContentLoaded", function () {
    const likeButton = document.getElementById("like-button");
    const likeCount = document.getElementById("like-count");
    const commentInput = document.getElementById("comment-input");
    const submitComment = document.getElementById("submit-comment");
    const commentList = document.getElementById("comment-list");
    
    // Fetch likes and comments from server
    async function fetchLikesAndComments() {
        const response = await fetch("/data");
        const data = await response.json();
        likeCount.textContent = data.likes;
        renderComments(data.comments);
    }
    
    // Update likes on the server
    async function likePost() {
        const response = await fetch("/like", { method: "POST" });
        if (response.ok) {
            fetchLikesAndComments();
            likeButton.disabled = true;
        }
    }
    
    // Submit a comment to the server
    async function submitCommentHandler() {
        const commentText = commentInput.value.trim();
        if (commentText) {
            await fetch("/comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment: commentText })
            });
            commentInput.value = "";
            fetchLikesAndComments();
        }
    }
    
    // Render comments on the page
    function renderComments(comments) {
        commentList.innerHTML = "";
        comments.forEach(comment => {
            const commentElement = document.createElement("p");
            commentElement.textContent = `Commenter: ${comment}`;
            commentList.appendChild(commentElement);
        });
    }
    
    likeButton.addEventListener("click", likePost);
    submitComment.addEventListener("click", submitCommentHandler);
    
    fetchLikesAndComments();
});
