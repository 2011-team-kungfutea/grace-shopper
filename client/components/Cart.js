import React from 'react'
import {fetchCart} from '../store/cart-reducer'
import CartProducts from './CartProducts'

export class Cart extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        {products.map(product => {
          return (
            <CartProducts
              key={product.id}
              name={product.name}
              price={product.price}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
