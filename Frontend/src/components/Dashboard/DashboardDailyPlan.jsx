import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export default function DashboardDailyPlan({ dashboardData, toggleWorkout }) {
  return (
    <Card className="border-2 border-black/5 bg-[#fdfcf6]">
      <CardHeader>
        <CardTitle className="text-sm font-black uppercase tracking-widest text-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-red-600 rounded-full" /> Daily Plan
          </div>
          <span className="text-[10px] text-gray-400">{dashboardData?.todaysWorkout?.filter(w => w.completed).length || 0}/{dashboardData?.todaysWorkout?.length || 0}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dashboardData?.todaysWorkout?.map((workout, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 5 }}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${workout.completed ? 'bg-black/5 border-transparent opacity-60' : 'bg-white border-black/5 hover:border-black'}`}
            onClick={() => toggleWorkout(workout.id)}
          >
            {workout.completed ? 
              <CheckCircle2 className="text-red-600" size={24} /> : 
              <Circle className="text-gray-200" size={24} />
            }
            <div className="flex-1">
              <h4 className={`text-xs font-black uppercase tracking-tight ${workout.completed ? 'line-through text-gray-400' : 'text-black'}`}>{workout.name}</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{workout.sets} sets • {workout.reps}</p>
            </div>
          </motion.div>
        ))}
        {(!dashboardData?.todaysWorkout || dashboardData.todaysWorkout.length === 0) && (
          <div className="py-10 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No exercises for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
