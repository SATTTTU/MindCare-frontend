import React, { useState } from 'react';
import { Search, Filter, X, Star, Users, Calendar, MapPin, GraduationCap, Heart, Brain, Smile, Frown, Meh } from 'lucide-react';

 export const DoctorBookingSystem = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      patients: '1250+',
      experience: '12y exp',
      description: 'Specializing in heart disease prevention and treatment with over a decade of experience.',
      image: '/api/placeholder/80/80',
      location: 'Heart Center, Building B',
      education: [
        'MD in Cardiology - Harvard Medical School',
        'Residency - Johns Hopkins Hospital'
      ]
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Psychologist',
      rating: 4.8,
      patients: '890+',
      experience: '8y exp',
      description: 'Clinical psychologist specializing in anxiety, depression, and cognitive behavioral therapy.',
      image: '/api/placeholder/80/80',
      location: 'Wellness Center North, Floor 2',
      education: [
        'PhD in Clinical Psychology - Stanford University',
        'Internship - UCSF Medical Center'
      ]
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      rating: 4.9,
      patients: '1080+',
      experience: '10y exp',
      description: 'Expert in skin care, cosmetic dermatology, and treating complex skin conditions.',
      image: '/api/placeholder/80/80',
      location: 'Skin Health Clinic, Building A',
      education: [
        'MD in Dermatology - UCLA Medical School',
        'Fellowship - Mayo Clinic'
      ]
    },
    {
      id: 4,
      name: 'Dr. David Wilson',
      specialty: 'Orthopedic Surgeon',
      rating: 4.7,
      patients: '1420+',
      experience: '15y exp',
      description: 'Specialized in sports medicine, joint replacement, and minimally invasive procedures.',
      image: '/api/placeholder/80/80',
      location: 'Orthopedic Center, Floor 3',
      education: [
        'MD in Orthopedic Surgery - Johns Hopkins',
        'Fellowship - Hospital for Special Surgery'
      ]
    }
  ];

  const specialties = ['All Specialties', 'Cardiologist', 'Psychologist', 'Dermatologist', 'Orthopedic Surgeon'];

  const moodData = [
    { mood: 'Happy', count: 5, percentage: 33.3, color: 'bg-green-500', icon: Smile },
    { mood: 'Calm', count: 4, percentage: 26.7, color: 'bg-blue-400', icon: Heart },
    { mood: 'Neutral', count: 3, percentage: 20.0, color: 'bg-gray-400', icon: Meh },
    { mood: 'Anxious', count: 2, percentage: 13.3, color: 'bg-orange-500', icon: Frown },
    { mood: 'Sad', count: 1, percentage: 6.7, color: 'bg-blue-600', icon: Brain }
  ];

  const recentMoodEntries = [
    { date: 'Jun 29, 2024', mood: 'Happy', color: 'bg-green-100 text-green-800' },
    { date: 'Jun 28, 2024', mood: 'Calm', color: 'bg-blue-100 text-blue-800' },
    { date: 'Jun 27, 2024', mood: 'Neutral', color: 'bg-gray-100 text-gray-800' },
    { date: 'Jun 26, 2024', mood: 'Happy', color: 'bg-green-100 text-green-800' },
    { date: 'Jun 25, 2024', mood: 'Anxious', color: 'bg-orange-100 text-orange-800' },
    { date: 'Jun 24, 2024', mood: 'Calm', color: 'bg-blue-100 text-blue-800' },
    { date: 'Jun 23, 2024', mood: 'Happy', color: 'bg-green-100 text-green-800' }
  ];

  const filteredDoctors = selectedSpecialty === 'All Specialties' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setShowProfile(true);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const closeModals = () => {
    setShowProfile(false);
    setShowBooking(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">Find Your Doctor</h1>
          <p className="text-xl text-blue-100">
            Connect with experienced healthcare professionals for your wellness journey
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
    

    

      {/* Profile Modal */}
      {showProfile && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Doctor Profile</h2>
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white" />
                    {selectedDoctor.rating}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{selectedDoctor.name}</h3>
                <p className="text-blue-600 font-medium">{selectedDoctor.specialty}</p>
                <p className="text-gray-600 mt-2">{selectedDoctor.description}</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{selectedDoctor.patients} patients</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{selectedDoctor.experience} experience</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedDoctor.location}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Education & Training</h4>
                </div>
                <div className="space-y-2">
                  {selectedDoctor.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                      {edu}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    setShowBooking(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Book Appointment
                </button>
                <button
                  onClick={closeModals}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBooking && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
                  <p className="text-gray-600">Schedule your visit with {selectedDoctor.name}</p>
                </div>
              </div>

              {/* Selected Doctor */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedDoctor.name}</h3>
                    <p className="text-blue-600 text-sm">{selectedDoctor.specialty}</p>
                    <p className="text-gray-600 text-sm">{selectedDoctor.location}</p>
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Appointment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select time slot</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit *</label>
                  <textarea
                    placeholder="Please describe the reason for your visit..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              {/* Mood Tracking History */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Mood Tracking History
                </h3>
                
                {/* Mood Frequency Chart */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">📊</span>
                    Mood Frequency Overview
                  </h4>
                  <div className="flex items-end gap-2 h-32 mb-3">
                    {moodData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full ${item.color} rounded-t`}
                          style={{ height: `${(item.count / 5) * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-600 mt-1 text-center">
                          <div className="font-medium">{item.count}</div>
                          <div>{item.mood}</div>
                          <div>({item.percentage}%)</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {moodData.map((item, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className={`w-3 h-3 ${item.color} rounded`}></div>
                        <span className="text-gray-600">{item.mood} ({item.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Mood Entries */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">📅</span>
                    Recent Mood Entries
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {recentMoodEntries.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                        <div className="flex items-center gap-3">
                          <Smile className="w-5 h-5 text-yellow-500" />
                          <span className="text-sm text-gray-700">{entry.mood}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{entry.date}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${entry.color}`}>
                            {entry.mood}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="mt-4">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">I consent to share my mood tracking history with the doctor *</span>
                      <p className="text-xs text-gray-500 mt-1">
                        This information will help your doctor provide better personalized care.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModals}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Confirm Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    
    </div>
  );
};
