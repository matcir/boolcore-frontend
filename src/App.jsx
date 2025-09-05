import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsList from "./pages/ProductsListPage"
import SingleProduct from "./pages/SingleProduct"
import Navbar from "./components/Navbar"
import defaultLayout from "../Layout/defaultLayout"
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<defaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}