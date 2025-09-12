import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"
import HomePage from "./pages/HomePage"
import ProductsList from "./pages/ProductsListPage"
import SingleProduct from "./pages/SingleProduct"
import ComparePage from "./pages/ComparePage"
import WishlistPage from "./pages/WishlistPage"
import DefaultLayout from "./Layout/defaultLayout"
import CartSidebar from "./components/CartSidebar"
import { CartProvider } from "./contexts/CartContext"
import { WishlistProvider } from "./contexts/WishlistContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { DataProvider } from "./contexts/DataContext"
import { LoaderProvider } from "./contexts/LoaderContext"
import Checkout from "./components/Checkout"
import CategoryPage from "./pages/CategoryPage"
import { CompareProvider } from "./contexts/CompareContext"
import NotFoundPage from "./pages/NotFoundPage"

import Presentaction from "./Layout/Presentaction"



export default function App() {
  const [showPresentation, setShowPresentation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPresentation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showPresentation) {
    // Mostra solo la presentazione
    return <Presentaction />;
  }

  // Dopo la presentazione mostra il router e il layout
  return (

    <LoaderProvider>
      <DataProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<DefaultLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/categories/:slug" element={<CategoryPage />} />
                    <Route path="/products/:slug" element={<SingleProduct />} />
                    <Route path="/confronta" element={<ComparePage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
                <CartSidebar />
              </BrowserRouter>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </DataProvider>
    </LoaderProvider>

  )
}