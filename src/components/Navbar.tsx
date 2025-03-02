import React, { useState, useEffect } from 'react';
import { ChefHat, Menu as MenuIcon, X, ShoppingCart, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent dark:bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">Cloud Kitchen</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Home</Link>
            <Link to="/menu" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Menu</Link>
            <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">About</a>
            <a href="#testimonials" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Contact</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Cart button */}
            <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* User profile or auth buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-orange-500">
                    <img 
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                      alt={user?.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Your Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
            
            {/* <Link 
              to={isAuthenticated ? "/order" : "/login?redirect=/order"} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors duration-300"
            >
              Order Now
            </Link> */}
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile cart button */}
            <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-200">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200">
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-800 shadow-lg`}>
        <div className="flex flex-col space-y-4 px-4 py-6">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/menu" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" onClick={() => setIsOpen(false)}>Menu</Link>
          <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" onClick={() => setIsOpen(false)}>About</a>
          <a href="#testimonials" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" onClick={() => setIsOpen(false)}>Testimonials</a>
          <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors" onClick={() => setIsOpen(false)}>Contact</a>
          
          {isAuthenticated ? (
            <>
              <div className="flex items-center py-2">
                <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-orange-500 mr-2">
                  <img 
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                    alt={user?.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
              <Link 
                to="/profile" 
                className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Your Profile
              </Link>
              <Link 
                to="/orders" 
                className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Your Orders
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link 
                to="/login" 
                className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link 
                to="/signup" 
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg text-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
          
          <Link 
            to={isAuthenticated ? "/order" : "/login?redirect=/order"} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-center transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Order Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;