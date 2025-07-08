import axios from 'axios';
import { useEffect, useState } from 'react';
import './ProductList.css';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [clickedProductIds, setClickedProductIds] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setClickedProductIds(prev => [...prev, product.id]);

    // Optional: reset after 3 seconds
    setTimeout(() => {
      setClickedProductIds(prev => prev.filter(id => id !== product.id));
    }, 3000);
  };

  return (
    <div className="product-grid">
      {products.map(product => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <p>{product.category}</p>
          <p className="description">{product.description.substring(0, 100)}...</p>
          <button
            className={`add-to-cart-btn ${clickedProductIds.includes(product.id) ? 'clicked' : ''}`}
            onClick={() => handleAddToCart(product)}
            disabled={clickedProductIds.includes(product.id)}
          >
            {clickedProductIds.includes(product.id) ? '✔️ Added' : '🛒 Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
