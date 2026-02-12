
import React from 'react';
import { X, Bell, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notificationTime: string;
  onUpdateTime: (time: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, notificationTime, onUpdateTime }) => {
  if (!isOpen) return null;

  const handleReset = () => {
    if (confirm("정말로 모든 기록을 삭제하고 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleNotificationRequest = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        alert('알림이 설정되었습니다.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-display font-black tracking-tighter mb-8">설정</h2>

        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-black/40" />
              <h3 className="font-bold text-black/80">푸시 알림</h3>
            </div>
            <div className="flex items-center justify-between bg-black/5 p-4 rounded-2xl">
              <input 
                type="time" 
                value={notificationTime}
                onChange={(e) => onUpdateTime(e.target.value)}
                className="bg-transparent font-display text-2xl font-black tracking-tight focus:outline-none"
              />
              <button 
                onClick={handleNotificationRequest}
                className="text-xs font-black bg-black text-white px-4 py-2 rounded-xl"
              >
                권한 요청
              </button>
            </div>
            <p className="mt-2 text-[10px] text-black/40 font-medium">
              * 매일 지정된 시간에 기록을 잊지 않도록 알려드립니다.
            </p>
          </section>

          <section className="pt-4 border-t border-black/5">
            <button 
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 p-4 rounded-2xl transition-colors font-bold"
            >
              <Trash2 size={20} />
              기록 초기화
            </button>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 bg-black text-white py-4 rounded-2xl font-black tracking-widest text-sm hover:scale-[1.02] transition-transform active:scale-95"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
