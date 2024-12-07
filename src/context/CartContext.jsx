import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verifica si el producto ya existe en el carrito
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex !== -1) {
        // Si el producto ya existe, aumenta su cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // Si no existe, agrega el producto con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el carrito
export const useCart = () => useContext(CartContext);
