
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
    <div className="h-full flex flex-col p-8 animate-in fade-in duration-500">
      {showBackButton && (
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-20 flex items-center gap-1 text-black/50 hover:text-black transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-medium">Back to Today</span>
        </button>
      )}

      <div className="flex-1 border-y-2 border-black/40 flex flex-col relative py-4">
        {/* Vertical Labels */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4">
          <span className="vertical-text text-xs font-black tracking-widest text-black/80">{monthNames[date.getMonth()]}</span>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4">
          <span className="vertical-text text-xs font-black tracking-widest text-black/80">{dayNames[date.getDay()]}</span>
        </div>

        {/* Day Number */}
        <div className="flex justify-center items-center mb-4">
          <div className="h-[2px] w-12 bg-black/30 mr-4"></div>
          <span className="text-3xl font-display font-black tracking-tighter">01</span>
          <div className="h-[2px] w-12 bg-black/30 ml-4"></div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <h2 className="text-[12rem] leading-none font-display font-black tracking-tighter text-black select-none">
            {day}
          </h2>
        </div>

        {/* Ruled lines for content */}
        <div className="flex-1 flex flex-col">
          <div className="w-full relative min-h-[120px]">
             {/* Text Content */}
             <div className="relative z-10 px-2 text-center text-lg font-medium leading-[2.5rem] tracking-tight text-black/90 h-full">
                {text || <span className="text-black/20 italic">비어있는 하루입니다.</span>}
             </div>
             
             {/* Lines */}
             <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[2.5rem] border-b border-black/20 w-full" />
                ))}
             </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-end border-t border-black/20 pt-4">
          <div className="text-[10px] font-black tracking-tighter text-black/60 uppercase">
            100 Days Challenge<br />
            Writing Journal
          </div>
          <div className="text-[10px] font-black tracking-tighter text-black/60 uppercase text-right">
            Progress<br />
            {day} / 100
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyView;
