
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface InputViewProps {
  day: number;
  existingText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

const InputView: React.FC<InputViewProps> = ({ day, existingText, onSave, onCancel }) => {
  const [text, setText] = useState(existingText);

  return (
    <div className="h-full flex flex-col bg-transparent animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center py-4 px-6">
        <h2 className="text-xl font-display font-black tracking-tighter text-black uppercase">
          Day {day} Journal
        </h2>
        <button onClick={onCancel} className="p-2 text-black/30 hover:text-black">
          <X size={24} />
        </button>
      </div>

      {/* Stretch edge-to-edge on mobile */}
      <div className="flex-1 flex flex-col relative bg-white/90 sm:rounded-[2rem] p-6 sm:p-10 shadow-xl border-y sm:border border-black/5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 150))}
          placeholder="오늘 당신의 100자를 남겨주세요."
          className="flex-1 bg-transparent resize-none text-xl leading-relaxed text-black/80 placeholder:text-black/20 focus:outline-none"
          autoFocus
        />
        <div className="mt-4 flex justify-between items-center pt-6 border-t border-black/5">
          <div className="flex flex-col">
            <span className={`text-[11px] font-black tracking-widest ${text.length >= 150 ? 'text-red-500' : 'text-black/40'}`}>
              {text.length} / 150
            </span>
            <span className="text-[8px] font-bold text-black/20 uppercase mt-0.5">Character count</span>
          </div>
          <button 
            onClick={() => onSave(text)}
            disabled={text.trim().length === 0}
            className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all active:scale-95 disabled:opacity-20 shadow-lg"
          >
            <Check size={20} />
            SAVE JOURNAL
          </button>
        </div>
      </div>

      <p className="py-6 text-center text-[9px] font-black text-black/30 uppercase tracking-[0.2em] px-10">
        Consistency is the key to 100 days of growth
      </p>
    </div>
  );
};

export default InputView;
