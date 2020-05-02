import React, { useState } from 'react'
import { observer } from 'mobx-react'
import logo from 'assets/santa-claus.png'
import WishListView from './WishListView'

function App ({
  group
}) {
  const [selectedUserId, setSelectedUserId] = useState(null)
  const handleSelectUser = (event) => {
    setSelectedUserId(event.target.value)
  }

  const selectedUser = group.users.get(selectedUserId)
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='App-title'>WishList</h1>
      </header>
      <button onClick={group.reload}>Reload</button>
      <select
        onChange={handleSelectUser}
        defaultValue={0}
      >
        <option disabled value={0}>- Select User -</option>
        {
          Array.from(group.users.values()).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))
        }
      </select>
      <button onClick={group.drawLots}>Draw lots</button>
      {selectedUser && <User user={selectedUser} />}
    </div>
  )
}

const User = observer(({ user }) => (
  <div>
    <WishListView wishList={user.wishList} />
    <button onClick={user.getSuggestions}>Suggestions</button>
    <hr />
    <h2>{user.recipient ? user.recipient.name : ''}</h2>
    {user.recipient && <WishListView wishList={user.recipient.wishList} readonly />}
  </div>
))

export default observer(App)
