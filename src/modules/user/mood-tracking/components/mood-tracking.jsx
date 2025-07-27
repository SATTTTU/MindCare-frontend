import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Flame, ArrowLeft } from 'lucide-react';
import Calendar from './calender';
import Analytics from './analytics';
import { JournalComponent } from '../../journel/components/inputJournel';
import { api } from '@/lib/api-client';

const getUserId = () => localStorage.getItem('userId');

const apiSentimentToUiMood = {
    anxiety: "anxious", bipolar: "overwhelmed", depression: "sad",
    normal: "calm", personalityDisorder: "overwhelmed", stress: "anxious", suicidal: "sad"
};

export const MoodTracker = () => {
    const [allMoodEntries, setAllMoodEntries] = useState([]);
    const [streak, setStreak] = useState(0);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const calculateStreak = useCallback((entries) => {
        if (!entries || entries.length === 0) return 0;
        const loggedDates = [...new Set(entries.map(entry => entry.entryDate.split('T')[0]))].sort().reverse();
        let currentStreak = 0;
        const todayStr = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (loggedDates[0] === todayStr || loggedDates[0] === yesterdayStr) {
            let expectedDate = new Date(loggedDates[0]);
            for (const dateStr of loggedDates) {
                if (dateStr === expectedDate.toISOString().split('T')[0]) {
                    currentStreak++;
                    expectedDate.setDate(expectedDate.getDate() - 1);
                } else { break; }
            }
        }
        return currentStreak;
    }, []);

    const fetchMoodHistory = useCallback(async () => {
        const userId = getUserId();
        if (!userId) {
            setIsLoading(false);
            setAllMoodEntries([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.get(`/api/JournalEntries/user/${userId}`);
            const history = response;
            
            const processedEntries = history?.map(entry => {
                let detectedApiMood = 'normal'; 
                if (entry.sentiments) {
                    const foundMood = Object.keys(entry.sentiments).find(key => entry.sentiments[key] === true);
                    if (foundMood) {
                        detectedApiMood = foundMood;
                    }
                }
                const uiMood = apiSentimentToUiMood[detectedApiMood] || 'calm';
                return { 
                    ...entry, 
                    predictedMood: uiMood 
                };
            }).sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));
             console.log("Data being set to state:", processedEntries);
            setAllMoodEntries(processedEntries);
            setStreak(calculateStreak(processedEntries));
        } catch (error) {
            console.error("Failed to load mood history:", error);
            setAllMoodEntries([]);
        } finally {
            setIsLoading(false);
        }
    }, [calculateStreak]);


    useEffect(() => {
        fetchMoodHistory();
    }, [fetchMoodHistory]);

    const handleSubmitSuccess = () => {
        setShowEntryForm(false); 
        fetchMoodHistory(); 
    };

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
                <header className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 rounded-full hover:bg-slate-200 transition-colors duration-200"
                        aria-label="Go back to previous page"
                    >
                        <ArrowLeft className="h-6 w-6 text-slate-700" />
                    </button>
                    
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent text-center">
                        Mood Tracker
                    </h1>
                    
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full border border-indigo-200">
                        <Flame className="text-orange-500" />
                        <span className="text-sm font-semibold text-indigo-700">
                            {streak > 0 ? `${streak} day streak!` : 'Start a streak!'}
                        </span>
                    </div>
                </header>

                <Analytics entries={allMoodEntries} />

                <section className="my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-indigo-100 shadow-sm">
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
                        {showEntryForm && <JournalComponent onSubmissionSuccess={handleSubmitSuccess} />}
                    </AnimatePresence>
                </section>
                
                <Calendar entries={allMoodEntries} onDayClick={() => {}} />
            </div>
        </div>
    );
};