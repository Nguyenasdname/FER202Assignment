import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import SortingControls from "../components/SortingControls"

function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortedProducts, setSortedProducts] = useState([])
  const [sortOption, setSortOption] = useState("default")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products")
        const data = await response.json()

        // Filter products by search query (case-insensitive)
        const filteredProducts = data.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )

        setProducts(filteredProducts)
        setSortedProducts(filteredProducts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [query])

  const handleSort = (option) => {
    setSortOption(option)
    const sorted = [...products]

    switch (option) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "in-stock":
        sorted.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0))
        break
      default:
        // Default sorting (no specific order)
        break
    }

    setSortedProducts(sorted)
  }

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h1 className="mb-4">Search Results for: "{query}"</h1>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <SortingControls onSort={handleSort} sortOption={sortOption} />

            {sortedProducts.length > 0 ? (
              <Row xs={1} md={2} lg={4} className="g-4 mt-3">
                {sortedProducts.map((product) => (
                  <Col key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5">
                <h3>No products found matching "{query}"</h3>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default SearchPage;