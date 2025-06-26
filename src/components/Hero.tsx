import { ArrowRight, Play, Instagram, Linkedin, Globe } from 'lucide-react';
import robotImage from '../assets/children-making-robot.jpg';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 to-blue-50 overflow-hidden">
      {/* Animated Background - Robotics Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating robotics elements */}
        {/* Circuit board patterns */}
        {/* Arduino board */}
        {/* Robot head */}
        {/* Gear */}
        {/* LED */}
        {/* Resistor */}
        {/* Sensor */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                A New Box of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  Learning & Robotics Every Month
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                We deliver hands-on kits that teach electronics, Arduino programming, and robotics to students, right at your doorstep or school.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center group">
                Get Your Kit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-teal-600 hover:text-teal-600 transition-colors duration-200 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-4">
              <span className="text-sm text-gray-500">Follow Us:</span>
              <div className="flex space-x-4">
                <a
                  href="https://pro26.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-teal-50 group"
                >
                  <Globe className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="#instagram"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-pink-50 group"
                >
                  <Instagram className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="#linkedin"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-blue-50 group"
                >
                  <Linkedin className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative">
              {/* Robotics/Arduino image */}
              <div className="w-full max-w-md mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={robotImage} 
                    alt="Children learning robotics and Arduino programming"
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                  {/* Overlay for better text contrast if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-teal-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-200 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100 to-transparent opacity-50"></div>
    </section>
  );
}