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
    if (this.props.user.id) {
      this.props.fetchCart(this.props.user.id)
    }
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
    const products = this.props.cart.products || []
    return (
      <div>
        {products.length === 0 ? (
          <div className="cart-header">Cart is Empty!</div>
        ) : (
          <div className="cart-header">
            You have {products.length} in the cart.
          </div>
        )}

        {products.map(product => {
          const cartItem = product.order_detail
          return (
            <div key={product.id}>
              <CartProducts
                {...product}
                quantityOrdered={cartItem.quantity}
                handleEdit={this.handleEdit}
                increaseName={INCREASE_CART_ITEM}
                decreaseName={DECREASE_CART_ITEM}
              />
              <button
                type="button"
                onClick={() => this.deleteProduct(product.id)}
              >
                Delete Pet
              </button>
            </div>
          )
        })}

        <div className="cart">
          <div className="subTotal">
            {/* <div>{CartProducts.reduce(total, currentVal) => total +}</div> */}
          </div>
        </div>

        <div>
          <ul>
            <button className="ui inverted purple button" type="submit">
              Checkout
            </button>
          </ul>
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
