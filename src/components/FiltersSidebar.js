import React from "react";

function FiltersSidebar({ filters, onFilterChange, manufacturers, onReset }) {
  return (
    <div className="sidebar">
      <h3>Filters</h3>

      {/* Search Bar */}
      <div className="filter-group">
        <label>Search by Name:</label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={onFilterChange}
          className="form-control"
          placeholder="Search products..."
        />
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <label>Price Range:</label>
        <div className="d-flex">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={onFilterChange}
            className="form-control me-2"
            placeholder="Min"
            min="0"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={onFilterChange}
            className="form-control"
            placeholder="Max"
            max="10000"
          />
        </div>
      </div>

      {/* Manufacturer Dropdown */}
      <div className="filter-group">
        <label>Manufacturer:</label>
        <select
          name="manufacturer"
          value={filters.manufacturer}
          onChange={onFilterChange}
          className="form-control"
        >
          <option value="">All Manufacturers</option>
          {manufacturers.map((manufacturer, index) => (
            <option key={index} value={manufacturer}>
              {manufacturer}
            </option>
          ))}
        </select>
      </div>

      {/* In Stock Checkbox */}
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={filters.inStock}
            onChange={onFilterChange}
          />
          In Stock
        </label>
      </div>

      {/* Reset Filters Button */}
      <div className="filter-group mt-3">
        <button className="btn w-100 custom-reset-button" onClick={onReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default FiltersSidebar;
