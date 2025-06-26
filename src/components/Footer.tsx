import { Github, Linkedin } from 'lucide-react';
import pro26Logo from '../assets/pro26-logo.png';

export default function Footer() {
  const footerSections = [
    {
      title: 'Quick Links',
      links: ['Home', 'Camps', 'Tutorials', "What's Inside", 'Enroll Now']
    },
    {
      title: 'Programs',
      links: ['One-Day Arduino Camp', 'Two-Day Robotics Camp', 'Online STEM Kit Program', 'School Collaboration Program', 'Custom STEM Workshops']
    },
    {
      title: 'Contact',
      links: ['hr@pro26.in', 'Kerala, India', 'www.pro26.in']
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
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
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
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
              </div>
              
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
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