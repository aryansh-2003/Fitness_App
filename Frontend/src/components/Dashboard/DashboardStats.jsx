import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Activity, Clock, Zap } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function DashboardStats({ dashboardData }) {
  const stats = [
    { label: 'Calories', value: dashboardData?.totalCalories || 0, unit: 'kcal', icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Steps', value: dashboardData?.totalSteps || 0, unit: 'steps', icon: Activity, color: 'text-black', bg: 'bg-gray-100' },
    { label: 'Sleep', value: dashboardData?.sleepHours || 0, unit: 'hours', icon: Flame, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Heart Rate', value: dashboardData?.heartRate || 0, unit: 'bpm', icon: Zap, color: 'text-black', bg: 'bg-gray-100' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="border-2 border-black/5 hover:border-black transition-all group active:scale-95 cursor-default">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={16} />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black uppercase tracking-tighter text-black">{stat.value}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.unit}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
