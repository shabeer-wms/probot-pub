import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pro26Logo from '../assets/pro26-logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent page reload
    if (location.pathname !== '/') {
      // If not on home page, navigate to home
      navigate('/');
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // If on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToContactUs = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent page reload
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page and then scroll
      navigate('/');
      // Use setTimeout to ensure DOM is loaded before scrolling
      setTimeout(() => {
        const contactUsSection = document.getElementById('contact-us');
        if (contactUsSection) {
          contactUsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If on home page, scroll to contact us section
      const contactUsSection = document.getElementById('contact-us');
      if (contactUsSection) {
        contactUsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn("Contact Us section not found. Ensure the 'contact-us' ID is present in the DOM.");
      }
    }
  };

  const handleScrollToFeatures = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent page reload
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page and then scroll
      navigate('/');
      // Use setTimeout to ensure DOM is loaded before scrolling
      setTimeout(() => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If on home page, scroll to features section
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn("Features section not found. Ensure the 'features' ID is present in the DOM.");
      }
    }
  };

  const handleNavigateToCamps = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent page reload
    navigate('/camps');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateToShop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent page reload
    navigate('/shop');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateToAbout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent page reload
    navigate('/about');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleStartBuilding = () => {
    navigate('/shop');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navItems = [
    { name: 'Home', href: '/', onClick: handleScrollToTop },
    { name: 'Benefits', href: '/#features', onClick: handleScrollToFeatures },
    { name: 'Camps', href: '/camps', onClick: handleNavigateToCamps },
    { name: 'Shop', href: '/shop', onClick: handleNavigateToShop },
    { name: 'Support', href: '/#contact-us', onClick: handleScrollToContactUs },
    { name: 'About', href: '/about', onClick: handleNavigateToAbout },
  ];

  const isActiveNavItem = (href: string) => {
    // For exact home page - only active when on home with no specific section focus
    if (href === '/') {
      return location.pathname === '/';
    }
    // For section-based navigation - never show as active since they're quick scroll actions
    if (href.startsWith('/#')) {
      return false; // Section links don't stay "active" - they're action links
    }
    // For other pages (camps, shop, etc.)
    return location.pathname === href;
  };

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
          <nav className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item) => {
              const isActive = isActiveNavItem(item.href);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className={`group relative text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 py-2 ${
                    isActive ? 'text-teal-600' : ''
                  }`}
                >
                  {item.name}
                  {/* Animated underline */}
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-300 ease-out transform ${
                      isActive ? 'w-full opacity-100 scale-100' : 'w-0 opacity-0 scale-95 group-hover:w-full group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleStartBuilding}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
            >
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
              {navItems.map((item) => {
                const isActive = isActiveNavItem(item.href);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        item.onClick(e);
                      }
                      setIsMenuOpen(false);
                    }}
                    className={`relative text-gray-700 hover:text-teal-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg ${
                      isActive ? 'text-teal-600 bg-gradient-to-r from-teal-50 to-blue-50 shadow-sm' : 'hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    {/* Mobile active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-teal-500 to-blue-500 rounded-r-full shadow-sm" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}