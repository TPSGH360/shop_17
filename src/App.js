import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import CartContext from "./CartContext";
import LoginContext from "./LoginContext";
import Total from "./components/Total";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Phones from "./components/Phones";
import Laptops from "./components/Laptops";
import Accessories from "./components/Accessories";
import PageTransition from "./components/PageTransition";
import { jwtDecode } from "jwt-decode";
import About from "./components/About";
import ProductDetails from "./components/ProductDetails";

function App() {
  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setLogin(jwtDecode(token));
  }, []);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <LoginContext.Provider value={{ login, setLogin }}>
          <Jumbotron />
          <Nav />
          <PageTransition>
            <Routes>
              <Route path="/phones" element={<Phones />} />
              <Route path="/laptops" element={<Laptops />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </PageTransition>
          <Total />
          <Footer />
        </LoginContext.Provider>
      </CartContext.Provider>
    </>
  );
}

export default App;
