import { useNavigate } from 'react-router-dom';
import { FaLaptop, FaClock, FaCheckCircle, FaArrowLeft, FaStar, FaWifi, FaVideo, FaHeadset, FaCloud } from 'react-icons/fa';

export default function OnlineCamp() {
  const navigate = useNavigate();

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const highlights = [
    'Interactive virtual Arduino simulator',
    'Live instructor guidance via video',
    'Digital kit shipped to your home',
    'Real-time code collaboration',
    'Virtual project showcase',
    'Online community access',
    'Recorded sessions for review',
    'Digital certificate of completion'
  ];

  const weekSchedule = [
    { day: 'Monday', time: '4:00 PM - 6:00 PM', activity: 'Welcome & Arduino Basics', description: 'Getting started with Arduino and setting up your environment' },
    { day: 'Tuesday', time: '4:00 PM - 6:00 PM', activity: 'Sensors & Input/Output', description: 'Working with LEDs, buttons, and basic sensors' },
    { day: 'Wednesday', time: '4:00 PM - 6:00 PM', activity: 'Programming Logic', description: 'Loops, conditions, and function programming' },
    { day: 'Thursday', time: '4:00 PM - 6:00 PM', activity: 'Advanced Projects', description: 'Build your first smart device project' },
    { day: 'Friday', time: '4:00 PM - 6:00 PM', activity: 'Showcase & Celebration', description: 'Present your projects and celebrate achievements' }
  ];

  const digitalTools = [
    { name: 'Arduino Simulator', description: 'Code and test without physical hardware', icon: FaLaptop },
    { name: 'Video Calls', description: 'Face-to-face interaction with instructors', icon: FaVideo },
    { name: 'Digital Whiteboard', description: 'Collaborative learning space', icon: FaCloud },
    { name: 'Tech Support', description: '24/7 help when you need it', icon: FaHeadset }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Buttons */}
        <div className="mb-8 flex justify-between">
          <div className="flex space-x-4">
            <button 
              onClick={() => handleNavigateWithScroll('/camps')}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md"
            >
              <FaArrowLeft className="mr-2" />
              Back to Camps
            </button>
            <button 
              onClick={() => handleNavigateWithScroll('/camps/two-day')}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md"
            >
              <FaArrowLeft className="mr-2" />
              Two-Day Camp
            </button>
          </div>
          <button 
            onClick={() => handleNavigateWithScroll('/camps/one-day')}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md"
          >
            One-Day Camp
            <FaArrowLeft className="ml-2 transform rotate-180" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-6 shadow-lg animate-pulse">
            <FaWifi size={48} className="text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Online Virtual Camp
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            Learn Arduino and robotics from the comfort of your home! Interactive online sessions with real hardware shipped to you.
          </p>
          
          {/* Key Details */}
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaClock className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Duration</h3>
              <p className="text-emerald-100">5 Days, 2hr/day</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaLaptop className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Format</h3>
              <p className="text-blue-100">100% Online</p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <FaStar className="text-3xl mx-auto mb-2" />
              <h3 className="font-bold text-xl">Level</h3>
              <p className="text-purple-100">Beginner</p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-6">What You'll Learn Online</h2>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaCheckCircle className="text-yellow-300 mt-1 flex-shrink-0 text-xl" />
                  <p className="text-teal-100">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-xl text-white">
            <h3 className="text-3xl font-bold mb-6">Online Advantages</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-yellow-200">Learn from Anywhere</h4>
                <p className="text-indigo-100">No travel required - join from your bedroom!</p>
              </div>
              <div className="border-l-4 border-green-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-green-200">Kit Delivery</h4>
                <p className="text-indigo-100">Arduino kit shipped directly to your door</p>
              </div>
              <div className="border-l-4 border-pink-300 pl-4 bg-white/10 rounded-r-lg p-4">
                <h4 className="font-bold text-xl text-pink-200">Flexible Schedule</h4>
                <p className="text-indigo-100">Evening sessions perfect for busy families</p>
              </div>
            </div>
          </div>
        </div>

        {/* Week Schedule */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-8 text-center">5-Day Online Schedule</h2>
          
          <div className="grid gap-6">
            {weekSchedule.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl shadow-xl p-6 transform hover:scale-102 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="bg-white text-emerald-600 px-4 py-2 rounded-full font-bold text-lg min-w-[100px] text-center shadow-lg">
                      {item.day}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      {item.time}
                    </div>
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="text-xl font-bold mb-1">{item.activity}</h3>
                    <p className="text-teal-100">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Tools Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">Digital Learning Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalTools.map((tool, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border border-blue-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <tool.icon className="text-4xl mb-4 mx-auto text-blue-500" />
                <h3 className="text-xl font-bold mb-2 text-gray-800">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Online Projects Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">Virtual Projects You'll Build</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <FaLaptop className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Smart LED Controller</h3>
              <p className="text-rose-100">Control colorful LEDs with code</p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <FaHeadset className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Digital Alarm System</h3>
              <p className="text-green-100">Motion detection with alerts</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <FaCloud className="text-4xl mb-4 mx-auto animate-pulse" />
              <h3 className="text-xl font-bold mb-2">Weather Monitor</h3>
              <p className="text-indigo-100">Track temperature and humidity</p>
            </div>
          </div>
        </div>

        {/* Technology Requirements */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">What You'll Need</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-orange-100">Technology Requirements</h3>
                <ul className="space-y-2 text-orange-100">
                  <li className="flex items-center"><FaCheckCircle className="mr-2 text-yellow-300" /> Computer with internet connection</li>
                  <li className="flex items-center"><FaCheckCircle className="mr-2 text-yellow-300" /> Webcam and microphone</li>
                  <li className="flex items-center"><FaCheckCircle className="mr-2 text-yellow-300" /> Chrome or Firefox browser</li>
                  <li className="flex items-center"><FaCheckCircle className="mr-2 text-yellow-300" /> Parent/guardian support (ages 8-12)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-orange-100">What We Provide</h3>
                <ul className="space-y-2 text-orange-100">
                  <li className="flex items-center"><FaCheckCircle className="mr-2 text-yellow-300" /> Arduino Uno microcontroller</li>
                  <li className="flex items-center"><FaCheckCircle className="mr-2 text-yellow-300" /> Electronic components kit</li>
                  <li className="flex items-center"><FaCheckCircle className="mr-2 text-yellow-300" /> USB cable and breadboard</li>
                  <li className="flex items-center"><FaCheckCircle className="mr-2 text-yellow-300" /> Step-by-step instruction guide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Ready to Learn Online?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Perfect for beginners! Join from anywhere in the world. Ages 8-16 welcome with family support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleNavigateWithScroll('/register?camp=online')}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105"
              >
                Register Now
              </button>
              <button 
                onClick={() => handleNavigateWithScroll('/camps')}
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300 hover:scale-105"
              >
                View All Camps
              </button>
            </div>
            <p className="text-sm text-emerald-100 mt-4">Arduino kit ships within 3-5 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
