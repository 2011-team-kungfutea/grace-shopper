import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/all-products-reducer'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    // let products = [
    //   {
    //     id: 1,
    //     name: 'Tofu',
    //     price: 2000000.27,
    //     quantity: 1,
    //     imageUrl:
    //       'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F07%2FPeaceful-Pictures-HD.jpg&f=1&nofb=1'
    //   },
    //   {
    //     id: 2,
    //     name: 'Edamame',
    //     price: 0.01,
    //     quantity: 47,
    //     imageUrl:
    //       'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-jJTnp608Bhg%2FUj3VEuE-KQI%2FAAAAAAAAKw8%2Foc0bi4gQ7ZM%2Fs1600%2F2-2-2-amazing_nature_wallpapers-1.jpg.jpg&f=1&nofb=1'
    //   }
    // ]
    const products = this.props.products
    return (
      <div>
        <h1>Products</h1>
        <div>
          {products.map(product => {
            return (
              <div key={product.id}>
                <h1>{product.name}</h1>
                <img src={product.imageUrl} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})
const mapDispatch = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
