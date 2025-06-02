let input = document.querySelector(".username");
let button = document.querySelector("button");

let image = document.querySelector(".image img");
let name = document.querySelector(".right h4");
let usernameTag = document.querySelector(".right h6");
let bio = document.querySelector(".right p");
let followersBox = document.querySelector(".followers");
let developer = document.querySelector(".right h5");
let content = document.querySelector(".content");
let goto = document.querySelector(".goto");


// Show loading skeletons
function showLoader() {
    content.classList.add("Loading...");
    name.innerText = "Loading...";
    usernameTag.innerText = "Loading...";
    bio.innerText = "Loading...";
    goto.innerHTML = "Loading..."
    followersBox.innerHTML = `
        <p>Loading...</p>
        <p>Loading...</p>
        <p>Loading...</p>
        <p>Loading...</p>
   
    `;
}

// Hide loader (restore)
function hideLoader() {
    content.classList.remove("loading");
}

button.addEventListener("click", function () {
    let username = input.value.trim();
    if (!username) return;

    showLoader(); // show fake content while loading

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("User not found");
            }
            return response.json();
        })
        .then(data => {
            image.src = data.avatar_url || "";
            name.innerText = data.name || "No Name Provided";
            usernameTag.innerText = "@" + data.login;
            bio.innerText = data.bio || "No bio available";
            followersBox.innerHTML = `
                <p>Public Repos : ${data.public_repos}</p>
                <p>Followers : ${data.followers}</p>
                <p>Following : ${data.following}</p>
                <p>Location : ${data.location || "Not Available"}</p>
            `;
            goto.innerHTML="View Profile"
             goto.setAttribute('href' ,data.html_url);
        })
        .catch(error => {
            name.innerText = "User Not Found";
            usernameTag.innerText = "@unknown";
            bio.innerText = "Sorry, couldn't fetch user data.";
            followersBox.innerHTML = `
                <p>Public Repos : --</p>
                <p>Followers : --</p>
                <p>Following : --</p>
                <p>Location : --</p>
            `;
            image.src = "https://cdn-icons-png.flaticon.com/512/6134/6134065.png"; // error image
            developer.innerText = `(Developed by : Rohit Bhardwaj)`;
        })
        .finally(() => {
            hideLoader();
        });
});
