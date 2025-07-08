// src/components/Cart.jsx
import { useEffect, useState } from 'react';
import { getCartItems, removeCartItem, updateCartItem } from './CartService';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const items = await getCartItems();
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (docId, newQty) => {
    if (newQty < 1) return;
    await updateCartItem(docId, newQty);
    loadCart();
  };

  const handleRemove = async (docId) => {
    await removeCartItem(docId);
    loadCart();
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> :
        cartItems.map((item) => (
          <div key={item.docId} style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
            <img src={item.image} alt={item.title} width={50} />
            <h4>{item.title}</h4>
            <p>Price: ${item.price}</p>
            <p>
              Quantity:
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item.docId, parseInt(e.target.value))}
              />
            </p>
            <button onClick={() => handleRemove(item.docId)}>Remove</button>
          </div>
        ))
      }
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;