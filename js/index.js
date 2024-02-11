//Add Event Listeners
const form = document.querySelector("#github-form");
const nameList = document.querySelector("#user-list");
const repoList = document.querySelector("#repos-list");
const searchTypeBtn = document.querySelector("#searchType");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    nameList.innerText = "";
    repoList.innerText = "";
    searchMe(e);
})

//Functions
function searchMe(e) {
    let searchType = e.target.children[2].value;
    let searchInput = e.target.children[0];
    fetch(`https://api.github.com/search/${searchType}?q=${searchInput.value}`)
    .then(res => res.json())
    .then(obj => {
        if (searchType === "users") {
            let users = obj.items;
            for (let user of users) {
                userCard(user);
            }
        } else if (searchType === "repositories") {
            let repos = obj.items;
            repoCard(repos);
        }
    })
}
function userCard(user) {
    let newUser = document.createElement("div");
    newUser.className = "card";
    let userName = document.createElement("h2");
    let avatar = document.createElement("img");
    let link = document.createElement("a");
    link.innerText = "GitHub Site"
    link.href = user["html_url"];
    avatar.src = user["avatar_url"];
    newUser["login"] = user["login"];
    newUser["avatar_url"] = user["avatar_url"];
    newUser["html_url"] = user["html_url"];
    userName.innerText = user["login"];
    nameList.appendChild(newUser);
    newUser.appendChild(userName);
    newUser.appendChild(avatar);
    newUser.appendChild(link);
    newUser.addEventListener("click", (e) => {
        repoMe(e);
    })
}
function repoMe(e) {
    let userName = e.target.parentNode;
    nameList.innerText = ""
    userCard(userName);
    fetch(`https://api.github.com/users/${userName["login"]}/repos`)
    .then(res => res.json())
    .then(repos => {
        repoCard(repos);
    })
}
function repoCard(repos) {
    for (let repo of repos) {
        let repoBody = document.createElement("li");
        let repoLink = document.createElement("a");
        repoLink.innerText = repo["full_name"];
        repoLink.href = repo["html_url"]
        repoBody.appendChild(repoLink);
        repoList.appendChild(repoBody);
    }
}