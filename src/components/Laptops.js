import React, { useState, useEffect } from "react";
import axios from "axios";
import FiltersSidebar from "./FiltersSidebar";
import { Link } from "react-router-dom";

function Laptops() {
  const [products, setProducts] = useState([]);
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
      const laptops = response.data.filter(
        (product) => product.type === "laptop"
      );
      setProducts(laptops);

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

  return (
    <div className="container my-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <FiltersSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            manufacturers={manufacturers}
          />
        </div>

        {/* Product List */}
        <div className="col-md-9">
          <h2>Laptops</h2>
          <div className="row gy-4">
            {filteredProducts.map((product, index) => (
              <div key={index} className="col-sm-6 col-lg-4">
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card shadow-sm h-100">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price.toFixed(2)}</p>
                      <button className="btn btn-primary">Add to Cart</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Laptops;
