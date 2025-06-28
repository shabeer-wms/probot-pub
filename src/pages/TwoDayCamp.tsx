import { useNavigate } from 'react-router-dom';
import { FaRocket, FaClock, FaUsers, FaCheckCircle, FaArrowLeft, FaStar, FaCog } from 'react-icons/fa';

export default function TwoDayCamp() {
  const navigate = useNavigate();

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const highlights = [
    'Advanced Arduino programming concepts',
    'Multi-sensor integration projects',
    'Bluetooth and wireless communication',
    'Build a robotic pet or smart device',
    'Advanced troubleshooting techniques',
    'Project portfolio development',
    'Take home multiple projects',
    'Advanced certificate of completion'
  ];

  const day1Schedule = [
    { time: '9:00 AM', activity: 'Welcome & Advanced Electronics Review' },
    { time: '10:00 AM', activity: 'Advanced Programming Concepts' },
    { time: '11:30 AM', activity: 'Break & Team Building' },
    { time: '12:00 PM', activity: 'Multi-Sensor Integration Lab' },
    { time: '1:00 PM', activity: 'Lunch Break' },
    { time: '2:00 PM', activity: 'Bluetooth & Wireless Communication' },
    { time: '3:30 PM', activity: 'Day 1 Project Showcase' },
    { time: '4:00 PM', activity: 'Preview Tomorrow & Departure' }
  ];

  const day2Schedule = [
    { time: '9:00 AM', activity: 'Advanced Project Planning' },
    { time: '10:00 AM', activity: 'Robotic Pet/Smart Device Build' },
    { time: '11:30 AM', activity: 'Break & Peer Collaboration' },
    { time: '12:00 PM', activity: 'Advanced Debugging Workshop' },
    { time: '1:00 PM', activity: 'Lunch Break' },
    { time: '2:00 PM', activity: 'Project Completion & Testing' },
    { time: '3:30 PM', activity: 'Final Showcase & Presentations' },
    { time: '4:00 PM', activity: 'Certificate Ceremony & Celebration' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-cyan-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Buttons */}
        <div className="mb-8 flex justify-between">
          <div className="flex space-x-4">
            <button 
              onClick={() => handleNavigateWithScroll('/camps')}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md"
            >
              <FaArrowLeft className="mr-2" />
              Back to Camps
            </button>
            <button 
              onClick={() => handleNavigateWithScroll('/camps/one-day')}
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md"
            >
              <FaArrowLeft className="mr-2" />
              One-Day Camp
            </button>
          </div>
          <button 
            onClick={() => handleNavigateWithScroll('/camps/online')}
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md"
          >
            Online Camp
            <FaArrowLeft className="ml-2 transform rotate-180" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-6 shadow-lg animate-bounce">
            <FaRocket size={48} className="text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Two-Day Advanced Camp
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            Take your skills to the next level! Two intensive days of advanced Arduino programming, robotics, and wireless communication projects.
          </p>
          
          {/* Key Details */}
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaClock className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Duration</h3>
              <p className="text-indigo-100">2 Full Days</p>
            </div>
            <div className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaUsers className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Format</h3>
              <p className="text-teal-100">In-person</p>
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaStar className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Level</h3>
              <p className="text-orange-100">Intermediate</p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-6">What You'll Master</h2>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaCheckCircle className="text-yellow-300 mt-1 flex-shrink-0 text-xl" />
                  <p className="text-cyan-100">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 shadow-xl text-white">
            <h3 className="text-3xl font-bold mb-6">Advanced Features</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-yellow-200">Wireless Projects</h4>
                <p className="text-purple-100">Build Bluetooth-enabled devices and IoT projects</p>
              </div>
              <div className="border-l-4 border-green-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-green-200">Advanced Kit</h4>
                <p className="text-purple-100">Premium components including sensors and actuators</p>
              </div>
              <div className="border-l-4 border-pink-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-pink-200">Portfolio Building</h4>
                <p className="text-purple-100">Create a showcase of your advanced projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Day Schedule */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">Two-Day Schedule</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Day 1 */}
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Day 1: Foundations & Wireless</h3>
              <div className="grid gap-4">
                {day1Schedule.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-full font-bold text-sm min-w-[80px] text-center shadow-lg">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Day 2: Advanced Projects</h3>
              <div className="grid gap-4">
                {day2Schedule.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 py-2 rounded-full font-bold text-sm min-w-[80px] text-center shadow-lg">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Projects Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">Build Amazing Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <FaCog className="text-4xl mb-4 mx-auto animate-spin-slow" />
              <h3 className="text-xl font-bold mb-2">Smart Home Device</h3>
              <p className="text-green-100">Control lights and sensors remotely</p>
            </div>
            <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <FaRocket className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Robotic Pet</h3>
              <p className="text-pink-100">Interactive companion with sensors</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <FaStar className="text-4xl mb-4 mx-auto animate-pulse" />
              <h3 className="text-xl font-bold mb-2">IoT Weather Station</h3>
              <p className="text-yellow-100">Monitor and share environmental data</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Ready for the Challenge?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Perfect for students with some programming experience. Ages 10-18 welcome!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleNavigateWithScroll('/register?camp=two-day')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105"
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
