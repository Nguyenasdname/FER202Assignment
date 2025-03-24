import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import Navbar from "../components/Navbar"
import HomeCarousel from "../components/HomeCarousel"
import BestSellers from "../components/BestSeller"
import Categories from "../components/Categories"
import Brands from "../components/Brands"

function HomePage() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch products from db.json
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products")
        const data = await response.json()
        setAllProducts(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const bestSellerProducts = allProducts.filter((product) => product.isBestSeller)

  return (
    <>
      <Navbar />
      <HomeCarousel />
      <Container className="py-5">
        <BestSellers products={bestSellerProducts} loading={loading} />
        <Categories />
        <Brands />
      </Container>
    </>
  )
}

export default HomePage;