import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 5,
    text: 'The food from Cloud Kitchen is absolutely amazing! The flavors are authentic and the delivery is always prompt. It\'s like having a restaurant-quality meal at home.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Regular Customer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 4,
    text: 'I order from Cloud Kitchen at least twice a week. Their menu variety is impressive and the quality is consistently good. My go-to for busy weeknights!'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Food Blogger',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
    rating: 5,
    text: 'As someone who reviews food for a living, I can confidently say that Cloud Kitchen offers some of the best delivery food in the city. Fresh ingredients and creative recipes!'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Business Professional',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 5,
    text: 'Cloud Kitchen has been a lifesaver for our office lunches. The food is always delivered on time, still hot, and everyone loves the variety. Highly recommended for corporate orders!'
  },
  {
    id: 5,
    name: 'Jessica Lee',
    role: 'Health Enthusiast',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 5,
    text: 'I love how Cloud Kitchen offers healthy options without compromising on taste. Their salads and grain bowls are my favorite!'
  },
  {
    id: 6,
    name: 'Daniel Brown',
    role: 'Fitness Trainer',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 4,
    text: 'Cloud Kitchen is my go-to for post-workout meals. Their protein-packed dishes are delicious and help me stay on track with my fitness goals.'
  },
  {
    id: 7,
    name: 'Olivia Martinez',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80',
    rating: 5,
    text: 'As a student, I rely on Cloud Kitchen for quick and affordable meals. The portions are generous, and the food is always fresh and tasty.'
  },
  {
    id: 8,
    name: 'James Taylor',
    role: 'Traveler',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 4,
    text: 'Whenever I\'m in town, Cloud Kitchen is my first choice for food delivery. Their international cuisine options are fantastic!'
  },
  {
    id: 9,
    name: 'Sophia Anderson',
    role: 'Home Cook',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 5,
    text: 'I appreciate how Cloud Kitchen inspires me with their creative dishes. Sometimes I even try to recreate their recipes at home!'
  },
  {
    id: 10,
    name: 'William Clark',
    role: 'Food Critic',
    image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80',
    rating: 5,
    text: 'Cloud Kitchen consistently delivers high-quality meals that exceed my expectations. Their attention to detail is remarkable.'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleItems = 3;
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - maxVisibleItems ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - maxVisibleItems : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
        }
      },
      { threshold: 0.1 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-orange-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their Cloud Kitchen experience.
          </p>
        </div>
        
        <div 
          ref={testimonialsRef}
          className="relative opacity-0 transition-opacity duration-1000"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Customer Reviews</h3>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / maxVisibleItems)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="min-w-[calc(100%/3)] px-4 flex-shrink-0 w-full md:w-1/3"
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 flex-grow">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Join thousands of satisfied customers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Experience the convenience of restaurant-quality meals delivered to your doorstep. Order today and taste the difference!
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 self-start">
                Order Your First Meal
              </button>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Delicious food spread" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;