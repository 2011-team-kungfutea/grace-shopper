import React from 'react'

export const CartProducts = props => {
  const {
    id,
    name,
    price,
    imageUrl,
    quantityOrdered,
    handleEdit,
    increaseName,
    decreaseName
  } = props
  return (
    <div>
      <h1>{name}</h1>
      <h4>{price / 100}</h4>
      <img src={imageUrl} />
      <div className="edit-cart-button-row">
        <button
          type="button"
          name={increaseName}
          onClick={e => handleEdit(e, id)}
        >
          +
        </button>
        <p>{quantityOrdered}</p>
        <button
          name={decreaseName}
          type="button"
          onClick={e => handleEdit(e, id)}
        >
          -
        </button>
      </div>

      {/* <button>{RemoveButton}</button> */}
    </div>
  )
}
