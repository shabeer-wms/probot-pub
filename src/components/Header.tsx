import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import pro26Logo from '../assets/pro26-logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'Camps', 'Tutorials', "What's Inside", 'Support'];

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={pro26Logo} 
              alt="Pro26 Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">ProBot</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium">
              Start Building
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}