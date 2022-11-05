//main div overview of everything
const mainOverview = document.querySelector(".overview")
const username = "kstrohfus"

const repoList = document.querySelector(".repo-list")


//Github user data fetch
const ghUser = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`)
    const data = await userInfo.json();

gitHubInfo(data);


};

ghUser();

//gitHub user info/ details fetch
const gitHubInfo = function (data) {
    const divInfo = document.createElement("div");
    
    divInfo.classList.add("user-info")
    divInfo.innerHTML = `<figure>
      <img alt="user avatar" src=${"https://avatars.githubusercontent.com/u/111642391?v=4"} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${"Kayla Strohfus"}</p>
      <p><strong>Bio:</strong> ${"Front End Web Development Student / Office Manager"}</p>
      <p><strong>Location:</strong> ${"Phoenix, AZ"}</p>
      <p><strong>Number of public repos:</strong> ${37}</p>
    </div>`

    mainOverview.append(divInfo);

    gitRepos();
}
//Github repo fetch
const gitRepos = async function () {
    const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRequest.json();

//console.log(repoData)

repoDisplayInfo(repoData);

};

//function to display repos on page
const repoDisplayInfo = function (repos) {
for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(repoItem);
}
};
