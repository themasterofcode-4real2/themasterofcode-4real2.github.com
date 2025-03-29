document.addEventListener("DOMContentLoaded", function () {
    const likeButton = document.getElementById("like-button");
    const likeCount = document.getElementById("like-count");
    const commentInput = document.getElementById("comment-input");
    const submitComment = document.getElementById("submit-comment");
    const commentList = document.getElementById("comment-list");

    // Fetch comments and likes from data.json
    async function fetchData() {
        const response = await fetch("data.json");
        const data = await response.json();

        likeCount.textContent = data.likes;

        // Render comments
        commentList.innerHTML = "";
        data.comments.forEach(comment => {
            const commentElement = document.createElement("p");
            commentElement.textContent = `Commenter: ${comment}`;
            commentList.appendChild(commentElement);
        });
    }

    // Initial load
    fetchData();
});
