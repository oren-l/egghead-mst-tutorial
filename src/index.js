import React from 'react'
import ReactDOM from 'react-dom'
import 'assets/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

import { getSnapshot } from 'mobx-state-tree'

import { Group } from 'models/Group'

const initialState = {
  users: {
    a342: {
      id: 'a342',
      name: 'Homer',
      gender: 'm'
    },
    '5fc2': {
      id: '5fc2',
      name: 'Marge',
      gender: 'f'
    },
    '663b': {
      id: '663b',
      name: 'Bart',
      gender: 'm'
    },
    '65aa': {
      id: '65aa',
      name: 'Maggie',
      gender: 'f'
    },
    ba32: {
      id: 'ba32',
      name: 'Lisa',
      gender: 'f'
    }
  }
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

console.log('loaded!', module.hot)

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
