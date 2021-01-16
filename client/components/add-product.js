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
      category: '',
      quantity: 0,
      price: 0.01,
      description: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    try {
      const target = event.target
      console.log(target)
      const newProduct = {
        name: target.name.value,
        imageUrl: this.state.imageUrl,
        category: target.category.value,
        description: target.description.value,
        quantity: target.quantity.value,
        price: target.price.value * 100
      }
      this.props.addProduct(newProduct)
    } catch (error) {
      console.log('Unable to create new product', error)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Container textAlign="center">
          <Header as="h1">Add Product</Header>
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

const mapState = state => ({})

const mapDispatch = dispatch => ({
  addProduct: product => dispatch(thunkCreateSingleProduct(product))
})

export default connect(mapState, mapDispatch)(AddProduct)
