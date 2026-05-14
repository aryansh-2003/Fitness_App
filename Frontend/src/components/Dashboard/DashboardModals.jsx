import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function LogWorkoutModal({ isOpen, onClose, onSubmit, name, setName, calories, setCalories }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#fdfcf6] border-2 border-black/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6">Log Workout</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Workout Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
              </div>
              <div className="space-y-2">
                <Label>Calories Burned (kcal)</Label>
                <Input value={calories} onChange={(e) => setCalories(Number(e.target.value))} type="number" />
              </div>
              <Button type="submit" className="w-full mt-4">Save Workout</Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function LogMealModal({ isOpen, onClose, onSubmit }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#fdfcf6] border-2 border-black/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6">Log Meal</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Meal Name</Label>
                <Input name="mealName" required type="text" placeholder="e.g. Chicken Salad" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Calories</Label>
                  <Input name="calories" required type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Protein (g)</Label>
                  <Input name="protein" required type="number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <select name="type" className="w-full px-6 py-4 rounded-2xl border-2 border-black/5 bg-white font-medium text-black transition-colors focus:outline-none focus:border-red-600">
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>
              <Button type="submit" className="w-full mt-4">Save Meal</Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ProfilePanel({ 
  isOpen, onClose, user, profileForm, setProfileForm, 
  isEditMode, setIsEditMode, isSavingProfile, updateProfile, 
  handleAvatarUpdate, isUpdatingAvatar 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-md bg-[#fdfcf6] border-l-2 border-black/10 h-full shadow-2xl p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">Profile</h2>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-10">
              <div className="relative inline-block">
                <div className="relative">
                  <img src={user?.avatar || "https://i.pravatar.cc/150?img=32"} alt="User" className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white" />
                  {isUpdatingAvatar && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                      <Loader2 className="animate-spin text-red-600" size={24} />
                    </div>
                  )}
                </div>
                <button onClick={() => document.getElementById('profile-avatar-input').click()} className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center text-white border-2 border-white hover:scale-110 transition-transform shadow-lg">
                  <Camera size={16} />
                </button>
                <input id="profile-avatar-input" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpdate} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-black mt-4">{user?.fullname}</h3>
              <p className="text-gray-500 font-medium">@{user?.username}</p>
            </div>

            <form onSubmit={updateProfile} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input disabled={!isEditMode} value={profileForm.fullname} onChange={(e) => setProfileForm({ ...profileForm, fullname: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-black/5 border-2 border-transparent focus:border-red-600 focus:bg-transparent outline-none transition-all font-bold text-black disabled:opacity-70" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Username</label>
                  <input disabled={!isEditMode} value={profileForm.username} onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-black/5 border-2 border-transparent focus:border-red-600 focus:bg-transparent outline-none transition-all font-bold text-black disabled:opacity-70" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Age</label>
                  <input type="number" disabled={!isEditMode} value={profileForm.age} onChange={(e) => setProfileForm({ ...profileForm, age: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-black/5 border-2 border-transparent focus:border-red-600 focus:bg-transparent outline-none transition-all font-bold text-black disabled:opacity-70" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Weight</label>
                  <input type="number" disabled={!isEditMode} value={profileForm.weight} onChange={(e) => setProfileForm({ ...profileForm, weight: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-black/5 border-2 border-transparent focus:border-red-600 focus:bg-transparent outline-none transition-all font-bold text-black disabled:opacity-70" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Height</label>
                  <input type="number" disabled={!isEditMode} value={profileForm.height} onChange={(e) => setProfileForm({ ...profileForm, height: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-black/5 border-2 border-transparent focus:border-red-600 focus:bg-transparent outline-none transition-all font-bold text-black disabled:opacity-70" />
                </div>
              </div>

              <div className="pt-6">
                {isEditMode ? (
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setIsEditMode(false)} className="flex-1 py-4 bg-gray-200 text-black uppercase tracking-widest rounded-2xl font-black">Cancel</button>
                    <button type="submit" disabled={isSavingProfile} className="flex-1 py-4 bg-black text-white uppercase tracking-widest rounded-2xl font-black shadow-lg shadow-black/20 flex items-center justify-center gap-2 disabled:opacity-70 hover:-translate-y-1 transition-transform">
                      {isSavingProfile ? <Loader2 size={20} className="animate-spin" /> : 'Save'}
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setIsEditMode(true)} className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:-translate-y-1 transition-transform">Edit Profile</button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
