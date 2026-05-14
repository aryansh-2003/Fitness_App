import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import DashboardCharts from './DashboardCharts';

export default function ProgressSection({ chartData, dashboardData }) {
  const achievements = [
    { title: '7 Day Streak', desc: 'Consistent training', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Weight Goal', desc: '2kg away from target', icon: Target, color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Power User', desc: 'Top 5% this month', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            TRACK YOUR <br /> <span className="text-red-600">GROWTH.</span>
          </h1>
          <p className="text-gray-400 font-bold mt-4 uppercase tracking-widest text-xs">Analytics & milestone tracking</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DashboardCharts chartData={chartData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-black/5 bg-black text-white p-8 rounded-[2rem] overflow-hidden relative">
               <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-2 block">Monthly Average</span>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">640 <span className="text-lg not-italic text-gray-500">kcal/day</span></h3>
                  <div className="flex items-center gap-2 text-emerald-400 font-black uppercase tracking-widest text-[10px]">
                     <ArrowUpRight size={14} /> +12% from last month
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-10 -mt-10" />
            </Card>

            <Card className="border-2 border-black/5 p-8 rounded-[2rem]">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">Total Active Time</span>
               <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">124 <span className="text-lg not-italic text-gray-400">hours</span></h3>
               <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} className="h-full bg-black" />
               </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <div className="w-1.5 h-4 bg-red-600 rounded-full" /> Milestones
          </h3>
          <div className="space-y-4">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-2 border-black/5 hover:border-black transition-all">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-black">{item.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
