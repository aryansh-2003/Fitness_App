import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, BarChart3, Dumbbell, Flame, LayoutDashboard, 
  Menu, Bell, Target, Zap, Plus, Settings, Play, Loader2, Calendar, User
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../Store/authSlice';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

import DashboardTopbar from '../components/Dashboard/DashboardTopbar';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import DashboardStats from '../components/Dashboard/DashboardStats';
import DashboardCharts from '../components/Dashboard/DashboardCharts';
import DashboardDailyPlan from '../components/Dashboard/DashboardDailyPlan';
import LiveWorkoutTracker from '../components/Dashboard/LiveWorkoutTracker';
import { LogWorkoutModal, LogMealModal, ProfilePanel } from '../components/Dashboard/DashboardModals';

import WorkoutsSection from '../components/Dashboard/WorkoutsSection';
import NutritionSection from '../components/Dashboard/NutritionSection';
import ProgressSection from '../components/Dashboard/ProgressSection';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [nutritionData, setNutritionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [profileForm, setProfileForm] = useState({
    fullname: '', username: '', age: '', weight: '', height: ''
  });

  const [activeWorkout, setActiveWorkout] = useState(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [newWorkoutName, setNewWorkoutName] = useState("Leg Day");
  const [newCalories, setNewCalories] = useState(400);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/stats`, { withCredentials: true });
      setDashboardData(res.data.data);
    } catch (err) {
      console.error("Dashboard Stats Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workouts/history`, { withCredentials: true });
      setWorkoutHistory(res.data.data);
    } catch (err) {
      console.error("History Error:", err);
    }
  };

  const fetchNutrition = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/meals`, { withCredentials: true });
      setNutritionData(res.data.data);
    } catch (err) {
      console.error("Nutrition Error:", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/signUp?mode=login');
      return;
    }
    fetchStats();
    fetchHistory();
    fetchNutrition();
    setProfileForm({
      fullname: user.fullname || '',
      username: user.username || '',
      age: user.age || '',
      weight: user.weight || '',
      height: user.height || ''
    });
  }, [user, navigate]);

  useEffect(() => {
    let interval;
    if (isTrackerOpen && !isPaused) {
      interval = setInterval(() => setWorkoutTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTrackerOpen, isPaused]);

  const startLiveWorkout = (exercise) => {
    setActiveWorkout(exercise);
    setWorkoutTimer(0);
    setIsPaused(false);
    setIsTrackerOpen(true);
  };

  const stopLiveWorkout = async () => {
    const durationMins = Math.max(1, Math.round(workoutTimer / 60));
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workouts`, {
        name: activeWorkout.name,
        duration: durationMins,
        exercises: []
      }, { withCredentials: true });
      setIsTrackerOpen(false);
      setActiveWorkout(null);
      fetchStats();
      fetchHistory();
    } catch (err) {
      console.error("Save Workout Error:", err);
    }
  };

  const logMeal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/meals`, {
        name: e.target.mealName.value,
        calories: Number(e.target.calories.value),
        protein: Number(e.target.protein.value),
        type: e.target.type.value
      }, { withCredentials: true });
      setIsMealModalOpen(false);
      fetchNutrition();
      fetchStats();
    } catch (err) {
      console.error("Meal Log Error:", err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-account`, profileForm, { withCredentials: true });
      if (res.data.data) dispatch(login(res.data.data));
      setIsEditMode(false);
    } catch (err) {
      console.error("Profile Update Error:", err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleAvatarUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUpdatingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/updateavatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.data) dispatch(login(res.data.data));
    } catch (err) {
      console.error("Avatar Update Error:", err);
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {}, { withCredentials: true });
    } finally {
      dispatch(logout());
      navigate('/');
    }
  };

  const toggleWorkout = async (exerciseId) => {
    if (!dashboardData || !dashboardData.workoutId) return;
    setDashboardData(prev => ({
      ...prev,
      todaysWorkout: prev.todaysWorkout.map(w => w.id === exerciseId ? { ...w, completed: !w.completed } : w)
    }));
    try {
      const workoutToUpdate = dashboardData.todaysWorkout.find(w => w.id === exerciseId);
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workouts/${dashboardData.workoutId}/exercises/${exerciseId}`,
        { completed: !workoutToUpdate.completed }, { withCredentials: true }
      );
    } catch (e) {
      fetchStats();
    }
  };

  const handleLogWorkoutSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workouts`, {
        name: newWorkoutName, duration: 45, caloriesBurned: newCalories,
        exercises: [{ name: "Squats", sets: 3, reps: 10 }]
      }, { withCredentials: true });
      setIsLogModalOpen(false);
      fetchStats();
      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Dumbbell, label: 'Workouts' },
    { icon: Flame, label: 'Nutrition' },
    { icon: BarChart3, label: 'Progress' },
    { icon: User, label: 'Profile' },
  ];

  const LIVE_EXERCISES = [
    { name: 'Running', icon: Activity, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Walking', icon: Zap, color: 'text-black', bg: 'bg-gray-100' },
    { name: 'Cycling', icon: Activity, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Yoga', icon: Target, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Weightlifting', icon: Dumbbell, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const chartData = [
    { name: 'Mon', value: 400 }, { name: 'Tue', value: 300 }, { name: 'Wed', value: 600 },
    { name: 'Thu', value: 800 }, { name: 'Fri', value: 500 }, { name: 'Sat', value: 900 }, { name: 'Sun', value: 700 }
  ];

  if (isLoading) {
    return <div className="min-h-screen bg-[#fdfcf6] flex items-center justify-center">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#fdfcf6] flex font-sans text-black relative">
      <DashboardTopbar 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        setIsProfilePanelOpen={setIsProfilePanelOpen} 
        user={user} 
      />
      
      <DashboardSidebar 
        isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}
        setIsProfilePanelOpen={setIsProfilePanelOpen} handleLogout={handleLogout}
      />

      <main className="flex-1 lg:ml-72 min-h-screen p-4 md:p-10 pt-24 lg:pt-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Dashboard' && (
                <div className="space-y-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
                        HELLO, <br /> <span className="text-red-600">{user?.fullname.split(' ')[0]}!</span>
                      </h1>
                      <p className="text-gray-400 font-bold mt-4 uppercase tracking-widest text-xs flex items-center gap-2">
                        <Calendar size={14} className="text-red-600" /> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button onClick={() => setIsLogModalOpen(true)} variant="outline" className="rounded-2xl border-2 border-black/5 font-black uppercase tracking-widest text-xs h-14 px-8 hover:bg-black hover:text-white transition-all">
                        Log Workout
                      </Button>
                      <Button onClick={() => setIsMealModalOpen(true)} variant="destructive" className="rounded-2xl font-black uppercase tracking-widest text-xs h-14 px-8 shadow-xl shadow-red-600/20 hover:-translate-y-1 transition-all">
                        Add Meal
                      </Button>
                    </div>
                  </div>

                  <DashboardStats dashboardData={dashboardData} />
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                      <DashboardCharts chartData={chartData} />
                      
                      <Card className="border-2 border-black/5 overflow-hidden">
                        <CardHeader>
                          <CardTitle className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                            <div className="w-1.5 h-4 bg-red-600 rounded-full" /> Quick Start
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {LIVE_EXERCISES.map((ex, i) => (
                              <button key={i} onClick={() => startLiveWorkout(ex)} className="flex flex-col items-center p-4 rounded-2xl bg-black/5 hover:bg-black hover:text-white transition-all group active:scale-95">
                                <div className={`p-3 rounded-xl ${ex.bg} ${ex.color} group-hover:bg-white/10 group-hover:text-white transition-colors mb-3`}>
                                  <ex.icon size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-tight">{ex.name}</span>
                              </button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <DashboardDailyPlan dashboardData={dashboardData} toggleWorkout={toggleWorkout} />
                  </div>
                </div>
              )}

              {activeTab === 'Workouts' && (
                <WorkoutsSection workoutHistory={workoutHistory} startLiveWorkout={startLiveWorkout} />
              )}

              {activeTab === 'Nutrition' && (
                <NutritionSection nutritionData={nutritionData} setIsMealModalOpen={setIsMealModalOpen} />
              )}

              {activeTab === 'Progress' && (
                <ProgressSection chartData={chartData} dashboardData={dashboardData} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <LogWorkoutModal 
        isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} onSubmit={handleLogWorkoutSubmit}
        name={newWorkoutName} setName={setNewWorkoutName} calories={newCalories} setCalories={setNewCalories}
      />
      <LogMealModal isOpen={isMealModalOpen} onClose={() => setIsMealModalOpen(false)} onSubmit={logMeal} />
      <ProfilePanel 
        isOpen={isProfilePanelOpen} onClose={() => setIsProfilePanelOpen(false)}
        user={user} profileForm={profileForm} setProfileForm={setProfileForm}
        isEditMode={isEditMode} setIsEditMode={setIsEditMode} isSavingProfile={isSavingProfile}
        updateProfile={updateProfile} handleAvatarUpdate={handleAvatarUpdate} isUpdatingAvatar={isUpdatingAvatar}
      />
      <LiveWorkoutTracker 
        isTrackerOpen={isTrackerOpen} activeWorkout={activeWorkout} workoutTimer={workoutTimer}
        isPaused={isPaused} setIsPaused={setIsPaused} stopLiveWorkout={stopLiveWorkout} formatTime={formatTime}
      />
    </div>
  );
}