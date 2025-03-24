import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { CartProvider } from "./context/CartContext"
import { GoogleOAuthProvider } from "@react-oauth/google"

import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CategoryPage from "./pages/CategoryPage"
import BrandPage from "./pages/BrandPage"
import CartPage from "./pages/CartPage"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./auth/LoginPage"
import Register from "./auth/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import OrderHistoryPage from "./pages/OrderHistoryPage"

function App() {
  return (
    <GoogleOAuthProvider clientId="737984428384-jtleetlqjdtt74u7jd38usd88i1b5dsm.apps.googleusercontent.com">
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/orderHistory" element={<OrderHistoryPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/brand/:id" element={<BrandPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </CartProvider>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;
