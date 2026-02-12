
import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SetupScreenProps {
  onComplete: (notificationTime: string) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const [time, setTime] = useState('21:00');
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#C1D8C3] flex items-center justify-center p-6 text-black">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-500">
        {step === 1 ? (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <div className="w-20 h-20 bg-[#C1D8C3] rounded-3xl flex items-center justify-center mb-10">
              <Sparkles size={40} />
            </div>
            <h1 className="text-4xl font-display font-black tracking-tighter leading-none">
              100일<br />글쓰기 챌린지
            </h1>
            <p className="text-lg font-medium text-black/60 leading-relaxed">
              매일 150자씩,<br />
              당신의 이야기를 100일 동안<br />
              기록하는 여정을 시작합니다.
            </p>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-2 hover:translate-x-1 transition-transform"
            >
              시작하기 <ArrowRight />
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <h2 className="text-3xl font-display font-black tracking-tighter">
              언제 기록할까요?
            </h2>
            <p className="text-black/60 font-medium">
              매일 정해진 시간에 알림을 보내드릴게요.
            </p>
            <div className="bg-black/5 p-8 rounded-3xl flex justify-center">
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-transparent font-display text-6xl font-black tracking-tight focus:outline-none"
              />
            </div>
            <button 
              onClick={() => onComplete(time)}
              className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg hover:scale-[1.02] transition-transform"
            >
              여정 시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupScreen;
