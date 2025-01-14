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
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
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
