import React from 'react'
import {Form, Input, Image, Button, TextArea, Message} from 'semantic-ui-react'

export const ProductForm = props => {
  const {
    handleChange,
    handleSubmit,
    imageUrl,
    name,
    category,
    quantity,
    price,
    description,
    submittedForm,
    errors
  } = props

  return (
    <div className="product-form-page">
      <Message
        className="product-message"
        hidden={submittedForm === 0}
        error={errors.length !== 0}
        success={errors.length === 0}
        header={
          errors.length
            ? 'There were some errors with your submission'
            : 'Product was added successfully'
        }
        list={errors}
      />
      <div className="product">
        <Form className="product-form" onSubmit={handleSubmit}>
          <Form.Field>
            <label>Product Name</label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Image URL</label>
            <Input name="imageUrl" value={imageUrl} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <Input
              type="text"
              name="category"
              value={category === null ? '' : category}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Quantity</label>
            <Input
              type="number"
              min="0"
              name="quantity"
              value={quantity === null ? 0 : quantity}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <Input
              type="number"
              name="price"
              min="0.01"
              max="21474836.47"
              step="0.01"
              value={price === null ? 0.0 : price}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea
              name="description"
              value={description === null ? '' : description}
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
            className="product-image-preview"
            src={imageUrl}
            size="large"
          />
        </div>
      </div>
    </div>
  )
}
