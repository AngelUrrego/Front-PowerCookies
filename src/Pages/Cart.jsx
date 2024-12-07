import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import '../styles/cart.css';
import defaultImage from '../images/Logo.jpeg'; // Imagen por defecto para productos sin imagen

const Cart = ({ user }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [orderData, setOrderData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
  });

  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailParams = {
      from_name: orderData.name,
      to_email: orderData.email,
      message: `Gracias por tu compra, ${orderData.name}! Tu pedido llegará en los próximos días.`,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
    };

    emailjs
      .send(
        'service_sz6pfs7', // Service ID
        'template_4lumf9x', // Template ID
        emailParams,
        '7hbcDLg8QN9oR-BaK' // User ID
      )
      .then((response) => {
        Swal.fire({
          title: '¡Formulario enviado con éxito!',
          text: 'Te hemos enviado un correo de confirmación.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        clearCart(); // Vacía el carrito después de confirmar el pedido
        navigate('/'); // Redirige al inicio
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar el correo. Intenta nuevamente.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const confirmRemoveItem = (itemId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto se eliminará de tu carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(itemId);
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado de tu carrito.', 'success');
      }
    });
  };

  const confirmClearCart = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El carrito será vaciado. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vaciar carrito',
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire('¡Vacío!', 'El carrito ha sido vaciado.', 'success');
      }
    });
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img
                src={item.image || defaultImage}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <button onClick={() => confirmRemoveItem(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total a pagar: ${total}</h3>
            <button onClick={confirmClearCart} className="clear-cart-button">
              Vaciar Carrito
            </button>
            <button 
              onClick={() => {
                if (!user) {
                  handleLoginRedirect(); // Redirige al login si no está logueado
                } else {
                  setIsFormVisible(!isFormVisible); // Alterna el formulario si está logueado
                }
              }}
            >
              {isFormVisible ? 'Cancelar' : 'Continuar con el Pedido'}
            </button> 
          </div>

          {isFormVisible && user && (
            <form className="cart-form" onSubmit={handleSubmit}>
              <h3>Datos de Envío</h3>
              <input
                type="text"
                name="name"
                value={orderData.name}
                onChange={handleInputChange}
                placeholder="Nombre"
                required
              />
              <input
                type="email"
                name="email"
                value={orderData.email}
                onChange={handleInputChange}
                placeholder="Correo Electrónico"
                required
              />
              <input
                type="text"
                name="phone"
                value={orderData.phone}
                onChange={handleInputChange}
                placeholder="Teléfono"
                required
              />
              <input
                type="text"
                name="address"
                value={orderData.address}
                onChange={handleInputChange}
                placeholder="Dirección"
                required
              />
              <input
                type="text"
                name="city"
                value={orderData.city}
                onChange={handleInputChange}
                placeholder="Ciudad"
                required
              />
              <button type="submit">Confirmar Pedido</button>
            </form>
          )}
        </div>
      )}

      {!user && (
        <div>
          <p>Para hacer un pedido, necesitas estar logueado.</p>
          <button onClick={handleLoginRedirect}>Iniciar sesión</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
