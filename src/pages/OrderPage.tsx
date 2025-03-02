import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Clock, MapPin, CreditCard, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Menu categories and items
const categories = ['Popular', 'Burgers', 'Pizza', 'Pasta', 'Desserts', 'Drinks'];

const menuItems = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheese, lettuce, tomato, and our special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Burgers',
    popular: true
  },
  {
    id: 5,
    name: 'BBQ Bacon Burger',
    description: 'Beef patty with crispy bacon, cheddar cheese, and tangy BBQ sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1971&q=80',
    category: 'Burgers',
    popular: true
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Pizza',
    popular: false
  },
  {
    id: 9,
    name: 'Veggie Supreme Pizza',
    description: 'Fresh vegetables, olives, and cheese on a thin crust',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Pizza',
    popular: true
  },
  {
    id: 3,
    name: 'Fettuccine Alfredo',
    description: 'Creamy pasta with parmesan cheese and garlic butter sauce',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Pasta',
    popular: true
  },
  {
    id: 11,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Desserts',
    popular: true
  }
];

const OrderPage = () => {
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [orderType, setOrderType] = useState('delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { addItem, items, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  // Filter items based on active category
  const filteredItems = activeCategory === 'Popular'
    ? menuItems.filter(item => item.popular)
    : menuItems.filter(item => item.category === activeCategory);

  // Handle adding item to cart
  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
  };

  // Handle placing order
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/order');
      return;
    }
    
    setOrderPlaced(true);
    
    // In a real app, you would send the order to your backend here
    setTimeout(() => {
      navigate('/order-confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Order Now</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isAuthenticated 
              ? `Welcome back, ${user?.name}! Ready to place your order?` 
              : 'Please sign in to complete your order.'}
          </p>
        </div>
        
        {/* Order type selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">How would you like to receive your order?</h2>
          
          <div className="flex flex-wrap gap-4">
            <button
              className={`flex items-center px-6 py-4 rounded-lg border-2 transition-colors ${
                orderType === 'delivery'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800'
              }`}
              onClick={() => setOrderType('delivery')}
            >
              <div className={`p-3 rounded-full mr-3 ${
                orderType === 'delivery'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Delivery</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Delivered to your address</p>
               </div>
            </button>
            
            <button
              className={`flex items-center px-6 py-4 rounded-lg border-2 transition-colors ${
                orderType === 'pickup'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800'
              }`}
              onClick={() => setOrderType('pickup')}
            >
              <div className={`p-3 rounded-full mr-3 ${
                orderType === 'pickup'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Pickup</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ready in 15-20 minutes</p>
              </div>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              {/* Category tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                <div className="flex p-4 space-x-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Menu items */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  {activeCategory === 'Popular' ? 'Most Popular Items' : `${activeCategory}`}
                </h2>
                
                <div className="space-y-6">
                  {filteredItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-24 sm:w-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white">{item.name}</h3>
                          <span className="text-orange-500 font-semibold">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">{item.description}</p>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="text-sm bg-gray-800 dark:bg-gray-700 hover:bg-orange-500 dark:hover:bg-orange-500 text-white py-1.5 px-4 rounded-lg transition-colors duration-300 inline-flex items-center"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add to Order
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
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Your Order</h2>
                
                {items.length > 0 ? (
                  <>
                    <div className="max-h-64 overflow-y-auto mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <div className="flex items-center">
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full h-6 w-6 flex items-center justify-center text-xs mr-3">
                              {item.quantity}
                            </span>
                            <span className="text-gray-800 dark:text-white">{item.name}</span>
                          </div>
                          <span className="text-gray-800 dark:text-white font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                        <span className="text-gray-800 dark:text-white">${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          {orderType === 'delivery' ? 'Delivery Fee' : 'Service Fee'}
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          ${orderType === 'delivery' ? '3.99' : '1.99'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Tax</span>
                        <span className="text-gray-800 dark:text-white">${(totalPrice * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-800 dark:text-white">Total</span>
                          <span className="font-semibold text-orange-500">
                            ${(totalPrice + (orderType === 'delivery' ? 3.99 : 1.99) + (totalPrice * 0.08)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {orderType === 'delivery' && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                        <h3 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                          Delivery Address
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {isAuthenticated 
                            ? '123 Main Street, Apt 4B, New York, NY 10001' 
                            : 'Please sign in to set your delivery address'}
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-orange-500" />
                        Estimated Time
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {orderType === 'delivery' 
                          ? '30-45 minutes' 
                          : '15-20 minutes'}
                      </p>
                    </div>
                    
                    <button
                      onClick={handlePlaceOrder}
                      disabled={orderPlaced}
                      className={`w-full py-3 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                        orderPlaced
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      {orderPlaced ? (
                        <>
                          <Check className="h-5 w-5 mr-2" />
                          Order Placed!
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          {isAuthenticated ? 'Place Order' : 'Sign in to Order'}
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Your order is empty</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add items from the menu to start your order
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;