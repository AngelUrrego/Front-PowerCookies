import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../images/Logo.jpeg'; // Importa la imagen del logo

const Navbar = ({ user, setUser }) => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="PowerCookies Logo" className="logo" />
        <div className="logo-text">PowerCookies</div>
      </div>
      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Productos</Link>
        <Link to="/nutrition" onClick={() => setMenuOpen(false)}>Valor Nutricional</Link>
        <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
          Carrito ({cart.length})
        </Link>
        {user ? (
          <button onClick={() => { setUser(null); setMenuOpen(false); }}>Cerrar sesión</button>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Registrarse</Link>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
