import { useState, useEffect } from "react"
import { Row, Col, Card, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"

function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch brands from db.json
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5000/brands")
        const data = await response.json()
        setBrands(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching brands:", error)
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  if (loading) {
    return (
      <div className="mb-5">
        <h2 className="mb-4">Popular Brands</h2>
        <div className="text-center py-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-5">
      <h2 className="mb-4">Popular Brands</h2>
      <Row xs={2} md={4} className="g-4">
        {brands.map((brand) => (
          <Col key={brand.id}>
            <Link to={`/brand/${brand.id}`} style={{ textDecoration: "none" }}>
              <Card className="brand-card text-center">
                <Card.Img
                  variant="top"
                  src={brand.image}
                  alt={brand.name}
                  className="mx-auto mt-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <Card.Body>
                  <Card.Title>{brand.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Brands;

