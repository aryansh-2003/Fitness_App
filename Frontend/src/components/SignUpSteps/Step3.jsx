import React from 'react';

export default function Step3({ goalsList, watchGoals, setValue }) {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black uppercase tracking-tight">YOUR DETAILS</h2>
      <div className="grid grid-cols-2 gap-3">
        {goalsList.map(goal => {
          const isSelected = watchGoals.includes(goal.id);
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => isSelected ? setValue("goals", watchGoals.filter(g => g !== goal.id)) : watchGoals.length < 3 && setValue("goals", [...watchGoals, goal.id])}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${isSelected ? 'bg-red-600/5 border-red-600 shadow-lg shadow-red-600/10' : 'bg-white border-black/5 hover:border-black'}`}
            >
              <goal.icon size={24} className={isSelected ? 'text-red-600' : 'text-slate-400'} />
              <div className="mt-4 text-xs font-black uppercase tracking-tight italic">{goal.title}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
