import React from 'react';

export default function Step4({ activityLevels, watch, setValue }) {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black uppercase tracking-tight">ACTIVITY LEVEL</h2>
      <div className="space-y-3">
        {activityLevels.map(level => (
          <button
            key={level.id}
            type="button"
            onClick={() => setValue("activityLevel", level.id)}
            className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${watch("activityLevel") === level.id ? 'bg-black border-black text-white' : 'bg-white border-black/5 hover:border-black'}`}
          >
            <div>
              <div className="text-sm font-black italic uppercase tracking-tight">{level.title}</div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase font-black">{level.desc}</div>
            </div>
            {watch("activityLevel") === level.id && <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_10px_#ef4444]" />}
          </button>
        ))}
      </div>
    </div>
  );
}
