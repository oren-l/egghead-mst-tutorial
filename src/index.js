import React from 'react'
import ReactDOM from 'react-dom'
import 'assets/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

import { onSnapshot, getSnapshot } from 'mobx-state-tree'

import { WishList } from 'models/WishList'

const initialState = {
  items: [
    {
      name: 'LEGO Mindstorms EV3',
      price: 349.95,
      image: 'https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg'
    },
    {
      name: 'Miracles - C.S. Lewis',
      price: 12.91,
      image:
              'https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg'
    }
  ]
}

let wishList = WishList.create(initialState)

function renderApp () {
  return ReactDOM.render(
    <React.StrictMode>
      <App wishList={wishList} />
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
    const snapshot = getSnapshot(wishList)
    wishList = WishList.create(snapshot)
    renderApp()
  })
}
