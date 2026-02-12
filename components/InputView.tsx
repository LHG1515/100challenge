
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
    <div className="h-full flex flex-col px-2 sm:px-4 py-4 bg-white/20 animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-display font-black tracking-tighter text-black uppercase">
          Day {day} Journal
        </h2>
        <button onClick={onCancel} className="p-2 text-black/30 hover:text-black">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col relative bg-white/80 rounded-[2rem] p-5 sm:p-6 shadow-xl border border-white/50">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 150))}
          placeholder="What's on your mind today?"
          className="flex-1 bg-transparent resize-none text-lg leading-relaxed text-black/80 placeholder:text-black/10 focus:outline-none"
          autoFocus
        />
        <div className="mt-4 flex justify-between items-center pt-4 border-t border-black/5">
          <span className={`text-[10px] font-black tracking-widest ${text.length >= 150 ? 'text-red-500' : 'text-black/20'}`}>
            {text.length} / 150
          </span>
          <button 
            onClick={() => onSave(text)}
            disabled={text.trim().length === 0}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-all active:scale-95 disabled:opacity-20"
          >
            <Check size={18} />
            SAVE
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">
        Every word counts toward your 100 days
      </p>
    </div>
  );
};

export default InputView;
