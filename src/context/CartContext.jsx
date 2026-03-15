import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.reduce((total, item) => total + item.quantity, 0));
    }
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      
      localStorage.setItem('cartItems', JSON.stringify(updated));
      setCartCount(updated.reduce((total, item) => total + item.quantity, 0));
      return updated;
    });

    toast.success(`${product.title} added to cart!`);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
