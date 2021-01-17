import React from 'react'

export const CartProducts = props => {
  const {
    name,
    price,
    imageUrl,
    quantityOrdered,
    handleIncreaseQuantity,
    handleDecreaseQuantity
  } = props
  return (
    <div>
      <h1>{name}</h1>
      <h4>{price}</h4>
      <img src={imageUrl} />
      <div className="edit-cart-button-row">
        <button onClick={handleIncreaseQuantity}>+</button>
        <p>{quantityOrdered}</p>
        <button onClick={handleDecreaseQuantity}>-</button>
      </div>

      {/* <button>{RemoveButton}</button> */}
    </div>
  )
}
