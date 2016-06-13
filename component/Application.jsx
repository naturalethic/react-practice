import React, {Component, PropTypes} from 'react'

const PRODUCTS = [
  {category: 'Sporting Goods', price: 49.99, stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: 9.99, stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: 29.99, stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: 99.99, stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: 399.99, stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: 199.99, stocked: true, name: 'Nexus 7'}
]

const MyPropTypes = {
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stocked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  })
}

export default class Application extends Component {
  render() {
    return <FilterableProductTable products={PRODUCTS} />
  }
}

const ProductCategoryRow = props => <tr><th colSpan="2">{props.category}</th></tr>

ProductCategoryRow.propTypes = {
  category: PropTypes.string.isRequired,
}

const ProductRow = props => (
  <tr>
    <td>
      {props.product.stocked ? props.product.name : <span style={{color: 'red'}}>{props.product.name}</span>}
    </td>
    <td>{props.product.price}</td>
  </tr>
)

ProductRow.propTypes = {
  product: MyPropTypes.product.isRequired
}

const ProductTable = props => {
  const rows = []
  props.products.forEach((product, p, products) => {
    if (p === 0 || product.category !== products[p - 1].category) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
    }
    if ((!props.inStockOnly || product.stocked) && (!props.filterText || product.name.toLowerCase().includes(props.filterText.toLowerCase()))) {
      rows.push(<ProductRow product={product} key={product.name} />)
    }
  })
  return (
    <table>
      <thead><tr><th>Name</th><th>Price</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(MyPropTypes.product).isRequired
}

class SearchBar extends Component {
  static propTypes = {
    filterText: PropTypes.string.isRequired,
    inStockOnly: PropTypes.bool.isRequired,
    onUserInput: PropTypes.func.isRequired,
  }
  handleChange = e => {
    this.props.onUserInput(this.refs.filterTextInput.value, this.refs.inStockOnlyInput.checked)
  }
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange}/>
        <p>
          <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange}/>
          {' '}
          Only show products in stock
        </p>
      </form>
    )
  }
}

class FilterableProductTable extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(MyPropTypes.product).isRequired
  }
  state = {
    filterText: '',
    inStockOnly: false
  }
  handleUserInput = (filterText, inStockOnly) => {
    this.setState({filterText: filterText, inStockOnly: inStockOnly})
  }
  render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput} />
        <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    )
  }
}
