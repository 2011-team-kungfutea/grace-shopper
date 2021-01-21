import React from 'react'
import {Form, Message, Input, Button} from 'semantic-ui-react'

export const UserForm = props => {
  const {
    handleChange,
    handleSubmit,
    firstName,
    lastName,
    address,
    phoneNumber,
    submittedForm,
    errors,
    formType
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
            : `Pet was ${formType} successfully`
        }
        list={errors}
      />
      <div className="product">
        <Form className="product-form" onSubmit={handleSubmit}>
          <Form.Field>
            <label>First Name</label>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <Input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <Input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone Number</label>
            <Input
              type="number"
              name="phoneNumber"
              value={phoneNumber === null ? 0 : phoneNumber}
              onChange={handleChange}
            />
          </Form.Field>
          <Button className="spacepurple" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
