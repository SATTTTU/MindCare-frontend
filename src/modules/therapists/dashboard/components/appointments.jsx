"use client";

import { Check, X, ChevronDown, ChevronUp, Calendar, User, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useAcceptAppointment, useCompleteAppointment, useGetDoctorAppointments, useRejectAppointment } from "../api/getAppointments";

// Helper function to parse sentiment history from userNotes
const parseSentimentHistory = (userNotes) => {
  if (!userNotes || !userNotes.includes("--- User Journal Sentiment History")) {
    return null;
  }

  const historyMatch = userNotes.match(/--- User Journal Sentiment History \(Shared by User\) ---([\s\S]*?)(?:---|$)/);
  if (!historyMatch) return null;

  const historyContent = historyMatch[1];
  const entries = [];
  
  // Split by entry separators
  const entryBlocks = historyContent.split('--------------------');
  
  entryBlocks.forEach(block => {
    const dateMatch = block.match(/Entry Date: ([^\n]+)/);
    const contentMatch = block.match(/Content Snippet: ([^\n]+(?:\n[^\n]*)*?)(?=\nSentiment Data:)/);
    const sentimentMatch = block.match(/Sentiment Data: ({[\s\S]*?})/);
    
    if (dateMatch && contentMatch && sentimentMatch) {
      try {
        const sentimentData = JSON.parse(sentimentMatch[1]);
        entries.push({
          date: dateMatch[1].trim(),
          content: contentMatch[1].trim(),
          sentiment: sentimentData
        });
      } catch (e) {
        console.error("Error parsing sentiment data:", e);
      }
    }
  });
  
  return entries.length > 0 ? entries : null;
};

// Helper function to get the main notes without sentiment history
const getMainNotes = (userNotes) => {
  if (!userNotes) return "";
  if (userNotes.includes("--- User Journal Sentiment History")) {
    return userNotes.split("--- User Journal Sentiment History")[0].trim();
  }
  return userNotes;
};

// Component to display sentiment badges
const SentimentBadges = ({ sentiment }) => {
  const activeSentiments = Object.entries(sentiment)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

  const getSentimentColor = (sentimentType) => {
    const colors = {
      'Normal': 'bg-green-100 text-green-800',
      'Anxiety': 'bg-yellow-100 text-yellow-800',
      'Depression': 'bg-blue-100 text-blue-800',
      'Stress': 'bg-orange-100 text-orange-800',
      'Bipolar': 'bg-purple-100 text-purple-800',
      'Personality disorder': 'bg-gray-100 text-gray-800',
      'Suicidal': 'bg-red-100 text-red-800'
    };
    return colors[sentimentType] || 'bg-gray-100 text-gray-800';
  };

  if (activeSentiments.length === 0) {
    return <span className="text-xs text-gray-400">No significant sentiment indicators</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {activeSentiments.map(sentiment => (
        <span
          key={sentiment}
          className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(sentiment)}`}
        >
          {sentiment}
        </span>
      ))}
    </div>
  );
};

// Component to display sentiment history
const SentimentHistory = ({ entries }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-3 border-t pt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <Calendar className="h-4 w-4" />
        Patient Sentiment History ({entries.length} entries)
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
          {entries.map((entry, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-600 font-medium">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="mb-2">
                <p className="text-sm text-gray-700 line-clamp-2">
                  {entry.content.length > 100 
                    ? `${entry.content.substring(0, 100)}...` 
                    : entry.content
                  }
                </p>
              </div>
              
              <div className="mt-2">
                <SentimentBadges sentiment={entry.sentiment} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const AppointmentsSection = () => {
  const { data, isLoading, isError } = useGetDoctorAppointments();
  const acceptMutation = useAcceptAppointment();
  const rejectMutation = useRejectAppointment();
  const completeMutation = useCompleteAppointment();

  if (isLoading) return <p className="p-6">Loading appointments...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load appointments</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      {data?.length === 0 && (
        <p className="p-6 text-gray-500">No appointments yet.</p>
      )}

      {data?.map((appt) => {
        const sentimentHistory = parseSentimentHistory(appt.userNotes);
        const mainNotes = getMainNotes(appt.userNotes);
        
        return (
          <div key={appt.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <h4 className="font-semibold text-lg">{appt.userName}</h4>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-600">
                    {new Date(appt.appointmentDateTime).toLocaleString()}
                  </p>
                  <Clock className="h-4 w-4 text-gray-500 ml-2" />
                  <span className="text-sm text-gray-600">{appt.durationMinutes} min</span>
                </div>

                {mainNotes && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 bg-gray-50 rounded p-2">
                      <strong>Patient Notes:</strong> {mainNotes}
                    </p>
                  </div>
                )}

                {appt.doctorNotes && (
                  <div className="mb-3">
                    <p className="text-sm text-blue-700 bg-blue-50 rounded p-2">
                      <strong>Doctor Notes:</strong> {appt.doctorNotes}
                    </p>
                  </div>
                )}

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    appt.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : appt.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : appt.status === "Completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {appt.status}
                </span>

                {sentimentHistory && appt.shareSentimentHistory !== false && (
                  <SentimentHistory entries={sentimentHistory} />
                )}
              </div>

              {appt.status === "Pending" && (
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => acceptMutation.mutate(appt.id)}
                    disabled={acceptMutation.isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    <Check className="h-4 w-4" />
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      rejectMutation.mutate({ id: appt.id, doctorNotes: "Not available" })
                    }
                    disabled={rejectMutation.isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                </div>
              )}

              {appt.status === "Confirmed" && (
    <div className="flex flex-col space-y-2 ml-4">
      <button
        onClick={() => completeMutation.mutate(appt.id)}
        disabled={completeMutation.isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md text-sm font-medium transition-colors"
      >
        <CheckCircle className="h-4 w-4" />
        Complete
      </button>
    </div>
  )}
            </div>
          </div>
        );
      })}
    </div>
  );
};