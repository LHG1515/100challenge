
import React from 'react';

interface GridViewProps {
  entries: Record<number, string>;
  currentDay: number;
  onSelectDay: (day: number) => void;
}

const GridView: React.FC<GridViewProps> = ({ entries, currentDay, onSelectDay }) => {
  return (
    <div className="h-full flex flex-col animate-in fade-in duration-300">
      {/* 
          Grid layout touches the screen edges for a minimalist "calendar wall" look.
      */}
      <div className="grid grid-cols-5 gap-[1px] overflow-y-auto pb-20 custom-scrollbar bg-black/5">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((day) => {
          const hasContent = !!entries[day];
          const isLocked = day > currentDay;
          const isToday = day === currentDay;

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => onSelectDay(day)}
              className={`
                aspect-square flex flex-col items-center justify-center transition-all relative
                ${isLocked ? 'bg-black/[0.02] text-black/10 cursor-not-allowed' : 
                  isToday ? 'bg-black text-white z-10' : 
                  hasContent ? 'bg-white text-black' : 
                  'bg-white/40 text-black/20'}
                hover:opacity-80 active:scale-95
              `}
            >
              <span className="text-[11px] font-black">{day}</span>
              {hasContent && !isLocked && !isToday && (
                <div className="w-1.5 h-1.5 rounded-full bg-black/30 mt-1" />
              )}
              {isToday && (
                 <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 animate-pulse" />
              )}
              
              {/* Day indicator for mobile context */}
              {isToday && (
                <span className="absolute top-1 right-1 text-[6px] font-black opacity-40">TODAY</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
