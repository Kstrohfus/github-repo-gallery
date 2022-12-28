//main div overview of everything
const mainOverview = document.querySelector(".overview");
const username = "kstrohfus"
const repoList = document.querySelector(".repo-list");
const ReposElement = document.querySelector(".repos");
const RepoInfomation = document.querySelector(".repo-data");
const backBtn = document.querySelector("button");
const filterInput = document.querySelector("input")


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
      <p><strong>Bio:</strong> ${"Web Developer"}</p>
      <p><strong>Location:</strong> ${"Phoenix, AZ"}</p>
      <p><strong>Number of public repos:</strong> ${73}</p>
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
    filterInput.classList.remove("hide");

for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(repoItem);
}
};

//event listener to get info my clicking name
repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
       //console.log(repoName)
       selectedRepoInfo(repoName);
    }
});

//function to recieve the info for clicking name of repo

const selectedRepoInfo = async function (repoName){ const selectInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
const repoInfo = await selectInfo.json();
console.log(repoInfo);

//get languages
const fetchLanguages = await fetch(repoInfo.languages_url);
const languageData = await fetchLanguages.json();

//console.log(languageData)
//list languages create array
const languages = [];
for(const language in languageData){
languages.push(language);

//console.log(languages)
  specificRepoInfo(repoInfo, languages)
}
};

const specificRepoInfo = function (repoInfo, languages) {
RepoInfomation.innerHTML = "";
RepoInfomation.classList.remove("hide");
ReposElement.classList.add("hide");
backBtn.classList.remove("hide");

const div = document.createElement("div")
div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

    RepoInfomation.append(div);

}
backBtn.addEventListener("click", function (){
    ReposElement.classList.remove("hide");
    RepoInfomation.classList.add("hide");
    backBtn.classList.add("hide");

})

//search event to make them show up or dissapear
filterInput.addEventListener("input", function (e) { 
    const searchText = e.target.value;
    //console.log(searchText) 
    const repos = document.querySelectorAll(".repo")
    const searchToLowercase = searchText.toLowerCase();

    for (const repo of repos) {
       const repoLowercase = repo.innerText.toLowerCase();
    if (repoLowercase.includes(searchToLowercase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
    }

});
