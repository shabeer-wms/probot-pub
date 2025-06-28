import { Github, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pro26Logo from '../assets/pro26-logo.png';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', action: () => handleNavigateWithScroll('/') },
        { text: 'Camps', action: () => handleNavigateWithScroll('/camps') },
        { text: 'Shop', action: () => handleNavigateWithScroll('/shop') },
        { text: 'Blog', action: () => handleNavigateWithScroll('/blog') },
        { text: "What's Inside", action: () => handleScrollToSection('features') },
        { text: 'Contact Us', action: () => handleScrollToSection('contact-us') }
      ]
    },
    {
      title: 'Programs',
      links: [
        { text: 'One-Day Arduino Camp', action: () => handleNavigateWithScroll('/camps/one-day') },
        { text: 'Two-Day Robotics Camp', action: () => handleNavigateWithScroll('/camps/two-day') },
        { text: 'Online STEM Kit Program', action: () => handleNavigateWithScroll('/camps/online') },
        { text: 'School Collaboration Program', action: () => handleNavigateWithScroll('/register?type=institution') },
        { text: 'Custom STEM Workshops', action: () => { window.location.href = 'mailto:hr@pro26.in?subject=Custom Workshop Request'; } }
      ]
    },
    {
      title: 'Contact',
      links: [
        { text: 'support@pro26.in', action: () => { window.location.href = 'mailto:support@pro26.in'; } },
        { text: 'Kerala, India', action: () => { window.open('https://maps.google.com/?q=Kerala,India', '_blank'); } },
        { text: 'www.pro26.in', action: () => { window.open('https://pro26.in', '_blank'); } }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src={pro26Logo} 
                alt="Pro26 Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="ml-2 text-xl font-bold">ProBot</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Inspiring young minds through hands-on electronics, robotics, and Arduino-based learning camps for future innovators.
            </p>
            <p className="text-gray-400 text-sm">
              Kerala, India (with national online access)
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © 2025 Pro26. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4 text-sm text-gray-400">
                <button 
                  onClick={() => handleNavigateWithScroll('/privacy')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => handleNavigateWithScroll('/terms')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => handleNavigateWithScroll('/cookies')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Cookie Policy
                </button>
              </div>
              
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/company/pro26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/pro-26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Designed with <span className="text-red-500">❤</span> for aspiring young innovators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}