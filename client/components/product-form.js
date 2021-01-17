import React from 'react'
import {Form, Input, Image, Button, TextArea} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'

export const ProductForm = props => {
  const {
    handleChange,
    handleSubmit,
    imageUrl,
    name,
    category,
    quantity,
    price,
    description
  } = props
  return (
    <div className="add-product">
      <Form className="add-product-form" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Product Name</label>
          <Input
            type="text"
            name="name"
            value={name || ''}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Image URL</label>
          <Input
            name="imageUrl"
            value={imageUrl || ''}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <Input
            type="text"
            name="category"
            value={category || ''}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Quantity</label>
          <Input
            type="number"
            min="0"
            name="quantity"
            value={quantity || 0}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <Input
            type="number"
            name="price"
            min="0.01"
            step="0.01"
            value={price || 0.01}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea
            name="description"
            value={description || ''}
            onChange={handleChange}
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
          src={imageUrl}
          size="large"
        />
      </div>
    </div>
  )
}
