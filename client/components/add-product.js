import React from 'react'
import {connect} from 'react-redux'
import {
  Form,
  Button,
  Checkbox,
  Input,
  Image,
  Container,
  Header
} from 'semantic-ui-react'

export class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: ''
    }
  }
  handleSubmit = () => {}
  handleChange = event => {
    this.setState({
      imageUrl: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Container textAlign="center">
          <Header as="h1">Add Product</Header>
        </Container>
        <div className="add-product">
          <Form className="add-product-form">
            <Form.Field>
              <label>Product Name</label>
              <Input type="text" name="name" placeholder="Product Name" />
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
              <Input type="text" name="category" placeholder="Category" />
            </Form.Field>
            <Form.Field>
              <label>Quantity</label>
              <Input type="number" placeholder="Quantity" min="0" />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <Input
                type="number"
                placeholder="Quantity"
                min="0.01"
                step="0.01"
              />
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

// const mapState = (state) => ({

// })

// const mapDispatch = (dispatch) => ({

// })

// export default connect(mapState,mapDispatch)(AddProduct);
