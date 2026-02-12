
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

interface SetupScreenProps {
  onComplete: (notificationTime: string) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const [time, setTime] = useState('21:00');
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 bg-[#C1D8C3] flex items-center justify-center text-black z-[100]">
      <div className="w-full h-full sm:max-w-md sm:h-[80vh] bg-white sm:rounded-[3rem] p-6 sm:p-12 flex flex-col justify-center shadow-2xl relative overflow-hidden">
        
        {/* Background Decorative Element */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#C1D8C3]/20 rounded-full blur-3xl"></div>

        {step === 1 ? (
          <div className="space-y-10 animate-in slide-in-from-right duration-500 relative z-10">
            <div className="inline-flex p-5 bg-[#C1D8C3] rounded-[2rem] shadow-inner">
              <Sparkles size={48} className="text-black" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-display font-black tracking-tighter leading-[0.9]">
                The<br />100 Days<br />Journey.
              </h1>
              <p className="text-lg font-medium text-black/50 leading-relaxed max-w-[240px]">
                150 letters every day.<br />
                A hundred days of your own stories.
              </p>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:gap-5 transition-all shadow-xl active:scale-95"
            >
              START JOURNEY <ArrowRight size={24} />
            </button>
          </div>
        ) : (
          <div className="space-y-10 animate-in slide-in-from-right duration-500 relative z-10">
             <div className="inline-flex p-5 bg-black rounded-[2rem] shadow-lg">
              <Clock size={48} className="text-white" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-display font-black tracking-tighter">
                When to write?
              </h2>
              <p className="text-black/50 font-medium">
                We'll send you a gentle reminder<br />at your preferred time.
              </p>
            </div>
            <div className="bg-black/5 p-10 rounded-[2.5rem] flex justify-center border border-black/5">
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-transparent font-display text-7xl font-black tracking-tight focus:outline-none cursor-pointer"
              />
            </div>
            <button 
              onClick={() => onComplete(time)}
              className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-xl hover:scale-[1.02] transition-all shadow-xl active:scale-95"
            >
              LET'S BEGIN
            </button>
            <button 
              onClick={() => setStep(1)}
              className="w-full text-black/30 font-black text-sm tracking-widest uppercase py-2"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupScreen;
