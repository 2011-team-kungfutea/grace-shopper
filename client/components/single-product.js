import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkfetchSingleProduct} from '../store/single-product-reducer'
import {fetchCart} from '../store/cart-reducer'
import {thunkAddToCart} from '../store/cart-reducer'
import {NotFound} from './not-found'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }
  render() {
    const product = this.props.product || {}
    const description = product.description || ''
    const quantity = product.quantity || 0
    const price = product.price || 0
    if (!product.id) {
      return <NotFound />
    } else {
      return (
        <div>
          <h1>{product.name}</h1>
          <img src={product.imageUrl} />
          <p>{description}</p>
          <p>Quantity: {quantity}</p>
          <p>${price / 100}</p>

          <div className="ui two bottom attached buttons">
            <Link to="/products">
              <div className="ui violet button">Back to All Pets</div>
            </Link>
            <div
              onClick={() => this.props.addToCart(product, this.props.cart.id)}
              className="ui purple button"
            >
              Add to Cart
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct,
    cartItems: state.cartItems,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(thunkfetchSingleProduct(id)),
    fetchCart: userId => dispatch(fetchCart(userId)),
    addToCart: (product, orderId) => dispatch(thunkAddToCart(product, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
