import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUsers, FaRocket, FaHeart, FaGraduationCap, FaRobot, FaAward, FaGlobe, FaLightbulb } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function AboutUs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mission');
  const [countersStarted, setCountersStarted] = useState(false);
  const achievementsRef = useRef<HTMLDivElement>(null);

  // Counter animation hook
  const useCountAnimation = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!countersStarted) return;
      
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    }, [end, duration, countersStarted]);
    
    return count;
  };

  // Intersection observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const teamMembers = [
    {
      name: 'Dr. Shanid Malayil',
      role: 'CEO',
      image: '/api/placeholder/300/300',
      description: 'Research Scientist in Artificial Intelligence and Associate Professor at Kerala Technological University',
      expertise: ['Robotics', 'AI', 'STEM Education']
    },
    {
      name: 'Muahmmed Shabeer OP',
      role: 'Managing Director',
      image: '/api/placeholder/300/300',
      description: 'Full Stack Flutter Developer expert and IoT Innovator',
      expertise: ['Arduino', 'IoT', 'Programming']
    },
    {
      name: 'Muhammed Shafin',
      role: 'Project Manager',
      image: '/api/placeholder/300/300',
      description: 'Electronics engineer and automation expert providing innovative tech solutions',
      expertise: ['Electronics', 'PCB Design', 'Product Development']
    }
  ];

  const achievements = [
    { number: 10000, suffix: '+', label: 'Students Taught', icon: FaGraduationCap },
    { number: 500, suffix: '+', label: 'Schools Partnered', icon: FaUsers },
    { number: 50, suffix: '+', label: 'Countries Reached', icon: FaGlobe },
    { number: 25, suffix: '+', label: 'Awards Won', icon: FaAward }
  ];

  // Animated counter component
  const AnimatedCounter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
    const count = useCountAnimation(end, duration);
    return <span>{count.toLocaleString()}{suffix}</span>;
  };

  const values = [
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of educational technology to create engaging learning experiences.'
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'Our love for STEM education drives everything we do, from kit design to student support.'
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'We believe in building a global community of young innovators and future engineers.'
    },
    {
      icon: FaRocket,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our educational programs and products.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button 
            onClick={() => handleNavigateWithScroll('/')}
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              About Pro26
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 max-w-3xl mx-auto drop-shadow-md">
              Empowering the next generation of innovators through hands-on robotics and Arduino education
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Mission/Vision/Values Tabs */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
            {['mission', 'vision', 'values'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 capitalize min-w-[120px] ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
            {activeTab === 'mission' && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mb-6">
                  <FaRocket className="text-white text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  To democratize STEM education by providing accessible, engaging, and comprehensive robotics and Arduino learning experiences. 
                  We believe every child should have the opportunity to explore technology, build amazing projects, and develop the skills 
                  needed for the future digital economy. We are committed to maintaining the highest standards of privacy, safety, and 
                  transparency in all our educational programs and services.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-6">
                  <FaLightbulb className="text-white text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  To create a world where every student has the confidence and skills to innovate with technology. 
                  We envision a future where hands-on learning transforms education, inspiring the next generation 
                  of engineers, programmers, and problem-solvers who will shape tomorrow's world.
                </p>
              </div>
            )}

            {activeTab === 'values' && (
              <div>
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6">
                    <FaHeart className="text-white text-3xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <value.icon className="text-white text-xl" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Pro26 was founded in 2018 with a simple yet powerful vision: to make robotics and programming 
                  education accessible to every student, regardless of their background or location.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Starting as a small team of passionate educators and engineers, we noticed a gap in hands-on 
                  STEM education. Traditional learning methods weren't engaging students effectively, and many 
                  schools lacked the resources to provide meaningful technology education.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we've grown into a global platform that serves thousands of students across 50+ countries, 
                  partnering with schools, educators, and families to bring the joy of creation and discovery 
                  directly to learners everywhere.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-blue-800 mb-2">Privacy & Trust</h4>
                  <p className="text-blue-700 text-sm">
                    We're committed to protecting your privacy and data. We implement industry-standard security measures 
                    and never sell personal information. Our transparent practices ensure your trust in our platform.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div ref={achievementsRef} className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="grid grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="text-center">
                        <achievement.icon className="text-3xl mb-2 mx-auto" />
                        <div className="text-2xl font-bold">
                          <AnimatedCounter 
                            end={achievement.number} 
                            suffix={achievement.suffix}
                            duration={2000 + index * 200} 
                          />
                        </div>
                        <div className="text-purple-100 text-sm">{achievement.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Safety Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6">
                <FaUsers className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Trust & Safety</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your trust is paramount to us. We maintain the highest standards of privacy, safety, and transparency in all our operations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <FaUsers className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Child Safety & Privacy</h3>
                <p className="text-gray-600 text-sm">
                  We prioritize child safety and privacy in all our services. When collecting information for educational programs, 
                  we require parental consent and use minimal data necessary for camp registration and educational delivery only.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                  <FaGlobe className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Data Security</h3>
                <p className="text-gray-600 text-sm">
                  We implement industry-standard security measures to protect your information. Your data is encrypted, 
                  stored securely, and never shared without your consent.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Transparency</h3>
                <p className="text-gray-600 text-sm">
                  We believe in complete transparency about how we collect, use, and protect your data. 
                  You have full control over your information and can access or delete it anytime.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                For questions about privacy or data handling, contact us at{' '}
                <a href="mailto:support@pro26.in" className="text-blue-600 hover:text-blue-700 font-medium">
                  support@pro26.in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team of educators, engineers, and innovators is dedicated to creating the best 
              possible learning experiences for students worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{member.name}</h3>
                <p className="text-purple-600 font-semibold text-center mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm text-center mb-4">{member.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <FaRobot className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Start Your STEM Journey?
            </h2>
            <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Join thousands of students who have already discovered the joy of robotics and programming with Pro26.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => handleNavigateWithScroll('/camps')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 w-full sm:w-auto sm:min-w-[300px]"
              >
                Explore Camps
              </button>
              <button 
                onClick={() => handleNavigateWithScroll('/shop')}
                className="bg-transparent border-3 border-white text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105 w-full sm:w-auto sm:min-w-[300px]"
              >
                Shop Kits
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
