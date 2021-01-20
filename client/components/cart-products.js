import React from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'

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
      <Card>
        <Image src={imageUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span>${parseInt(price || 0) / 100}</span>
          </Card.Meta>
          <Card.Description>THIS IS TEXT</Card.Description>
        </Card.Content>
      </Card>
      {/* <h1>{name}</h1> */}
      {/* <h4>{parseInt(price || 0) / 100}</h4> */}
      {/* <img src={imageUrl} width="320" height="320" />
      <h3>${parseInt(price || 0) / 100}</h3> */}
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
          type="button"
          name={decreaseName}
          onClick={e => handleEdit(e, id)}
        >
          -
        </button>
      </div>

      {/* <button>{RemoveButton}</button> */}
    </div>
  )
}
