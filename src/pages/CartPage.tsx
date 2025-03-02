import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/menu" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Your Cart</h1>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Cart Items ({totalItems})
                    </h2>
                    <button 
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map((item) => (
                      <motion.div 
                        key={item.id}
                        className="py-4 flex flex-col sm:flex-row items-start sm:items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                      >
                        <div className="h-20 w-20 rounded-lg overflow-hidden mr-4 mb-4 sm:mb-0 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                          <p className="text-orange-500 font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1 text-gray-800 dark:text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="text-gray-800 dark:text-white font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Delivery Fee</span>
                      <span className="text-gray-800 dark:text-white font-medium">$3.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tax</span>
                      <span className="text-gray-800 dark:text-white font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-800 dark:text-white">Total</span>
                        <span className="text-lg font-semibold text-orange-500">
                          ${(totalPrice + 3.99 + (totalPrice * 0.08)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                  </button>
                  
                  <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>We accept all major credit cards and digital payment methods.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              to="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center"
            >
              Browse Our Menu
              <ArrowLeft className="h-4 w-4 ml-2 transform rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;