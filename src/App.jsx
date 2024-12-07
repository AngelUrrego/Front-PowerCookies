import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './Pages/Home';
import Products from './pages/Products';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Narvbar';
import Nutrition from './Pages/Nutrition';

const App = () => {
  const [user, setUser] = useState(null);

  // Componente de layout que incluye el Navbar y el contenido de la página
  const Layout = ({ children }) => (
    <div>
      <Navbar user={user} setUser={setUser} />
      {children}
    </div>
  );

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/nutrition" element={<Layout><Nutrition /></Layout>}/>
          <Route path="/cart" element={<Layout><Cart user={user} /></Layout>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />         
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
