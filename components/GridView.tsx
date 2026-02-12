
import React from 'react';

interface GridViewProps {
  entries: Record<number, string>;
  currentDay: number;
  onSelectDay: (day: number) => void;
}

const GridView: React.FC<GridViewProps> = ({ entries, currentDay, onSelectDay }) => {
  return (
    <div className="h-full flex flex-col p-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-5 gap-3 overflow-y-auto pb-8 pr-2">
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
                aspect-square rounded-xl flex flex-col items-center justify-center transition-all border
                ${isLocked ? 'opacity-20 bg-black/5 cursor-not-allowed border-transparent' : 
                  isToday ? 'bg-black text-white border-black scale-105 z-10 shadow-lg' : 
                  hasContent ? 'bg-white text-black border-black/10' : 
                  'bg-white/30 text-black/40 border-black/5'}
                hover:scale-105 active:scale-95
              `}
            >
              <span className="text-[10px] font-black opacity-60 mb-1">D-{day}</span>
              {hasContent && !isLocked && (
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
