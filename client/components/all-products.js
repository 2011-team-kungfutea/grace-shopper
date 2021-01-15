import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../store/all-products-reducer'
import {Link, Redirect} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleEdit(productId) {
    return <Redirect to={`/products/${productId}?edit_product=1`} />
  }

  handleDelete(productId) {
    this.props.deleteProduct(productId)
  }

  render() {
    const {user, products} = this.props
    return (
      <div>
        <h1>Products</h1>
        <div>
          {products.map(product => {
            return (
              <div key={product.id}>
                <h1>{product.name}</h1>
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} />
                </Link>
                {user.isAdministrator && (
                  <div className="admin-buttons">
                    <Button onClick={() => this.handleEdit(product.id)}>
                      Edit
                    </Button>
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
