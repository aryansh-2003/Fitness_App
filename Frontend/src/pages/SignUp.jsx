import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../Store/authSlice';
import authService from '../../Service/auth';
import { 
  ArrowRight, Activity, X, Loader2, Heart, ShieldCheck, Flame, Dumbbell, Target, Brain, Check
} from 'lucide-react';
import FitnessBackground from '../components/FitnessBackground';
import { Button } from '../components/ui/button';

import Step1 from '../components/SignUpSteps/Step1';
import Step2 from '../components/SignUpSteps/Step2';
import Step3 from '../components/SignUpSteps/Step3';
import Step4 from '../components/SignUpSteps/Step4';
import Step5 from '../components/SignUpSteps/Step5';

const step1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const step2Schema = z.object({
  dob: z.string().min(1, "Date of birth is required").refine((val) => {
    const year = new Date(val).getFullYear();
    const currentYear = new Date().getFullYear();
    return year > 1900 && year <= currentYear;
  }, "Please enter a valid year"),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  height: z.number().min(50, "Minimum height is 50cm").max(300, "Maximum height is 300cm"),
  weight: z.number().min(20, "Minimum weight is 20kg").max(300, "Maximum weight is 300kg"),
  unit: z.enum(["metric", "imperial"])
});

const step3Schema = z.object({
  goals: z.array(z.string()).min(1, "Select at least 1 goal").max(3, "Select up to 3 goals")
});

const step4Schema = z.object({
  activityLevel: z.string().min(1, "Please select an activity level")
}).optional();

const step5Schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").optional().or(z.literal('')),
  bio: z.string().max(160, "Bio max 160 characters").optional(),
  notifications: z.boolean().default(true)
}).optional();

const schemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema];

const goalsList = [
  { id: 'lose-weight', title: 'Lose Weight', icon: Flame },
  { id: 'build-muscle', title: 'Build Muscle', icon: Dumbbell },
  { id: 'stay-active', title: 'Stay Active', icon: Activity },
  { id: 'improve-flex', title: 'Improve Flexibility', icon: Target },
  { id: 'eat-healthy', title: 'Eat Healthier', icon: Heart },
  { id: 'reduce-stress', title: 'Reduce Stress', icon: Brain },
];

const activityLevels = [
  { id: 'sedentary', title: 'Sedentary', desc: 'Desk job, little to no exercise' },
  { id: 'light', title: 'Lightly Active', desc: 'Light exercise 1-2 days/week' },
  { id: 'moderate', title: 'Moderately Active', desc: 'Moderate exercise 3-4 days/week' },
  { id: 'very-active', title: 'Very Active', desc: 'Hard exercise 5+ days/week' },
  { id: 'athlete', title: 'Athlete', desc: 'Physical job or hard exercise 2x/day' },
];

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [formData] = useState({ unit: 'metric', goals: [], notifications: true });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentSchema = schemas[step - 1];

  const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm({
    resolver: zodResolver(currentSchema),
    mode: 'onChange',
    defaultValues: formData
  });

  const handleAuthSubmit = async () => {
    setIsLoading(true);
    setAuthError("");
    const allData = watch();
    
    try {
        const formPayload = new FormData();
        formPayload.append("fullname", allData.fullName);
        formPayload.append("email", allData.email);
        formPayload.append("password", allData.password);
        formPayload.append("dob", allData.dob);
        formPayload.append("gender", allData.gender);
        formPayload.append("height", allData.height);
        formPayload.append("weight", allData.weight);
        formPayload.append("unit", allData.unit);
        if (allData.activityLevel) formPayload.append("activityLevel", allData.activityLevel);
        if (allData.username) formPayload.append("username", allData.username);
        if (allData.bio) formPayload.append("bio", allData.bio);
        if (allData.goals) {
            allData.goals.forEach(goal => formPayload.append("goals[]", goal));
        }
        formPayload.append("pushNotifications", allData.notifications ?? true);
        if (avatarFile) formPayload.append("avatar", avatarFile);

        const res = await authService.registerUser(formPayload);
        if (res && (res.status === 200 || res.status === 201)) {
            const loginRes = await authService.login(allData.email, allData.password);
            if (loginRes && loginRes.status === 200) {
                dispatch(loginAction(loginRes.data.data.user));
            }
            setIsSuccess(true);
            setTimeout(() => navigate('/Home'), 2500);
        }
    } catch (e) {
      console.error("Registration error:", e);
      const errorMessage = e.response?.data?.message || "An error occurred. Please check your details.";
      setAuthError(errorMessage);
      if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("exist")) {
        setStep(1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      if (step === 5) {
        handleAuthSubmit();
      } else {
        setStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => setStep(prev => prev - 1);
  const skipStep = () => step === 5 ? handleAuthSubmit() : setStep(prev => prev + 1);

  const password = watch("password", "");
  const strength = (() => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 7) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^A-Za-z0-9]/)) score++;
    return score;
  })();

  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const watchGoals = watch("goals", []);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fdfcf6] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
           <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-600/20">
              <Check size={48} className="text-white" />
           </div>
           <h2 className="text-4xl font-black uppercase tracking-tight text-black">ACCOUNT CREATED</h2>
           <p className="text-gray-500 mb-8 font-bold text-sm">Setting up your fitness profile...</p>
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
          <div className="flex items-center gap-6">
            <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-8 h-1.5 rounded-full transition-all ${i <= step ? 'bg-red-600' : 'bg-black/5'}`} />
                ))}
            </div>
            <span className="text-xs font-bold text-gray-400">Step {step} of 5</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-lg w-full mx-auto px-8 py-10 md:py-16">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
              <form onSubmit={handleSubmit(nextStep)} className="space-y-6 md:space-y-8">
                
                {authError && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4">
                      <div className="p-4 bg-red-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-600/20" dangerouslySetInnerHTML={{ __html: authError }} />
                   </motion.div>
                )}

                {step === 1 && <Step1 register={register} errors={errors} strength={strength} />}
                {step === 2 && <Step2 register={register} errors={errors} watch={watch} setValue={setValue} />}
                {step === 3 && <Step3 goalsList={goalsList} watchGoals={watchGoals} setValue={setValue} />}
                {step === 4 && <Step4 activityLevels={activityLevels} watch={watch} setValue={setValue} />}
                {step === 5 && <Step5 register={register} watch={watch} setValue={setValue} avatarPreview={avatarPreview} onAvatarChange={onAvatarChange} />}

                <div className="pt-4 flex flex-col gap-4">
                  <Button type="submit" disabled={isLoading} variant="destructive" size="lg" className="w-full h-14 gap-3">
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (step === 5 ? 'CREATE ACCOUNT' : 'CONTINUE')}
                    {!isLoading && <ArrowRight size={24} />}
                  </Button>
                  
                  <div className="flex justify-between items-center">
                     {step > 1 ? (
                        <button type="button" onClick={prevStep} className="text-xs font-bold text-gray-400 hover:text-black transition-colors">Go Back</button>
                     ) : (
                        <button type="button" onClick={() => navigate('/login')} className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors">Already have an account? Log in</button>
                     )}
                     {step >= 4 && <button type="button" onClick={skipStep} className="text-xs font-bold text-gray-400 hover:text-black transition-colors">Skip for now</button>}
                  </div>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative bg-black items-end justify-center overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.pexels.com/photos/32422963/pexels-photo-32422963.jpeg" 
          alt="Fitness Training" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10" />
        
        <div className="relative z-20 max-w-md text-left p-12 w-full pb-16">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <div className="w-12 h-1.5 bg-red-600 mb-6 rounded-full" />
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-[0.9] text-white italic">
                STRONGER <br /> <span className="text-red-600">EVERY DAY.</span>
              </h2>
              <p className="text-gray-300 font-bold text-xs leading-relaxed uppercase tracking-widest">
                Professional coaching. Real results.
              </p>
           </motion.div>
        </div>
      </div>
    </div>
  );
}