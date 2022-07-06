// Accept: application/vnd.github.v3+json

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#github-form');
  const userList = document.querySelector('#user-list')

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    while(userList.firstChild) {
      userList.firstChild.remove()
    }

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

  function renderUserRepos(repoArray) {
    
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
    link.target = '_blank'

    userList.append(li)
    li.append(img, h2, link)

    li.addEventListener('click', (e) => {
      fetchUserRepos(user.login)
      .then(data => renderUserRepos(data))
    })
  }

})