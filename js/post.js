const postId = new URLSearchParams(window.location.search).get('id');
const postContent = document.getElementById('postContent');
const modal = document.getElementById('myModal');
const modalImage = document.getElementById('modalImage');

async function fetchPost() {
  try {
    const response = await fetch(`https://norwegiantechie.icu/wp-json/wp/v2/posts/${postId}`);
    const post = await response.json();

    let featuredImage = null;
    let altText = '';
    if (post.featured_media) {
      const mediaResponse = await fetch(`https://norwegiantechie.icu/wp-json/wp/v2/media/${post.featured_media}`);
      const media = await mediaResponse.json();
      featuredImage = media.source_url;
      altText = media.alt_text; // fetching the alt text from media JSON
    }

    renderPost(post, featuredImage, altText);
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}

function renderPost(post, imageUrl, altText) {
  document.title = "The Boat Blog | Posts | " + post.title.rendered;

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.alt = altText;
  imageElement.addEventListener('click', () => openModal(imageUrl, altText));

  const titleElement = document.createElement('h2');
  titleElement.textContent = post.title.rendered;

  postContent.innerHTML = '';
  postContent.appendChild(titleElement);
  postContent.appendChild(imageElement);

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
