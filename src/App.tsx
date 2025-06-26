import Header from './components/Header';
import Hero from './components/Hero';
import HowToBuy from './components/HowToBuy';
import Features from './components/Features';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HowToBuy />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;