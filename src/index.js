import React from 'react'
import ReactDOM from 'react-dom'
import 'assets/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

import { onSnapshot } from 'mobx-state-tree'

import { WishList } from 'models/WishList'

let initialState = {
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

if (localStorage.getItem('wishlistapp')) {
  const json = JSON.parse(localStorage.getItem('wishlistapp'))
  if (WishList.is(json)) {
    initialState = json
  }
}

const wishList = WishList.create(initialState)

onSnapshot(wishList, (snapshot) => {
  localStorage.setItem('wishlistapp', JSON.stringify(snapshot))
})

ReactDOM.render(
  <React.StrictMode>
    <App wishList={wishList} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
