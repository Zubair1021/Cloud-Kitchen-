import React, { useEffect, useRef } from 'react';
import { Clock, Truck, Utensils, Award } from 'lucide-react';

const features = [
  {
    icon: <Utensils className="h-10 w-10 text-orange-500" />,
    title: 'Gourmet Chefs',
    description: 'Our professional chefs craft each meal with precision and passion, ensuring restaurant-quality food every time.'
  },
  {
    icon: <Clock className="h-10 w-10 text-orange-500" />,
    title: 'Quick Preparation',
    description: 'Our streamlined kitchen operations allow us to prepare your meals quickly without compromising on quality.'
  },
  {
    icon: <Truck className="h-10 w-10 text-orange-500" />,
    title: 'Fast Delivery',
    description: 'We partner with top delivery services to ensure your food arrives hot and fresh at your doorstep.'
  },
  {
    icon: <Award className="h-10 w-10 text-orange-500" />,
    title: 'Quality Ingredients',
    description: 'We source only the freshest, highest-quality ingredients for all our dishes.'
  }
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

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

    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach((el) => observer.observe(el));

    return () => {
      featureElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Why Choose Our Cloud Kitchen?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We combine the efficiency of a cloud kitchen with the quality of a fine dining restaurant to bring you the best culinary experience.
          </p>
        </div>
        
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 translate-y-10 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our State-of-the-Art Kitchen</h3>
              <p className="text-white/90 mb-6">
                Our cloud kitchen is equipped with the latest culinary technology and follows strict hygiene protocols to ensure the highest quality food preparation.
              </p>
              <ul className="space-y-3">
                {['Modern Equipment', 'Strict Hygiene Standards', 'Efficient Workflow', 'Sustainable Practices'].map((item, index) => (
                  <li key={index} className="flex items-center text-white">
                    <span className="h-2 w-2 bg-white rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Modern kitchen" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;