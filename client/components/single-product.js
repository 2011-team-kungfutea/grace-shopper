import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkfetchSingleProduct} from '../store/single-product-reducer'
import {fetchCart} from '../store/cart-reducer'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props
      .fetchSingleProduct(this.props.match.params.productId)
      .then(() => {
        this.props.fetchCart(this.props.user.id)
      })
  }
  render() {
    const product = this.props.product
    const description = product.description || ''
    const quantity = product.quantity || 0
    //console.log(product)

    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} />
        <p>{description}</p>
        <p>Quantity: {quantity}</p>
        <Link to="/products">
          <div className="ui two bottom attached buttons">
            <div className="ui violet button">Back to All Pets</div>
            <div className="ui purple button">Adopt</div>
          </div>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(thunkfetchSingleProduct(id)),
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
