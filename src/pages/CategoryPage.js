import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import SortingControls from "../components/SortingControls"

function CategoryPage() {
  const { id } = useParams()
  const [categoryProducts, setCategoryProducts] = useState([])
  const [sortedProducts, setSortedProducts] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [loading, setLoading] = useState(true)
  const [sortOption, setSortOption] = useState("default")

  useEffect(() => {
    // Fetch category and products from db.json
    const fetchCategoryAndProducts = async () => {
      try {
        // Fetch category info
        const categoryResponse = await fetch(`http://localhost:5000/categories?id=${id}`)
        const categoryData = await categoryResponse.json()

        if (categoryData.length > 0) {
          setCategoryName(categoryData[0].name) 
        }

        // Fetch all products
        const productsResponse = await fetch(`http://localhost:5000/products`)
        const productsData = await productsResponse.json()

        // Filter products by category (case-insensitive comparison)
        const filteredProducts = productsData.filter(
          (product) =>
            product.category.toLowerCase() === categoryName.replace(/s$/, "").toLowerCase() ||
            product.category.toLowerCase() === id.toLowerCase(),
        )

        setCategoryProducts(filteredProducts)
        setSortedProducts(filteredProducts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching category data:", error)
        setLoading(false)
      }
    }

    fetchCategoryAndProducts()
  }, [id, categoryName])

  const handleSort = (option) => {
    setSortOption(option)
    const sorted = [...categoryProducts]

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
        <h1 className="mb-4">{categoryName || id}</h1>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : categoryProducts.length > 0 ? (
          <>
            <SortingControls onSort={handleSort} sortOption={sortOption} />

            <Row xs={1} md={2} lg={4} className="g-4 mt-3">
              {sortedProducts.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <div className="text-center py-5">
            <h3>No products found in this category</h3>
          </div>
        )}
      </Container>
    </>
  )
}

export default CategoryPage;