import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección
import { register } from '../services/auth'; // Servicio de registro
import '../styles/register.css'; // Archivo CSS exclusivo
import logo from "../images/Logo.jpeg"

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log('Respuesta del backend:', response);

      const { token, user } = response;

      localStorage.setItem('token', token);
      setUser(user);

      setSuccessMessage('Registro exitoso. Redirigiendo al inicio de sesión...');
      setError('');

      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      console.log('Error al registrar el usuario:', err);
      setError(err.response ? err.response.data.message : 'Error de red');
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-container">
      {/* Logo */}
      <div className="register-logo">
        <img src={logo} alt="Logo" />
      </div>

      <h2 className="register-title">Registro</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="register-button" type="submit">Registrarse</button>
      </form>

      {successMessage && <p className="register-success">{successMessage}</p>}
      {error && <p className="register-error">{error}</p>}
    </div>
  );
};

export default Register;
