import { ArrowRight, Play, Instagram, Linkedin, Globe } from 'lucide-react';
import robotImage from '../assets/children-making-robot.jpg';

export default function Hero() {
  return (
    <section id="hero" className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 -translate-x-12 sm:-translate-x-24 -translate-y-12 sm:-translate-y-24 animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full opacity-15 -translate-x-16 sm:-translate-x-32 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 translate-y-24 sm:translate-y-32 animate-swing"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                A New Box of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-gradient-text">
                  Learning & Robotics Every Month
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                We deliver hands-on kits that teach electronics, Arduino programming, and robotics to students, right at your doorstep or school.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <button 
                onClick={() => {
                  window.open('/shop', '_self');
                  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-3xl font-bold text-sm sm:text-base hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 flex items-center justify-center group min-w-[180px] sm:min-w-[220px] h-[50px] sm:h-[60px]"
              >
                Get Your Kit
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button 
                onClick={() => {
                  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                }}
                className="bg-transparent border-3 border-red-400 text-red-600 px-8 py-4 rounded-3xl font-bold text-sm sm:text-base hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 hover:scale-105 flex items-center justify-center group min-w-[180px] sm:min-w-[220px] h-[50px] sm:h-[60px]"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
              <span className="text-sm text-gray-500">Follow Us:</span>
              <div className="flex space-x-4">
                <a
                  href="https://pro26.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:shadow-cyan-500/25 group"
                >
                  <Globe className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="https://instagram.com/pro26.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:shadow-pink-500/25 group"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="https://linkedin.com/company/pro26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:shadow-blue-500/25 group"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative order-first lg:order-last">
            <div className="relative">
              {/* Robotics/Arduino image */}
              <div className="w-full max-w-sm sm:max-w-md mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                  <img 
                    src={robotImage} 
                    alt="Children learning robotics and Arduino programming"
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-80 animate-pulse shadow-lg shadow-pink-500/25" style={{animationDuration: '4s'}}></div>
              <div className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-bounce shadow-lg shadow-orange-500/25" style={{animationDuration: '3s'}}></div>
              <div className="absolute top-1/3 -right-2 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full opacity-70 animate-pulse" style={{animationDuration: '5s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}