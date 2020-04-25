import React, { useState } from 'react'
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
      {
        selectedUser && (
          <WishListView wishList={selectedUser.wishList} />
        )
      }
    </div>
  )
}

export default App
