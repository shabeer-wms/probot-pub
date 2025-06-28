import { GraduationCap, Settings, Wrench, Puzzle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Features() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/camps');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const features = [
    {
      icon: GraduationCap,
      title: 'STEM-Aligned Curriculum',
      description: 'Each kit is based on real-world STEM concepts, tailored for school students in grades 6 to 10.',
      bgColor: 'bg-gradient-to-br from-green-400 to-teal-500',
      textColor: 'text-white'
    },
    {
      icon: Settings,
      title: 'Project-Based Learning',
      description: 'Students build working circuits and robots to understand electronics through fun and practice.',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      textColor: 'text-white'
    },
    {
      icon: Wrench,
      title: 'Expert-Developed Kits',
      description: 'All kits are created by engineers and educators with a focus on safety and simplicity.',
      bgColor: 'bg-gradient-to-br from-pink-400 to-red-500',
      textColor: 'text-white'
    },
    {
      icon: Puzzle,
      title: 'Reduce Screen Time, Boost Creativity',
      description: 'Encourage hands-on discovery, away from mobile distractions.',
      bgColor: 'bg-gradient-to-br from-teal-400 to-cyan-500',
      textColor: 'text-white'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Designed by Experts to Ignite Young Innovators
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Transform learning with our expertly crafted STEM kits that make robotics and electronics accessible to every student
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group hover:scale-105 transition-transform duration-300"
            >
              <div className={`${feature.bgColor} ${feature.textColor} rounded-2xl p-6 sm:p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed opacity-90 text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-6 sm:p-8 text-center text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Boost Tech Skills & Brain Power
              </h3>
              <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 max-w-2xl mx-auto">
                Give your child a head start with electronics, coding, and creativity – all in one box.
              </p>
              <button 
                onClick={handleLearnMore}
                className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 group text-sm sm:text-base"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">Learn More</span>
              </button>
            </div>
            
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full transform translate-x-8 sm:translate-x-16 -translate-y-8 sm:-translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full transform -translate-x-6 sm:-translate-x-12 translate-y-6 sm:translate-y-12"></div>
            <div className="absolute top-1/2 left-1/4 w-12 sm:w-16 h-12 sm:h-16 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}