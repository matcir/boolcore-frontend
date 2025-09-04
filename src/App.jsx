import { BrowserRouter, Router, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsList from "./pages/ProductsListPage"
import SingleProduct from "./pages/SingleProduct"

export default function App() {


  return (
    <>
      <BrowserRouter>

        <Router>

          <Route path="/" element={<HomePage/>} />
          <Route path="/products" element={<ProductsList/>} />
          <Route path="/products/:id" element={<SingleProduct/>} />

          



        </Router>



      </BrowserRouter>
    </>
  )
}


