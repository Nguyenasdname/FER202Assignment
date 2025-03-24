import { useState, useEffect } from "react";
import { Container, Table, Card, Button, Badge } from "react-bootstrap";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Lấy thông tin user từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Lấy danh sách đơn hàng từ db.json
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/orders");
                // Lọc đơn hàng theo userId nếu có user, nếu không thì lấy tất cả
                const userOrders = user
                    ? response.data.filter(order => order.userId === user.id)
                    : response.data;
                setOrders(userOrders);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching order history:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Xử lý khi nhấn nút quay lại mua sắm
    const handleBackToShopping = () => {
        navigate("/home");
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Container className="py-5 text-center">
                    <h3>Loading...</h3>
                </Container>
            </>
        );
    }

    if (orders.length === 0) {
        return (
            <>
                <Navbar />
                <Container className="py-5 text-center">
                    <h1 className="mb-4">Order History</h1>
                    <p>You have no orders yet!</p>
                    <Button variant="primary" onClick={handleBackToShopping}>
                        Back to Shopping
                    </Button>
                </Container>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Container className="py-5">
                <h1 className="mb-4 text-center" style={{ color: "#007bff", fontWeight: "bold" }}>
                    Your Order History
                </h1>

                <div className="row">
                    {orders.map((order) => (
                        <div className="col-md-12 mb-4" key={order.orderId}>
                            <Card className="shadow-sm" style={{ borderRadius: "15px", overflow: "hidden" }}>
                                <Card.Header
                                    className="d-flex justify-content-between align-items-center"
                                    style={{ backgroundColor: "#f8f9fa" }}
                                >
                                    <h5 className="mb-0">
                                        Order #{order.orderId}
                                    </h5>
                                    <Badge
                                        bg={order.status === "pending" ? "warning" : "success"}
                                        className="text-capitalize"
                                    >
                                        {order.status || "success"}
                                    </Badge>
                                </Card.Header>
                                <Card.Body>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <p><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
                                            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                                            <p><strong>Shipping Address:</strong> {order.shipaddress}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Customer Name:</strong> {order.userDetails.name}</p>
                                            <p><strong>Email:</strong> {order.userDetails.email}</p>
                                            <p><strong>Phone:</strong> {order.userDetails.phone}</p>
                                        </div>
                                    </div>

                                    <Table responsive bordered hover>
                                        <thead style={{ backgroundColor: "#e9ecef" }}>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.products.map((product, index) => (
                                                <tr key={index}>
                                                    <td>{product.name}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>${product.totalPrice.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                                <Card.Footer className="text-end" style={{ backgroundColor: "#f8f9fa" }}>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={handleBackToShopping}
                                    >
                                        Continue Shopping
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
}

export default OrderHistoryPage;