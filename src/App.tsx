import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import ContactUs from './components/ContactUs';                                     
import Footer from './components/Footer';
import SEO from './components/SEO';
import Camps from './pages/Camps';
import OneDayCamp from './pages/OneDayCamp';
import TwoDayCamp from './pages/TwoDayCamp';
import OnlineCamp from './pages/OnlineCamp';
import Shop from './pages/Shop';
import CampRegistration from './pages/CampRegistration';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

function App() {
  // Structured data for the homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ProBot",
    "description": "Robotics camps and STEM education programs for kids aged 6-16. Learn programming, engineering, and technology through hands-on robot building activities.",
    "url": "https://probot.pro26.in",
    "logo": "https://probot.pro26.in/pro26-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.facebook.com/probot",
      "https://www.instagram.com/probot",
      "https://www.linkedin.com/company/probot"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://probot.pro26.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "offers": {
      "@type": "EducationalOrganization",
      "name": "Robotics Camps",
      "description": "STEM education programs and robotics camps for children"
    }
  };

  return (
    <Router basename="/">
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<>
            <SEO
              title="ProBot - Robotics Camps for Kids | STEM Education & Programming"
              description="Join ProBot's exciting robotics camps! Learn programming, engineering, and STEM skills through hands-on robot building activities. Perfect for kids aged 6-16."
              keywords="robotics camps, STEM education, kids programming, robot building, engineering for kids, coding camps, technology education, ProBot"
              url="/"
              structuredData={homepageStructuredData}
            />
            <Hero />
            <HowItWorks />
            <Features />
            <ContactUs />
            <Footer />
          </>} />
          <Route path="/camps" element={<>
            <SEO
              title="Robotics Camps | ProBot STEM Education Programs"
              description="Explore our robotics camps: one-day workshops, two-day intensives, and online programs. Hands-on STEM learning for kids aged 6-16."
              keywords="robotics camps, STEM workshops, kids coding, robot building camps, technology education"
              url="/camps"
            />
            <Camps />
            <Footer />
          </>} />
          <Route path="/camps/one-day" element={<>
            <SEO
              title="One-Day Robotics Camp | ProBot STEM Workshop"
              description="Join our one-day robotics camp for an introduction to robot building and programming. Perfect for beginners aged 6-12."
              keywords="one day robotics camp, beginner robotics, kids STEM workshop, robot building for kids"
              url="/camps/one-day"
            />
            <OneDayCamp />
            <Footer />
          </>} />
          <Route path="/camps/two-day" element={<>
            <SEO
              title="Two-Day Robotics Camp | Intensive STEM Learning"
              description="Deep dive into robotics with our two-day intensive camp. Advanced programming and engineering concepts for kids aged 10-16."
              keywords="two day robotics camp, intensive STEM program, advanced robotics, programming for kids"
              url="/camps/two-day"
            />
            <TwoDayCamp />
            <Footer />
          </>} />
          <Route path="/camps/online" element={<>
            <SEO
              title="Online Robotics Camp | Virtual STEM Learning"
              description="Learn robotics from home with our interactive online camps. Live instruction and hands-on projects delivered to your door."
              keywords="online robotics camp, virtual STEM education, remote learning, robotics at home"
              url="/camps/online"
            />
            <OnlineCamp />
            <Footer />
          </>} />
          <Route path="/shop" element={<>
            <SEO
              title="Robotics Shop | ProBot Educational Kits & Supplies"
              description="Shop robotics kits, educational supplies, and STEM learning materials. Everything you need for hands-on robotics education."
              keywords="robotics kits, STEM supplies, educational robotics, Arduino kits, programming tools"
              url="/shop"
            />
            <Shop />
            <Footer />
          </>} />
          <Route path="/register" element={<>
            <SEO
              title="Register for Robotics Camp | ProBot STEM Education"
              description="Register your child for our robotics camps. Choose from one-day workshops, two-day intensives, or online programs."
              keywords="camp registration, robotics camp signup, STEM education enrollment"
              url="/register"
            />
            <CampRegistration />
            <Footer />
          </>} />
          <Route path="/about" element={<>
            <SEO
              title="About ProBot | Our Mission in STEM Education"
              description="Learn about ProBot's mission to inspire young minds through robotics and STEM education. Meet our team and discover our story."
              keywords="about ProBot, STEM education mission, robotics education team, company story"
              url="/about"
            />
            <AboutUs />
            <Footer />
          </>} />
          <Route path="/blog" element={<>
            <SEO
              title="Robotics Blog | ProBot STEM Education Resources"
              description="Explore our blog for robotics tutorials, STEM education tips, project ideas, and the latest in educational technology."
              keywords="robotics blog, STEM education blog, programming tutorials, educational technology"
              url="/blog"
            />
            <Blog />
            <Footer />
          </>} />
          <Route path="/privacy" element={<>
            <SEO
              title="Privacy Policy | ProBot"
              description="Read ProBot's privacy policy to understand how we collect, use, and protect your personal information."
              keywords="privacy policy, data protection, personal information"
              url="/privacy"
              noindex={true}
            />
            <PrivacyPolicy />
            <Footer />
          </>} />
          <Route path="/terms" element={<>
            <SEO
              title="Terms of Service | ProBot"
              description="Read ProBot's terms of service for our robotics camps and educational programs."
              keywords="terms of service, terms and conditions, legal information"
              url="/terms"
              noindex={true}
            />
            <TermsOfService />
            <Footer />
          </>} />
          <Route path="/cookies" element={<>
            <SEO
              title="Cookie Policy | ProBot"
              description="Learn about how ProBot uses cookies to improve your browsing experience."
              keywords="cookie policy, website cookies, data tracking"
              url="/cookies"
              noindex={true}
            />
            <CookiePolicy />
            <Footer />
          </>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;