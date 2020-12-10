import React from 'react';

const CartContext = React.createContext({
  cart: {},
  count: 0,
  getCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default CartContext;
