// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA42l7q0_0p_kN72Xtj5C56JQf3HQo0Zxg",
  authDomain: "blog-d96ae.firebaseapp.com",
  databaseURL: "https://blog-d96ae-default-rtdb.firebaseio.com",
  projectId: "blog-d96ae",
  storageBucket: "blog-d96ae.appspot.com",
  messagingSenderId: "388965476339",
  appId: "1:388965476339:web:b31195915c41b4850d1486",
  measurementId: "G-Q53SWVNP55"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
var database = firebase.database();

document.addEventListener("DOMContentLoaded", function() {
  displayBlogs();
});

document.getElementById("messageForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var blogTitle = document.getElementById("title").value;
  var blogContent = document.getElementById("content").value;
  var blogTimestamp = new Date().toLocaleString();

  var blogData = {
    title: blogTitle,
    content: blogContent,
    timestamp: blogTimestamp
  };

  saveBlogToDatabase(blogData);

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
});

function saveBlogToDatabase(blogData) {
  var blogsRef = database.ref("blogs");
  blogsRef.push(blogData)
    .then(function() {
      console.log("Blog data saved to Firebase Realtime Database.");
    })
    .catch(function(error) {
      console.log("Error saving blog data to Firebase Realtime Database:", error);
    });
}

function displayBlogs() {
  var blogsRef = database.ref("blogs");
  blogsRef.once("value", function(snapshot) {
    var blogContainer = document.getElementById("blogContainer");
    snapshot.forEach(function(childSnapshot) {
      var blogData = childSnapshot.val();
      var blogTitle = blogData.title;
      var blogContent = blogData.content;
      var blogTimestamp = blogData.timestamp;

      var newBlogCard = document.createElement("div");
      newBlogCard.classList.add("blog-card");

      var newBlogTitle = document.createElement("h1");
      newBlogTitle.classList.add("blog-title");
      newBlogTitle.textContent = blogTitle;

      var newBlogContent = document.createElement("p");
      newBlogContent.classList.add("blog-content");
      newBlogContent.textContent = blogContent;

      var newBlogTimestamp = document.createElement("p");
      newBlogTimestamp.classList.add("blog-timestamp");
      newBlogTimestamp.textContent = "Created on " + blogTimestamp;

      newBlogCard.appendChild(newBlogTitle);
      newBlogCard.appendChild(newBlogTimestamp);
      newBlogCard.appendChild(newBlogContent);

      blogContainer.appendChild(newBlogCard);
    });
  });
}
