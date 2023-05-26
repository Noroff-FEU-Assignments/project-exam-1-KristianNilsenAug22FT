document.addEventListener("DOMContentLoaded", function () {
    const allPostsContainer = document.getElementById("allPostsContainer");
    const showMoreButton = document.getElementById("showMoreButton");
    let currentPage = 1;
  
    function fetchPosts() {
      const apiUrl = "https://norwegiantechie.icu/wp-json/wp/v2/posts";
  
      fetch(`${apiUrl}?page=${currentPage}&per_page=10`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((post) => {
            const postItem = createPostItem(post);
            allPostsContainer.appendChild(postItem);
          });
  
          if (data.length < 9) {
            showMoreButton.style.display = "none";
          }
        })
        .catch((error) => console.log(error));
    }
  
    function createPostItem(post) {

      const imageUrl = extractImageUrl(post.content.rendered);
      const altText = extractAltText(post.content.rendered);
        
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
  