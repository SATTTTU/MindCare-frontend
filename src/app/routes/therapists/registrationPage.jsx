// src/routes/therapists/registrationPage.js
import { MultiStepForm } from '@/modules/therapist/components/MultiStepForm';
import { DoctorForm } from '@/modules/therapist/components/onboarding';
import React, { useState } from 'react';

export const DoctorRegistrationPage = () => {
  const [newDoctorId, setNewDoctorId] = useState(null);

  // This function will be called by the DoctorForm on successful profile creation
  const handleProfileSuccess = (result) => {
    // The backend returns { message: "...", doctorId: ... }
    if (result?.doctorId) {
      setNewDoctorId(result.doctorId);
    } else {
      console.error("Failed to get doctorId from the registration response.");
      // Optionally, show a toast error here
    }
  };

  return (
    <div className="container mx-auto py-8">
      {!newDoctorId ? (
        <DoctorForm onSuccess={handleProfileSuccess} />
      ) : (
        <MultiStepForm doctorId={newDoctorId} />
      )}
    </div>
  );
};