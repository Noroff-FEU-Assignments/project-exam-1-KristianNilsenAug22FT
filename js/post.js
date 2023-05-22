const postId = new URLSearchParams(window.location.search).get('id');
const postContent = document.getElementById('postContent');

async function fetchPost() {
  try {
    const response = await fetch(`https://norwegiantechie.icu/wp-json/wp/v2/posts/${postId}`);
    const post = await response.json();
    renderPost(post);
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}

function renderPost(post) {
  document.title = post.title.rendered;
  postContent.innerHTML = `
    <h2>${post.title.rendered}</h2>
    <div>${post.content.rendered}</div>
  `;
}

fetchPost();
