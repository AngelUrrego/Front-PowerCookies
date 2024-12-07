import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la redirección
import { login } from '../services/auth';
import '../styles/login.css'; // Importa el archivo CSS para aplicar los estilos
import logo from "../images/Logo.jpeg"

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log('Respuesta del backend:', response);
  
      const { token, user } = response;
      localStorage.setItem('token', token);
      console.log('Token almacenado:', localStorage.getItem('token'));
  
      setUser(user);
  
      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        title: '¡Inicio de sesión exitoso!',
        text: '¡Bienvenido a PowerCookies!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false, // Ocultar el botón de confirmación
      });
  
      // Redirigir al home después de un breve retraso
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.log('Error al iniciar sesión:', err);
  
      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        title: 'Error al iniciar sesión',
        text: err.response ? err.response.data.message : 'Error de red',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Intentar de nuevo',
      });
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo"/>
      </div>
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="login-button" type="submit">Ingresar</button>
      </form>

      {/* Enlace para registrarse */}
      <div className="register-text">
        <p>¿No tienes cuenta? <a className="register-link" href="/register">Regístrate aquí</a></p>
      </div>

      {/* Botón para regresar */}
      <button
        className="login-buttons"
        onClick={() => navigate(-1)} // Redirige a la página anterior
      >
        Regresar
      </button>

      {/* Mensajes de éxito y error */}
      {successMessage && <p className="login-success">{successMessage}</p>}
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;
