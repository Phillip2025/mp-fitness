import React, { useState, useEffect } from 'react';
import CartContext from './CartContext';
import _ from 'lodash';

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [count, setCount] = useState(0);

  const getCart = () => {
    return cart;
  };

  const addToCart = async (quantity, item) => {
    cart[item.id] = { ...item, quantity };
    calculateCount(cart);
    await localStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeFromCart = async id => {
    delete cart[id];
    calculateCount(cart);
    await localStorage.setItem('cart', JSON.stringify(cart));
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart({});
    setCount(0);
  };

  const calculateCount = cart => {
    let count = 0;
    _.each(cart, item => {
      console.log('item', item);
      count += parseInt(item.quantity);
    });
    setCount(count);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      localStorage.setItem('cart', JSON.stringify({}));
    } else {
      setCart(cart);
      calculateCount(cart);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, count, getCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
