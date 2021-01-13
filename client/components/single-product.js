import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {thunkfetchSingleProduct} from '../store/single-product-reducer'

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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(thunkfetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
