const loadingText = document.querySelector('.loading-text');

async function fetchPageContent() {
    try {
      const response = await fetch('https://norwegiantechie.icu/wp-json/wp/v2/pages/57');
      const page = await response.json();
      renderPageContent(page);
    } catch (error) {
      console.error('Error fetching page content:', error);
    }
  }

  function renderPageContent(page) {
    const { title, content } = page;
  
    const heading = document.createElement('h2');
    heading.textContent = title.rendered;
  
    const paragraph = document.createElement('p');
    paragraph.innerHTML = content.rendered;
  
    const container = document.getElementById('aboutContent');
    container.appendChild(heading);
    container.appendChild(paragraph);
    loadingText.style.display = 'none';
  }
  

  fetchPageContent()