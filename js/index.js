// Accept: application/vnd.github.v3+json

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#github-form');
  const userList = document.querySelector('#user-list')
  const repoList = document.querySelector('#repos-list')

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    clearUserList();
    clearRepoList();

    fetchSearchResults(e.target.search.value)
    .then(data => renderSearchResults(data.items))

    searchForm.reset();
  })

  // Fetch functions
  function fetchSearchResults(name) {
    return fetch(`https://api.github.com/search/users?q=${name}`)
      .then(res => res.json())
  }

  function fetchUserRepos(userLogin) {
    return fetch(`https://api.github.com/users/${userLogin}/repos`)
      .then(res => res.json())
  }

  // Render functions
  function renderSearchResults(results) {
    results.forEach((result) => {
      createUserCard(result);
    })
  }

  function renderRepoList(repos) {
    clearRepoList();
    repoList.style.display = 'block';
    repos.forEach(repo => {
      const owner = document.querySelector(`#${repo.owner.login}`)
      const link = document.createElement('a')
      const name = document.createElement('p')

      console.log(repo)

      link.href = repo.html_url
      link.target = '_blank'
      link.className = 'repo-url'
      name.className = 'repo-name'
      name.textContent = repo.name

      link.append(name)
      repoList.append(link)
      repoList.style.display = 'block'
    })
  }

  function createUserCard(user) {
    const li = document.createElement('li')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const link = document.createElement('a')

    li.className = 'user-card'
    li.id = user.login
    h2.innerText = user.login
    img.src = user.avatar_url
    img.className = 'user-img'
    link.href = `https://www.github.com/${user.login}`
    link.innerText = 'GitHub'
    link.className = 'github'
    link.target = '_blank'

    userList.append(li)
    li.append(img, h2, link)

    li.addEventListener('click', (e) => {
      // Clear user list, but keep selected user
      clearUserList();
      userList.append(li)

      fetchUserRepos(user.login)
      .then(renderRepoList)
    })
  }

  function clearRepoList() {
    while(repoList.firstChild) {
      repoList.firstChild.remove();
    }
    
    repoList.style.display = 'none';
  }

  function clearUserList() {
    while(userList.firstChild) {
      userList.firstChild.remove()
    }
  }
})