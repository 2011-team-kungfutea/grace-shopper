import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkfetchSingleProduct} from '../store/single-product-reducer'
import {AddToCart} from './add-to-cart'
import {addToCart} from '../store/cart-reducer'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }
  render() {
    const product = this.props.product
    const description = product.description || ''
    const quantity = product.quantity || 0
    console.log(product)

    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} />
        <p>{description}</p>
        <p>Quantity: {quantity}</p>
        <Link to="/products">
          <div className="ui two bottom attached buttons">
            <div className="ui violet button">Back to All Pets</div>
            {/* <AddToCart /> */}
            <div
              onClick={() => this.props.addToCart(product)}
              className="ui purple button"
            >
              Add to Cart
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct,
    cartItems: state.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(thunkfetchSingleProduct(id)),
    addToCart: id => dispatch(addToCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
