const postId = new URLSearchParams(window.location.search).get('id');
const postContent = document.getElementById('postContent');
const modal = document.getElementById('myModal');
const modalImage = document.getElementById('modalImage');

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
  
    // Extract the image URL from the API response
    const imageUrlMatch = post.content.rendered.match(/src="([^"]+)"/);
    if (imageUrlMatch && imageUrlMatch.length > 1) {
      const imageUrl = imageUrlMatch[1];
  
      // Add event listener to the post image
      const postImage = postContent.querySelector('img');
      postImage.addEventListener('click', () => openModal(imageUrl));
    }
  }
  

function openModal(imageUrl) {
  modal.style.display = 'block';
  modalImage.src = imageUrl;
}

function closeModal() {
  modal.style.display = 'none';
}

// Close the modal when the user clicks outside the image
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

fetchPost();
