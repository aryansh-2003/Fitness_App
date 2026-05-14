import React from 'react';
import { Input } from '../ui/input';

export default function Step1({ register, errors, strength }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">START YOUR JOURNEY</h2>
        <p className="text-gray-500 text-sm font-bold">Achieve your fitness goals.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <Input {...register("fullName")} placeholder="Full Name" />
          {errors.fullName && <p className="text-red-600 text-xs font-bold ml-1">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-1">
          <Input {...register("email")} placeholder="Email Address" />
          {errors.email && <p className="text-red-600 text-xs font-bold ml-1">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Input {...register("password")} type="password" placeholder="Password" />
          <div className="flex gap-1 px-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? 'bg-red-600' : 'bg-black/5'}`} />
            ))}
          </div>
          {errors.password && <p className="text-red-600 text-xs font-bold ml-1">{errors.password.message}</p>}
        </div>
        <div className="space-y-1">
          <Input {...register("confirmPassword")} type="password" placeholder="Confirm Password" />
          {errors.confirmPassword && <p className="text-red-600 text-xs font-bold ml-1">{errors.confirmPassword.message}</p>}
        </div>
      </div>
    </div>
  );
}
