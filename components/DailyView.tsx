
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
    <div className="h-full flex flex-col animate-in fade-in duration-500 overflow-hidden bg-transparent">
      {showBackButton && (
        <button 
          onClick={onBack}
          className="absolute top-2 left-2 z-20 flex items-center gap-1 text-black bg-white/80 px-4 py-2 rounded-full shadow-lg border border-black/10 transition-transform active:scale-95"
        >
          <ChevronLeft size={16} />
          <span className="text-[11px] font-black uppercase">Close</span>
        </button>
      )}

      {/* Main Border Container: Edge-to-Edge with w-full */}
      <div className="flex-1 border-y-[3px] border-black flex flex-col relative py-6 bg-[#C1D8C3]">
        
        {/* Date Headers */}
        <div className="flex justify-between items-center mb-2 px-6">
          <span className="text-[10px] font-black text-black/40 tracking-widest">{monthNames[date.getMonth()]}</span>
          <div className="h-[1px] flex-1 bg-black/10 mx-6"></div>
          <span className="text-[10px] font-black text-black/40 tracking-widest">{dayNames[date.getDay()]}</span>
        </div>

        {/* Big Number */}
        <div className="flex flex-col items-center">
          <h2 className="text-[12rem] sm:text-[14rem] leading-[0.75] font-display font-black tracking-tighter text-black select-none pointer-events-none">
            {day}
          </h2>
        </div>

        {/* Content Area with Ruled Lines touching the edges */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar mt-4">
          <div className="w-full relative min-h-full">
             <div className="relative z-10 text-center text-[1.2rem] font-medium leading-[2.5rem] tracking-tight text-black/90 break-keep whitespace-pre-wrap py-2 px-8">
                {text || <span className="text-black/10 italic font-light">The page is waiting for your story.</span>}
             </div>
             
             {/* Lines are absolute and fill w-full */}
             <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                    <div key={i} className="h-[2.5rem] border-b border-black/10 w-full" />
                ))}
             </div>
          </div>
        </div>

        {/* Footer info area */}
        <div className="mt-4 flex justify-between items-end pt-4 border-t border-black/10 px-6">
          <div className="text-[10px] font-black tracking-tighter text-black/40 uppercase leading-none">
            100 Days<br />Challenge
          </div>
          <div className="text-[10px] font-black tracking-widest text-black/80">
            {day.toString().padStart(3, '0')}
          </div>
          <div className="text-[10px] font-black tracking-tighter text-black/40 uppercase text-right leading-none">
            Progress<br />{day}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyView;
