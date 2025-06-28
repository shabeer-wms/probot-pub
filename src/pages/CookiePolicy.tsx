import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCookie, FaCogs, FaChartBar, FaUserCog, FaShieldAlt, FaEdit, FaEnvelope } from 'react-icons/fa';

export default function CookiePolicy() {
  const navigate = useNavigate();

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const cookieTypes = [
    {
      id: 'essential-cookies',
      title: 'Essential Cookies',
      icon: FaCogs,
      color: 'from-green-500 to-emerald-600',
      description: 'Required for core website functionality, such as security, network management, and accessibility. These cannot be disabled.',
      examples: [
        'Session management cookies',
        'Security and authentication cookies',
        'Load balancing cookies',
        'Accessibility preference cookies'
      ]
    },
    {
      id: 'performance-cookies',
      title: 'Performance Cookies',
      icon: FaChartBar,
      color: 'from-blue-500 to-cyan-600',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously, so we can improve site performance.',
      examples: [
        'Google Analytics cookies',
        'Page load time measurement',
        'Error tracking cookies',
        'Website usage statistics'
      ]
    },
    {
      id: 'functional-cookies',
      title: 'Functional Cookies',
      icon: FaUserCog,
      color: 'from-purple-500 to-indigo-600',
      description: 'Enable enhanced features and personalization, such as remembering your preferences or settings.',
      examples: [
        'Language preference cookies',
        'Theme and display settings',
        'Form data retention',
        'User interface customizations'
      ]
    },
    {
      id: 'analytics-cookies',
      title: 'Analytics & Third-Party Cookies',
      icon: FaShieldAlt,
      color: 'from-orange-500 to-red-600',
      description: 'Used to analyze traffic and usage patterns, and may be set by third-party services we use to deliver content or features.',
      examples: [
        'Third-party analytics tools',
        'Social media integration cookies',
        'Marketing and advertising cookies',
        'Customer support chat cookies'
      ]
    }
  ];

  const managementTips = [
    {
      browser: 'Chrome',
      instructions: 'Settings > Privacy and security > Cookies and other site data'
    },
    {
      browser: 'Firefox',
      instructions: 'Settings > Privacy & Security > Cookies and Site Data'
    },
    {
      browser: 'Safari',
      instructions: 'Preferences > Privacy > Manage Website Data'
    },
    {
      browser: 'Edge',
      instructions: 'Settings > Site permissions > Cookies and site data'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button 
            onClick={() => handleNavigateWithScroll('/')}
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <FaCookie className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              Cookie Policy
            </h1>
            <p className="text-xl sm:text-2xl text-green-100 max-w-3xl mx-auto drop-shadow-md">
              At Pro26, we are committed to protecting your privacy and ensuring transparency about how we use cookies and similar technologies.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Are Cookies?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Cookies are small text files placed on your device by websites you visit. They are widely used to make 
                websites work efficiently, as well as to provide information to site owners and enhance your browsing experience.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-2">Cookie Consent</h3>
              <p className="text-green-700 text-sm">
                By continuing to use our site, you agree to our use of cookies as described below. You can manage your 
                cookie preferences at any time through your browser settings.
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">How We Use Cookies</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We use different types of cookies to provide you with the best possible experience on our website.
            </p>
          </div>

          <div className="grid gap-8">
            {cookieTypes.map((cookie, index) => (
              <div key={cookie.id} className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
                <div className="flex items-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${cookie.color} rounded-full flex items-center justify-center mr-6`}>
                    <cookie.icon className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">{index + 1}. {cookie.title}</h3>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 leading-relaxed mb-6">{cookie.description}</p>
                    <div className={`bg-gradient-to-br ${cookie.color} p-6 rounded-2xl text-white`}>
                      <h4 className="font-bold text-lg mb-3">Purpose & Functionality</h4>
                      <p className="text-white/90 text-sm">
                        These cookies {cookie.title.toLowerCase()} are essential for providing you with the best 
                        possible user experience and ensuring our website functions properly.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Examples Include:</h4>
                    <div className="space-y-3">
                      {cookie.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 bg-gradient-to-br ${cookie.color} rounded-full`}></div>
                          <span className="text-gray-700">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cookie Management */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-full mb-6">
                <FaCogs className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                You have the right to decide whether to accept or reject cookies. Most web browsers allow you to control 
                cookies through their settings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Browser Settings</h3>
                <div className="space-y-4">
                  {managementTips.map((tip, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800">{tip.browser}</h4>
                      <p className="text-gray-600 text-sm">{tip.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Important Notes</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-sm">
                      Disabling certain cookies may affect the functionality of our website
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-sm">
                      Essential cookies cannot be disabled as they are required for core functionality
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 text-sm">
                      Visit <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">allaboutcookies.org</a> for detailed cookie management guides
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-bold text-yellow-800 mb-2">Educational Platform Notice</h4>
              <p className="text-yellow-700 text-sm">
                As an educational platform serving minors, we take extra care with cookie usage. We do not use cookies 
                for advertising purposes and limit third-party cookies to essential services only.
              </p>
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mb-6">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Third-Party Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We use trusted third-party services to enhance your experience. These services may set their own cookies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Analytics</h3>
                <p className="text-gray-600 text-sm mb-3">
                  We use Google Analytics to understand how visitors use our site and improve performance.
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-700 text-xs">
                    You can opt-out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Educational Tools</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Our online learning platform may use cookies to save your progress and preferences.
                </p>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-green-700 text-xs">
                    These cookies help provide a personalized learning experience for each student.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Support Services</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Customer support chat and help desk services may use cookies for functionality.
                </p>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-purple-700 text-xs">
                    These cookies enable us to provide better customer support and assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Updates Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center mb-6">
              <FaEdit className="text-white text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Updates to This Policy</h3>
            <p className="text-gray-600 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our operations. 
              Any updates will be posted on this page, and we encourage you to review it periodically.
            </p>
            <div className="bg-teal-50 rounded-lg p-4 mt-4">
              <p className="text-teal-700 text-sm">
                <strong>Last Updated:</strong> June 28, 2025
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-6">
              <FaCookie className="text-white text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Cookie Consent</h3>
            <p className="text-gray-600 leading-relaxed">
              By continuing to use our website, you consent to our use of cookies as described in this policy. 
              You can withdraw your consent at any time by adjusting your browser settings.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <p className="text-blue-700 text-sm">
                <strong>Your Choice:</strong> You have full control over your cookie preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <FaEnvelope className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Questions About Cookies?
            </h2>
            <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              If you have any questions or concerns about our use of cookies, please contact us. We are happy to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:support@pro26.in"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 min-w-[200px] inline-block"
              >
                Contact Support
              </a>
              <button 
                onClick={() => handleNavigateWithScroll('/privacy')}
                className="bg-transparent border-3 border-white text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-105 min-w-[200px]"
              >
                Privacy Policy
              </button>
            </div>
            <p className="text-sm text-green-100 mt-6">
              Email: <span className="font-medium">support@pro26.in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
