document.addEventListener("DOMContentLoaded", function () {
    const allPostsContainer = document.getElementById("allPostsContainer");
    const showMoreButton = document.getElementById("showMoreButton");
    let currentPage = 1;
  
    async function fetchPosts() {
        const apiUrl = "https://norwegiantechie.icu/wp-json/wp/v2/posts";
      
        try {
          const response = await fetch(`${apiUrl}?_embed&page=${currentPage}&per_page=10`);
          const data = await response.json();
      
          for (const post of data) {
            let imageUrl = '';
            let altText = '';
      
            if (post._embedded['wp:featuredmedia']) {
              const media = post._embedded['wp:featuredmedia'][0];
              imageUrl = media.source_url;
              altText = media.alt_text;
            }
      
            const postItem = createPostItem(post, imageUrl, altText);
            allPostsContainer.appendChild(postItem);
          }
      
          if (data.length < 9) {
            showMoreButton.style.display = "none";
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
      
      
  
      function createPostItem(post, imageUrl, altText) {
        const postItem = document.createElement("div");
        postItem.classList.add("post-item");
      
        const postImage = document.createElement("img");
        postImage.src = imageUrl;
        postImage.alt = altText;
        postItem.appendChild(postImage);
      
        const postTitle = document.createElement("h2");
        postTitle.innerHTML = post.title.rendered;
        postItem.appendChild(postTitle);
      
        const postExcerpt = document.createElement("div");
        const excerptLength = 100;
        const shortenedExcerpt = post.excerpt.rendered.substring(0, excerptLength) + " [...]";
        postExcerpt.innerHTML = shortenedExcerpt;
        postItem.appendChild(postExcerpt);
      
        const readMoreLink = document.createElement("a");
        readMoreLink.classList.add("readmorebutton");
        readMoreLink.href = `post.html?id=${post.id}`;
        readMoreLink.innerHTML = "Read More";
        postItem.appendChild(readMoreLink);
      
        return postItem;
      }
  
    function loadMorePosts() {
      currentPage++;
      fetchPosts();
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
  
    showMoreButton.addEventListener("click", loadMorePosts);
  
    fetchPosts();
  });
  