import React from 'react'
import {connect} from 'react-redux'
import {Form, Input, Image, Button, TextArea, Message} from 'semantic-ui-react'
import {CartProducts} from './cart-products'
import {
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  editQuantityInCart,
  removeCartThunk
} from '../store/cart-reducer'

const CheckoutForm = props => {
  //   const {
  //     handleChange,
  //     handleSubmit,
  //     imageUrl,
  //     name,
  //     category,
  //     quantity,
  //     price,
  //     description,
  //     submittedForm,
  //     errors
  //   } = props

  function handleSubmit() {
    console.log('yo')
  }

  function handleChange() {
    console.log('yoyo')
  }

  function handleEdit(event, productId) {
    const name = event.target.name
    const changeType =
      name === INCREASE_CART_ITEM ? INCREASE_CART_ITEM : DECREASE_CART_ITEM
    props.editCart(changeType, productId, this.props.cart.id)
  }

  function deleteProduct(productId) {
    props.removeCartThunk(productId)
  }

  const order_details = props.cart.order_details || []
  return (
    <div className="checkout-form-page">
      {/* <Message
            className="checkout-message"
            hidden={submittedForm === 0}
            error={errors.length !== 0}
            success={errors.length === 0}
            header={
            errors.length
                ? 'There were some errors with your submission'
                : 'Product was added successfully'
            }
            list={errors}
        /> */}
      <div className="checkout">
        <Form className="checkout-form" onSubmit={handleSubmit}>
          <Form.Field>
            <label>First Name</label>
            <Input
              type="text"
              name="firstName"
              //value={firstName || ''}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <Input
              type="text"
              name="lastName"
              //value={lastName || ''}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <Input
              type="text"
              name="address"
              //value={address}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone Number</label>
            <Input
              type="number"
              name="phoneNumber"
              //value={phoneNumber}
              onChange={handleChange}
            />
          </Form.Field>
          {order_details.map(item => {
            // const cartItem = product.order_detail
            return (
              <div key={item.productId}>
                <CartProducts
                  {...item.product}
                  quantityOrdered={item.quantity}
                  handleEdit={handleEdit}
                  increaseName={INCREASE_CART_ITEM}
                  decreaseName={DECREASE_CART_ITEM}
                />
                <button
                  type="button"
                  onClick={() => deleteProduct(item.productId)}
                >
                  Delete Pet
                </button>
              </div>
            )
          })}
          <Button className="spacepurple" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  editCart: (changeType, productId, orderId) =>
    dispatch(editQuantityInCart(changeType, productId, orderId)),
  removeCartThunk: productId => dispatch(removeCartThunk(productId))
})

export default connect(mapState, mapDispatch)(CheckoutForm)
