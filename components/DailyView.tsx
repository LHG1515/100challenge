
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
    <div className="h-full flex flex-col p-8 animate-in fade-in duration-500 overflow-hidden">
      {showBackButton && (
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-20 flex items-center gap-1 text-black/50 hover:text-black transition-colors bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm"
        >
          <ChevronLeft size={16} />
          <span className="text-[10px] font-bold">Today</span>
        </button>
      )}

      <div className="flex-1 border-y-2 border-black/40 flex flex-col relative py-4">
        {/* Vertical Labels */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 hidden sm:block">
          <span className="vertical-text text-[10px] font-black tracking-widest text-black/80">{monthNames[date.getMonth()]}</span>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 hidden sm:block">
          <span className="vertical-text text-[10px] font-black tracking-widest text-black/80">{dayNames[date.getDay()]}</span>
        </div>

        {/* Dynamic Day Number Indicator */}
        <div className="flex justify-center items-center mb-4">
          <div className="h-[1px] w-8 bg-black/20 mr-4"></div>
          <span className="text-xl font-display font-black tracking-tighter text-black/40">
            {day.toString().padStart(2, '0')}
          </span>
          <div className="h-[1px] w-8 bg-black/20 ml-4"></div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <h2 className="text-[10rem] sm:text-[12rem] leading-none font-display font-black tracking-tighter text-black select-none drop-shadow-sm">
            {day}
          </h2>
        </div>

        {/* Ruled lines for content */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="w-full relative min-h-[120px]">
             <div className="relative z-10 px-2 text-center text-lg font-medium leading-[2.5rem] tracking-tight text-black/90 break-keep">
                {text || <span className="text-black/20 italic font-light">비어있는 하루입니다.</span>}
             </div>
             
             <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[2.5rem] border-b border-black/10 w-full" />
                ))}
             </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-end border-t border-black/20 pt-4">
          <div className="text-[9px] font-black tracking-tighter text-black/60 uppercase leading-tight">
            100 Days Challenge<br />
            Writing Journal
          </div>
          <div className="text-[9px] font-black tracking-tighter text-black/60 uppercase text-right leading-tight">
            Progress<br />
            {day} / 100
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyView;
