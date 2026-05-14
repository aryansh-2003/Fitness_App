import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, StopCircle } from 'lucide-react';
import { Button } from '../ui/button';

export default function LiveWorkoutTracker({ 
  isTrackerOpen, activeWorkout, workoutTimer, 
  isPaused, setIsPaused, stopLiveWorkout, formatTime 
}) {
  return (
    <AnimatePresence>
      {isTrackerOpen && (
        <motion.div 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          exit={{ y: '100%' }} 
          className="fixed bottom-0 left-0 right-0 lg:left-72 bg-black text-white p-8 z-[140] rounded-t-[3rem] shadow-2xl"
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                {activeWorkout?.icon && <activeWorkout.icon size={40} strokeWidth={2.5} />}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-1 block">Live Session</span>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{activeWorkout?.name}</h3>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Duration</span>
              <div className="text-6xl font-black tabular-nums tracking-tighter leading-none">{formatTime(workoutTimer)}</div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-20 h-20 rounded-full bg-white/10 hover:bg-white hover:text-black border-none transition-all"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play size={32} fill="currentColor" /> : <Pause size={32} fill="currentColor" />}
              </Button>
              <Button 
                variant="destructive" 
                size="lg" 
                className="h-20 px-8 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-600/20"
                onClick={stopLiveWorkout}
              >
                <StopCircle size={24} className="mr-2" /> Finish
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
