import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../store/all-products-reducer'
import {Link} from 'react-router-dom'
import {Button, Card, Image} from 'semantic-ui-react'

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
          <br />
          <h1 className="ui center aligned icon header">
            <i className="circular paw icon" />
          </h1>
          <Image src="/images/meetourpetsheader.png" className="ui center" />
          <br />
          {!user.isAdministrator ? (
            <h6> 'Ready for a new home and not held captive!'</h6>
          ) : (
            ''
          )}
          {user.isAdministrator && (
            <Link to="/admin/products/add">
              <Button className="spacepink-background-color">
                Add Product
              </Button>
            </Link>
          )}
        </div>
        <div className="list-of-products">
          {products.map(product => {
            return (
              <div key={product.id} className="product-in-product-list">
                <Card color="pink" className="ui raised link card">
                  <Link
                    to={`/products/${product.id}`}
                    style={{textDecoration: 'none'}}
                  >
                    <Image src={product.imageUrl} className="ui fluid image" />
                  </Link>
                  <Card.Content>
                    <Card.Header className="ui center aligned header">
                      {product.name}
                    </Card.Header>
                    <Card.Description className="ui center aligned">
                      {product.description}
                    </Card.Description>
                    <Card.Meta>price</Card.Meta>
                    <span>${parseInt(product.price || 0) / 100}</span>
                    {/* </Card.Meta> */}
                  </Card.Content>
                  <Card.Content extra>
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
                  </Card.Content>
                </Card>
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
