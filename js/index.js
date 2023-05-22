const carouselContainer = document.getElementById('carouselContainer');
const carouselTrack = document.getElementById('carouselTrack');
const prevButton = document.getElementById('carouselPrev');
const nextButton = document.getElementById('carouselNext');

let currentPosition = 0;
const slideWidth = 900;
const slidesToShow = 4;

async function fetchPosts() {
  try {
    const response = await fetch('https://norwegiantechie.icu/wp-json/wp/v2/posts?_embed');
    const posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function renderPosts(posts) {
  carouselTrack.innerHTML = '';

  const carouselItems = posts.map(post => createCarouselItem(post));
  carouselTrack.innerHTML = carouselItems.join('');

  const postWidth = slideWidth / slidesToShow;
  carouselTrack.style.width = `${postWidth * posts.length}px`;

  addEventListeners(posts);
}

function createCarouselItem(post) {
  const imageUrl = extractImageUrl(post.content.rendered);

  return `
    <div class="carousel-item">
      <img src="${imageUrl}" alt="${post.title.rendered} Image" class="post-image" />
      <h2>${post.title.rendered}</h2>
      <p>${post.excerpt.rendered}</p>
      <a href="post.html?id=${post.id}">Read More</a>
    </div>
  `;
}

function extractImageUrl(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const imageElement = doc.querySelector('img');
  return imageElement ? imageElement.getAttribute('src') : '';
}

function addEventListeners(posts) {
  prevButton.addEventListener('click', () => moveCarousel('prev', posts));
  nextButton.addEventListener('click', () => moveCarousel('next', posts));
}

function moveCarousel(direction, posts) {
  const totalSlides = posts.length;
  const slidesPerPage = slidesToShow;
  const maxPosition = Math.max(totalSlides - slidesPerPage, 0);
  const increment = direction === 'prev' ? -1 : 1;

  currentPosition += increment;

  if (currentPosition < 0) {
    currentPosition = maxPosition;
  } else if (currentPosition > maxPosition) {
    currentPosition = 0;
  }

  const translateX = -currentPosition * (slideWidth / slidesToShow);
  carouselTrack.style.transform = `translateX(${translateX}px)`;
}

fetchPosts();
