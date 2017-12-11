require('isomorphic-fetch')

const api = 'http://localhost:4000'

export default function fetchAPI(url) {
  return fetch(`${api}${url}`)
    .then(res => res.json())
    .then(json => {
      return {
        data: json
      }
    })
}
