import { Mail, MapPin, Phone } from 'lucide-react';

export default function Newsletter() {
  return (
    <section id="contact-us" className="py-12 sm:py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions? Reach out to our team for more information about Pro26.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-purple-100">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Get In Touch
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Email Us */}
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Email Us
                </h4>
                <a 
                  href="mailto:hr@pro26.in" 
                  className="text-purple-600 hover:text-purple-700 transition-colors duration-200 font-medium text-sm sm:text-base break-all"
                >
                  hr@pro26.in
                </a>
              </div>
            </div>

            {/* Office Location */}
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Office Location
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Kerala, India (with remote opportunities nationwide)
                </p>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Call Us
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Contact details available upon application
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}