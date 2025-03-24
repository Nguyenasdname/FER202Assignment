import { useState, useEffect } from "react"
import { Row, Col, Card, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch categories from db.json
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories")
        const data = await response.json()
        setCategories(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="mb-5">
        <h2 className="mb-4">Categories</h2>
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
      <h2 className="mb-4">Categories</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {categories.map((category) => (
          <Col key={category.id}>
            <Link to={`/category/${category.id}`} style={{ textDecoration: "none" }}>
              <Card className="category-card">
                <Card.Img variant="top" src={category.image} alt={category.name} />
                <Card.Body>
                  <Card.Title className="text-center">{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Categories;

