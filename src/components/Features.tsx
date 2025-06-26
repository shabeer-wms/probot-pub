import { GraduationCap, Settings, Wrench, Puzzle } from 'lucide-react';

export default function Features() {
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Designed by Experts to Ignite Young Innovators
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className={`${feature.bgColor} ${feature.textColor} rounded-2xl p-8 h-full`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed opacity-90">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special CTA Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Boost Tech Skills & Brain Power
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Give your child a head start with electronics, coding, and creativity – all in one box.
              </p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow duration-200">
                Learn More
              </button>
            </div>
            
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
          </div>
        </div>
      </div>
    </section>
  );
}