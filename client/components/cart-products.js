import React from 'react'

// export default class CartProducts extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <h1>{this.state.}</h1>
//       </div>
//     )
//   }
// }

export const CartProducts = props => {
  console.log('asdfasdf', props)
  const {name, price, imageUrl, quantityOrdered} = props
  return (
    <div className="ui horizontal list">
      <h1 className="header">{name}</h1>
      <h4>{price}</h4>
      <img className="ui avatar image" src={imageUrl} />
      <h4>{quantityOrdered}</h4>
      {/* <button>{RemoveButton}</button> */}
    </div>
  )
}
