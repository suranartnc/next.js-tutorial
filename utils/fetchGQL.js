import 'isomorphic-fetch'

const api = 'http://localhost:5000/graphql'

export default function fetchGQL(query) {
  return fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: null,
      operationName: null
    })
  }).then(res => res.json())
}
