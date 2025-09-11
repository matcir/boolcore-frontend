import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsList from "./pages/ProductsListPage"
import SingleProduct from "./pages/SingleProduct"
import ComparePage from "./pages/ComparePage"
import DefaultLayout from "./Layout/defaultLayout"
import CartSidebar from "./components/CartSidebar"
import { CartProvider } from "./contexts/CartContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { DataProvider } from "./contexts/DataContext"
import { LoaderProvider } from "./contexts/LoaderContext"
import Checkout from "./components/Checkout"
import CategoryPage from "./pages/CategoryPage"
import { CompareProvider } from "./contexts/CompareContext"
import NotFoundPage from "./pages/NotFoundPage"


export default function App() {
  return (

    <LoaderProvider>
      <DataProvider>
        <CartProvider>
          <CompareProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsList />} />
                  <Route path="/categories/:slug" element={<CategoryPage />} />
                  <Route path="/products/:slug" element={<SingleProduct />} />
                  <Route path="/confronta" element={<ComparePage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
              <CartSidebar />
            </BrowserRouter>
          </CompareProvider>
        </CartProvider>
      </DataProvider>
    </LoaderProvider>

  )
}