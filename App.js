const input = document.getElementById("postInput");
const button = document.getElementById("postButton");
const feed = document.getElementById("feed");

let posts = JSON.parse(
  localStorage.getItem("facepen_posts") || "[]"
);

function displayPosts() {
  feed.innerHTML = "";

  if (posts.length === 0) {
    feed.innerHTML =
      '<p class="empty">Your Facepen feed is ready. Create your first post.</p>';
    return;
  }

  posts.forEach((post, index) => {
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <strong>David</strong>
      <small> · ${post.time}</small>

      <div class="post-text"></div>

      <div class="post-actions">
        <button onclick="likePost(${index})">
          👍 ${post.likes}
        </button>

        <button onclick="commentPost()">
          💬 Comment
        </button>

        <button onclick="sharePost(${index})">
          ↗️ Share
        </button>
      </div>
    `;

    article.querySelector(".post-text").textContent = post.text;
    feed.appendChild(article);
  });
}

button.addEventListener("click", () => {
  const text = input.value.trim();

  if (!text) {
    alert("Write something first.");
    return;
  }

  posts.unshift({
    text: text,
    time: new Date().toLocaleString(),
    likes: 0
  });

  localStorage.setItem(
    "facepen_posts",
    JSON.stringify(posts)
  );

  input.value = "";
  displayPosts();
});

function likePost(index) {
  posts[index].likes++;

  localStorage.setItem(
    "facepen_posts",
    JSON.stringify(posts)
  );

  displayPosts();
}

function commentPost() {
  const comment = prompt("Write your comment:");

  if (comment) {
    alert("Comment added in this prototype.");
  }
}

function sharePost(index) {
  navigator.clipboard?.writeText(posts[index].text);
  alert("Post copied.");
}

displayPosts();
