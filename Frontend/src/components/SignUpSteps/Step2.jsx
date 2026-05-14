import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function Step2({ register, errors, watch, setValue }) {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black uppercase tracking-tight">ABOUT YOU</h2>
      <div className="space-y-6">
        <div className="space-y-1">
          <Input {...register("dob")} type="date" className="[color-scheme:light]" />
          {errors.dob && <p className="text-red-600 text-xs font-bold ml-1">{errors.dob.message}</p>}
        </div>
        <div className="flex gap-2">
          {["Male", "Female", "Other"].map(g => (
            <button
              key={g}
              type="button"
              onClick={() => setValue("gender", g)}
              className={`flex-1 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-widest transition-all ${watch("gender") === g ? 'bg-black border-black text-white' : 'bg-white border-black/5 text-slate-400'}`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label>Height</Label>
            <span className="text-red-600 font-black text-xs uppercase italic">{watch("height", 170)}cm</span>
          </div>
          <input
            type="range"
            min="50"
            max="300"
            {...register("height", { valueAsNumber: true })}
            className="w-full accent-red-600 bg-black/5 h-1.5 rounded-full appearance-none"
          />
          {errors.height && <p className="text-red-600 text-xs font-bold ml-1">{errors.height.message}</p>}
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label>Weight</Label>
            <span className="text-red-600 font-black text-xs uppercase italic">{watch("weight", 70)}kg</span>
          </div>
          <input
            type="range"
            min="20"
            max="300"
            {...register("weight", { valueAsNumber: true })}
            className="w-full accent-red-600 bg-black/5 h-1.5 rounded-full appearance-none"
          />
          {errors.weight && <p className="text-red-600 text-xs font-bold ml-1">{errors.weight.message}</p>}
        </div>
      </div>
    </div>
  );
}
