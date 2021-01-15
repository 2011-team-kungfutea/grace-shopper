import React from 'react'
import {connect} from 'react-redux'
//go into props,
//get quant ordered add onto total
export const TotalItems = cart => {
  if (cart.order_details) {
    console.log(cart)
    // let totalItems = 0
    let mine = cart.order_details.reduce(
      (totalItems, curr) => totalItems + curr.quantity,
      0
    )
    console.log('test', mine)
    return mine
    // [0].quantity
  }
}
