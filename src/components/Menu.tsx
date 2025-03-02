import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'Desserts', 'Drinks'];

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
    id: 2,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Pizza',
    popular: false
  },
  {
    id: 3,
    name: 'Fettuccine Alfredo',
    description: 'Creamy pasta with parmesan cheese and garlic butter sauce',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1693609929945-b01ae4f2d602?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RmV0dHVjY2luZSUyMEFsZnJlZG98ZW58MHx8MHx8fDA%3D',
    category: 'Pasta',
    popular: true
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center, served with vanilla ice cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Desserts',
    popular: false
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
    id: 6,
    name: 'Pepperoni Pizza',
    description: 'Classic pizza topped with pepperoni slices and mozzarella cheese',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    category: 'Pizza',
    popular: false
  },
  {
    id: 7,
    name: 'Strawberry Milkshake',
    description: 'Creamy milkshake made with fresh strawberries and vanilla ice cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    category: 'Drinks',
    popular: true
  },
  {
    id: 8,
    name: 'Spaghetti Bolognese',
    description: 'Spaghetti pasta with rich meat sauce and parmesan cheese',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'Pasta',
    popular: false
  },
  {
    id: 9,
    name: 'Caesar Salad',
    description: 'Crispy romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2Flc2FyJTIwU2FsYWR8ZW58MHx8MHx8fDA%3D',
    category: 'Salads',
    popular: true
  },
  {
    id: 10,
    name: 'Chicken Wings',
    description: 'Crispy fried chicken wings tossed in spicy buffalo sauce',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2hpY2tlbiUyMFdpbmdzfGVufDB8fDB8fHww',
    category: 'Appetizers',
    popular: true
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((el) => observer.observe(el));

    return () => {
      menuItems.forEach((el) => observer.unobserve(el));
    };
  }, [filteredItems]);

  return (
    <section id="menu" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Menu</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our diverse menu featuring gourmet burgers, artisanal pizzas, homemade pasta, and delectable desserts.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div ref={menuRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="menu-item bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-600 opacity-0 translate-y-10 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                {item.popular && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                  <span className="text-orange-500 font-bold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                <button className="w-full bg-gray-800 dark:bg-gray-900 hover:bg-orange-500 dark:hover:bg-orange-500 text-white py-2 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
         <Link to='/menu'><button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition-colors duration-300">
            View Full Menu
          </button>
          </Link> 
        </div>
      </div>
    </section>
  );
};

export default Menu;