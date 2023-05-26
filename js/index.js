const carouselContainer = document.querySelector(".carousel-container");
const carouselTrack = document.getElementById('carouselTrack');
const prevButton = document.getElementById('carouselPrev');
const nextButton = document.getElementById('carouselNext');
const postsContainer = document.getElementById('postsContainer');
const loadingText = document.querySelector('.loading-text');

async function fetchPageContent() {
  try {
    const response = await fetch('https://norwegiantechie.icu/wp-json/wp/v2/pages/35');
    const page = await response.json();
    renderPageContent(page);
  } catch (error) {
    console.error('Error fetching page content:', error);
  }
}

let currentPosition = 0;
const slideWidth = 900;
const slidesToShow = 4;
const excerptLength = 100;

async function fetchPosts() {
  try {
    const response = await fetch('https://norwegiantechie.icu/wp-json/wp/v2/posts?_embed');
    const posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function renderPageContent(page) {
  const { title, content } = page;

  const heading = document.createElement('h2');
  heading.textContent = title.rendered;

  const paragraph = document.createElement('p');
  paragraph.innerHTML = content.rendered;

  const container = document.getElementById('indexContent');
  container.appendChild(heading);
  container.appendChild(paragraph);
  loadingText.style.display = 'none';
}


function renderPosts(posts) {
  const carouselItems = posts.map(post => createCarouselItem(post));
  carouselTrack.innerHTML = carouselItems.join('');

  const postItems = posts.slice(0, 4).map(post => createPostItem(post));
  postsContainer.innerHTML = postItems.join('');

  const postWidth = slideWidth / Math.min(posts.length, slidesToShow);
  carouselTrack.style.width = `${postWidth * posts.length}px`;

  addEventListeners(posts);
}

function createPostItem(post) {
  const imageUrl = extractImageUrl(post.content.rendered);
  const altText = extractAltText(post.content.rendered);
  const excerpt = post.excerpt.rendered.substring(0, excerptLength) + " [...]";


  return `
    <div class="post-item">
      <img src="${imageUrl}" alt="${altText} Image" class="post-image" />
      <h2>${post.title.rendered}</h2>
      <p>${excerpt}</p>
      <a href="post.html?id=${post.id}" class="readmorebutton">Read More</a>
    </div>
  `;
}


function createCarouselItem(post) {
  const imageUrl = extractImageUrl(post.content.rendered);
  const altText = extractAltText(post.content.rendered);
  const excerpt = post.excerpt.rendered.substring(0, excerptLength) + " [...]";

  return `
    <div class="carousel-item">
      <img src="${imageUrl}" alt="${altText} Image" class="post-image" />
      <h2>${post.title.rendered}</h2>
      <p>${excerpt}</p>
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

function extractAltText(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const imageElement = doc.querySelector('img');
  return imageElement ? imageElement.getAttribute('alt') : '';
}

function addEventListeners(posts) {
  prevButton.addEventListener('click', () => moveCarousel('prev', posts));
  nextButton.addEventListener('click', () => moveCarousel('next', posts));
}

function moveCarousel(direction, posts) {
  const totalSlides = posts.length;
  const slidesPerPage = slidesToShow;
  const maxPosition = Math.max(totalSlides);
  const increment = direction === 'prev' ? -2 : 2;

  currentPosition += increment;

  if (currentPosition < 0) {
    currentPosition = maxPosition;
  } else if (currentPosition > maxPosition) {
    currentPosition = 0;
  }

  const translateX = -currentPosition * (slideWidth / slidesToShow);
  carouselTrack.style.transform = `translateX(${translateX}px)`;
}



fetchPosts()
  .then(() => fetchPageContent())
  .catch((error) => console.error('Error:', error))
  .finally(() => {
    
    const loadingElement = indexContent.querySelector('.loading-text');
    if (loadingElement) {
      indexContent.removeChild(loadingElement);
    }

    const postLoadingElement = post.querySelector('.loading-text');
    if (postLoadingElement) {
      post.removeChild(postLoadingElement);
    }

  });

