import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

// Import your components
import Analytics from './analytics';
import Calendar from './calender';
// import EntryForm from './EntryForm'; // Assuming this is your form component
import { Sidebar } from '@/components/ui/aside';
import { JournalComponent } from '../../journel/components/inputJournel';

// --- NEW AUTHENTICATION UTILITIES ---
// NOTE: In a real app, this logic would likely live in an AuthContext or a dedicated auth service.
// We assume that after login, the user's token and ID are stored in localStorage.

/**
 * Retrieves the authentication token from localStorage.
 * @returns {string|null} The token or null if not found.
 */
const getToken = () => {
    return localStorage.getItem('authToken'); // Or whatever you name your token in storage
};

/**
 * Retrieves the logged-in user's ID from localStorage.
 * @returns {string|null} The user ID or null if not found.
 */
const getUserId = () => {
    return localStorage.getItem('userId'); // You would store this upon login
};


export const MoodTracker = () => {
    // --- STATE HOOKS (Largely unchanged) ---
    const [allMoodEntries, setAllMoodEntries] = useState([]);
    const [streak, setStreak] = useState(0);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // This mapping logic remains the same as it's for the UI
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

    // No changes needed for the streak calculation logic
    const calculateStreak = useCallback((entries) => {
        if (!entries || entries.length === 0) return 0;
        const loggedDates = [...new Set(entries.map(entry => entry.entryDate.split('T')[0]))].sort().reverse();
        
        let currentStreak = 0;
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const todayStr = today.toISOString().split('T')[0];
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (loggedDates[0] === todayStr || loggedDates[0] === yesterdayStr) {
            let expectedDate = new Date(loggedDates[0]);
            for (const dateStr of loggedDates) {
                if (dateStr === expectedDate.toISOString().split('T')[0]) {
                    currentStreak++;
                    expectedDate.setDate(expectedDate.getDate() - 1);
                } else {
                    break;
                }
            }
        }
        
        return currentStreak;
    }, []);

    // --- API & DATA LOGIC (MAJOR UPDATES HERE) ---
    const fetchMoodHistory = useCallback(async () => {
        const token = getToken();
        const userId = getUserId();

        // If the user is not logged in, don't attempt to fetch data.
        if (!token || !userId) {
            setIsLoading(false);
            setAllMoodEntries([]); // Ensure state is clean
            return;
        }

        setIsLoading(true);
        try {
            // 1. UPDATE THE API ENDPOINT
            // It now points to your real controller and uses the logged-in user's ID.
            const response = await fetch(`http://127.0.0.1:5000/api/JournalEntries/user/${userId}`, {
                method: 'GET',
                // 2. ADD THE AUTHORIZATION HEADER
                // This is crucial for your [Authorize] attribute on the backend.
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // Handle specific auth errors, e.g., prompt for re-login
                if (response.status === 401) {
                    console.error("Authentication error: Token is invalid or expired.");
                    // Here you might redirect to a login page
                }
                throw new Error('Failed to fetch mood history');
            }
            
            const history = await response.json();

            // 3. PROCESS THE REAL API RESPONSE
            // This logic remains similar, but it now works with your actual DTO structure.
            const processedEntries = history.map(entry => {
                // Find which boolean sentiment is 'true'
                const detectedApiMood = entry.sentiments ? Object.keys(entry.sentiments).find(key => entry.sentiments[key] === true) : 'normal';
                
                return {
                    ...entry, // This includes journalId, content, entryDate from the DTO
                    predictedMood: apiSentimentToUiMood[detectedApiMood] || 'calm',
                };
            }).sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));

            setAllMoodEntries(processedEntries);
            setStreak(calculateStreak(processedEntries));

        } catch (error) {
            console.error("Failed to load mood history:", error);
            setAllMoodEntries([]);
        } finally {
            setIsLoading(false);
        }
    }, [calculateStreak]); // apiSentimentToUiMood is constant and doesn't need to be a dependency

    // --- USE EFFECT ---
    useEffect(() => {
        fetchMoodHistory();
    }, [fetchMoodHistory]);

    // --- EVENT HANDLERS ---
    // The handler for clicking a day on the calendar is removed as it was for recommendations.
    
    const handleSubmitSuccess = () => {
        setShowEntryForm(false);
        fetchMoodHistory(); // Refetch all data to update the UI completely.
    };

    // --- RENDER LOGIC ---
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-lg font-semibold text-indigo-600">Loading your journey...</p>
            </div>
        );
    }
    
    // The EntryForm now needs to use the real user ID, which it can get from the auth utility.
    // We pass it down for consistency.
    const userId = getUserId(); 

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
                            <JournalComponent
                                onSubmissionSuccess={handleSubmitSuccess}
                            />
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Calendar Section */}
                {/* The onDayClick prop is now an empty function as its purpose was removed. */}
                <Calendar entries={allMoodEntries} onDayClick={() => {}} />

            </div>
            
            {/* Recommendations code has been completely removed as requested. */}
        </div>
    );
};