import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CartContext from "../CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`http://127.0.0.1:8000/products/${id}/`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="card shadow-sm">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-text">Price: ${product.price.toFixed(2)}</p>
          <p className="card-text">
            Manufacturer: {product.manufacturer || "Unknown"}
          </p>
          <p className="card-text">
            In Stock: {product.in_stock ? "Yes" : "No"}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
