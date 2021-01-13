import React from 'react'
import {connect} from 'react-redux'
import {Form, Button, Checkbox, Input, Image} from 'semantic-ui-react'

export class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: ''
    }
  }
  handleSubmit = () => {}
  handleChange = event => {
    console.log('event', event.target.value)
    this.setState({
      imageUrl: event.target.value
    })
  }

  render() {
    console.log(this.props.imageUrl)
    return (
      <div>
        <h1>ADD PRODUCT</h1>
        <Form>
          <Form.Field>
            <label>Product Name</label>
            <Input name="name" placeholder="Product Name" />
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
            <label>Product Name</label>
            <Input placeholder="Product Name" onChange={this.handleChange} />
          </Form.Field>
        </Form>
        <Image src={this.state.imageUrl} size="small" />
      </div>
    )
  }
}

// const mapState = (state) => ({

// })

// const mapDispatch = (dispatch) => ({

// })

// export default connect(mapState,mapDispatch)(AddProduct);
