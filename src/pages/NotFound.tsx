import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  // Structured data for 404 page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - ProBot",
    "description": "The requested page could not be found on ProBot's website. Explore our robotics camps and STEM education programs instead.",
    "url": window.location.href,
    "mainEntity": {
      "@type": "Organization",
      "name": "ProBot",
      "description": "Robotics camps and STEM education for kids",
      "url": "https://probot.pro26.in",
      "logo": "https://probot.pro26.in/pro26-logo.png"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": "https://probot.pro26.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "Action",
        "name": "Go to Homepage",
        "url": "https://probot.pro26.in/"
      }
    ]
  };

  return (
    <>
      <SEO
        title="404 - Page Not Found | ProBot Robotics Camps"
        description="Oops! The page you're looking for doesn't exist. Explore ProBot's robotics camps, STEM education programs, and hands-on learning experiences for kids."
        keywords="404 error, page not found, ProBot, robotics camps, STEM education, kids programming"
        url="/404"
        type="website"
        noindex={true}
        structuredData={structuredData}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4" role="main">
        <div className="max-w-5xl w-full text-center">
          {/* Error Status for Screen Readers */}
          <div className="sr-only" aria-live="polite">
            <h1>Error 404: Page Not Found</h1>
            <p>The page you requested could not be found.</p>
          </div>

          {/* Animated 404 with robot background */}
          <section className="relative" aria-labelledby="error-heading">
            <div 
              className="relative h-[300px] md:h-[600px] w-full bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 80%'
              }}
              role="img"
              aria-label="Animated robot character illustrating the 404 error">
              
              <h2 
                id="error-heading"
                className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl font-bold text-black drop-shadow-lg z-10"
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
          </section>

          {/* Action buttons */}
          <nav className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 mt-2" aria-label="Error page navigation">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Navigate to ProBot homepage"
            >
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              Go to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
              Go Back
            </button>
          </nav>

          {/* Helpful links */}
          <section className="p-6 bg-white rounded-xl shadow-lg border border-gray-200" aria-labelledby="helpful-links-heading">
            <h3 id="helpful-links-heading" className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Search className="mr-2 h-5 w-5 text-blue-600" aria-hidden="true" />
              Maybe you're looking for:
            </h3>
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-3" aria-label="Site navigation links">
              <Link
                to="/camps"
                className="text-blue-600 hover:text-teal-600 hover:underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Explore our robotics camps"
              >
                Camps
              </Link>
              <Link
                to="/about"
                className="text-blue-600 hover:text-teal-600 hover:underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Learn more about ProBot"
              >
                About Us
              </Link>
              <Link
                to="/shop"
                className="text-blue-600 hover:text-teal-600 hover:underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Browse our robotics shop"
              >
                Shop
              </Link>
              <Link
                to="/blog"
                className="text-blue-600 hover:text-teal-600 hover:underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Read our robotics blog"
              >
                Blog
              </Link>
            </nav>
          </section>
        </div>
      </main>
    </>
  );
};

export default NotFound;
