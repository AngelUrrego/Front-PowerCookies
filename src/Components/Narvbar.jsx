import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../images/Logo.jpeg';
import { FaHome, FaCookieBite, FaInfoCircle, FaShoppingCart, FaUser, FaSignInAlt } from 'react-icons/fa'; // Ejemplo de íconos

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
        <Link to="/" onClick={() => setMenuOpen(false)} className="nav-item">
          <FaHome className="nav-icon" />
          Home
        </Link>
        <Link to="/products" onClick={() => setMenuOpen(false)} className="nav-item">
          <FaCookieBite className="nav-icon" />
          Productos
        </Link>
        <Link to="/nutrition" onClick={() => setMenuOpen(false)} className="nav-item">
          <FaInfoCircle className="nav-icon" />
          Valor Nutricional
        </Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)} className="nav-item">
          <FaShoppingCart className="nav-icon" />
          Carrito ({cart.length})
        </Link>
        {user ? (
          <button onClick={() => { setUser(null); setMenuOpen(false); }} className="nav-item">
            <FaUser className="nav-icon" />
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="nav-item">
              <FaSignInAlt className="nav-icon" />
              Login
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="nav-item">
              <FaUser className="nav-icon" />
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
