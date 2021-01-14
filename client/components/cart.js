import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart-reducer'
import {CartProducts} from './cart-products'

export class Cart extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchCart(this.props.user.id)
    }
  }

  render() {
    const products = this.props.cart.products || []
    console.log('products: ', products)
    return (
      <div>
        {products.map(product => {
          const cartItem = product.order_detail
          return (
            <CartProducts
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              quantityOrdered={cartItem.quantity}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
