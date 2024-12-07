import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import cookies from '../images/Cookies.jpg';
import logo from "../images/Logo.jpeg";
import cookiesFresa from "../images/CookiesFresa.jpg";
import ingredientes from "../images/imagen2.jpg";

const Home = () => {
  const navigate = useNavigate(); // Hook para navegación interna

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Bienvenido a Power Cookies</h1>
        <p>Las galletas perfectas para una vida saludable y llena de energía.</p>
        <div>
          <img className='Logoimg' src={logo} alt="Proteína" />
        </div>
        <button className="cta-button" onClick={() => navigate('/products')}>
          Ver Productos
        </button>
      </header>

      <section className="feature-section">
        <h2>¿Por qué elegir Power Cookies?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <img src={cookies} alt="Proteína" />
            <h3>Ricas en Proteína</h3>
            <p>Te ayudan a mantener tu energía durante todo el día.</p>
          </div>
          <div className="feature-item">
            <img src={cookiesFresa} alt="Sabores deliciosos" />
            <h3>Sabores Deliciosos</h3>
            <p>Descubre nuestras opciones de chocolate, avena y más.</p>
          </div>
          <div className="feature-item">
            <img src={ingredientes} alt="Ingredientes naturales" />
            <h3>Ingredientes Naturales</h3>
            <p>Sin conservantes ni ingredientes artificiales.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
