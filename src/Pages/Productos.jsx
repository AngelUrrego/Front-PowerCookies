import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/products';
import { useCart } from '../context/CartContext';
import '../styles/products.css';
import galletaChocolate from '../images/Cookies.jpg';
import cookiesFresa from "../images/CookiesFresa.jpg"
import cookiesMora from "../images/CookiesMora.jpg"
import cookiesLimon from "../images/CookiesLimon.jpg"
import cookiesBanano from "../images/CookiesBanano.jpg"
import Swal from 'sweetalert2';


const imageMap = {
  'Galleta de Chocolate': galletaChocolate,
  "Galleta de fresa": cookiesFresa,
  "Galleta de mora": cookiesMora,
  "Galleta de limon": cookiesLimon,
  "Galleta de Banano": cookiesBanano,
  // Agrega más tipos de galletas con sus imágenes correspondientes
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Agrega el producto al carrito

    // Muestra una alerta usando SweetAlert2
    Swal.fire({
      title: '¡Producto agregado!',
      text: `${product.name} se ha agregado al carrito.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
       confirmButtonColor: '#8D5126',
      timer: 2000, // Cierra automáticamente después de 2 segundos
      timerProgressBar: true,
    });
  };

  return (
    <div className="products-container">
      <h1>Productos</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={imageMap[product.name] || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
