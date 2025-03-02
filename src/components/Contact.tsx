import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6 text-orange-500" />,
    title: 'Location',
    details: '123 Foodie Street, Culinary District, NY 10001'
  },
  {
    icon: <Phone className="h-6 w-6 text-orange-500" />,
    title: 'Phone',
    details: '+1 (555) 123-4567'
  },
  {
    icon: <Mail className="h-6 w-6 text-orange-500" />,
    title: 'Email',
    details: 'hello@cloudkitchen.com'
  },
  {
    icon: <Clock className="h-6 w-6 text-orange-500" />,
    title: 'Hours',
    details: 'Mon-Sun: 10:00 AM - 10:00 PM'
  }
];

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);

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

    const contactElements = document.querySelectorAll('.contact-item');
    contactElements.forEach((el) => observer.observe(el));

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      contactElements.forEach((el) => observer.unobserve(el));
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out to our team using any of the methods below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <div 
              key={index}
              className="contact-item bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 opacity-0 translate-y-10 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{item.details}</p>
            </div>
          ))}
        </div>
        
        <div 
          ref={contactRef}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="w-full md:w-1/2 bg-gray-900 dark:bg-gray-800 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Download Our App</h3>
              <p className="text-gray-300 mb-8">
                Get the full Cloud Kitchen experience on your mobile device. Order food, track deliveries, and earn rewards with our mobile app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5,2H8.5C6.5,2,5,3.5,5,5.5v13C5,20.5,6.5,22,8.5,22h9c2,0,3.5-1.5,3.5-3.5v-13C21,3.5,19.5,2,17.5,2z M13,20.5h-2v-1h2V20.5z M18,17.5H8V5h10V17.5z"/>
                  </svg>
                  App Store
                </button>
                <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.7,3.7,2,4.5,2h15C20.3,2,21,2.7,21,3.5v17c0,0.8-0.7,1.5-1.5,1.5h-15C3.7,22,3,21.3,3,20.5z M12,17.5c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5S11.2,17.5,12,17.5z M7.5,4h9v9h-9V4z"/>
                  </svg>
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;