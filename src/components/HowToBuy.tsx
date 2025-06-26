import { Calendar, Cpu, Trophy } from 'lucide-react';

export default function HowToBuy() {
  const steps = [
    {
      icon: Calendar,
      title: 'Choose Your Camp',
      description: 'Choose from One-Day, Two-Day, or Online camps based on your schedule and learning style.',
      bgColor: 'bg-gradient-to-br from-yellow-200 to-orange-300',
      iconColor: 'text-orange-600'
    },
    {
      icon: Cpu,
      title: 'Build & Explore',
      description: 'Learn hands-on by building LED circuits, sensors, and robots using real Arduino kits.',
      bgColor: 'bg-gradient-to-br from-blue-200 to-purple-300',
      iconColor: 'text-purple-600'
    },
    {
      icon: Trophy,
      title: 'Showcase & Grow',
      description: 'Share your project, earn a certificate, and take your next step in STEM learning.',
      bgColor: 'bg-gradient-to-br from-red-200 to-pink-300',
      iconColor: 'text-pink-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group hover:scale-105 transition-transform duration-300"
            >
              <div className={`${step.bgColor} rounded-3xl p-8 text-center h-80 flex flex-col justify-center items-center relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${step.iconColor} mx-auto mb-6`}>
                    <step.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
            Start Your Learning Journey
          </button>
        </div>
      </div>
    </section>
  );
}