import React from 'react'
import { branch, renderComponent } from 'recompose'

function Preloader() {
  return <div>Loading...</div>
}

export default branch(function(props) {
  return props.data.loading
}, renderComponent(Preloader))
