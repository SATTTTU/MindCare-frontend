import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

import Analytics from './analytics';
import Calendar from './calender';
import { Sidebar } from '@/components/ui/aside';

// This utility helps in creating a consistent user ID
const getAnonymousId = () => {
    if (localStorage.getItem('anonymousUserId')) {
        return localStorage.getItem('anonymousUserId');
    }
    const newId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('anonymousUserId', newId);
    return newId;
};


export const MoodTracker = () => {
    // --- STATE HOOKS ---
    const [allMoodEntries, setAllMoodEntries] = useState([]); // Now an array
    const [streak, setStreak] = useState(0);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [selectedDayEntry, setSelectedDayEntry] = useState(null);
    // const [showRecommendations, setShowRecommendations] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Maps the API sentiment response to the UI's mood identifiers
    const apiSentimentToUiMood = {
        anxiety: "anxious",
        bipolar: "overwhelmed",
        depression: "sad",
        normal: "calm",
        personalityDisorder: "overwhelmed",
        stress: "anxious",
        suicidal: "sad"
    };

    // --- HELPER FUNCTIONS ---

    // Calculates streak based on a sorted list of entry dates
    const calculateStreak = useCallback((entries) => {
        if (!entries || entries.length === 0) return 0;

        const loggedDates = [...new Set(entries.map(entry => entry.entryDate.split('T')[0]))].sort().reverse();
        
        let currentStreak = 0;
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const todayStr = today.toISOString().split('T')[0];
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // Check if the latest entry is today or yesterday to start the streak count
        if (loggedDates[0] === todayStr || loggedDates[0] === yesterdayStr) {
            let expectedDate = new Date(loggedDates[0]);
            for (const dateStr of loggedDates) {
                if (dateStr === expectedDate.toISOString().split('T')[0]) {
                    currentStreak++;
                    expectedDate.setDate(expectedDate.getDate() - 1);
                } else {
                    break; // Streak is broken
                }
            }
        }
        
        return currentStreak;
    }, []);

    // --- API & DATA LOGIC ---
    const fetchMoodHistory = useCallback(async () => {
        const anonymousUserId = getAnonymousId();
        if (!anonymousUserId) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            // Updated API endpoint to fetch journal entries
            const response = await fetch(`http://127.0.0.1:5000/journals/user/${anonymousUserId}`); // NOTE: Update this URL if needed
            if (!response.ok) throw new Error('Failed to fetch mood history');
            
            const history = await response.json();

            // Process entries to match the structure needed by child components
            const processedEntries = history.map(entry => {
                const detectedApiMood = Object.keys(entry.sentiments).find(key => entry.sentiments[key] === true);
                return {
                    ...entry,
                    predictedMood: apiSentimentToUiMood[detectedApiMood] || 'calm',
                    // Recommendations would be part of your API response per entry
                    // recommendations: entry.recommendations || [] 
                };
            }).sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate)); // Sort newest first

            setAllMoodEntries(processedEntries);
            setStreak(calculateStreak(processedEntries));

        } catch (error) {
            console.error("Failed to load mood history:", error);
            setAllMoodEntries([]); // Ensure it's an array on error
        } finally {
            setIsLoading(false);
        }
    }, [calculateStreak]);


    // --- USE EFFECT ---
    useEffect(() => {
        fetchMoodHistory();
    }, [fetchMoodHistory]);

    // --- EVENT HANDLERS ---
    const handleDayClick = (day) => {
        const entryForDay = allMoodEntries.find(entry => new Date(entry.entryDate).getDate() === day);
        if (entryForDay) {
            setSelectedDayEntry(entryForDay);
            // setShowRecommendations(true);
        }
    };
    
    const handleSubmitSuccess = () => {
        setShowEntryForm(false);
        fetchMoodHistory(); // Refetch data to update UI
    };

    // --- RENDER LOGIC ---
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-lg font-semibold text-indigo-600">Loading your journey...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
            
            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <Sidebar />
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent">
                        Mood Tracker
                    </h1>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full border border-indigo-200">
                        <Flame className="text-orange-500" />
                        <span className="text-sm font-semibold text-indigo-700">
                            {streak > 0 ? `${streak} day streak!` : 'Start a streak!'}
                        </span>
                    </div>
                </div>

                {/* Analytics Section */}
                <Analytics entries={allMoodEntries} />

                {/* Entry Form Toggle */}
                <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-indigo-100 shadow-sm">
                     <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-700">How are you feeling?</h3>
                            <p className="text-slate-600">Log your mood to discover patterns.</p>
                        </div>
                        <button 
                            onClick={() => setShowEntryForm(prev => !prev)} 
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-white ${showEntryForm ? 'bg-gradient-to-r from-red-500 to-pink-600' : 'bg-gradient-to-r from-indigo-500 to-purple-600'}`}>
                            {showEntryForm ? 'Cancel' : "Log Today's Mood"}
                        </button>
                    </div>
                     <AnimatePresence>
                        {showEntryForm && (
                            <EntryForm
                                anonymousUserId={getAnonymousId()}
                                onSubmissionSuccess={handleSubmitSuccess}
                            />
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Calendar Section */}
                <Calendar entries={allMoodEntries} onDayClick={handleDayClick} />

            </div>
            
            {/* Recommendations Modal */}
            {/* <AnimatePresence>
                {showRecommendations && selectedDayEntry && (
                    <RecommendationsPage
                        entry={selectedDayEntry}
                        onClose={() => setShowRecommendations(false)}
                    />
                )}
            </AnimatePresence> */}

            
        </div>
    );
};