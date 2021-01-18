import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, removeCartThunk} from '../store/cart-reducer'
import {CartProducts} from './cart-products'

export class Cart extends React.Component {
  constructor() {
    super()
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchCart(this.props.user.id)
    }
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps.cart !== )
  // }

  deleteProduct(productId) {
    this.props.removeCartThunk(productId)
  }

  render() {
    const products = this.props.cart.products || []

    return (
      <div>
        <h3 className="ui center aligned header">YOUR CART</h3>
        {products.length === 0 ? (
          <h5 className="cart-header">Cart is Empty!</h5>
        ) : (
          <div className="cart-header">
            You have {products.length} in the cart.
          </div>
        )}
        <div>
          {products.map(product => {
            const cartItem = product.order_detail
            return (
              <div key={product.id}>
                <CartProducts
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  quantityOrdered={cartItem.quantity}
                />
                <button
                  className="trash alternate outline icon"
                  type="button"
                  onClick={() => this.deleteProduct(product.id)}
                >
                  Delete Pet
                </button>
                {/* <i class="trash alternate outline icon"></i> */}
              </div>
            )
          })}
        </div>

        <div className="cart">
          <div className="subTotal">
            {/* <div>{CartProducts.reduce(total, currentVal) => total +}</div> */}
          </div>
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
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
