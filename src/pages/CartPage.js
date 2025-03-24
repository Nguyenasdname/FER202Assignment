import { useState, useContext, useEffect } from "react"
import { Modal, Form, Container, Table, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { CartContext } from "../context/CartContext"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import axios from "axios"

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "" });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { width, height } = useWindowSize();
  const [user, setUser] = useState(null);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required!";
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number! Must be 10-15 digits.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters long!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      setFormData({
        name: storedUser.firstname + storedUser.lastname || "",
        phone: storedUser.phone || "",
        email: storedUser.email || "",
        address: storedUser.address || "",
      });
    }
  }, []);

  // const handleCheckout = () => {
  //   if (!validateForm()) {
  //     return;
  //   }

  //   setOrderSuccess(true);
  //   setTimeout(() => {
  //     setShowModal(false);
  //     clearCart();
  //     setOrderSuccess(false);
  //   }, 5000);
  // };

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    // Prepare order data
    const orderData = {
      orderId: Date.now(),
      userId: user?.id,
      userDetails: formData,
      products: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity
      })),
      total: totalPrice,
      date: new Date().toISOString(),
      shipaddress: formData.address
    };

    try {
      // Send order to db.json via POST request
      await axios.post('http://localhost:5000/orders', orderData);
      
      setOrderSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        clearCart();
        setOrderSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Lỗi khi lưu đơn hàng:', error);
      alert('Có lỗi xảy ra khi xử lý đơn hàng của bạn. Vui lòng thử lại.');
    }
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <Container className="py-5 text-center">
          <h1 className="mb-4">Your Cart</h1>
          <p>Life is Music but Your cart is empty!</p>
          <Link to="/home">
            <Button variant="primary" className="mt-3">
              Go Back And Buy Life
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
                <Button variant="success" className="w-100 mt-3" onClick={() => setShowModal(true)}>
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </div>

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Delivery information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {orderSuccess ? (
                <>
                  <Confetti width={width} height={height} style={{ width: Math.min(500, width / 2), height: Math.min(500, height / 2) }} />
                  <div className="text-center">
                    <h5>Thank you for your purchase!</h5>
                    <p>Your order is being processed.</p>
                  </div>
                </>
              ) : (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      placeholder="Your Name"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.phone}
                      placeholder="Your Phone Number"
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      isInvalid={!!errors.phone} />
                    <Form.Control.Feedback type="invalid">{errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      placeholder="Your Email"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address}
                      placeholder="Your Address"
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      isInvalid={!!errors.address} />
                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="success" className="w-100" onClick={handleCheckout}>
                    Order confirmation
                  </Button>
                </Form>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </>
  )
}

export default CartPage;