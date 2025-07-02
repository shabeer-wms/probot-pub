import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import ContactUs from './components/ContactUs';                                     
import Footer from './components/Footer';
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

function App() {
  return (
    <Router basename="/ProBot">
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <HowItWorks />
            <Features />
            <ContactUs />
            <Footer />
          </>} />
          <Route path="/camps" element={<>
            <Camps />
            <Footer />
          </>} />
          <Route path="/camps/one-day" element={<>
            <OneDayCamp />
            <Footer />
          </>} />
          <Route path="/camps/two-day" element={<>
            <TwoDayCamp />
            <Footer />
          </>} />
          <Route path="/camps/online" element={<>
            <OnlineCamp />
            <Footer />
          </>} />
          <Route path="/shop" element={<>
            <Shop />
            <Footer />
          </>} />
          <Route path="/register" element={<>
            <CampRegistration />
            <Footer />
          </>} />
          <Route path="/about" element={<>
            <AboutUs />
            <Footer />
          </>} />
          <Route path="/blog" element={<>
            <Blog />
            <Footer />
          </>} />
          <Route path="/privacy" element={<>
            <PrivacyPolicy />
            <Footer />
          </>} />
          <Route path="/terms" element={<>
            <TermsOfService />
            <Footer />
          </>} />
          <Route path="/cookies" element={<>
            <CookiePolicy />
            <Footer />
          </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;