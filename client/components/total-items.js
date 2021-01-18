import React from 'react'
import {connect} from 'react-redux'

export const TotalItems = cart => {
  if (cart.order_details) {
    let mine = cart.order_details.reduce(
      (totalItems, curr) => totalItems + curr.quantity,
      0
    )
    return mine
  }
}
