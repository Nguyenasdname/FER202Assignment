import { useContext } from "react"
import { Card, Button, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <Card className="h-100">
      {product.isBestSeller && <div className="bestseller-badge">Best Seller</div>}
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text className="text-muted mb-1">{product.brand}</Card.Text>
        <Card.Text className="fw-bold mb-1">${product.price.toFixed(2)}</Card.Text>
        <Card.Text className="mb-3 small">
          {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
        </Card.Text>
        <div className="mt-auto">
          <div className="mb-2">
            <Badge bg={product.inStock ? "success" : "danger"} className="stock-badge">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          <Button variant="primary" onClick={handleAddToCart} disabled={!product.inStock} className="w-100">
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;

