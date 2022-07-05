// Accept: application/vnd.github.v3+json

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#github-form');
  let searchResults;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchSearchResults(e.target.search.value)
    .then(data => searchResults = data.items)
    .then(() => console.log(searchResults))
  })

  function fetchSearchResults(name) {
    return fetch(`https://api.github.com/search/users?q=${name}`)
    .then(res => res.json())
  }

})