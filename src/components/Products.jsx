import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <div className="navbar">
        <div>🛍️ Fake Store</div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>

      <div className="container">
        <h2>All Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
