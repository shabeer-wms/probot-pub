import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaCalendar, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle, FaChild, FaGraduationCap, FaCreditCard } from 'react-icons/fa';

interface FormData {
  // Registration Type
  registrationType: 'individual' | 'institution';
  
  // Student Information
  studentName: string;
  age: string;
  grade: string;
  school: string;
  
  // Institution Information (for bulk registration)
  institutionName: string;
  institutionType: string;
  contactPersonName: string;
  contactPersonTitle: string;
  institutionEmail: string;
  institutionPhone: string;
  institutionAddress: string;
  numberOfStudents: string;
  ageRangeMin: string;
  ageRangeMax: string;
  preferredProgram: string;
  
  // Parent/Guardian Information
  parentName: string;
  email: string;
  phone: string;
  address: string;
  
  // Camp Selection
  campType: string;
  // preferredDate: string;
  // preferredTime: string;
  
  // Additional Information
  experience: string;
  medicalConditions: string;
  
  // Preferences removed
}

interface CampDetails {
  name: string;
  duration: string;
  price: number;
  description: string;
  dates: string[];
  times: string[];
  location: string;
  maxStudents: number;
  ageRange: string;
  requirements: string[];
  includes: string[];
}

export default function CampRegistration() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campTypeFromUrl = searchParams.get('camp') || 'one-day';
  const typeParam = searchParams.get('type');
  const registrationTypeFromUrl = (typeParam === 'institution' || typeParam === 'individual') ? typeParam : 'individual';
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    registrationType: registrationTypeFromUrl,
    studentName: '',
    age: '',
    grade: '',
    school: '',
    institutionName: '',
    institutionType: '',
    contactPersonName: '',
    contactPersonTitle: '',
    institutionEmail: '',
    institutionPhone: '',
    institutionAddress: '',
    numberOfStudents: '',
    ageRangeMin: '',
    ageRangeMax: '',
    preferredProgram: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    campType: campTypeFromUrl,
  // preferredDate: '',
  // preferredTime: '',
    experience: 'beginner',
    medicalConditions: '',
  // dietaryRestrictions: '',
  // specialRequests: ''
  });

  // Update camp type when URL params change
  useEffect(() => {
    const newCampType = searchParams.get('camp') || 'one-day';
    setFormData(prev => ({ ...prev, campType: newCampType }));
  }, [searchParams]);

  // Clear date and time when camp type changes
  useEffect(() => {
    // setFormData(prev => ({ 
    //   ...prev, 
    //   preferredDate: '', 
    //   preferredTime: '' 
    // }));
  }, [formData.campType]);

  const handleNavigateWithScroll = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const campDetails: Record<string, CampDetails> = {
    'one-day': {
      name: 'One-Day Arduino Camp',
      duration: '1 Day (6 hours)',
      price: 2499,
      description: 'Perfect introduction to Arduino and basic electronics',
      dates: ['2025-07-15', '2025-07-22', '2025-07-29', '2025-08-05', '2025-08-12'],
      times: ['9:00 AM - 3:00 PM', '10:00 AM - 4:00 PM'],
      location: 'Pro26 Learning Center',
      maxStudents: 15,
      ageRange: '8-16 years',
      requirements: ['No prior experience needed', 'Bring notebook and pen', 'Lunch will be provided'],
      includes: ['Arduino Uno Kit', 'Project Components', 'Lunch & Snacks', 'Certificate', 'Take-home Project']
    },
    'two-day': {
      name: 'Two-Day Robotics Camp',
      duration: '2 Days (12 hours)',
      price: 4499,
      description: 'Build and program your own robot over two exciting days',
      dates: ['2025-07-19-20', '2025-07-26-27', '2025-08-02-03', '2025-08-09-10', '2025-08-16-17'],
      times: ['9:00 AM - 3:00 PM (Both Days)', '10:00 AM - 4:00 PM (Both Days)'],
      location: 'Pro26 Learning Center',
      maxStudents: 12,
      ageRange: '10-18 years',
      requirements: ['Basic understanding of computers helpful', 'Bring notebook and pen', 'Lunch provided both days'],
      includes: ['Complete Robot Kit', 'Sensors & Motors', 'Programming Software', 'Lunch & Snacks (2 days)', 'Certificate', 'Robot to take home']
    },
    'online': {
      name: 'Online STEM Kit Program',
      duration: '4 Weeks (2 hours/week)',
      price: 3999,
      description: 'Learn Arduino and robotics from home with shipped kit',
      dates: ['2025-07-14', '2025-07-21', '2025-07-28', '2025-08-04', '2025-08-11'],
      times: ['6:00 PM - 8:00 PM', '7:00 PM - 9:00 PM', '10:00 AM - 12:00 PM (Weekends)'],
      location: 'Online via Zoom',
      maxStudents: 20,
      ageRange: '8-18 years',
      requirements: ['Stable internet connection', 'Computer/laptop with webcam', 'Kit shipped to your address'],
      includes: ['Arduino Kit (Shipped)', 'Online Classes (4 weeks)', 'Digital Resources', 'One-on-one Support', 'Digital Certificate']
    }
  };

  const currentCamp = campDetails[formData.campType];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.registrationType);
      case 2:
        if (formData.registrationType === 'individual') {
          return !!(formData.studentName && formData.age && formData.grade);
        } else {
          return !!(formData.institutionName && formData.institutionType && formData.contactPersonName && 
                   formData.contactPersonTitle && formData.institutionEmail && formData.institutionPhone && 
                   formData.numberOfStudents && formData.ageRangeMin && formData.ageRangeMax);
        }
      case 3:
        if (formData.registrationType === 'individual') {
          return !!(formData.parentName && formData.email && formData.phone);
        } else {
          return !!formData.campType;
        }
      case 4:
        if (formData.registrationType === 'individual') {
          return !!formData.campType;
        } else {
          return true; // Medical information (no required fields)
        }
      case 5:
        if (formData.registrationType === 'individual') {
          return true; // Medical information (no required fields)
        } else {
          return true; // Institution review step
        }
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'registrations'), {
        ...formData,
        campName: campDetails[formData.campType]?.name || '',
        submittedAt: Timestamp.now(),
      });
      setSubmitSuccess(true);
    } catch (error) {
      alert('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 py-8 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Registration Submitted!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for registering for the {currentCamp.name}. 
              {formData.registrationType === 'institution' 
                ? ' Our institutional team will contact you within 24 hours to discuss your requirements and provide a customized quote.'
                : ' We\'ll contact you within 24 hours with confirmation details and payment instructions.'
              }
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-green-800 mb-2">What's Next?</h3>
              <ul className="text-green-700 text-sm space-y-1 text-left">
                <li>• Check your email for a registration confirmation</li>
                <li>• Our team will call you within 24 hours</li>
                {formData.registrationType === 'institution' ? (
                  <>
                    <li>• Receive customized proposal and pricing</li>
                    {/* <li>• Schedule program delivery details</li> */}
                  </>
                ) : (
                  <>
                    <li>• Complete payment to secure your spot</li>
                    <li>• Receive camp kit and joining instructions</li>
                  </>
                )}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigateWithScroll('/camps')}
                className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                View Other Camps
              </button>
              <button
                onClick={() => handleNavigateWithScroll('/')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-teal-500 hover:text-teal-600 transition-all duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button 
            onClick={() => handleNavigateWithScroll('/camps')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200 bg-white px-4 py-2 rounded-full shadow-md text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-2" />
            Back to Camps
          </button>
          
          <div className="text-right">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Camp Registration</h1>
            <p className="text-gray-600">{currentCamp.name}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camp Summary Sidebar */}
          <div className="lg:col-span-1 order-last lg:order-first">
            <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Camp Selection</h3>
              
              {/* Camp Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Your Camp *
                </label>
                <div className="space-y-2">
                  {Object.entries(campDetails).map(([key, camp]) => (
                    <label 
                      key={key}
                      className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 block ${
                        formData.campType === key 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-indigo-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="campType"
                          value={key}
                          checked={formData.campType === key}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="font-medium text-gray-900">{camp.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Camp Summary</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaGraduationCap className="text-indigo-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{currentCamp.name}</p>
                      <p className="text-sm text-gray-600">{currentCamp.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FaCreditCard className="text-green-500" />
                    <div>
                      <p className="font-semibold text-gray-900">₹{currentCamp.price.toLocaleString('en-IN')}</p>
                      <p className="text-sm text-gray-600">Registration Fee</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FaChild className="text-purple-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{currentCamp.ageRange}</p>
                      <p className="text-sm text-gray-600">Age Range</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-red-500" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{currentCamp.location}</p>
                      <p className="text-sm text-gray-600">Location</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-bold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {currentCamp.includes.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500 mr-2 text-xs flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Step {currentStep} of {formData.registrationType === 'individual' ? '6' : '5'}
                  </span>
                  <span className="text-sm font-medium text-indigo-600">
                    {Math.round((currentStep / (formData.registrationType === 'individual' ? 6 : 5)) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / (formData.registrationType === 'individual' ? 6 : 5)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Registration Type Selection */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose Registration Type</h3>
                      <p className="text-gray-600">Select whether you're registering as an individual or representing a school/institution</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Individual Registration */}
                      <div 
                        onClick={() => setFormData(prev => ({ ...prev, registrationType: 'individual' }))}
                        className={`relative border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          formData.registrationType === 'individual' 
                            ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                            formData.registrationType === 'individual' 
                              ? 'bg-indigo-500 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <FaUser className="text-2xl" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">Individual Student</h4>
                          <p className="text-gray-600 text-sm mb-4">Register for 1 student</p>
                          <ul className="text-left text-sm text-gray-600 space-y-1">
                            <li>• Perfect for homeschooling families</li>
                            <li>• Personalized attention</li>
                            <li>• Flexible scheduling</li>
                            <li>• Parent involvement encouraged</li>
                          </ul>
                        </div>
                        {formData.registrationType === 'individual' && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-white text-sm" />
                          </div>
                        )}
                      </div>

                      {/* Institution Registration */}
                      <div 
                        onClick={() => setFormData(prev => ({ ...prev, registrationType: 'institution' }))}
                        className={`relative border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          formData.registrationType === 'institution' 
                            ? 'border-purple-500 bg-purple-50 shadow-lg' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                            formData.registrationType === 'institution' 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <FaGraduationCap className="text-2xl" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">School/Institution</h4>
                          <p className="text-gray-600 text-sm mb-4">Register multiple students (5+)</p>
                          <ul className="text-left text-sm text-gray-600 space-y-1">
                            <li>• Bulk registration discounts</li>
                            <li>• Customized curriculum</li>
                            <li>• On-site or virtual delivery</li>
                            <li>• Teacher training included</li>
                          </ul>
                        </div>
                        {formData.registrationType === 'institution' && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-white text-sm" />
                          </div>
                        )}
                      </div>
                    </div>

                    {formData.registrationType === 'institution' && (
                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mt-6">
                        <h5 className="font-bold text-purple-800 mb-2">Institution Benefits:</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
                          <div>
                            <p className="font-semibold">• Volume Discounts:</p>
                            <p className="ml-4">20% off for 10+ students</p>
                            <p className="ml-4">30% off for 25+ students</p>
                          </div>
                          <div>
                            <p className="font-semibold">• Additional Services:</p>
                            <p className="ml-4">Curriculum integration support</p>
                            <p className="ml-4">Progress tracking dashboard</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Student Information (Individual) or Institution Information */}
                {currentStep === 2 && formData.registrationType === 'institution' && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaGraduationCap className="text-white text-2xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Institution Information</h2>
                      <p className="text-gray-600">Tell us about your school or institution</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution Name *
                        </label>
                        <input
                          type="text"
                          name="institutionName"
                          value={formData.institutionName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter institution/school name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution Type *
                        </label>
                        <select
                          name="institutionType"
                          value={formData.institutionType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select type</option>
                          <option value="public-school">Public School</option>
                          <option value="private-school">Private School</option>
                          <option value="international-school">International School</option>
                          <option value="coaching-center">Coaching Center</option>
                          <option value="university">University/College</option>
                          <option value="ngo">NGO/Non-Profit</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Students *
                        </label>
                        <select
                          name="numberOfStudents"
                          value={formData.numberOfStudents}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select range</option>
                          <option value="5-10">5-10 students</option>
                          <option value="11-20">11-20 students</option>
                          <option value="21-30">21-30 students</option>
                          <option value="31-50">31-50 students</option>
                          <option value="51+">51+ students</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age Range (Min) *
                        </label>
                        <select
                          name="ageRangeMin"
                          value={formData.ageRangeMin}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Min age</option>
                          {Array.from({ length: 13 }, (_, i) => i + 8).map(age => (
                            <option key={age} value={age}>{age} years</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age Range (Max) *
                        </label>
                        <select
                          name="ageRangeMax"
                          value={formData.ageRangeMax}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Max age</option>
                          {Array.from({ length: 13 }, (_, i) => i + 8).map(age => (
                            <option key={age} value={age}>{age} years</option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Person Name *
                        </label>
                        <input
                          type="text"
                          name="contactPersonName"
                          value={formData.contactPersonName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Primary contact person name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Person Title *
                        </label>
                        <input
                          type="text"
                          name="contactPersonTitle"
                          value={formData.contactPersonTitle}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Principal, Coordinator, Teacher"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution Email *
                        </label>
                        <input
                          type="email"
                          name="institutionEmail"
                          value={formData.institutionEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="institution@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution Phone *
                        </label>
                        <input
                          type="tel"
                          name="institutionPhone"
                          value={formData.institutionPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution Address
                        </label>
                        <textarea
                          name="institutionAddress"
                          value={formData.institutionAddress}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Full address of the institution"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Program
                        </label>
                        <select
                          name="preferredProgram"
                          value={formData.preferredProgram}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select preferred program</option>
                          <option value="on-site">On-site at your institution</option>
                          <option value="our-center">At our center</option>
                          <option value="hybrid">Hybrid (combination)</option>
                          <option value="virtual">Virtual/Online</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                      <h5 className="font-bold text-purple-800 mb-2">Institution Discounts:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
                        <div>
                          <p className="font-semibold">• 10-20 students: 20% discount</p>
                          <p className="font-semibold">• 25+ students: 30% discount</p>
                        </div>
                        <div>
                          <p className="font-semibold">• Custom curriculum available</p>
                          <p className="font-semibold">• Teacher training included</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Student Information (Individual) or Institution Information */}
                {currentStep === 2 && formData.registrationType === 'individual' && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUser className="text-white text-2xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Information</h2>
                      <p className="text-gray-600">Tell us about the student who will attend the camp</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student Name *
                        </label>
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter student's full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age *
                        </label>
                        <select
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select age</option>
                          {Array.from({ length: 13 }, (_, i) => i + 8).map(age => (
                            <option key={age} value={age}>{age} years</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Grade/Class *
                        </label>
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select grade</option>
                          {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(grade => (
                            <option key={grade} value={grade}>{grade} Grade</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          School
                        </label>
                        <input
                          type="text"
                          name="school"
                          value={formData.school}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter school name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience Level
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="some">Some Experience</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Parent/Guardian Information (Individual only) */}
                {currentStep === 3 && formData.registrationType === 'individual' && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUser className="text-white text-2xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Parent/Guardian Information</h2>
                      <p className="text-gray-600">We need your contact details for communication</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parent/Guardian Name *
                        </label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full address"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3/4: Camp Selection */}
                {((currentStep === 4 && formData.registrationType === 'individual') || 
                  (currentStep === 3 && formData.registrationType === 'institution')) && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCalendar className="text-white text-2xl" />
                      </div>
                      {/* <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule & Preferences</h2> */}
                      <p className="text-gray-600">Choose your preferred date, time, and experience level</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience Level
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="beginner">Complete Beginner</option>
                          <option value="some">Some Experience</option>
                          <option value="intermediate">Intermediate</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date *
                        </label>
                        <select
                          // name="preferredDate"
                          // value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select date</option>
                          {currentCamp.dates.map(date => (
                            <option key={date} value={date}>
                              {new Date(date.split('-')[0] + '-' + date.split('-')[1] + '-' + date.split('-')[2]).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time *
                        </label>
                        <select
                          // name="preferredTime"
                          // value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select time</option>
                          {currentCamp.times.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4/5: Emergency & Medical Information */}
                {((currentStep === 5 && formData.registrationType === 'individual') || 
                  (currentStep === 4 && formData.registrationType === 'institution')) && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaExclamationTriangle className="text-white text-2xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Information</h2>
                      <p className="text-gray-600">Important information for student safety</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Medical Conditions / Allergies
                        </label>
                        <textarea
                          name="medicalConditions"
                          value={formData.medicalConditions}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Please mention any medical conditions, allergies, or medications we should be aware of"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dietary Restrictions
                        </label>
                        <input
                          type="text"
                          // name="dietaryRestrictions"
                          // value={formData.dietaryRestrictions}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Vegetarian, vegan, allergies, etc."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5/6: Review & Submit */}
                {((currentStep === 6 && formData.registrationType === 'individual') || 
                  (currentStep === 5 && formData.registrationType === 'institution')) && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheckCircle className="text-white text-2xl" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
                      <p className="text-gray-600">Please review your information before submitting</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      {formData.registrationType === 'individual' ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">Student</h4>
                            <p className="text-gray-600">{formData.studentName}, {formData.age} years</p>
                            <p className="text-gray-600">{formData.grade} Grade</p>
                            {formData.school && <p className="text-gray-600">{formData.school}</p>}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Parent/Guardian</h4>
                            <p className="text-gray-600">{formData.parentName}</p>
                            <p className="text-gray-600">{formData.email}</p>
                            <p className="text-gray-600">{formData.phone}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Camp Details</h4>
                            <p className="text-gray-600">{currentCamp.name}</p>
                            {/* Schedule fields removed */}
                          </div>
                        </div>
                      ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">Institution</h4>
                            <p className="text-gray-600">{formData.institutionName}</p>
                            <p className="text-gray-600">{formData.institutionType}</p>
                            <p className="text-gray-600">{formData.numberOfStudents} students</p>
                            <p className="text-gray-600">Ages {formData.ageRangeMin}-{formData.ageRangeMax} years</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Contact Person</h4>
                            <p className="text-gray-600">{formData.contactPersonName}</p>
                            <p className="text-gray-600">{formData.contactPersonTitle}</p>
                            <p className="text-gray-600">{formData.institutionEmail}</p>
                            <p className="text-gray-600">{formData.institutionPhone}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Camp Details</h4>
                            <p className="text-gray-600">{currentCamp.name}</p>
                            {/* Schedule fields removed */}
                            {formData.preferredProgram && <p className="text-gray-600">Delivery: {formData.preferredProgram}</p>}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests / Additional Information
                      </label>
                      <textarea
                          // name="specialRequests"
                          // value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Any special requests or additional information you'd like us to know"
                      />
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Payment Information</h4>
                      <p className="text-yellow-700 text-sm">
                        After submitting this form, you'll receive payment instructions via email. 
                        Your spot will be confirmed once payment is received.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>

                  {((formData.registrationType === 'individual' && currentStep < 6) || 
                    (formData.registrationType === 'institution' && currentStep < 5)) ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateStep(currentStep)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        validateStep(currentStep)
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        'Submit Registration'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
