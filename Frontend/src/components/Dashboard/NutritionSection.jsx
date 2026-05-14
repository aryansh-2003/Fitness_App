import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Apple, Zap, Plus, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export default function NutritionSection({ nutritionData, setIsMealModalOpen }) {
  const meals = nutritionData?.meals || [];
  const totalCalories = nutritionData?.totalCalories || 0;
  const totalProtein = nutritionData?.totalProtein || 0;
  const goalCalories = nutritionData?.goalCalories || 2500;
  const goalProtein = nutritionData?.goalProtein || 150;

  const calPercentage = Math.min(100, Math.round((totalCalories / goalCalories) * 100));
  const proteinPercentage = Math.min(100, Math.round((totalProtein / goalProtein) * 100));

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            FUEL YOUR <br /> <span className="text-red-600">BODY.</span>
          </h1>
          <p className="text-gray-400 font-bold mt-4 uppercase tracking-widest text-xs">Nutrition tracking & meal planning</p>
        </div>
        <Button onClick={() => setIsMealModalOpen(true)} variant="destructive" className="rounded-2xl font-black uppercase tracking-widest text-xs h-14 px-8 shadow-xl shadow-red-600/20">
          <Plus size={20} className="mr-2" /> Log Meal
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {meals.length > 0 ? (
            meals.map((meal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-2 border-black/5 hover:border-black transition-all group">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${meal.type === 'Vegan' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        <Apple size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-black">{meal.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1.5">
                            <Flame size={14} className="text-red-600" /> {meal.calories} Kcal
                          </span>
                          <span className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1.5">
                            <Zap size={14} className="text-red-600" /> {meal.protein}g Protein
                          </span>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${meal.type === 'Vegan' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {meal.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-black transition-colors" />
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-black/10 rounded-[2rem]">
               <Apple size={48} className="mx-auto text-gray-200 mb-4" />
               <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No meals logged today</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
           <Card className="border-2 border-black/5 p-8 rounded-[2rem] bg-white">
              <h3 className="text-xl font-black uppercase tracking-tight mb-6">Daily Target</h3>
              <div className="space-y-8">
                 <div>
                    <div className="flex justify-between mb-2">
                       <span className="text-xs font-black uppercase tracking-widest text-gray-400">Calories</span>
                       <span className="text-xs font-black text-black">{totalCalories} / {goalCalories}</span>
                    </div>
                    <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: `${calPercentage}%` }} className="h-full bg-red-600" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between mb-2">
                       <span className="text-xs font-black uppercase tracking-widest text-gray-400">Protein</span>
                       <span className="text-xs font-black text-black">{totalProtein}g / {goalProtein}g</span>
                    </div>
                    <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: `${proteinPercentage}%` }} className="h-full bg-black" />
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
