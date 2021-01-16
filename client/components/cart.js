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
    console.log('products: ', this.props.cart.products)
    console.log('users equal to ', this.props.user)
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
            <ul key={product.id}>
              <li>
                <CartProducts
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  quantityOrdered={cartItem.quantity}
                />
                <button
                  type="button"
                  onClick={() => this.deleteProduct(product.id)}
                >
                  Delete Pet
                </button>
                {/* <i class="trash alternate outline icon"></i> */}
              </li>
            </ul>
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
    fetchCart: () => dispatch(fetchCart()),
    removeCartThunk: productId => dispatch(removeCartThunk(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
