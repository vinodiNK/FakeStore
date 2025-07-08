import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import { addToCart } from './components/CartService';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: 10 }}>
          
          <Link to="/cart">Cart</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;