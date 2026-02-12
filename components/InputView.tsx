
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
    <div className="h-full flex flex-col p-8 bg-white/40 animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-display font-black tracking-tighter text-black">
          DAY {day} 기록하기
        </h2>
        <button onClick={onCancel} className="text-black/40 hover:text-black">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col relative bg-white/60 rounded-3xl p-6 shadow-inner border border-white/40">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 150))}
          placeholder="오늘의 생각을 남겨주세요 (최대 150자)"
          className="flex-1 bg-transparent resize-none text-xl leading-relaxed text-black/80 placeholder:text-black/20 focus:outline-none"
          autoFocus
        />
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-sm font-bold ${text.length >= 150 ? 'text-red-500' : 'text-black/40'}`}>
            {text.length} / 150
          </span>
          <button 
            onClick={() => onSave(text)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform active:scale-95"
          >
            <Check size={20} />
            기록 완료
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs font-bold text-black/40 uppercase tracking-widest">
          기록은 오늘이 지나면 수정할 수 없습니다
        </p>
      </div>
    </div>
  );
};

export default InputView;
