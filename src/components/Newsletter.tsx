import { Mail, MapPin, Phone } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions? Reach out to our team for more information about Pro26.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
            Get In Touch
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Us */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Email Us
                </h4>
                <a 
                  href="mailto:hr@pro26.in" 
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  hr@pro26.in
                </a>
              </div>
            </div>

            {/* Office Location */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Office Location
                </h4>
                <p className="text-gray-600">
                  Kerala, India (with remote opportunities nationwide)
                </p>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Call Us
                </h4>
                <p className="text-gray-600">
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