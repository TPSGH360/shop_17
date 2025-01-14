import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Increment quantity if product exists
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new product with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const emptyCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
