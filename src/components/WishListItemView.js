import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree'

import WishListItemEdit from './WishListItemEdit'

class WishListItemView extends Component {
  constructor () {
    super()
    this.state = {
      isEditing: false
    }
  }

  render () {
    const { item } = this.props
    return (
      <li className='item'>
        {
          this.state.isEditing
            ? (
              <>
                <WishListItemEdit item={this.state.clone} />
                <button onClick={this.handleEditSave}>💾</button>
                <button onClick={this.handleEditCancel}>❎</button>
              </>
            )
            : (
              <>
                {item.image && <img src={item.image} />}
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <span>
                  <button onClick={this.handleEditToggle}>✏</button>
                  <button onClick={item.remove}>❎</button>
                </span>
              </>
            )
        }
      </li>
    )
  }

  handleEditToggle = () => {
    this.setState({
      isEditing: true,
      clone: clone(this.props.item)
    })
  }

  handleEditCancel = () => {
    this.setState({ isEditing: false })
  }

  handleEditSave = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone))
    this.setState({
      isEditing: false,
      clone: null
    })
  }
}

export default observer(WishListItemView)
