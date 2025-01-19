import React, { useContext } from "react";
import CartContext from "../CartContext";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../LoginContext";

function Nav() {
  const { cart, setCart } = useContext(CartContext);
  const { login, setLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  function logout() {
    setLogin(null);
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/")}
                style={{ marginTop: "20px", marginRight: "10px" }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/phones")}
                style={{ marginTop: "20px", marginRight: "10px" }}
              >
                Phones
              </button>
            </li>
            <li>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/laptops")}
                style={{ marginTop: "20px", marginRight: "10px" }}
              >
                Laptops
              </button>
            </li>
            <li>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/accessories")}
                style={{ marginTop: "20px", marginRight: "10px" }}
              >
                Accessories
              </button>
            </li>
            <li>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/about")}
                style={{ marginTop: "20px", marginRight: "10px" }}
              >
                About
              </button>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {login?.is_admin && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <Link to="/login">
                <span className="glyphicon glyphicon-user"></span>
                {login ? `Hello ${login.username}` : "Your Account"}
              </Link>
              {login && <button onClick={logout}>Logout</button>}
            </li>
            <li>
              <Link to="/cart">
                <span className="glyphicon glyphicon-shopping-cart"></span>{" "}
                Cart: {cart.length}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
