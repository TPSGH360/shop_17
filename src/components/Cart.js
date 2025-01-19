import React, { useContext, useState } from "react";
import CartContext from "../CartContext";

function Cart() {
  const { cart, setCart, emptyCart } = useContext(CartContext);
  const [message, setMessage] = useState("");

  const handlePurchase = () => {
    if (cart.length === 0) {
      setMessage("Your cart is empty!");
      return;
    }
    emptyCart(); // Empty the cart
    setMessage("Purchase Successful! Thank you for your order.");
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, parseInt(newQuantity) || 1) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="container my-4">
      <h2>Your Cart</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  {/* Editable Quantity */}
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    style={{ width: "60px", textAlign: "center" }}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  {/* Remove Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-success" onClick={handlePurchase}>
        Buy Now
      </button>
    </div>
  );
}

export default Cart;
