import { Link, useNavigate } from 'react-router-dom';
import { FaBolt, FaCar, FaLaptopCode, FaCheckCircle } from 'react-icons/fa';

const camps = [
	{
		title: 'One-Day Camp',
		icon: <FaBolt size={28} className="text-blue-500" />,
		color: 'bg-gradient-to-br from-yellow-200 to-orange-300',
		duration: '6 hours',
		description:
			'Intro to electronics & Arduino.',
		format: 'In-person, shared kits',
		link: '/camps/one-day',
	},
	{
		title: 'Two-Day Camp',
		icon: <FaCar size={28} className="text-purple-500" />,
		color: 'bg-gradient-to-br from-pink-200 to-red-300',
		duration: '12–14 hours',
		description:
			'Build an obstacle-avoiding robot. Learn sensors, Arduino, and teamwork.',
		format: 'In-person, own/shared kits',
		link: '/camps/two-day',
	},
	{
		title: 'Online Camp',
		icon: <FaLaptopCode size={28} className="text-white-500" />,
		color: 'bg-gradient-to-br from-blue-200 to-purple-300',
		duration: 'Self-paced',
		description:
			'Kit delivered to students. Complete modules via video lessons & live Q&A.',
		format: 'Online with delivered kits',
		link: '/camps/online',
	},
];

export default function Camps() {
    const navigate = useNavigate();

    const handleNavigateWithScroll = (path: string) => {
        navigate(path);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };

	return (
		<div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 py-16 px-4">
			<div className="max-w-7xl mx-auto text-center">
				{/* Hero Section */}
				<div className="mb-16">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full mb-6 shadow-lg animate-pulse">
						<FaBolt size={40} className="text-white" />
					</div>
					<h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
						STEM & Robotics Camps
					</h1>
					<p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
						Hands-on learning experiences introducing students to Arduino, robotics,
						and STEM — tailored to different formats and learning styles.
					</p>
				</div>

				{/* Camp Cards */}
				<div className="grid gap-8 md:grid-cols-3 mb-16">
					{camps.map((camp, index) => (
						<Link
							key={index}
							to={camp.link}
							className={`rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 ${camp.color} p-8 block cursor-pointer hover:shadow-2xl relative overflow-hidden group`}
						>
							{/* Decorative elements */}
							<div className="absolute -top-2 -right-2 w-12 h-12 bg-white/20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
							
							<div className="relative z-10">
								<div className="flex items-center justify-center mb-6 bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 mx-auto shadow-lg">
									{camp.icon}
								</div>
								<h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-800 drop-shadow-sm">
									{camp.title}
								</h2>
								<div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 mb-4">
									<p className="text-sm font-semibold text-gray-700">
										{camp.duration} &middot; {camp.format}
									</p>
								</div>
								<p className="text-base text-gray-800 font-medium leading-relaxed">
									{camp.description}
								</p>
								
								{/* Call to action */}
								<div className="mt-6 bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
									<p className="text-sm font-bold text-gray-800">Click to Learn More →</p>
								</div>
							</div>
						</Link>
					))}
				</div>

				{/* Why Choose Our Camps Section */}
				<div className="grid gap-8">
                    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 rounded-3xl py-16 px-10 text-center text-white relative overflow-hidden shadow-2xl">
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 rounded-full"></div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full"></div>
                        <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full"></div>
                        
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-8 shadow-lg">
                                <FaCheckCircle size={32} className="text-yellow-300" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-12 drop-shadow-lg">Why Choose Our Camps?</h2>
                            <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                                    <div className="flex items-start space-x-4">
                                        <FaCheckCircle className="text-green-400 mt-1 text-xl flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-yellow-200">Hands-on Learning</h3>
                                            <p className="text-purple-100">Real-world projects with Arduino and robotics components.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                                    <div className="flex items-start space-x-4">
                                        <FaCheckCircle className="text-green-400 mt-1 text-xl flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-yellow-200">Expert Instructors</h3>
                                            <p className="text-purple-100">Years of experience in STEM education and mentorship.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                                    <div className="flex items-start space-x-4">
                                        <FaCheckCircle className="text-green-400 mt-1 text-xl flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-yellow-200">Flexible Formats</h3>
                                            <p className="text-purple-100">Different learning styles and schedules accommodated.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                                    <div className="flex items-start space-x-4">
                                        <FaCheckCircle className="text-green-400 mt-1 text-xl flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-yellow-200">Project Showcase</h3>
                                            <p className="text-purple-100">Present your creations and earn certifications.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="mt-16">
                    <div className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/20 rounded-full"></div>
                        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/20 rounded-full"></div>
                        <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 drop-shadow-lg">Ready to Start Learning?</h3>
                            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
                                Choose the perfect camp format for your learning journey. All skill levels welcome!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={() => handleNavigateWithScroll('/register')}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105"
                                >
                                    Register for a Camp
                                </button>
                                <Link to="/" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300 hover:scale-105">
                                    Learn More About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	);
}
