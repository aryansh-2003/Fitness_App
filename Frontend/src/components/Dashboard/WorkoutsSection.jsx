import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Clock, Flame, Calendar, Play, Activity, Zap, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export default function WorkoutsSection({ workoutHistory, startLiveWorkout }) {
  const LIVE_EXERCISES = [
    { name: 'Running', icon: Activity, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Walking', icon: Zap, color: 'text-black', bg: 'bg-gray-100' },
    { name: 'Cycling', icon: Activity, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Yoga', icon: Target, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Weightlifting', icon: Dumbbell, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "Recent";
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return "Recent";
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            CHASE YOUR <br /> <span className="text-red-600">LIMITS.</span>
          </h1>
          <p className="text-gray-400 font-bold mt-4 uppercase tracking-widest text-xs">Explore routines or start a live session</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <div className="w-1.5 h-4 bg-red-600 rounded-full" /> Quick Start
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LIVE_EXERCISES.map((ex, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="border-2 border-black/5 hover:border-black transition-all cursor-pointer group" onClick={() => startLiveWorkout(ex)}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${ex.bg} ${ex.color} group-hover:bg-red-600 group-hover:text-white transition-colors`}>
                      <ex.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-black">{ex.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Start Session</p>
                    </div>
                    <Play size={16} className="ml-auto text-gray-300 group-hover:text-red-600 transition-colors" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <div className="w-1.5 h-4 bg-red-600 rounded-full" /> History
          </h3>
          <div className="space-y-4">
            {workoutHistory.length > 0 ? (
              workoutHistory.map((workout, i) => (
                <Card key={i} className="border-2 border-black/5">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xs font-black uppercase tracking-tight">{workout.name}</h4>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatDate(workout.date)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-red-600" />
                        <span className="text-[10px] font-black">{workout.duration}m</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame size={12} className="text-red-600" />
                        <span className="text-[10px] font-black">{workout.caloriesBurned} kcal</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-10 text-center border-2 border-dashed border-black/10 rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No workout history</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
