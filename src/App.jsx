import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsList from "./pages/ProductsListPage"
import SingleProduct from "./pages/SingleProduct"
import DefaultLayout from "./Layout/defaultLayout"
import CartSidebar from "./components/CartSidebar"
import { CartProvider } from "./contexts/CartContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { DataProvider } from "./contexts/DataContext"
import { LoaderProvider } from "./contexts/LoaderContext"
import Checkout from "./components/Checkout"

export default function App() {
  return (

    <LoaderProvider>
      <DataProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>
            <CartSidebar />
          </BrowserRouter>
        </CartProvider>
      </DataProvider>
    </LoaderProvider>

  )
}
