document.addEventListener("DOMContentLoaded", function () {
    displayBlogs();
});

document.getElementById("messageForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var blogTitle = document.getElementById("title").value;
    var blogContent = document.getElementById("content").value;
    var blogContainer = document.getElementById("blogContainer");

    var newBlogTitle = document.createElement("h2");
    newBlogTitle.classList.add("blog-title");
    newBlogTitle.textContent = blogTitle;

    var newBlogContent = document.createElement("p");
    newBlogContent.classList.add("blog-content");
    newBlogContent.textContent = blogContent;

    blogContainer.appendChild(newBlogTitle);
    blogContainer.appendChild(newBlogContent);

    saveBlog(blogTitle, blogContent);

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
});

function saveBlog(title, content) {
    var blogs = getStoredBlogs();
    var currentTime = new Date().toLocaleString();
    blogs.push({ title: title, content: content, timestamp: currentTime });
    localStorage.setItem("blogs", JSON.stringify(blogs));
}

function getStoredBlogs() {
    var storedBlogs = localStorage.getItem("blogs");
    return storedBlogs ? JSON.parse(storedBlogs) : [];
}

function handleCheckboxChange(event) {
    var checkboxId = event.target.id;
    var blogIndex = checkboxId.split("_")[1]; // Extract the blog index from the checkbox ID
    var blogs = getStoredBlogs();
    blogs[blogIndex].checked = event.target.checked; // Update the 'checked' property in the blog object
    localStorage.setItem("blogs", JSON.stringify(blogs));
}

function displayBlogs() {
    var blogs = getStoredBlogs();
    var blogContainer = document.getElementById("blogContainer");

    for (var i = 0; i < blogs.length; i++) {
        var blogTitle = blogs[i].title;
        var blogContent = blogs[i].content;
        var blogTimestamp = blogs[i].timestamp;
        var isChecked = blogs[i].checked || false; // Retrieve the 'checked' property from the blog object

        var newBlogCard = document.createElement("div");
        newBlogCard.classList.add("blog-card");

        var newBlogTitle = document.createElement("h1");
        newBlogTitle.classList.add("blog-title");
        newBlogTitle.textContent = blogTitle;

        var newBlogContent = document.createElement("p");
        newBlogContent.classList.add("blog-content");
        newBlogContent.textContent = blogContent;

        var newBlogTimestamp = document.createElement("p"); // Create a new paragraph element for the timestamp
        newBlogTimestamp.classList.add("blog-timestamp");
        newBlogTimestamp.textContent = "Created on " + blogTimestamp;

        var newCheckbox = document.createElement("input"); // Create the checkbox element
        newCheckbox.type = "checkbox"; // Set the checkbox type
        newCheckbox.id = "checkbox_" + i; // Assign a unique ID to each checkbox
        newCheckbox.checked = isChecked; // Set the 'checked' property of the checkbox
        newCheckbox.addEventListener("change", handleCheckboxChange); // Add an event listener to handle checkbox changes

        newBlogCard.appendChild(newBlogTitle);
        newBlogCard.appendChild(newBlogTimestamp);
        newBlogCard.appendChild(newBlogContent);
        newBlogCard.appendChild(newCheckbox);

        newBlogTitle.style.fontSize = "24px"; // Custom title font size
        newBlogTitle.style.marginBottom = "10px"; // Custom margin below title
        newBlogTitle.style.marginLeft = "50px"; // Custom margin below title
        newBlogTitle.style.backgroundColor = "white"; // Custom margin below title
        newBlogTitle.style.padding = "10px"; // Custom margin below title
        newBlogTitle.style.borderRadius = "15px"; // Custom margin below title
        newBlogTitle.style.width = "75%"; // Custom margin below title

        newBlogContent.style.fontSize = "16px"; // Custom content font size
        newBlogContent.style.lineHeight = "1.6"; // Custom line height for content
        newBlogContent.style.marginBottom = "20px"; // Custom margin below content
        newBlogContent.style.marginLeft = "57px"; // Custom margin below title
        newBlogContent.style.backgroundColor = "white"; // Custom margin below title
        newBlogContent.style.padding = "5px"; // Custom margin below title
        newBlogContent.style.borderRadius = "15px"; // Custom margin below title
        newBlogContent.style.width = "75%"; // Custom margin below title

        newBlogTimestamp.style.fontSize = "14px"; // Custom font size for timestamp
        newBlogTimestamp.style.marginBottom = "10px"; // Custom margin below timestamp
        newBlogTimestamp.style.marginLeft = "57px"; // Custom margin below timestamp

        newCheckbox.style.marginLeft = "57px"; // Custom margin for checkbox

        blogContainer.appendChild(newBlogCard);
    }
}