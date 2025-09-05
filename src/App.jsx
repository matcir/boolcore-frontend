import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsList from "./pages/ProductsListPage"
import SingleProduct from "./pages/SingleProduct"
import Navbar from "./components/Navbar"
import DefaultLayout from "../Layout/DefaultLayout"
import 'bootstrap/dist/css/bootstrap.min.css'
import { DataProvider } from "./contexts/DataContext"
import { LoaderProvider } from "./contexts/LoaderContext"

export default function App() {
  return (
    <LoaderProvider>
      <DataProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/:id" element={<SingleProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </LoaderProvider>
  )
}