import React from 'react';
import { motion } from 'framer-motion';

const moodConfig = {
    happy: { emoji: '😊', color: 'bg-green-400' },
    calm: { emoji: '😌', color: 'bg-blue-300' },
    anxious: { emoji: '😰', color: 'bg-yellow-400' },
    sad: { emoji: '😢', color: 'bg-gray-400' },
    angry: { emoji: '😠', color: 'bg-red-400' },
    excited: { emoji: '🤩', color: 'bg-purple-400' },
    overwhelmed: { emoji: '😵', color: 'bg-orange-400' }
};

const Calendar = ({ entries=[], onDayClick }) => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const entriesByDay = entries.reduce((acc, entry) => {
        const day = new Date(entry.entryDate).getDate();
        if (!acc[day] || new Date(entry.entryDate) > new Date(acc[day].entryDate)) {
            acc[day] = entry;
        }
        return acc;
    }, {});

    const generateCalendarDays = () => {
        const days = [];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();

        for (let i = 0; i < startDay; i++) { days.push(null); }
        for (let day = 1; day <= daysInMonth; day++) { days.push(day); }
        return days;
    };

    const calendarDays = generateCalendarDays();
    const getDayColor = (day) => {
        if (!day || !entriesByDay[day]) return 'bg-slate-100 border border-slate-200';
        const mood = moodConfig[entriesByDay[day].predictedMood];
        return mood ? mood.color : 'bg-slate-200';
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-700">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
            <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDays.map((day) => <div key={day} className="text-center text-sm font-semibold text-slate-500 py-2">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => (
                        <motion.div
                            key={index}
                            onClick={() => day && onDayClick(day)}
                            whileHover={day && entriesByDay[day] ? { scale: 1.1 } : {}}
                            whileTap={day && entriesByDay[day] ? { scale: 0.95 } : {}}
                            className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${day ? 'cursor-pointer hover:ring-2 hover:ring-indigo-300' : 'opacity-50'} ${getDayColor(day)} ${day && entriesByDay[day] ? 'text-white font-bold' : 'text-slate-700'}`}
                        >
                            {day && (
                                <div className="flex flex-col items-center">
                                    <span>{day}</span>
                                    {entriesByDay[day] && <span className="text-lg mt-1">{moodConfig[entriesByDay[day].predictedMood]?.emoji}</span>}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;