import 'isomorphic-fetch'

const api = 'http://localhost:5000/graphql'

export default function fetchGQL(query, variables = null) {
  return fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables,
      operationName: null
    })
  }).then(res => res.json())
}
