import React from 'react'
import {connect} from 'react-redux'
import {ProductForm} from './product-form'
import {
  thunkfetchSingleProduct,
  thunkUpdateSingleProduct
} from '../store/single-product-reducer'

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
      // const target = event.target
      // console.log(target)
      // const newProduct = {
      //   name: target.name.value,
      //   imageUrl: this.state.imageUrl,
      //   category: target.category.value,
      //   description: target.description.value,
      //   quantity: target.quantity.value,
      //   price: target.price.value * 100
      // }
      this.props.updateProduct({...this.state, price: this.state.price * 100})
    } catch (error) {
      console.log('Unable to create new product', error)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {product} = this.props
    console.log(this.state)
    return (
      <div>
        <h1>EDIT PRODUCT PAGE</h1>
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
