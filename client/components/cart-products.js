import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

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
        </Card.Content>
      </Card>

      <div className="edit-cart-button-row">
        <Button
          type="button"
          name={increaseName}
          onClick={e => handleEdit(e, id)}
        >
          +
        </Button>
        <p>{quantityOrdered}</p>
        <Button
          type="button"
          name={decreaseName}
          onClick={e => handleEdit(e, id)}
        >
          -
        </Button>
      </div>
    </div>
  )
}
