import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Render full homepage layout only on the home route
  const renderHomeContent = () => (
    <>
      <Hero />
      <Features />
      <Menu />
      <Testimonials />
      <Contact />
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300">
      <Navbar />
      
      <Routes>
        <Route path="/" element={renderHomeContent()} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
      
      {/* Only show footer on all pages */}
      <Footer />
      
      {/* Chatbot is available on all pages */}
      <Chatbot />
    </div>
  );
}

export default App;