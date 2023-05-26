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

  const imageUrlMatch = post.content.rendered.match(/src="([^"]+)"/);
  if (imageUrlMatch && imageUrlMatch.length > 1) {
    const imageUrl = imageUrlMatch[1];
    const altTextMatch = post.content.rendered.match(/alt="([^"]+)"/);
    const altText = altTextMatch && altTextMatch.length > 1 ? altTextMatch[1] : '';

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = altText;
    imageElement.addEventListener('click', () => openModal(imageUrl, altText));

    const titleElement = document.createElement('h2');
    titleElement.textContent = post.title.rendered;

    postContent.innerHTML = '';
    postContent.appendChild(titleElement);
    postContent.appendChild(imageElement);
  }

  const contentElement = document.createElement('div');
  contentElement.className = 'posttext';
  contentElement.innerHTML = post.content.rendered;
  postContent.appendChild(contentElement);
}




  

  function openModal(imageUrl, altText) {
    modal.style.display = 'block';
    modalImage.src = imageUrl;
    modalImage.alt = altText;
    
  }
  

function closeModal() {
  modal.style.display = 'none';
}


window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

fetchPost();
