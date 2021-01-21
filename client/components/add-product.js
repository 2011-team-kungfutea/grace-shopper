import React from 'react'
import {connect} from 'react-redux'
import {Container, Header} from 'semantic-ui-react'
import {thunkCreateSingleProduct} from '../store/single-product-reducer'
import {ProductForm} from './product-form'

class AddProduct extends React.Component {
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

  handleSubmit(event) {
    event.preventDefault()
    try {
      const errors = this.validateForm()
      if (!errors.length) {
        this.props.addProduct({
          ...this.state,
          price: Math.floor(this.state.price * 100)
        })
        this.setState({
          name: '',
          imageUrl: '',
          quantity: 0,
          price: 0.0,
          description: '',
          submittedForm: 1,
          errors: []
        })
      } else {
        this.setState({
          errors: [...errors],
          submittedForm: 1
        })
      }
    } catch (error) {
      console.log('Unable to create new product', error)
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
      errors.push('Quantity must be 0 or greater.')
    }
    return errors
  }

  render() {
    return (
      <div>
        <Container textAlign="center">
          <Header as="h1">Add Product</Header>
        </Container>
        <ProductForm
          {...this.state}
          formType="added"
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({
  addProduct: product => dispatch(thunkCreateSingleProduct(product))
})

export default connect(mapState, mapDispatch)(AddProduct)
