// Based on your project structure, I will provide a simple main.js file that will include basic functionality for creating, filtering, and displaying blog posts. 
// Please note that this main.js file will require corresponding HTML and server-side implementations for a fully functional system. 
// This code is focused on the client-side behavior of your website.

// This main.js file includes the following functionality:

// Loading and displaying blog posts on the page.
// Filtering blog posts based on a tag entered by the user.
// Dynamically creating HTML elements for each blog post.
// Please note that the fetch request to /posts in the loadBlogPosts function assumes you have a server-side route set up to return blog posts in JSON format. 
// You'll need to implement this route in your routes/posts.js file accordingly.

// Additionally, the main.js file assumes that you have specific HTML elements on your page with the corresponding IDs, such as tag-filter-form, tag-filter-input, and post-container. 
// Make sure to include these elements in the appropriate handlebars template files.


document.addEventListener('DOMContentLoaded', () => {
  const tagFilterForm = document.getElementById('tag-filter-form');
  const tagFilterInput = document.getElementById('tag-filter-input');
  const postContainer = document.getElementById('post-container');

  // Load all blog posts
  loadBlogPosts();

  // Add event listener for tag filtering
  tagFilterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loadBlogPosts(tagFilterInput.value);
  });

  async function loadBlogPosts(tag = '') {
    try {
      const response = await fetch(`/posts?tag=${encodeURIComponent(tag)}`);
      const posts = await response.json();
      displayBlogPosts(posts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  }

  function displayBlogPosts(posts) {
    postContainer.innerHTML = '';

    for (const post of posts) {
      const postElement = createPostElement(post);
      postContainer.appendChild(postElement);
    }
  }

  function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const title = document.createElement('h2');
    title.textContent = post.title;
    postElement.appendChild(title);

    const tags = document.createElement('p');
    tags.textContent = post.tags.join(', ');
    postElement.appendChild(tags);

    const content = document.createElement('div');
    content.innerHTML = post.content;
    postElement.appendChild(content);

    return postElement;
  }
});

