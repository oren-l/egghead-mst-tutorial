import { types, flow } from 'mobx-state-tree'

import { WishList } from './WishList'

const User = types
  .model({
    id: types.string,
    name: types.string,
    gender: types.enumeration('gender', ['m', 'f']),
    wishList: types.optional(WishList, {})
  })
  .actions((self) => ({
    getSuggestions: flow(function * () {
      const res = yield window.fetch(`http://localhost:3001/suggestions_${self.gender}`)
      const data = yield res.json()
      self.wishList.items.push(...data)
    })
  }))

export const Group = types.model({
  users: types.map(User)
})
