import { Calendar, Cpu, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/camps');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const steps = [
    {
      icon: Calendar,
      title: 'Choose Your Camp',
      description: 'Choose from One-Day, Two-Day, or Online camps based on your schedule and learning style.',
      bgColor: 'bg-gradient-to-br from-purple-300 via-pink-300 to-rose-300',
      iconColor: 'text-purple-700'
    },
    {
      icon: Cpu,
      title: 'Build & Explore',
      description: 'Learn hands-on by building LED circuits, sensors, and robots using real Arduino kits.',
      bgColor: 'bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300',
      iconColor: 'text-cyan-700'
    },
    {
      icon: Trophy,
      title: 'Showcase & Grow',
      description: 'Share your project, earn a certificate, and take your next step in STEM learning.',
      bgColor: 'bg-gradient-to-br from-yellow-300 via-orange-300 to-amber-300',
      iconColor: 'text-orange-700'
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Let's Get Started
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students on an exciting journey into the world of robotics and electronics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group hover:scale-105 transition-transform duration-300"
            >
              <div className={`${step.bgColor} rounded-3xl p-6 sm:p-8 text-center h-72 sm:h-80 flex flex-col justify-center items-center relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="relative z-10">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 ${step.iconColor} mx-auto mb-4 sm:mb-6 p-3 sm:p-4 bg-white/60 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed max-w-xs text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full"></div>
                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button 
            onClick={handleStartJourney}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/25 transform hover:-translate-y-1 transition-all duration-200 group text-sm sm:text-base"
          >
            <span className="group-hover:scale-105 transition-transform duration-200">Start Your Learning Journey</span>
          </button>
        </div>
      </div>
    </section>
  );
}
