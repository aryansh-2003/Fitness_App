import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Input } from '../ui/input';

export default function Step5({ register, watch, setValue, avatarPreview, onAvatarChange }) {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black uppercase tracking-tight">COMPLETE PROFILE</h2>
      <div className="flex flex-col items-center">
        <div onClick={() => document.getElementById('avatar-input').click()} className="relative cursor-pointer group">
          <div className="w-32 h-32 rounded-[2rem] bg-white border-4 border-black/5 flex items-center justify-center overflow-hidden group-hover:border-red-600 transition-all shadow-xl shadow-black/5">
            {avatarPreview ? <img src={avatarPreview} className="w-full h-full object-cover" alt="Avatar preview" /> : <Camera size={32} className="text-slate-400" />}
          </div>
          <input id="avatar-input" type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
        </div>
        <div className="text-xs font-bold text-red-600 mt-4">Upload Profile Picture</div>
      </div>
      <div className="space-y-4">
        <Input {...register("username")} placeholder="Username (Optional)" />
        <textarea
          {...register("bio")}
          rows="3"
          className="w-full bg-white border-2 border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all resize-none font-medium text-black"
          placeholder="A brief bio..."
        ></textarea>

        <div className="flex items-center justify-between p-6 bg-white border-2 border-black/5 rounded-2xl">
          <div className="space-y-1">
            <div className="text-sm font-black italic uppercase tracking-tight">Push Notifications</div>
            <div className="text-[10px] text-slate-400 uppercase font-black">Stay updated on your goals</div>
          </div>
          <button
            type="button"
            onClick={() => setValue("notifications", !watch("notifications"))}
            className={`w-12 h-6 rounded-full transition-all relative ${watch("notifications") ? 'bg-red-600' : 'bg-black/10'}`}
          >
            <motion.div animate={{ x: watch("notifications") ? 24 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
