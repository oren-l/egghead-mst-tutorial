import React from 'react'
import ReactDOM from 'react-dom'
import 'assets/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

import { getSnapshot } from 'mobx-state-tree'

import { Group } from 'models/Group'

const initialState = {
  users: {}
}

let group = Group.create(initialState)

function renderApp () {
  return ReactDOM.render(
    <React.StrictMode>
      <App group={group} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

renderApp()

console.log('loaded!')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    // new component
    renderApp()
  })

  module.hot.accept(['./models/WishList.js'], () => {
    // new model definitions
    const snapshot = getSnapshot(group)
    group = Group.create(snapshot)
    renderApp()
  })
}
