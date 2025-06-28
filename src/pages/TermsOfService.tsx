import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGavel, FaUsers, FaShieldAlt, FaExclamationTriangle, FaCopyright, FaEdit, FaEnvelope } from 'react-icons/fa';

export default function TermsOfService() {
  const navigate = useNavigate();

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const termsSection = [
    {
      id: 'acceptance-terms',
      title: 'Acceptance of Terms',
      icon: FaGavel,
      content: [
        {
          subtitle: 'Agreement to Terms',
          text: 'By accessing or using Pro26, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our services.'
        },
        {
          subtitle: 'Legal Capacity',
          text: 'You represent and warrant that you have the legal capacity to enter into these Terms. If you are under 18, you must have your parent or guardian\'s permission to use our services.'
        },
        {
          subtitle: 'Service Access',
          text: 'These Terms apply to all users of our website, educational programs, and related services provided by Pro26.'
        }
      ]
    },
    {
      id: 'use-services',
      title: 'Use of Our Services',
      icon: FaUsers,
      content: [
        {
          subtitle: 'Lawful Use',
          text: 'You agree to use our website and services only for lawful purposes and in accordance with these Terms. You are responsible for your conduct and any data, text, files, or other content you submit.'
        },
        {
          subtitle: 'User Responsibilities',
          text: 'You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.'
        },
        {
          subtitle: 'Prohibited Activities',
          text: 'You may not use our services to engage in any unlawful, harmful, or disruptive activities, including but not limited to harassment, spam, or violation of others\' privacy.'
        },
        {
          subtitle: 'Educational Purpose',
          text: 'Our services are designed for educational purposes. You agree to use them in a manner consistent with learning and teaching objectives.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: FaCopyright,
      content: [
        {
          subtitle: 'Ownership Rights',
          text: 'All content, trademarks, and data on this website, including but not limited to text, graphics, logos, and software, are the property of Pro26 or its licensors and are protected by applicable intellectual property laws.'
        },
        {
          subtitle: 'Limited License',
          text: 'We grant you a limited, non-exclusive, non-transferable license to access and use our services for personal, educational purposes only.'
        },
        {
          subtitle: 'User Content',
          text: 'You retain ownership of content you create, but grant Pro26 a license to use, display, and distribute your content as necessary to provide our services.'
        },
        {
          subtitle: 'Respect for IP',
          text: 'You agree to respect the intellectual property rights of Pro26 and third parties, and not to infringe upon any copyrights, trademarks, or other proprietary rights.'
        }
      ]
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: FaExclamationTriangle,
      content: [
        {
          subtitle: 'Service Disclaimer',
          text: 'Our services are provided "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.'
        },
        {
          subtitle: 'Liability Limits',
          text: 'Pro26 and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use our services.'
        },
        {
          subtitle: 'Maximum Liability',
          text: 'In no event shall Pro26\'s total liability to you exceed the amount you paid for our services in the twelve months preceding the claim.'
        },
        {
          subtitle: 'Force Majeure',
          text: 'We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, or technical failures.'
        }
      ]
    },
    {
      id: 'changes-terms',
      title: 'Changes to Terms',
      icon: FaEdit,
      content: [
        {
          subtitle: 'Right to Modify',
          text: 'We reserve the right to modify or replace these Terms at any time. Changes will be posted on this page, and your continued use of the service after any changes constitutes acceptance of those changes.'
        },
        {
          subtitle: 'Notification',
          text: 'We will make reasonable efforts to notify users of significant changes to these Terms through our website or via email.'
        },
        {
          subtitle: 'Effective Date',
          text: 'Any changes to these Terms will become effective immediately upon posting unless otherwise specified.'
        }
      ]
    },
    {
      id: 'account-termination',
      title: 'Account & Termination',
      icon: FaShieldAlt,
      content: [
        {
          subtitle: 'Account Security',
          text: 'You are responsible for maintaining the security of your account and password. Pro26 cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.'
        },
        {
          subtitle: 'Termination Rights',
          text: 'We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including breach of these Terms.'
        },
        {
          subtitle: 'Effect of Termination',
          text: 'Upon termination, your right to use our services will cease immediately. Provisions that by their nature should survive termination shall survive, including intellectual property rights and limitation of liability.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16 sm:py-24">
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
              <FaGavel className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              Terms of Service
            </h1>
            <p className="text-xl sm:text-2xl text-orange-100 max-w-3xl mx-auto drop-shadow-md">
              Welcome to Pro26. Please read these Terms of Service carefully before using our website and services.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Agreement to Our Terms</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                By accessing or using our site, you agree to be bound by these Terms. These terms govern your use of 
                Pro26's educational services, website, and related offerings.
              </p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-orange-800 mb-2">Last Updated: June 28, 2025</h3>
              <p className="text-orange-700 text-sm">
                We may update these Terms from time to time. Changes will be posted on this page, and your continued 
                use of the service after any changes constitutes acceptance of those changes.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {termsSection.map((section, index) => (
            <div key={section.id} className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-6">
                  <section.icon className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{index + 1}. {section.title}</h2>
                </div>
              </div>

              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-4 border-orange-200 pl-6 py-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.subtitle}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Terms & Governing Law */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-6">
              <FaGavel className="text-white text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h3>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. 
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Kerala, India.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6">
              <FaUsers className="text-white text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Severability</h3>
            <p className="text-gray-600 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited 
              or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect.
            </p>
          </div>
        </div>

        {/* Educational Services Specific Terms */}
        <div className="mt-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Educational Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Special terms and conditions for our educational programs and camps.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Camp Participation</h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• Participants must follow safety guidelines and instructions</li>
                  <li>• Age restrictions apply to specific programs</li>
                  <li>• Cancellation policies vary by program type</li>
                  <li>• All equipment must be returned in good condition</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Online Learning</h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• Stable internet connection required</li>
                  <li>• Platform access subject to technical availability</li>
                  <li>• Recording of sessions may occur for quality purposes</li>
                  <li>• Materials provided are for educational use only</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <FaEnvelope className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                Questions About Our Terms?
              </h2>
              <p className="text-lg sm:text-xl text-orange-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
                If you have any questions about these Terms of Service, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:support@pro26.in"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 w-full sm:w-auto sm:min-w-[300px] inline-block text-center"
                >
                  Contact Support
                </a>
                <button 
                  onClick={() => handleNavigateWithScroll('/privacy')}
                  className="bg-transparent border-3 border-white text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105 w-full sm:w-auto sm:min-w-[300px]"
                >
                  Privacy Policy
                </button>
              </div>
              <p className="text-sm text-orange-100 mt-6">
                Email: <span className="font-medium">support@pro26.in</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
