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
let slideWidth;
let slidesToShow;
const excerptLength = 100;

async function fetchPosts() {
  try {
    const response = await fetch('https://norwegiantechie.icu/wp-json/wp/v2/posts?_embed');
    const posts = await response.json();

    const updatedPosts = posts.map((post) => {
      let imageUrl = '';
      let altText = '';

      if (post._embedded['wp:featuredmedia']) {
        const media = post._embedded['wp:featuredmedia'][0];
        imageUrl = media.source_url;
        altText = media.alt_text;
      }

      return { ...post, featured_image: imageUrl, alt_text: altText };
    });

    renderPosts(updatedPosts);
    adjustCarouselForViewport();
    window.addEventListener('resize', adjustCarouselForViewport);
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
  const imageUrl = post.featured_image;
  const altText = post.alt_text;
  const excerpt = post.excerpt.rendered.substring(0, excerptLength) + " [...]";

  return `
    <div class="post-item">
      <img src="${imageUrl}" alt="${altText}" class="post-image" />
      <h2>${post.title.rendered}</h2>
      <p>${excerpt}</p>
      <a href="post.html?id=${post.id}" class="readmorebutton">Read More</a>
    </div>
  `;
}



function createCarouselItem(post) {
  const imageUrl = post.featured_image;
  const altText = post.alt_text;
  const excerpt = post.excerpt.rendered.substring(0, excerptLength) + " [...]";

  return `
    <div class="carousel-item">
      <img src="${imageUrl}" alt="${altText}" class="post-image" />
      <h2>${post.title.rendered}</h2>
      <p>${excerpt}</p>
      <a href="post.html?id=${post.id}" class="readmorebutton">Read More</a>
    </div>
  `;
}

function addEventListeners(posts) {
  prevButton.addEventListener('click', () => moveCarousel('prev', posts));
  nextButton.addEventListener('click', () => moveCarousel('next', posts));
}

function adjustCarouselForViewport() {
  if (window.innerWidth < 1120) {
    slidesToShow = 3;
  } else {
    slidesToShow = 4;
  }

  slideWidth = carouselContainer.offsetWidth / slidesToShow;
  const totalSlides = carouselTrack.querySelectorAll('.carousel-item').length;

  carouselTrack.style.width = `${slideWidth * totalSlides}px`;

  const carouselItems = carouselTrack.querySelectorAll('.carousel-item');
  carouselItems.forEach((item) => {
    item.style.width = `${slideWidth}px`;
  });
}

function moveCarousel(direction) {
  const totalSlides = carouselTrack.querySelectorAll('.carousel-item').length;
  const totalSets = Math.ceil(totalSlides / slidesToShow); 
  const increment = direction === 'prev' ? -1 : 1;

  let currentSet = Math.floor(currentPosition / slidesToShow); 
  currentSet += increment;

  if (currentSet < 0) {
    currentSet = totalSets - 1;
  } else if (currentSet >= totalSets) {
    currentSet = 0;
  }

  currentPosition = currentSet * slidesToShow; 

  const translateX = -currentPosition * slideWidth;
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

