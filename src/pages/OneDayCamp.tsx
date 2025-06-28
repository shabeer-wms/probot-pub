import { useNavigate } from 'react-router-dom';
import { FaBolt, FaClock, FaUsers, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

export default function OneDayCamp() {
  const navigate = useNavigate();

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const highlights = [
    'Introduction to electronics basics',
    'Hands-on Arduino programming',
    'Build your first LED circuit',
    'Learn about sensors and actuators',
    'Take home your project',
    'Certificate of completion'
  ];

  const schedule = [
    { time: '9:00 AM', activity: 'Welcome & Introduction to Electronics' },
    { time: '10:00 AM', activity: 'Arduino Basics & Programming Concepts' },
    { time: '11:30 AM', activity: 'Break & Snack Time' },
    { time: '12:00 PM', activity: 'Build Your First Circuit' },
    { time: '1:00 PM', activity: 'Lunch Break' },
    { time: '2:00 PM', activity: 'Sensors & Interactive Projects' },
    { time: '3:30 PM', activity: 'Project Showcase & Wrap-up' },
    { time: '4:00 PM', activity: 'Certificate Ceremony & Departure' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Buttons */}
        <div className="mb-8 flex justify-between">
          <button 
            onClick={() => handleNavigateWithScroll('/camps')}
            className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md"
          >
            <FaArrowLeft className="mr-2" />
            Back to Camps
          </button>
          <button 
            onClick={() => handleNavigateWithScroll('/camps/two-day')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md"
          >
            View Two-Day Camp
            <FaArrowLeft className="ml-2 transform rotate-180" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full mb-6 shadow-lg animate-pulse">
            <FaBolt size={48} className="text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            One-Day Electronics Camp
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            Perfect for beginners! Dive into the world of electronics and Arduino programming in just one exciting day of hands-on learning.
          </p>
          
          {/* Key Details */}
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaClock className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Duration</h3>
              <p className="text-teal-100">6 Hours</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaUsers className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Format</h3>
              <p className="text-blue-100">In-person</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaBolt className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Level</h3>
              <p className="text-cyan-100">Beginner</p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaCheckCircle className="text-yellow-300 mt-1 flex-shrink-0 text-xl" />
                  <p className="text-indigo-100">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 shadow-xl text-white">
            <h3 className="text-3xl font-bold mb-6">Camp Highlights</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-yellow-200">Hands-on Learning</h4>
                <p className="text-pink-100">Build real circuits and see your code come to life</p>
              </div>
              <div className="border-l-4 border-green-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-green-200">Take Home Kit</h4>
                <p className="text-pink-100">Keep your Arduino and components to continue learning</p>
              </div>
              <div className="border-l-4 border-blue-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-blue-200">Expert Guidance</h4>
                <p className="text-pink-100">Learn from experienced STEM educators</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">Daily Schedule</h2>
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl shadow-2xl p-8">
            <div className="grid gap-4">
              {schedule.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm min-w-[90px] text-center shadow-lg">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Ready to Get Started?</h2>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Join us for an exciting day of discovery and learning. Perfect for students aged 8-16!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleNavigateWithScroll('/register?camp=one-day')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105"
              >
                Register Now
              </button>
              <button 
                onClick={() => handleNavigateWithScroll('/camps')}
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105"
              >
                View All Camps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
