import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {thunkfetchSingleProduct} from '../store/single-product-reducer'
import {fetchCart} from '../store/cart-reducer'
import {thunkAddToCart} from '../store/cart-reducer'
import {NotFound} from './not-found'
import {Container, Header, Image, Button, Divider} from 'semantic-ui-react'

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
          <Container>
            <div className="padding">
              <Container textAlign="center">
                <Header as="h1">{product.name}</Header>
              </Container>
            </div>
            <div className="ui divider" />
            <Container textAlign="center">
              <Image src={product.imageUrl} size="medium" centered />
              {quantity === 0 ? (
                <p className="textSize">This cutie is out of stock!</p>
              ) : (
                <p className="textSize">Quantity: {quantity}</p>
              )}
              <p className="textSize">${price / 100}</p>
            </Container>

            <Container textAlign="center">
              <div>
                <Button
                  floated="center"
                  basic
                  color="purple"
                  size="huge"
                  className="single-pets-button"
                >
                  <Link to="/products" style={{color: '#7943E7'}}>
                    <div>Back to All Pets</div>
                  </Link>
                </Button>
                {quantity === 0 ? (
                  <Button disabled size="huge" className="single-pets-button">
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    floated="center"
                    basic
                    color="pink"
                    size="huge"
                    className="single-pets-button"
                  >
                    <div
                      onClick={() =>
                        this.props.addToCart(product, this.props.cart.id)
                      }
                    >
                      Add to Cart
                    </div>
                  </Button>
                )}
              </div>
            </Container>
          </Container>
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
