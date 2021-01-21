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
import {Link} from 'react-router-dom'
import {Segment} from 'semantic-ui-react'

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
    this.props.removeCartThunk(productId, this.props.cart.id)
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
      <div className="grid-container">
        <div>
          {cartItems.length === 0 ? (
            <h2 className="cart-header">Your Cart is Empty!</h2>
          ) : (
            <div className="cart-header">
              You have {cartItems.length} in the cart.
            </div>
          )}
        </div>
        {cartItems.map(item => {
          return (
            <div key={item.productId} className="ui teal segment">
              <CartProducts
                {...item.product}
                quantityOrdered={item.quantity}
                handleEdit={this.handleEdit}
                increaseName={INCREASE_CART_ITEM}
                decreaseName={DECREASE_CART_ITEM}
              />
              <div>
                <button
                  className="ui vertical animated button"
                  tabIndex="0"
                  type="button"
                  onClick={() => this.deleteProduct(item.productId)}
                >
                  <div className="visible content">Delete Pet</div>
                  <div className="hidden content">
                    <i aria-hidden="true" className="frown spacegreen icon" />
                  </div>
                </button>
              </div>
            </div>
          )
        })}

        <div className="cart">
          <h3 className="subTotal">
            Subtotal
            <div>
              $
              {cartItems.reduce((total, elm) => {
                return total + elm.price * elm.quantity
              }, 0) / 100}
            </div>
          </h3>
        </div>
        <div>
          <Segment>
            <Link to="/checkout-form">
              <button className="ui inverted purple button" type="submit">
                Checkout
              </button>
            </Link>
          </Segment>
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
    removeCartThunk: (productId, orderId) =>
      dispatch(removeCartThunk(productId, orderId)),
    fetchCart: userId => dispatch(fetchCart(userId)),
    editCart: (isIncreased, productId, orderId) =>
      dispatch(editQuantityInCart(isIncreased, productId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
