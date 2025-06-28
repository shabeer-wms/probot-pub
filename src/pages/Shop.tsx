import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaArrowLeft, FaCheck, FaTruck, FaLock, FaUsers, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Shop() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartClosing, setIsCartClosing] = useState(false);

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const closeCart = () => {
    setIsCartClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsCartClosing(false);
    }, 300); // Match the animation duration
  };

  const addToCart = (kit: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === kit.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === kit.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, {
          id: kit.id,
          name: kit.name,
          price: kit.price,
          quantity: 1,
          image: kit.image
        }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const kits = [
    {
      id: 1,
      name: 'Arduino Starter Kit',
      price: 4199,
      originalPrice: 5899,
      rating: 4.8,
      reviews: 124,
      image: '/api/placeholder/300/250',
      description: 'Perfect for beginners! Includes Arduino Uno, breadboard, LEDs, resistors, and 15+ components.',
      features: [
        'Arduino Uno R3 board',
        'Breadboard & jumper wires',
        '20+ electronic components',
        'Step-by-step project guide',
        'Online tutorial access'
      ],
      difficulty: 'Beginner',
      ageRange: '8-16',
      projects: '10+',
      color: 'bg-gradient-to-br from-green-400 to-emerald-500'
    },
    {
      id: 2,
      name: 'Robot Building Kit',
      price: 7599,
      originalPrice: 10099,
      rating: 4.9,
      reviews: 89,
      image: '/api/placeholder/300/250',
      description: 'Build your own obstacle-avoiding robot! Includes sensors, motors, and chassis.',
      features: [
        'Arduino-compatible board',
        'Ultrasonic sensor',
        'Servo motors & wheels',
        'Robot chassis frame',
        'Pre-programmed examples'
      ],
      difficulty: 'Intermediate',
      ageRange: '10-18',
      projects: '5+',
      color: 'bg-gradient-to-br from-blue-400 to-purple-500'
    },
    {
      id: 3,
      name: 'Smart Home Kit',
      price: 10999,
      originalPrice: 13499,
      rating: 4.7,
      reviews: 67,
      image: '/api/placeholder/300/250',
      description: 'Create IoT devices! Control lights, monitor temperature, and build smart home automation.',
      features: [
        'ESP32 WiFi board',
        'Temperature & humidity sensors',
        'Relay modules',
        'LED strips & controllers',
        'Mobile app connectivity'
      ],
      difficulty: 'Advanced',
      ageRange: '12+',
      projects: '8+',
      color: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
    {
      id: 4,
      name: 'Sensor Explorer Kit',
      price: 3399,
      originalPrice: 4649,
      rating: 4.6,
      reviews: 156,
      image: '/api/placeholder/300/250',
      description: 'Discover the world of sensors! Light, sound, motion, and temperature detection.',
      features: [
        'Arduino Nano board',
        '12 different sensors',
        'LCD display module',
        'Buzzer & LED indicators',
        'Sensor library code'
      ],
      difficulty: 'Beginner',
      ageRange: '8-14',
      projects: '15+',
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
      id: 5,
      name: 'LED Matrix Display Kit',
      price: 5899,
      originalPrice: 7599,
      rating: 4.8,
      reviews: 93,
      image: '/api/placeholder/300/250',
      description: 'Create stunning visual displays! Build scrolling text, animations, and games.',
      features: [
        'Arduino Uno compatible',
        '8x8 LED matrix panels',
        'Real-time clock module',
        'Button controls',
        'Animation library'
      ],
      difficulty: 'Intermediate',
      ageRange: '10-16',
      projects: '12+',
      color: 'bg-gradient-to-br from-cyan-400 to-blue-500'
    },
    {
      id: 6,
      name: 'Advanced Robotics Kit',
      price: 16899,
      originalPrice: 21099,
      rating: 4.9,
      reviews: 42,
      image: '/api/placeholder/300/250',
      description: 'Professional-grade robotics! Build complex robots with advanced sensors and AI.',
      features: [
        'Raspberry Pi 4 included',
        'Camera & microphone',
        'Servo & stepper motors',
        'Advanced sensor array',
        'AI programming examples'
      ],
      difficulty: 'Expert',
      ageRange: '14+',
      projects: '6+',
      color: 'bg-gradient-to-br from-red-400 to-rose-500'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button and Cart */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button 
            onClick={() => handleNavigateWithScroll('/')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>
          
          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            <FaShoppingCart className="mr-2" />
            <span className="hidden xs:inline">Cart</span>
            <span className="xs:hidden">Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mb-4 sm:mb-6 shadow-lg animate-pulse">
            <FaShoppingCart size={32} className="text-white sm:hidden" />
            <FaShoppingCart size={40} className="text-white hidden sm:block" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            Robotics Kit Shop
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg">
            Discover our curated collection of Arduino and robotics kits. From beginner-friendly starter sets to advanced robotics projects.
          </p>
          
          {/* Shop Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-xl p-3 sm:p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaTruck className="text-xl sm:text-2xl mx-auto mb-2" />
              <h3 className="font-bold text-sm sm:text-base">Free Shipping</h3>
              <p className="text-green-100 text-xs sm:text-sm">On orders over ₹1,000</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-xl p-3 sm:p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaLock className="text-xl sm:text-2xl mx-auto mb-2" />
              <h3 className="font-bold text-sm sm:text-base">Quality Guarantee</h3>
              <p className="text-blue-100 text-xs sm:text-sm">7-day return policy</p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white rounded-xl p-3 sm:p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaUsers className="text-xl sm:text-2xl mx-auto mb-2" />
              <h3 className="font-bold text-sm sm:text-base">Expert Support</h3>
              <p className="text-purple-100 text-xs sm:text-sm">24/7 technical help</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {kits.map((kit) => (
            <div key={kit.id} className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              {/* Product Image */}
              <div className={`h-40 sm:h-48 ${kit.color} flex items-center justify-center relative`}>
                <div className="text-white text-4xl sm:text-6xl opacity-20">
                  <FaShoppingCart />
                </div>
                {kit.originalPrice > kit.price && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    SALE
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(kit.difficulty)}`}>
                    {kit.difficulty}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="mr-1 text-sm" />
                    <span className="text-gray-700 font-medium text-sm">{kit.rating}</span>
                    <span className="text-gray-500 text-xs ml-1">({kit.reviews})</span>
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{kit.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{kit.description}</p>
                
                {/* Kit Details */}
                <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-4 text-xs">
                  <div className="bg-gray-50 rounded-lg p-1 sm:p-2 text-center">
                    <div className="font-bold text-gray-800 text-xs">Age</div>
                    <div className="text-gray-600 text-xs">{kit.ageRange}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-1 sm:p-2 text-center">
                    <div className="font-bold text-gray-800 text-xs">Projects</div>
                    <div className="text-gray-600 text-xs">{kit.projects}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-1 sm:p-2 text-center">
                    <div className="font-bold text-gray-800 text-xs">Level</div>
                    <div className="text-gray-600 text-xs">{kit.difficulty.slice(0, 8)}</div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">What's Included:</h4>
                  <div className="space-y-1">
                    {kit.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-600">
                        <FaCheck className="text-green-500 mr-2 text-xs flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                    {kit.features.length > 3 && (
                      <div className="text-xs text-gray-500">+ {kit.features.length - 3} more items</div>
                    )}
                  </div>
                </div>
                
                {/* Price & Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-800">₹{kit.price.toLocaleString('en-IN')}</div>
                    {kit.originalPrice > kit.price && (
                      <div className="text-sm text-gray-500 line-through">₹{kit.originalPrice.toLocaleString('en-IN')}</div>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(kit)}
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
                  >
                    <FaShoppingCart className="mr-2" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 rounded-3xl p-6 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">Need Help Choosing?</h2>
            <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-md">
              Not sure which kit is right for you? Join our camps to try before you buy, or contact our experts for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => handleNavigateWithScroll('/camp-registration')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 min-w-[200px] sm:min-w-[250px]"
              >
                Register for a Camp
              </button>
              <button 
                onClick={() => handleNavigateWithScroll('/')}
                className="bg-transparent border-3 border-white text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-white hover:text-teal-600 transition-all duration-300 hover:scale-105 min-w-[200px] sm:min-w-[250px]"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end ${isCartClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeCart();
            }
          }}
        >
          <div className={`bg-white w-full sm:max-w-md h-full overflow-y-auto shadow-2xl ${isCartClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
            {/* Cart Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 sm:p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center">
                  <FaShoppingCart className="mr-2 sm:mr-3" />
                  <span className="hidden sm:inline">Shopping Cart</span>
                  <span className="sm:hidden">Cart</span>
                </h2>
                <button 
                  onClick={closeCart}
                  className="text-white hover:text-gray-200 transition-colors duration-200 p-2"
                >
                  <FaTimes size={20} className="sm:hidden" />
                  <FaTimes size={24} className="hidden sm:block" />
                </button>
              </div>
              <p className="text-purple-100 mt-2 text-sm sm:text-base">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in cart
              </p>
            </div>

            {/* Cart Items */}
            <div className="p-4 sm:p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <FaShoppingCart className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-4" />
                  <p className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-6">Your cart is empty</p>
                  <button 
                    onClick={closeCart}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-xl p-3 sm:p-4 shadow-sm">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaShoppingCart className="text-white text-sm sm:text-xl" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base">{item.name}</h3>
                            <p className="text-indigo-600 font-bold text-sm sm:text-base">₹{item.price.toLocaleString('en-IN')}</p>
                            <div className="flex items-center mt-2 space-x-2">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                              >
                                <FaMinus className="text-gray-600 text-xs" />
                              </button>
                              <span className="font-semibold text-gray-800 min-w-[1.5rem] sm:min-w-[2rem] text-center text-sm sm:text-base">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                              >
                                <FaPlus className="text-gray-600 text-xs" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800 text-sm sm:text-base">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-xs sm:text-sm mt-1 transition-colors duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t pt-4 sm:pt-6">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold">₹{getTotalPrice().toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-semibold text-green-600">
                          {getTotalPrice() >= 1000 ? 'Free' : '₹99'}
                        </span>
                      </div>
                      <div className="border-t pt-3 sm:pt-4">
                        <div className="flex justify-between items-center text-base sm:text-lg">
                          <span className="font-bold">Total:</span>
                          <span className="font-bold text-indigo-600">
                            ₹{(getTotalPrice() + (getTotalPrice() >= 1000 ? 0 : 99)).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      
                      {getTotalPrice() < 1000 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3 sm:mt-4">
                          <p className="text-yellow-800 text-xs sm:text-sm">
                            Add ₹{(1000 - getTotalPrice()).toLocaleString('en-IN')} more for free shipping!
                          </p>
                        </div>
                      )}

                      <button 
                        onClick={() => {
                          alert('🚧 Checkout functionality coming soon! For now, please contact hr@pro26.in to place your order.');
                        }}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 mt-4 sm:mt-6"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
