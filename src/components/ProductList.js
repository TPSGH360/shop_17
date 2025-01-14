import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CartCotext from "../CartContext";
import { useNavigate } from "react-router-dom";
import FiltersSidebar from "./FiltersSidebar";
import CartContext from "../CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartCotext);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 10000,
  });

  useEffect(() => {
    getProducts();
    console.log("calling getProducts");
  }, [filters]);

  function getProducts() {
    axios.get("http://127.0.0.1:8000/products/").then((response) => {
      let filteredProducts = response.data;

      // Apply filters
      if (filters.search) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      if (filters.underThousand) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < 1000
        );
      }
      if (filters.category !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === filters.category
        );
      }
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filters.minPrice && product.price <= filters.maxPrice
      );

      setProducts(filteredProducts);
    });
  }

  function handleFilterChange(event) {
    const { name, value, type, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleAddToCart = (product) => {
    handleAddToCart(product);
  };
  return (
    <div className="container my-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="filters-sidebar p-3 shadow rounded">
            <FiltersSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Product List */}
        <div className="col-md-9">
          <div className="row gy-4">
            {products.map((product, index) => (
              <div key={index} className="col-sm-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <img
                    src={product.image}
                    className="card-img-top product-image"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">
                      Price: ${product.price.toFixed(2)}
                    </p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
