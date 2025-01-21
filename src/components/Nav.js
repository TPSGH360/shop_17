import React, { useContext } from "react";
import CartContext from "../CartContext";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../LoginContext";

function Nav() {
  const { cart, setCart } = useContext(CartContext);
  const { login, setLogin } = useContext(LoginContext);
  const { token, user, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear token and user from context
    navigate("/login"); // Redirect to login page
  };

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
          <Link className="navbar-brand" to="/">
            My Store
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/phones">Phones</Link>
            </li>
            <li>
              <Link to="/laptops">Laptops</Link>
            </li>
            <li>
              <Link to="/accessories">Accessories</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/cart">
                <span className="glyphicon glyphicon-shopping-cart"></span> Cart
                {cart.length > 0 && `: ${cart.length}`}
              </Link>
            </li>
            {token ? (
              <>
                <li>
                  <span className="navbar-text">
                    Welcome, {user?.username || "User"}!
                  </span>
                </li>
                <li>
                  <button
                    className="btn btn-danger navbar-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="btn btn-primary navbar-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
