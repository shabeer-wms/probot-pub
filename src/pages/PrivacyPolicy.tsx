import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt, FaUsers, FaLock, FaEye, FaGavel, FaChild, FaEnvelope } from 'react-icons/fa';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const policySection = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FaUsers,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'Name, email address, contact details, and any other information you provide when registering or communicating with us.'
        },
        {
          subtitle: 'Usage Data',
          text: 'Pages visited, time spent, browser type, device information, and IP address, collected automatically for analytics and security.'
        },
        {
          subtitle: 'Cookies & Tracking',
          text: 'We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content.'
        }
      ]
    },
    {
      id: 'information-usage',
      title: 'How We Use Your Information',
      icon: FaEye,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'To provide, operate, and maintain our website and services.'
        },
        {
          subtitle: 'Improvement & Personalization',
          text: 'To improve, personalize, and expand our offerings.'
        },
        {
          subtitle: 'Communication',
          text: 'To communicate with you, including for customer support and updates.'
        },
        {
          subtitle: 'Analytics',
          text: 'To analyze usage and trends to enhance user experience.'
        },
        {
          subtitle: 'Legal Compliance',
          text: 'To comply with legal obligations and protect our rights.'
        }
      ]
    },
    {
      id: 'sharing-disclosure',
      title: 'Sharing & Disclosure',
      icon: FaShieldAlt,
      content: [
        {
          subtitle: 'No Selling Policy',
          text: 'We do not sell your personal information under any circumstances.'
        },
        {
          subtitle: 'Trusted Partners',
          text: 'We may share your data with trusted third parties who assist us in operating our website, conducting our business, or serving our users, provided they agree to keep this information confidential.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information if required by law, to enforce our policies, or to protect our or others\' rights, property, or safety.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: FaLock,
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement industry-standard security measures to protect your information.'
        },
        {
          subtitle: 'Limitations',
          text: 'However, no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your data but cannot guarantee absolute security.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights & Choices',
      icon: FaGavel,
      content: [
        {
          subtitle: 'Access & Control',
          text: 'You may access, update, or delete your personal information by contacting us.'
        },
        {
          subtitle: 'Opt-out Options',
          text: 'You can opt out of certain communications or cookies at any time.'
        },
        {
          subtitle: 'GDPR Rights',
          text: 'For EU/EEA users: You have rights under the GDPR, including the right to access, rectify, or erase your data.'
        }
      ]
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      icon: FaChild,
      content: [
        {
          subtitle: 'Age Restrictions',
          text: 'Our services are not directed to children under 13. We do not knowingly collect personal information from children.'
        },
        {
          subtitle: 'Parental Notice',
          text: 'If you believe a child has provided us with personal data, please contact us for removal.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 sm:py-24">
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
              <FaShieldAlt className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              Privacy Policy
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              Your privacy matters to us at Pro26. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Commitment to Privacy</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                We are committed to transparency and protecting your data. This policy outlines our practices regarding 
                the collection, use, and protection of your personal information when you use our services.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">Last Updated: June 28, 2025</h3>
              <p className="text-blue-700 text-sm">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised effective date. 
                We encourage you to review this policy periodically.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-12">
          {policySection.map((section, index) => (
            <div key={section.id} className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-6">
                  <section.icon className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{index + 1}. {section.title}</h2>
                </div>
              </div>

              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-4 border-blue-200 pl-6 py-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.subtitle}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Third-Party Links & Policy Updates */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
              <FaEye className="text-white text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Links</h3>
            <p className="text-gray-600 leading-relaxed">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices 
              or content of those sites. Please review their privacy policies before providing any information.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6">
              <FaGavel className="text-white text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Updates to This Policy</h3>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised 
              effective date. We encourage you to review this policy periodically.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <FaEnvelope className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                Questions About Privacy?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
                If you have any questions, concerns, or requests regarding your privacy or this policy, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:support@pro26.in"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 min-w-[200px] inline-block"
                >
                  Contact Support
                </a>
                <button 
                  onClick={() => handleNavigateWithScroll('/about')}
                  className="bg-transparent border-3 border-white text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105 min-w-[200px]"
                >
                  Learn About Us
                </button>
              </div>
              <p className="text-sm text-blue-100 mt-6">
                Email: <span className="font-medium">support@pro26.in</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
