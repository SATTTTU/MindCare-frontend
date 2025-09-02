// src/modules/therapist/components/ApplicationReviewPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';

export const ApplicationReviewPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  // Effect to get the user's name from localStorage for a personal touch
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        setUserName(userData?.name || 'Doctor');
      } catch (error) {
        console.error("Could not parse user data", error);
        setUserName('Doctor');
      }
    }
  }, []);

  const handleGoToDashboard = () => {
    
    navigate('/'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-xl shadow-lg text-center">
        
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Thank You, {userName}!
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          Your application has been submitted successfully.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-6 rounded-lg text-left space-y-4">
          <div className="flex items-start">
            <Clock className="w-6 h-6 mr-4 mt-1 text-blue-500 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-lg">What Happens Next?</h2>
              <p className="mt-1">
                Our team will now review the documents and information you provided. This is to ensure the safety and quality of our platform.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-6 h-6 mr-4 mt-1 text-blue-500 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-lg">Estimated Review Time</h2>
              <p className="mt-1">
                The review process typically takes <span className="font-bold">3-5 business days</span>. We appreciate your patience.
              </p>
            </div>
          </div>
           <div className="flex items-start">
            <Clock className="w-6 h-6 mr-4 mt-1 text-blue-500 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-lg">Notification</h2>
              <p className="mt-1">
                You will receive an email notification as soon as your application has been approved. You can then log in and start using your doctor dashboard.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleGoToDashboard}
            className="w-full sm:w-auto px-8 py-3 bg-[#426B1F] text-white font-bold rounded-lg hover:bg-[#3b5f1d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
          >
            Go to Home Page
          </button>
        </div>

      </div>
    </div>
  );
};