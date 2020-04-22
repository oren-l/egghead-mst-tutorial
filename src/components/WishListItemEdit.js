import React, { Component } from 'react'
import { observer } from 'mobx-react'

class WishListItemEdit extends Component {
  render () {
    const { item } = this.props

    return (
      <div className='item-edit'>
        Thing: <input value={item.name} onChange={this.onNameChange} />
        <br />
        Price: <input value={item.price} onChange={this.onPriceChange} />
        <br />
        Image: <input value={item.image} onChange={this.onImageChange} />
        <br />
      </div>
    )
  }

  onNameChange = (event) => {
    const newName = event.target.value
    this.props.item.changeName(newName)
  }

  onPriceChange = (event) => {
    const newPrice = parseFloat(event.target.value)
    if (!isNaN(newPrice)) {
      this.props.item.changePrice(newPrice)
    }
  }

  onImageChange = (event) => {
    const newImage = event.target.value
    this.props.item.changeImage(newImage)
  }
}

export default observer(WishListItemEdit)
