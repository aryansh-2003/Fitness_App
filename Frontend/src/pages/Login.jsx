import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../Store/authSlice';
import authService from '../../Service/auth';
import { ArrowRight, Check, X, Loader2, ShieldCheck } from 'lucide-react';
import FitnessBackground from '../components/FitnessBackground';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    try {
      const res = await authService.login(data.email, data.password);
      if (res && res.status === 200) {
        dispatch(loginAction(res.data.data.user));
        setIsSuccess(true);
        setTimeout(() => navigate('/Home'), 1500);
      }
    } catch (e) {
      console.error("Login error:", e);
      setAuthError(e.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fdfcf6] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
           <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-600/20">
              <Check size={48} className="text-white" />
           </div>
           <h2 className="text-4xl font-black uppercase tracking-tight text-black">WELCOME BACK</h2>
           <p className="text-gray-500 mb-8 font-bold text-sm">Loading your workouts...</p>
           <div className="w-64 h-1.5 bg-black/5 rounded-full mx-auto overflow-hidden">
              <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.5 }} className="h-full bg-red-600" />
           </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#fdfcf6] text-[#020617] relative overflow-hidden font-sans">
      <FitnessBackground />
      
      <div className="flex-1 flex flex-col relative z-10">
        <div className="p-8 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="w-12 h-12 rounded-xl border-2 border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-lg w-full mx-auto px-8 py-10 md:py-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight mb-2">SIGN IN</h2>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Welcome back! Elite performance starts here.</p>
                {authError && <div className="mt-4 p-4 bg-red-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-600/20">{authError}</div>}
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</Label>
                  <Input {...register("email")} className="h-14" placeholder="name@example.com" />
                  {errors.email && <p className="text-red-600 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Security Password</Label>
                  <Input {...register("password")} type="password" className="h-14" placeholder="••••••••" />
                  {errors.password && <p className="text-red-600 text-[10px] font-black uppercase tracking-widest mt-1 ml-1">{errors.password.message}</p>}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} variant="destructive" size="lg" className="w-full h-14 gap-3">
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'SIGN IN'}
                  {!isLoading && <ArrowRight size={24} />}
                </Button>
                <button type="button" onClick={() => navigate('/signup')} className="text-xs font-black text-gray-400 hover:text-red-600 transition-colors uppercase tracking-widest">Don't have an account? Sign up</button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative bg-black items-end justify-center overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.pexels.com/photos/18060233/pexels-photo-18060233.jpeg" 
          alt="Athlete Training" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10" />
        
        <div className="relative z-20 max-w-md text-left p-12 w-full pb-16">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <div className="w-12 h-1.5 bg-red-600 mb-6 rounded-full" />
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-[0.9] text-white italic">
                PUSH YOUR <br /> <span className="text-red-600">LIMITS.</span>
              </h2>
              <p className="text-gray-300 font-bold text-[10px] leading-relaxed uppercase tracking-widest">
                Elite performance starts here.
              </p>
           </motion.div>
        </div>
      </div>
    </div>
  );
}