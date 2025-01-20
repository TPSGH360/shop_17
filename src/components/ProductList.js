import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FiltersSidebar from "./FiltersSidebar";
import CartContext from "../CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [manufacturers, setManufacturers] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: 0,
    maxPrice: 10000,
    manufacturer: "",
    inStock: false,
  });

  // Fetch products and manufacturers
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then((response) => {
      setProducts(response.data);

      // Extract unique manufacturers
      const uniqueManufacturers = [
        ...new Set(response.data.map((product) => product.manufacturer)),
      ].filter((man) => man); // Exclude null/undefined
      setManufacturers(uniqueManufacturers);
    });
  }, []);

  // Filter products based on filters
  const filteredProducts = products.filter((product) => {
    return (
      (!filters.search ||
        product.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice &&
      (!filters.manufacturer ||
        product.manufacturer === filters.manufacturer) &&
      (!filters.inStock || product.in_stock)
    );
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Reset filters to defaults
  const resetFilters = () => {
    setFilters({
      search: "",
      minPrice: 0,
      maxPrice: 10000,
      manufacturer: "",
      inStock: false,
    });
  };

  return (
    <div className="container my-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <FiltersSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            manufacturers={manufacturers}
            onReset={resetFilters}
          />
        </div>

        {/* Product List */}
        <div className="col-md-9">
          <h2>All Products</h2>
          <div className="row gy-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-sm-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                  <div className="card-footer">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
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
