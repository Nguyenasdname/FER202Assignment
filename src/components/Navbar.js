import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown, Badge, Form, Button, InputGroup } from "react-bootstrap"
import { CartContext } from "../context/CartContext"

function Navbar() {
  const { cart } = useContext(CartContext)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch categories and brands from db.json
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch("http://localhost:5000/categories")
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)

        const brandsResponse = await fetch("http://localhost:5000/brands")
        const brandsData = await brandsResponse.json()
        setBrands(brandsData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching navbar data:", error)
        setLoading(false)
      }
    }

    fetchData()

    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/home">
          {/* Logo */}
          <img src="/images/logo.jpg" alt="Logo" width="50" height="auto" />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>

            {/* Categories Dropdown */}
            <NavDropdown title="Categories" id="categories-dropdown">
              {loading ? (
                <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
              ) : (
                categories.map((category) => (
                  <NavDropdown.Item key={category.id} as={Link} to={`/category/${category.id}`}>
                    {category.name}
                  </NavDropdown.Item>
                ))
              )}
            </NavDropdown>

            {/* Brands Dropdown */}
            <NavDropdown title="Brands" id="brands-dropdown">
              {loading ? (
                <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
              ) : (
                brands.map((brand) => (
                  <NavDropdown.Item key={brand.id} as={Link} to={`/brand/${brand.id}`}>
                    {brand.name}
                  </NavDropdown.Item>
                ))
              )}
            </NavDropdown>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search products..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-primary" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Button>
            </InputGroup>
          </Form>

          {/* Cart and Avatar Dropdown */}
          <Nav>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart me-1" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              Cart
              {totalItems > 0 && (
                <Badge bg="primary" pill className="ms-1">
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {/* Avatar Dropdown for Profile and Logout */}
            {user && (
              <Nav.Link>
                <NavDropdown title={<img src={user.avatar || 'https://hips.hearstapps.com/hmg-prod/images/ginger-maine-coon-kitten-running-on-lawn-in-royalty-free-image-1719608142.jpg'} alt="avatar" className="avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />} id="user-dropdown">
                  <h5 className="mx-2">{user.username}</h5>
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orderHistory">Order History</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar;
