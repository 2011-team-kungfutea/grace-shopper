import React from 'react'
import {connect} from 'react-redux'
import {
  editQuantityInCart,
  fetchCart,
  removeCartThunk,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM
} from '../store/cart-reducer'
import {CartProducts} from './cart-products'

export class Cart extends React.Component {
  constructor() {
    super()
    this.deleteProduct = this.deleteProduct.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) this.props.fetchCart(this.props.user.id)
  }

  deleteProduct(productId) {
    this.props.removeCartThunk(productId)
  }

  handleEdit(event, productId) {
    const name = event.target.name
    const changeType =
      name === INCREASE_CART_ITEM ? INCREASE_CART_ITEM : DECREASE_CART_ITEM
    this.props.editCart(changeType, productId, this.props.cart.id)
  }

  render() {
    const cartItems = this.props.cart.order_details || []
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart-header">Cart is Empty!</div>
        ) : (
          <div className="cart-header">
            You have {cartItems.length} in the cart.
          </div>
        )}

        {cartItems.map(item => {
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

        <div className="cart">
          <h3 className="subTotal">
            Subtotal
            <div>
              $
              {cartItems.reduce((total, elm) => {
                return (total + elm.price * elm.quantity)/100
              }, 0)}
            </div>
          </h3>
        </div>
        <div>
          <button className="ui inverted purple button" type="submit">
            Checkout
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user,
    item: state.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCartThunk: productId => dispatch(removeCartThunk(productId)),
    fetchCart: userId => dispatch(fetchCart(userId)),
    editCart: (isIncreased, productId, orderId) =>
      dispatch(editQuantityInCart(isIncreased, productId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
