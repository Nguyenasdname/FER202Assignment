import { useContext } from "react"
import { Container, Table, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { CartContext } from "../context/CartContext"

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext)

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <Container className="py-5 text-center">
          <h1 className="mb-4">Your Cart</h1>
          <p>Your cart is empty</p>
          <Link to="/">
            <Button variant="primary" className="mt-3">
              Continue Shopping
            </Button>
          </Link>
        </Container>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h1 className="mb-4">Your Cart</h1>

        <div className="row">
          <div className="col-lg-8">
            <Table responsive>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                        />
                        <div>
                          <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <span className="fw-bold">{item.name}</span>
                          </Link>
                          <div className="text-muted small">{item.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between mt-3">
              <Link to="/home">
                <Button variant="outline-primary">Continue Shopping</Button>
              </Link>
              <Button variant="outline-danger" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <Card>
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3 fw-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button variant="success" className="w-100 mt-3">
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CartPage;