// onSignIn(googleUser)
// signOut() 
// fetchPosts()
// renderPosts(posts)
// fetchTags()
// renderTags(tags)
// filterPostsByTag(tag) 

// Google Sign-In Initialization

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Name: ' + profile.getName());
  }
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  
  // Fetching and rendering blog posts
  function fetchPosts() {
    // Replace this with your API call to fetch blog posts
    $.getJSON("https://api.example.com/posts", function (data) {
      renderPosts(data);
    });
  }
  
  function renderPosts(posts) {
    var postContainer = $("#post-container");
    postContainer.empty();
  
    posts.forEach(function (post) {
      var postHtml = `
        <div class="card mb-4">
          <div class="card-body">
            <h2 class="card-title">${post.title}</h2>
            <p class="card-text">${post.content}</p>
            <div class="tags">
              ${post.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join(' ')}
            </div>
          </div>
          <div class="card-footer text-muted">
            Posted on ${new Date(post.date).toLocaleDateString()}
          </div>
        </div>
      `;
      postContainer.append(postHtml);
    });
  }
  
  // Fetching and rendering tag cloud
  function fetchTags() {
    // Replace this with your API call to fetch tags
    $.getJSON("https://api.example.com/tags", function (data) {
      renderTags(data);
    });
  }
  
  function renderTags(tags) {
    var tagCloud = $("#tag-cloud");
    tagCloud.empty();
  
    tags.forEach(function (tag) {
      var fontSize = 14 + (tag.count * 2); // You can adjust the scaling factor as needed
      var tagHtml = `<a href="#" class="tag" data-tag="${tag.name}" style="font-size: ${fontSize}px;">${tag.name}</a> `;
      tagCloud.append(tagHtml);
    });
  
    // Attach click event listeners to tags
    $(".tag").on("click", function (e) {
      e.preventDefault();
      var tag = $(this).data("tag");
      filterPostsByTag(tag);
    });
  }
  
  // Filtering posts by tag
  function filterPostsByTag(tag) {
    // Replace this with your API call to fetch posts by tag
    $.getJSON(`https://api.example.com/posts?tag=${tag}`, function (data) {
      renderPosts(data);
    });
  }
  
  // Initial page load
  $(document).ready(function () {
    fetchPosts();
    fetchTags();
  });