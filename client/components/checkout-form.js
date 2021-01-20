import React from 'react'
import {connect} from 'react-redux'
import {Form, Input, Button, Message, Header} from 'semantic-ui-react'
import {CartProducts} from './cart-products'
import {
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  editQuantityInCart,
  removeCartThunk,
  checkoutThunk,
  guestCheckoutThunk
} from '../store/cart-reducer'

class CheckoutForm extends React.Component {
  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: '',
      payment: '',
      paymentYear: '',
      errors: [],
      submittedForm: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.setState({...this.props.user})
    }
  }

  componentDidUpdate(prevProps) {
    const {user} = this.props
    if (prevProps.user !== user) {
      if (this.props.user.id) {
        this.setState({
          ...this.props.user
        })
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      const errors = this.validateForm()
      if (!errors.length) {
        this.props.checkout(
          {
            formData: {
              ...this.state,
              phoneNumber: this.state.phoneNumber.toString()
            },
            cart: {
              ...this.props.cart,
              subtotal: this.props.cart.order_details.reduce((total, elm) => {
                return total + elm.price * elm.quantity
              }, 0)
            }
          },
          this.props.cart.id
        )
        this.setState({
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
          email: '',
          payment: '',
          paymentYear: '',
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
    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      payment,
      paymentYear
    } = this.state
    if (firstName === '' || firstName === null) {
      errors.push('You must include a first name.')
    }
    if (lastName === '' || lastName === null) {
      errors.push('You must include a last name.')
    }
    if (address === '' || address === null) {
      errors.push('You must include an address.')
    }
    if (
      phoneNumber === '' ||
      phoneNumber === null ||
      phoneNumber.length !== 10
    ) {
      errors.push('You must include a valid phone number.')
    }
    if (email === '' || email === null) {
      errors.push('You must include an email address.')
    }
    if (payment === '' || payment === null || payment.length !== 16) {
      errors.push('You must include a valid visa, mastercard, or discover card')
    }
    if (paymentYear === '' || paymentYear.length !== 4) {
      errors.push('You must include a valid payment expiration year')
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
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      payment,
      paymentYear,
      submittedForm,
      errors
    } = this.state
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
              : 'Checkout completed successfully.'
          }
          list={errors}
        />
        <Header as="h2">Checkout</Header>
        <div className="checkout">
          <Form className="checkout-form" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>First Name</label>
              <Input
                type="text"
                name="firstName"
                value={firstName || ''}
                placeholder="Given name"
                // readOnly={!!firstName}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Input
                type="text"
                name="lastName"
                value={lastName || ''}
                placeholder="Surname"
                // readOnly={!!lastName}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <Input
                type="text"
                name="address"
                value={address || ''}
                placeholder="Inlcude galactic region"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <Input
                type="number"
                name="phoneNumber"
                value={phoneNumber || ''}
                placeholder="Intergalactic ext."
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                value={email || ''}
                type="email"
                name="email"
                placeholder="Electronic-mail"
                // readOnly={userEmail.length > 0}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Credit Card</label>
              <Input
                type="number"
                name="payment"
                placeholder="Card #"
                value={payment || ''}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <div className="fourteen wide field">
                <label>Expiration</label>
                <div className="two fields">
                  <div className="field">
                    <select
                      className="ui fluid search dropdown"
                      name="paymentMonth"
                    >
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="field">
                    <input
                      type="text"
                      name="paymentYear"
                      maxLength="4"
                      placeholder="Year"
                      value={paymentYear || ''}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </Form.Field>
            <div className="cart">
              <h3 className="subTotal">
                Subtotal
                <div>
                  $
                  {this.props.cart.order_details.reduce((total, elm) => {
                    return total + elm.price * elm.quantity
                  }, 0) / 100}
                </div>
              </h3>
            </div>
            <Button className="spacepurple" type="submit">
              Submit
            </Button>
          </Form>
          <div className="checkout-cart">
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
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  editCart: (changeType, productId, orderId) =>
    dispatch(editQuantityInCart(changeType, productId, orderId)),
  removeCartThunk: (productId, orderId) =>
    dispatch(removeCartThunk(productId, orderId)),
  checkout: (checkoutData, orderId) => {
    if (orderId) {
      dispatch(checkoutThunk(orderId, checkoutData))
    } else {
      dispatch(guestCheckoutThunk(checkoutData))
    }
  }
})

export default connect(mapState, mapDispatch)(CheckoutForm)
