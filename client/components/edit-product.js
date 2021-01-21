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
      quantity: 0,
      price: 0.0,
      description: '',
      submittedForm: 0,
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        ...this.props.product,
        price: this.props.product.price / 100
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      const errors = this.validateForm()
      if (!errors.length) {
        this.props.updateProduct({
          ...this.state,
          price: Math.floor(this.state.price * 100)
        })
        this.setState({
          errors: [],
          submittedForm: 1
        })
      } else {
        console.log('in else statement')
        this.setState({
          errors: [...errors],
          submittedForm: 1
        })
      }
    } catch (error) {
      console.log('Unable to edit product', error)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validateForm() {
    const errors = []
    const {name, price, quantity} = this.state
    if (name === '' || name === null) {
      errors.push('You must include a product name.')
    }
    if (price < 0.01 || price > 21474836.47 || !price) {
      errors.push('Price must be between $0.01 and $21,474,836.47.')
    }
    if (quantity < 0 || !quantity) {
      errors.push('Quantity must be greater than 0.')
    }
    return errors
  }

  render() {
    return (
      <div>
        <Container textAlign="center">
          <Header as="h1">Edit Product</Header>
        </Container>
        <ProductForm
          {...this.state}
          formType="edited"
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
