import React from 'react'
import {connect} from 'react-redux'

export class AddToCart extends React.Component {
  constructor() {
    super()
    this.state = {
      cartItems: []
    }
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false
    cartItems.forEach(item => {
      if (item.id === product.id) {
        item.quantity++
        alreadyInCart = true
      }
    })
    if (!alreadyInCart) {
      cartItems.push({...product, quantity: 1})
    }
  }
  //   handleSubmit = () => {}
  //   handleChange = event => {
  //     this.setState({
  //       imageUrl: event.target.value
  //     })
  //   }

  render() {
    return (
      <div>
        <div
          onClick={() => this.props.addToCart(product)}
          className="ui purple button"
        >
          Add to Cart
        </div>
      </div>
    )
  }
}

// const mapState = (state) => ({

// })

// const mapDispatch = (dispatch) => ({

// })

// export default connect(mapState,mapDispatch)(AddToCart);
