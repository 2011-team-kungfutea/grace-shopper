import React from 'react'
import {connect} from 'react-redux'
import {ProductForm} from './product-form'
import {
  thunkfetchSingleProduct,
  thunkUpdateSingleProduct
} from '../store/single-product-reducer'
import {Container, Header} from 'semantic-ui-react'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: '',
      category: '',
      quantity: 0,
      price: 0.01,
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product !== this.props.product) {
      this.setState({...this.props.product})
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      this.props.updateProduct({
        ...this.state,
        price: Math.floor(this.state.price * 100)
      })
    } catch (error) {
      console.log('Unable to edit product', error)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {product} = this.props
    return (
      <div>
        <Container textAlign="center">
          <Header as="h1">Edit Product</Header>
        </Container>
        <ProductForm
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => ({
  getProduct: productId => dispatch(thunkfetchSingleProduct(productId)),
  updateProduct: product => dispatch(thunkUpdateSingleProduct(product))
})

export default connect(mapState, mapDispatch)(EditProduct)
