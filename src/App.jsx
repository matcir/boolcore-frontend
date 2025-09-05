import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsList from "./pages/ProductsListPage"
import SingleProduct from "./pages/SingleProduct"
import Navbar from "./components/Navbar"
import DefaultLayout from "../Layout/defaultLayout"
import CartSidebar from "./components/CartSidebar"
import { CartProvider } from "./Context/CartContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<SingleProduct />} />
          </Route>
        </Routes>
        <CartSidebar />
      </BrowserRouter>
    </CartProvider>
  )
}
