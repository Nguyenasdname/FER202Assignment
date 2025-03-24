import { Row, Col, Spinner } from "react-bootstrap"
import ProductCard from "./ProductCard"

function BestSellers({ products, loading }) {
  return (
    <div className="mb-5">
      <h2 className="mb-4">Best Sellers</h2>
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default BestSellers;

