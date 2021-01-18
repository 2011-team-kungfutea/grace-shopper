import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../store/all-products-reducer'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleDelete(productId) {
    this.props.deleteProduct(productId)
  }

  render() {
    const {user, products} = this.props
    return (
      <div>
        <div className="all-products-header">
          <h1>Products</h1>
          {user.isAdministrator && (
            <Link to="/admin/products/add">
              <Button className="spacepink-background-color">
                Add Product
              </Button>
            </Link>
          )}
        </div>
        <div>
          {products.map(product => {
            return (
              <div key={product.id}>
                <h1>{product.name}</h1>
                <Link to={`/products/${product.id}`}>
                  <img className="ui medium image" src={product.imageUrl} />
                </Link>
                <div>${product.price / 100}</div>
                {user.isAdministrator && (
                  <div className="admin-buttons">
                    <Link to={`/admin/products/${product.id}/edit`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => this.handleDelete(product.id)}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  user: state.user
})
const mapDispatch = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    deleteProduct: productId => {
      dispatch(removeProduct(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
