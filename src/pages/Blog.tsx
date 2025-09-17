import { useState, useEffect } from 'react';
import { FaCalendar, FaUser, FaClock, FaArrowRight, FaSearch } from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Calculate reading progress
  useEffect(() => {
    if (!selectedPost) return;

    const handleScroll = () => {
      const article = document.querySelector('.blog-article-content') as HTMLElement;
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      const progress = Math.min(
        Math.max((scrollTop - articleTop + windowHeight * 0.5) / articleHeight, 0),
        1
      );

      setReadingProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPost]);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with Arduino: A Beginner\'s Guide to Electronics',
      excerpt: 'Learn the basics of Arduino programming and circuit building in this comprehensive guide for young innovators.',
      content: `
        <h2>Introduction to Arduino</h2>
        <p>Arduino is an open-source electronics platform that makes it easy for beginners to create interactive projects. Whether you're 8 or 18, Arduino provides an excellent foundation for learning electronics and programming.</p>
        
        <h3>What You'll Need</h3>
        <ul>
          <li>Arduino Uno board</li>
          <li>USB cable</li>
          <li>Breadboard</li>
          <li>LEDs and resistors</li>
          <li>Jumper wires</li>
        </ul>
        
        <h3>Your First Project: Blinking LED</h3>
        <p>Let's start with the classic "Hello World" of electronics - making an LED blink!</p>
        
        <pre><code>
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}
        </code></pre>
        
        <h3>Understanding the Code</h3>
        <p>This simple program demonstrates the basic structure of Arduino code. The setup() function runs once when the board starts, while loop() runs continuously.</p>
        
        <h3>Next Steps</h3>
        <p>Once you've mastered the blinking LED, try adding sensors, motors, and more complex interactions. The Arduino community is vast and supportive - don't hesitate to ask questions and share your projects!</p>
      `,
      author: 'Dr. Priya Sharma',
      date: '2025-06-25',
      readTime: '8 min read',
      category: 'arduino',
      tags: ['Arduino', 'Beginner', 'Electronics', 'Programming'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      featured: true
    },
    {
      id: '2',
      title: 'Building Your First Robot: Step-by-Step Tutorial',
      excerpt: 'Discover how to build a simple robot using sensors, motors, and Arduino programming in this hands-on tutorial.',
      content: `
        <h2>Welcome to Robotics!</h2>
        <p>Building your first robot is an exciting milestone in your STEM journey. This tutorial will guide you through creating a simple obstacle-avoiding robot using Arduino.</p>
        
        <h3>Components You'll Need</h3>
        <ul>
          <li>Arduino Uno</li>
          <li>Ultrasonic sensor (HC-SR04)</li>
          <li>2 DC motors</li>
          <li>Motor driver (L298N)</li>
          <li>Chassis and wheels</li>
          <li>Battery pack</li>
          <li>Jumper wires</li>
        </ul>
        
        <h3>Assembly Steps</h3>
        <p>1. <strong>Chassis Setup:</strong> Mount the Arduino and motor driver on your robot chassis.</p>
        <p>2. <strong>Motor Connection:</strong> Connect the DC motors to the motor driver outputs.</p>
        <p>3. <strong>Sensor Mounting:</strong> Attach the ultrasonic sensor to the front of your robot.</p>
        <p>4. <strong>Wiring:</strong> Connect all components according to the circuit diagram.</p>
        
        <h3>The Brain: Programming Your Robot</h3>
        <pre><code>
#include <NewPing.h>

#define TRIGGER_PIN  12
#define ECHO_PIN     11
#define MAX_DISTANCE 200

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

void setup() {
  // Motor pins setup
  pinMode(5, OUTPUT);  // Motor A
  pinMode(6, OUTPUT);  // Motor A
  pinMode(9, OUTPUT);  // Motor B
  pinMode(10, OUTPUT); // Motor B
}

void loop() {
  int distance = sonar.ping_cm();
  
  if (distance > 20) {
    moveForward();
  } else {
    turnRight();
    delay(500);
  }
}
        </code></pre>
        
        <h3>Testing and Troubleshooting</h3>
        <p>Start by testing each component individually before putting everything together. If your robot isn't moving as expected, check your wiring and battery connections.</p>
        
        <h3>Expanding Your Robot</h3>
        <p>Once your basic robot is working, try adding features like LED lights, sound effects, or remote control capabilities!</p>
      `,
      author: 'Rajesh Kumar',
      date: '2025-06-22',
      readTime: '12 min read',
      category: 'robotics',
      tags: ['Robotics', 'Motors', 'Sensors', 'DIY'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      featured: true
    },
    {
      id: '3',
      title: 'STEM Education: Why Hands-On Learning Matters for Kids',
      excerpt: 'Explore the importance of practical STEM education and how it shapes the next generation of innovators.',
      content: `
        <h2>The Power of Hands-On Learning</h2>
        <p>In today's rapidly evolving technological landscape, traditional classroom learning alone isn't enough to prepare our children for the future. Hands-on STEM education bridges the gap between theory and practice, creating engaging learning experiences that stick.</p>
        
        <h3>Why Hands-On Learning Works</h3>
        <p><strong>Active Engagement:</strong> When students build, code, and experiment, they're actively engaged rather than passively receiving information. This leads to better retention and deeper understanding.</p>
        
        <p><strong>Problem-Solving Skills:</strong> Real-world projects require students to think critically and solve problems creatively. These skills are invaluable in any career path.</p>
        
        <p><strong>Confidence Building:</strong> Successfully completing a hands-on project gives students a sense of accomplishment and builds confidence in their abilities.</p>
        
        <h3>The Pro26 Approach</h3>
        <p>At Pro26, we believe every child can be an innovator. Our hands-on camps focus on:</p>
        <ul>
          <li>Building real projects they can take home</li>
          <li>Learning through experimentation and iteration</li>
          <li>Collaborative problem-solving</li>
          <li>Making mistakes and learning from them</li>
        </ul>
        
        <h3>Research-Backed Benefits</h3>
        <p>Studies show that students who engage in hands-on STEM activities score 70% higher on assessments compared to traditional lecture-based learning. They also show increased interest in pursuing STEM careers.</p>
        
        <h3>Getting Started at Home</h3>
        <p>You don't need expensive equipment to start hands-on learning at home. Simple projects like building circuits with LEDs, creating simple machines, or coding basic games can spark curiosity and learning.</p>
      `,
      author: 'Dr. Anjali Nair',
      date: '2025-06-20',
      readTime: '6 min read',
      category: 'education',
      tags: ['STEM', 'Education', 'Learning', 'Kids'],
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
      featured: false
    },
    {
      id: '4',
      title: '10 Amazing Arduino Projects for Students',
      excerpt: 'Inspire creativity with these fun and educational Arduino projects perfect for students of all skill levels.',
      content: '',
      author: 'Arjun Menon',
      date: '2025-06-18',
      readTime: '10 min read',
      category: 'projects',
      tags: ['Arduino', 'Projects', 'Students', 'Creative'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      featured: false
    },
    {
      id: '5',
      title: 'The Future of Robotics in Education',
      excerpt: 'How robotics is transforming classrooms and preparing students for tomorrow\'s tech-driven world.',
      content: '',
      author: 'Dr. Kavitha Reddy',
      date: '2025-06-15',
      readTime: '7 min read',
      category: 'robotics',
      tags: ['Robotics', 'Future', 'Education', 'Technology'],
      image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387510?w=800&h=400&fit=crop',
      featured: false
    },
    {
      id: '6',
      title: 'Coding for Kids: Making Programming Fun and Accessible',
      excerpt: 'Discover effective strategies to introduce programming concepts to children in an engaging way.',
      content: '',
      author: 'Sneha Patel',
      date: '2025-06-12',
      readTime: '9 min read',
      category: 'programming',
      tags: ['Programming', 'Kids', 'Coding', 'Learning'],
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'arduino', name: 'Arduino', count: blogPosts.filter(post => post.category === 'arduino').length },
    { id: 'robotics', name: 'Robotics', count: blogPosts.filter(post => post.category === 'robotics').length },
    { id: 'education', name: 'Education', count: blogPosts.filter(post => post.category === 'education').length },
    { id: 'projects', name: 'Projects', count: blogPosts.filter(post => post.category === 'projects').length },
    { id: 'programming', name: 'Programming', count: blogPosts.filter(post => post.category === 'programming').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
    setReadingProgress(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a post is selected, show the detailed view
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header with back button */}
        <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
          {/* Reading Progress Bar */}
          <div className="h-1 bg-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackToBlog}
                className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                <FaArrowRight className="mr-2 transform rotate-180" />
                Back to Blog
              </button>
              
              <div className="text-sm text-gray-600">
                {Math.round(readingProgress)}% read
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Hero Image Section */}
            <div className="relative">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Article Header Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm capitalize">
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center text-sm bg-black/30 px-3 py-1 rounded-full">
                    <FaCalendar className="mr-2" />
                    {formatDate(selectedPost.date)}
                  </div>
                  <div className="flex items-center text-sm bg-black/30 px-3 py-1 rounded-full">
                    <FaClock className="mr-2" />
                    {selectedPost.readTime}
                  </div>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center">
                  <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    <FaUser className="mr-2" />
                    <span className="font-semibold">{selectedPost.author}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="px-6 md:px-12 py-8 md:py-12">
              {/* Article Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Article Summary</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedPost.excerpt}
                </p>
              </div>

              {/* Table of Contents (if content has headings) */}
              {selectedPost.content.includes('<h2>') && (
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Table of Contents
                  </h3>
                  <div className="space-y-2 text-sm">
                    {selectedPost.content.match(/<h[23]>([^<]+)<\/h[23]>/g)?.map((heading, index) => {
                      const text = heading.replace(/<\/?h[23]>/g, '');
                      const isH2 = heading.startsWith('<h2>');
                      return (
                        <div 
                          key={index} 
                          className={`${isH2 ? 'font-semibold text-gray-900' : 'ml-4 text-gray-700'} hover:text-blue-600 cursor-pointer transition-colors`}
                        >
                          {text}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="prose prose-lg max-w-none blog-article-content">
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                {/* Tags Section */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedPost.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-xl text-sm font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Info */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    About the Author
                  </h4>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <FaUser className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{selectedPost.author}</p>
                      <p className="text-gray-600">STEM Education Expert</p>
                    </div>
                  </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="bg-gradient-to-r from-teal-50 via-blue-50 to-purple-50 rounded-2xl p-8 text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Enjoyed this article?</h4>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed max-w-2xl mx-auto">
                    Subscribe to our newsletter and get the latest tutorials, tips, and STEM education content delivered directly to your inbox every week.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 whitespace-nowrap">
                      Subscribe Now
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">No spam, unsubscribe anytime</p>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                    Share this Article
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200">
                      <span className="mr-2">📘</span>
                      Facebook
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors duration-200">
                      <span className="mr-2">🐦</span>
                      Twitter
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200">
                      <span className="mr-2">💼</span>
                      LinkedIn
                    </button>
                    <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200">
                      <span className="mr-2">💬</span>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Floating Scroll to Top Button */}
          {readingProgress > 10 && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
            >
              <FaArrowRight className="transform -rotate-90" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <style>{`
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin: 2.5rem 0 1.5rem 0;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid #e5e7eb;
          position: relative;
        }
        .blog-content h2::before {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin: 2rem 0 1rem 0;
          display: flex;
          align-items: center;
        }
        .blog-content h3::before {
          content: '';
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #06b6d4, #10b981);
          border-radius: 50%;
          margin-right: 12px;
          flex-shrink: 0;
        }
        .blog-content p {
          color: #4b5563;
          line-height: 1.8;
          margin: 1.25rem 0;
          font-size: 1.1rem;
        }
        .blog-content p strong {
          color: #1f2937;
          font-weight: 600;
        }
        .blog-content ul {
          color: #4b5563;
          margin: 1.5rem 0;
          padding-left: 0;
          list-style: none;
        }
        .blog-content li {
          margin: 0.75rem 0;
          padding-left: 2rem;
          position: relative;
          line-height: 1.7;
          font-size: 1.05rem;
        }
        .blog-content li::before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 0;
          color: #10b981;
          font-weight: bold;
          font-size: 1.1rem;
        }
        .blog-content pre {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: #f9fafb;
          padding: 2rem;
          border-radius: 1rem;
          margin: 2rem 0;
          overflow-x: auto;
          font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
          border: 1px solid #374151;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        .blog-content pre::before {
          content: 'Code';
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(59, 130, 246, 0.2);
          color: #93c5fd;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .blog-content code {
          font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          background: linear-gradient(90deg, #eff6ff, #f0f9ff);
          margin: 2rem 0;
          padding: 1.5rem 2rem;
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          color: #1e40af;
          position: relative;
        }
        .blog-content blockquote::before {
          content: '"';
          font-size: 4rem;
          color: #3b82f6;
          position: absolute;
          top: -0.5rem;
          left: 1rem;
          line-height: 1;
          opacity: 0.3;
        }
      `}</style>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Pro26 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the latest insights, tutorials, and innovations in STEM education, Arduino programming, and robotics for young learners.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, tutorials, and guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 order-last lg:order-first">
            <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Arduino', 'Robotics', 'STEM', 'Programming', 'DIY', 'Education'].map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm cursor-pointer hover:from-blue-200 hover:to-purple-200 transition-all duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && selectedCategory === 'all' && !searchTerm && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map(post => (
                    <article
                      key={post.id}
                      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <FaCalendar className="mr-1" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center">
                            <FaClock className="mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FaUser className="text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <button 
                            onClick={() => handleReadMore(post)}
                            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center transition-colors duration-200"
                          >
                            Read More
                            <FaArrowRight className="ml-2" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            <section>
              {(featuredPosts.length > 0 && selectedCategory === 'all' && !searchTerm) && (
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
              )}
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaSearch className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse different categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    View All Articles
                  </button>
                </div>
              ) : (
                <div className="grid gap-8">
                  {(selectedCategory === 'all' && !searchTerm ? regularPosts : filteredPosts).map(post => (
                    <article
                      key={post.id}
                      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row"
                    >
                      <div className="md:w-1/3 relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <div className="md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full font-semibold capitalize">
                              {post.category}
                            </span>
                            <div className="flex items-center">
                              <FaCalendar className="mr-1" />
                              {formatDate(post.date)}
                            </div>
                            <div className="flex items-center">
                              <FaClock className="mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FaUser className="text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <button 
                            onClick={() => handleReadMore(post)}
                            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center transition-colors duration-200"
                          >
                            Read More
                            <FaArrowRight className="ml-2" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Load More Button */}
            {filteredPosts.length > 6 && (
              <div className="text-center mt-12">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
