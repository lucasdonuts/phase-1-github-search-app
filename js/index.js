// Accept: application/vnd.github.v3+json

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#github-form');
  const userList = document.querySelector('#user-list')

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchSearchResults(e.target.search.value)
    .then(data => renderSearchResults(data.items))

    searchForm.reset();
  })

  // Search function
  function fetchSearchResults(name) {
    return fetch(`https://api.github.com/search/users?q=${name}`)
    .then(res => res.json())
  }

  // Displaying search results
  function renderSearchResults(results) {
    results.forEach((result) => {
      createUserCard(result);
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

    userList.append(li)
    li.append(link)
    link.append(img, h2)
  }

})