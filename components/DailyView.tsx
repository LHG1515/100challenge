
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface DailyViewProps {
  day: number;
  text: string;
  onBack: () => void;
  showBackButton: boolean;
}

const DailyView: React.FC<DailyViewProps> = ({ day, text, onBack, showBackButton }) => {
  const date = new Date();
  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="h-full flex flex-col px-2 sm:px-8 py-2 animate-in fade-in duration-500 overflow-hidden">
      {showBackButton && (
        <button 
          onClick={onBack}
          className="absolute top-2 left-2 z-20 flex items-center gap-1 text-black/50 hover:text-black transition-colors bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-black/5"
        >
          <ChevronLeft size={14} />
          <span className="text-[10px] font-black uppercase tracking-tighter">Back</span>
        </button>
      )}

      <div className="flex-1 border-y-[3px] border-black flex flex-col relative py-4 sm:py-6">
        {/* Top bar with tiny date info */}
        <div className="flex justify-between items-center mb-1 px-2">
          <span className="text-[10px] font-black text-black/30 tracking-widest">{monthNames[date.getMonth()]}</span>
          <div className="h-[1px] flex-1 bg-black/10 mx-4"></div>
          <span className="text-[10px] font-black text-black/30 tracking-widest">{dayNames[date.getDay()]}</span>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-[11rem] sm:text-[13rem] leading-[0.8] font-display font-black tracking-tighter text-black select-none">
            {day}
          </h2>
        </div>

        {/* Ruled lines for content */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar mt-2 px-2">
          <div className="w-full relative min-h-[160px]">
             <div className="relative z-10 text-center text-[1.1rem] sm:text-[1.15rem] font-medium leading-[2.5rem] tracking-tight text-black/90 break-keep whitespace-pre-wrap py-2">
                {text || <span className="text-black/10 italic font-light">The page is waiting for your story.</span>}
             </div>
             
             <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="h-[2.5rem] border-b border-black/5 w-full" />
                ))}
             </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-end pt-4 border-t border-black/5">
          <div className="text-[10px] font-black tracking-tighter text-black/40 uppercase leading-none">
            100 Days<br />
            Challenge
          </div>
          <div className="text-[10px] font-black tracking-widest text-black/80">
            {day.toString().padStart(3, '0')}
          </div>
          <div className="text-[10px] font-black tracking-tighter text-black/40 uppercase text-right leading-none">
            Progress<br />
            {day}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyView;
