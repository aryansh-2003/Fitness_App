import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, Zap, BarChart3, Dumbbell as DumbbellIcon, Flame, Target, TrendingUp, Shield, Heart, CheckCircle, ChevronRight, Play, Globe, ShieldCheck, Zap as Lightning, Timer, Trophy, Headphones, Menu, X, Star } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';


const benefits = [
  { icon: DumbbellIcon, title: "Build Confidence", description: "Master every movement with form-tracking precision. As you hit your personal bests, you'll develop a mental resilience that translates far beyond the gym floor." },
  { icon: Heart, title: "Boost Your Mood", description: "Unlock peak physical capability with science-backed workout planning. Align your training with your unique biology to see results that last a lifetime." },
  { icon: Activity, title: "Increase Energy Levels", description: "Experience increased daily energy and improved focus through consistent, guided physical activity. Fitness isn't just about the sweat—it's about the clarity." }
];

export default function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#fdfcf6] text-[#020617] selection:bg-red-500/30 overflow-x-hidden font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 px-6 py-4 flex justify-between items-center bg-[#fdfcf6]/80 backdrop-blur-xl rounded-full shadow-2xl shadow-black/10 border border-white/20">
        <div className="flex items-center gap-3">
          <Logo size={24} />
          <span className="text-lg font-black tracking-tighter uppercase italic">FITTRACK</span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'ABOUT', id: 'about' },
            { label: 'BENEFITS', id: 'benefits' },
            { label: 'FEATURES', id: 'features' },
            { label: 'PRICING', id: 'pricing' },
            { label: 'APP', id: 'app' }
          ].map(item => (
            <button 
              key={item.label} 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[10px] font-black tracking-widest text-[#020617] hover:text-red-600 transition-colors uppercase"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button onClick={() => navigate('/login')} size="sm" variant="default" className="rounded-full px-8">LOG IN</Button>
        </div>
        
        {/* Mobile Hamburger */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-black p-1">
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }} className="relative w-64 bg-[#fdfcf6] h-full shadow-2xl flex flex-col pt-20 px-6">
              <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-black p-2 hover:bg-black/5 rounded-full transition-colors">
                <X size={24} />
              </button>
              <nav className="flex flex-col gap-6 mt-8">
                {[
                  { label: 'ABOUT', id: 'about' },
                  { label: 'BENEFITS', id: 'benefits' },
                  { label: 'FEATURES', id: 'features' },
                  { label: 'PRICING', id: 'pricing' },
                  { label: 'APP', id: 'app' }
                ].map(item => (
                  <button 
                    key={item.label} 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => {
                         const element = document.getElementById(item.id);
                         if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                    className="text-2xl font-black tracking-tighter text-left uppercase text-[#020617] hover:text-red-600 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="mt-auto pb-12">
                <Button onClick={() => navigate('/login')} className="w-full">LOG IN</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
          <motion.div style={{ opacity, scale }} className="max-w-5xl">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-red-600/20">
              <Activity size={14} /><span>READY TO SWEAT</span>
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] uppercase italic text-white">PUSH YOUR <br /><span className="text-red-500">LIMITS.</span></h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 font-bold leading-tight mb-12 uppercase">Achieve your fitness goals with the best workout routines. <br className="hidden md:block" />Track your progress and transform your body.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/signup')} size="lg" variant="destructive" className="italic gap-3">
                START TRAINING <ArrowRight size={24} />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white text-white hover:bg-white hover:text-black italic">
                VIEW WORKOUTS
              </Button>
            </div>
          </motion.div>
        </section>

        <div className="h-24 md:h-40"></div>

        {/* Story Section */}
        <section id="about" className="relative w-full h-[80vh] min-h-[600px] flex items-center bg-zinc-900">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Fitness Story" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-tight drop-shadow-md">
                FitTrack was born from the belief that elite-level fitness coaching should be accessible to everyone. We've combined deep athletic expertise with cutting-edge technology to create a platform that adapts to your journey.
              </p>
            </div>
          </div>
        </section>

        <div className="h-24 md:h-40"></div>

        <section id="benefits" className="py-24 px-6 md:px-12 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-16 text-left">BENEFITS OF WORKING OUT</h2>
            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex flex-col items-start">
                  <benefit.icon size={56} className="text-[#ff4d22] mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-black mb-4 tracking-tighter">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-24 md:h-40"></div>

        <section id="features" className="py-32 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-black">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000" alt="Training" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-red-600/10 mix-blend-multiply" />
                <div className="absolute bottom-8 left-8 p-6 bg-black text-white rounded-2xl italic font-black text-2xl shadow-2xl">01. GET STRONGER</div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-red-600 font-black tracking-widest uppercase text-xs">Workout Tracking</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none uppercase italic mt-4">SEE YOUR <br /><span className="text-zinc-300">RESULTS.</span></h2>
              <p className="text-lg text-slate-600 mb-12 font-bold uppercase leading-tight">Log your workouts, track your weights, and see your progress over time. We make it easy to stay motivated.</p>
              <div className="space-y-4">
                {[ { label: 'Weekly Workouts', value: '5 DAYS', color: 'text-red-600' }, { label: 'Calories Burned', value: '2,400 kcal', color: 'text-black' }, { label: 'Fitness Goal', value: 'ON TRACK', color: 'text-emerald-600' } ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center p-6 bg-cream border border-black/5 rounded-2xl">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                    <span className={`text-xl font-black italic ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="h-24 md:h-40"></div>

        {/* How It Works */}
        <section className="py-32 px-6 bg-black text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-24 text-center uppercase italic">HOW IT <span className="text-red-600">WORKS.</span></h2>
             <div className="relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-white/10" />
                <div className="grid md:grid-cols-3 gap-16 relative z-10">
                   {[
                      { step: '01', title: 'Sign Up', desc: 'Create your account in seconds and set your personal baseline.' },
                      { step: '02', title: 'Set Goals', desc: 'Tell us what you want to achieve and we customize your experience.' },
                      { step: '03', title: 'Track Progress', desc: 'Log workouts, monitor nutrition, and watch yourself transform.' }
                   ].map((s, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                         <div className="w-24 h-24 rounded-full bg-red-600 text-white flex items-center justify-center text-4xl font-black italic shadow-[0_0_40px_rgba(239,68,68,0.4)] mb-8 border-8 border-black">
                            {s.step}
                         </div>
                         <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{s.title}</h3>
                         <p className="text-gray-400 font-bold leading-relaxed">{s.desc}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        <div className="h-24 md:h-40"></div>

        {/* Testimonials */}
        <section className="py-32 px-6 bg-[#fdfcf6]">
          <div className="max-w-7xl mx-auto">
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-20 text-center uppercase italic text-black">DON'T JUST TAKE <br/> <span className="text-red-600">OUR WORD.</span></h2>
             <div className="grid md:grid-cols-3 gap-8">
                {[
                   { name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?img=47', quote: 'FitTrack completely changed how I train. The interface is gorgeous and tracking is effortless. I hit my goals 3 months early!' },
                   { name: 'Marcus Chen', avatar: 'https://i.pravatar.cc/150?img=11', quote: 'As a personal trainer, this is the first app I actually recommend to my clients. It’s clean, fast, and gives me exactly what I need.' },
                   { name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?img=5', quote: 'The onboarding was so smooth! I set up my profile in 2 minutes and the workout tracking is just beautiful. Worth every penny.' }
                ].map((review, i) => (
                   <div key={i} className="bg-white p-10 rounded-[2rem] border-2 border-black/5 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                      <div className="flex gap-1 mb-6 text-red-600">
                         {[1,2,3,4,5].map(star => <Star key={star} size={20} fill="currentColor" />)}
                      </div>
                      <p className="text-lg font-bold text-gray-600 mb-8 leading-relaxed italic">"{review.quote}"</p>
                      <div className="flex items-center gap-4">
                         <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-black/10" />
                         <span className="font-black uppercase tracking-tight text-black">{review.name}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </section>

        <div className="h-24 md:h-40"></div>

        {/* Plans Section */}
        <section id="pricing" className="py-24 bg-black w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-red-600 px-6 py-4 md:px-12 md:py-6 z-10 rounded-br-3xl shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white italic">CHOOSE YOUR PLAN</h2>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 mt-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-[#fdfcf6] rounded-[2rem] overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-300 shadow-xl">
                <div className="h-56 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" alt="Partner Performance" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-1 text-center">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Partner Performance</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-black italic">$70</span>
                    <div className="text-xs text-red-600 uppercase font-black tracking-widest mt-2">Every month</div>
                  </div>
                  <p className="text-sm text-gray-600 font-bold mb-8 flex-1 leading-relaxed">Train together, push each other. Ideal for friends, couples, or workout buddies who want a shared fitness journey—with a trainer who keeps you both on track.</p>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-6">Valid for 12 months</div>
                  <Button variant="default" className="w-full">Select Plan</Button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#fdfcf6] rounded-[2rem] overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-300 relative border-4 border-red-600 shadow-2xl shadow-red-600/20">
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-10">Popular</div>
                <div className="h-56 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80" alt="Small Squad Strength" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-1 text-center">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Small Squad Strength</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-black italic">$70</span>
                    <div className="text-xs text-red-600 uppercase font-black tracking-widest mt-2">Every month</div>
                  </div>
                  <p className="text-sm text-gray-600 font-bold mb-8 flex-1 leading-relaxed">A small, high-energy group for up to 3 trainees. Get the community vibe without losing the personal touch. Perfect for friends or colleagues who want to get stronger together.</p>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-6">Valid for 12 months</div>
                  <Button variant="destructive" className="w-full">Select Plan</Button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#fdfcf6] rounded-[2rem] overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-300 shadow-xl">
                <div className="h-56 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" alt="Personal Power" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col flex-1 text-center">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Personal Power</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-black italic">$120</span>
                    <div className="text-xs text-red-600 uppercase font-black tracking-widest mt-2">Every month</div>
                  </div>
                  <p className="text-sm text-gray-600 font-bold mb-8 flex-1 leading-relaxed">For trainees who want all eyes on them. A fully personalized program, built around your schedule, goals, and pace. Perfect for those serious about results and accountability.</p>
                  <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-6">Valid for 12 months</div>
                  <Button variant="default" className="w-full">Select Plan</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-24 md:h-40"></div>

        {/* Mobile App Section */}
        <section id="app" className="w-full bg-[#ff4d22] py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Mobile Mockup */}
            <div className="relative flex justify-center md:justify-end">
              <div className="w-[300px] h-[600px] bg-white rounded-[3rem] p-2 shadow-2xl border-[12px] border-black relative z-10 overflow-hidden flex flex-col">
                <div className="w-full h-[45%] bg-black rounded-t-[2rem] overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=400&q=80" alt="App Hero" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute bottom-[-1.5rem] left-6 w-14 h-14 bg-black rounded-xl shadow-lg flex items-center justify-center z-20 border-4 border-white">
                    <Logo size={24} />
                  </div>
                </div>
                <div className="flex-1 bg-white p-6 pt-12 rounded-b-[2rem] relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm text-black">Members</span>
                    <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                      <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <button className="w-full py-2 border-2 border-gray-200 rounded-lg text-sm font-bold mb-6 text-black hover:bg-gray-50 transition-colors">Invite</button>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ccff00]"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ccff00]"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-0 w-full flex justify-around px-6 text-gray-400">
                    <Activity size={24} />
                    <Heart size={24} />
                    <Trophy size={24} />
                    <Flame size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Text and Buttons */}
            <div className="text-black max-w-lg md:ml-12">
              <Headphones size={64} className="mb-8 text-black" />
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">JOIN US ON <br />MOBILE</h2>
              <p className="text-xl mb-10 font-bold leading-tight">Download the app to easily stay updated on the go.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-transform active:scale-95 shadow-xl">
                  <Play size={24} className="fill-white" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">GET IT ON</div>
                    <div className="text-sm font-black tracking-wide">Google Play</div>
                  </div>
                </button>
                <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-transform active:scale-95 shadow-xl">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="Apple" className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Download on the</div>
                    <div className="text-sm font-black tracking-wide">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="h-24 md:h-40"></div>

        <section className="py-40 px-6 text-center bg-cream border-t border-black/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 uppercase leading-none italic">START YOUR <br /><span className="text-red-600">JOURNEY.</span></h2>
            <Button onClick={() => navigate('/signup')} size="lg" variant="default" className="px-16 h-20 text-2xl">SIGN UP NOW</Button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
