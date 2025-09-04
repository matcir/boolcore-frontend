import { BrowserRouter, Router, Route } from "react-router-dom"


export default function App() {


  return (
    <>
      <BrowserRouter>

        <Router>

          <Route path="/" element="" />
          <Route path="/products" element="" />
          <Route path="/products/:id" element="" />

          



        </Router>



      </BrowserRouter>
    </>
  )
}


