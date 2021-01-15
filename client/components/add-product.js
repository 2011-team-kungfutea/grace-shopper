import React from 'react'
import {connect} from 'react-redux'
import {
  Form,
  Button,
  Input,
  Image,
  Container,
  Header,
  TextArea
} from 'semantic-ui-react'
import {thunkCreateSingleProduct} from '../store/single-product-reducer'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: ''
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
        <div className="add-product">
          <Form className="add-product-form" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Product Name</label>
              <Input type="text" name="name" />
            </Form.Field>
            <Form.Field>
              <label>Image URL</label>
              <Input
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <Input type="text" name="category" />
            </Form.Field>
            <Form.Field>
              <label>Quantity</label>
              <Input type="number" min="0" name="quantity" />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <Input type="number" name="price" min="0.01" step="0.01" />
              <Form.Field>
                <label>Description</label>
                <TextArea name="description" />
              </Form.Field>
            </Form.Field>
            <Button className="spacepurple" type="submit">
              Submit
            </Button>
          </Form>
          <div className="image-preview">
            <label>Image Preview</label>
            <Image
              className="add-product-image-preview"
              src={this.state.imageUrl}
              size="large"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({
  addProduct: product => dispatch(thunkCreateSingleProduct(product))
})

export default connect(mapState, mapDispatch)(AddProduct)
