import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap"
import Navbar from "../components/Navbar"
import { CartContext } from "../context/CartContext"

function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    // Fetch product from db.json
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`)
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <Container className="py-5">
          <h2>Product not found</h2>
        </Container>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md={6} className="mb-4">
            <img
              src={product.image || "https://placehold.co/300x300"}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "500px", width: "100%", objectFit: "contain" }}
            />
          </Col>
          <Col md={6}>
            <h1>{product.name}</h1>
            <p className="text-muted mb-2">{product.brand}</p>
            <h3 className="mb-3">${product.price.toFixed(2)}</h3>

            <div className="mb-3">
              <Badge bg={product.inStock ? "success" : "danger"} className="me-2">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>

              {product.isBestSeller && (
                <Badge bg="warning" text="dark">
                  Best Seller
                </Badge>
              )}
            </div>

            <div className="mb-4">
              {/* <h5>Description:</h5> */}
              <p>{product.description}</p>
            </div>

            <div className="mb-3">
              <h5>Category:</h5>
              <p>{product.category}</p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-100 mb-3"
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductPage;

