import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full text-center">
        {/* Animated 404 with robot background */}
        <div className="relative">
          <div 
            className="relative h-[300px] md:h-[600px] w-full bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 80%'
            }}>
            <h2 className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl font-bold text-black drop-shadow-lg z-10"
                style={{ textShadow: '0 0 10px rgba(238, 221, 221, 0.8)' }}>
              Looks like you're lost
            </h2>
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-10">
              <p className="text-base md:text-lg text-gray-800 font-medium mb-1 drop-shadow-lg"
                 style={{ textShadow: '0 0 8px rgba(255,255,255,0.9)' }}>
                Looks like we couldn't find what you're looking for!
              </p>
              <p className="text-sm md:text-base text-gray-700 drop-shadow-lg"
                 style={{ textShadow: '0 0 8px rgba(255,255,255,0.9)' }}>
                The page you are trying to access might have been removed or moved.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 mt-2">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="mr-2 h-5 w-5" />
            Go to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Helpful links */}
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <Search className="mr-2 h-5 w-5 text-blue-600" />
            Maybe you're looking for:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/camps"
              className="text-blue-600 hover:text-teal-600 hover:underline font-medium transition-colors"
            >
              Camps
            </Link>
            <Link
              to="/about"
              className="text-blue-600 hover:text-teal-600 hover:underline font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/shop"
              className="text-blue-600 hover:text-teal-600 hover:underline font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/blog"
              className="text-blue-600 hover:text-teal-600 hover:underline font-medium transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Fun robot message */}
        <div className="mt-8 text-gray-500 italic">
          "Beep boop! Even robots make mistakes sometimes. Let's get you back on track!" 🚀
        </div>
      </div>
    </div>
  );
};

export default NotFound;
