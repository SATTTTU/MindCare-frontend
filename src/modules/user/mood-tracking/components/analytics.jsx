import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const moodConfig = {
    happy: { label: 'Happy', color: '#4ade80' },
    calm: { label: 'Calm', color: '#60a5fa' },
    anxious: { label: 'Anxious', color: '#facc15' },
    sad: { label: 'Sad', color: '#9ca3af' },
    angry: { label: 'Angry', color: '#f87171' },
    excited: { label: 'Excited', color: '#a78bfa' },
    overwhelmed: { label: 'Overwhelmed', color: '#fb923c' }
};

const Analytics = ({ entries }) => {
    const moodDistribution = entries.reduce((acc, entry) => {
        const mood = entry.predictedMood || 'calm';
        acc[mood] = (acc[mood] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(moodDistribution).map(mood => ({
        name: moodConfig[mood]?.label || 'Unknown',
        value: moodDistribution[mood],
        color: moodConfig[mood]?.color || '#ccc'
    }));

    const barData = entries.slice(0, 7).map(entry => ({
        date: new Date(entry.entryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: entry.predictedMood,
    })).reverse();

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">Your Mood Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-slate-600 mb-4 text-center">Mood Distribution</h4>
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : <p className="text-center text-slate-500 py-16">Not enough data for a chart.</p>}
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-slate-600 mb-4 text-center">Recent Mood Trend</h4>
                    {barData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={barData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="date" stroke="#6b7280" />
                                <YAxis allowDecimals={false} stroke="#6b7280" />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ddd', borderRadius: '10px' }} formatter={(value, name, props) => [`Mood: ${props.payload.mood}`]} />
                                <Bar dataKey="mood" name="Mood">
                                    {barData.map((entry, index) => <Cell key={`cell-${index}`} fill={moodConfig[entry.mood]?.color || '#ccc'} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : <p className="text-center text-slate-500 py-16">Log moods to see your trend.</p>}
                </div>
            </div>
        </div>
    );
};

export default Analytics;