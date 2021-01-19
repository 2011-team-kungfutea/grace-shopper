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

class CheckoutForm extends React.Component {
  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      errors: [],
      submittedForm: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      const errors = this.validateForm()
      if (!errors.length) {
        this.props.checkout({
          ...this.state
          // price: Math.floor(this.state.price * 100)
        })
        this.setState({
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
          errors: [],
          submittedForm: 1
        })
      } else {
        this.setState({
          errors: [...errors],
          submittedForm: 1
        })
      }
    } catch (error) {
      console.log('Unable to checkout', error)
    }
  }

  validateForm() {
    const errors = []
    const {firstName, lastName, address, phoneNumber} = this.state
    if (firstName === '' || firstName === null) {
      errors.push('You must include a first name.')
    }
    if (lastName === '' || lastName === null) {
      errors.push('You must include a last name.')
    }
    if (address === '' || address === null) {
      errors.push('You must include an address.')
    }
    if (phoneNumber === '' || phoneNumber === null) {
      errors.push('You must include a phone number.')
    }
    return errors
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEdit(event, productId) {
    const name = event.target.name
    const changeType =
      name === INCREASE_CART_ITEM ? INCREASE_CART_ITEM : DECREASE_CART_ITEM
    this.props.editCart(changeType, productId, this.props.cart.id)
  }

  deleteProduct(productId) {
    this.props.removeCartThunk(productId, this.props.cart.id)
  }
  render() {
    const order_details = this.props.cart.order_details || []
    const {submittedForm, errors} = this.state
    return (
      <div className="checkout-form-page">
        <Message
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
        />
        <div className="checkout">
          <Form className="checkout-form" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>First Name</label>
              <Input
                type="text"
                name="firstName"
                //value={firstName || ''}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Input
                type="text"
                name="lastName"
                //value={lastName || ''}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <Input
                type="text"
                name="address"
                //value={address}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <Input
                type="number"
                name="phoneNumber"
                //value={phoneNumber}
                onChange={this.handleChange}
              />
            </Form.Field>
            {order_details.map(item => {
              // const cartItem = product.order_detail
              return (
                <div key={item.productId}>
                  <CartProducts
                    {...item.product}
                    quantityOrdered={item.quantity}
                    handleEdit={this.handleEdit}
                    increaseName={INCREASE_CART_ITEM}
                    decreaseName={DECREASE_CART_ITEM}
                  />
                  <button
                    type="button"
                    onClick={() => this.deleteProduct(item.productId)}
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
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  editCart: (changeType, productId, orderId) =>
    dispatch(editQuantityInCart(changeType, productId, orderId)),
  removeCartThunk: (productId, orderId) =>
    dispatch(removeCartThunk(productId, orderId))
})

export default connect(mapState, mapDispatch)(CheckoutForm)
