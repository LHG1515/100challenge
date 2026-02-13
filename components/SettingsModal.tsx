
import React, { useState } from 'react';
import { X, Bell, Trash2, FileDown, AlertCircle, Github, CloudUpload, CloudDownload, RefreshCw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notificationTime: string;
  onUpdateTime: (time: string) => void;
  entries: Record<number, string>;
  currentDay: number;
  githubConfig?: {
    token?: string;
    gistId?: string;
    lastSyncedAt?: string;
  };
  onSyncPush: (token: string) => Promise<{ success: boolean; error?: string }>;
  onSyncPull: (token: string, gistId: string) => Promise<{ success: boolean; error?: string }>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  notificationTime, 
  onUpdateTime,
  entries,
  currentDay,
  githubConfig,
  onSyncPush,
  onSyncPull
}) => {
  const [showExportConfirm, setShowExportConfirm] = useState(false);
  const [showGithubMenu, setShowGithubMenu] = useState(false);
  const [token, setToken] = useState(githubConfig?.token || '');
  const [gistId, setGistId] = useState(githubConfig?.gistId || '');
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; error?: string; success?: boolean }>({ loading: false });

  if (!isOpen) return null;

  const handleReset = () => {
    if (confirm("정말로 모든 기록을 삭제하고 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handlePush = async () => {
    if (!token) return alert('GitHub 토큰이 필요합니다.');
    setSyncStatus({ loading: true });
    const res = await onSyncPush(token);
    if (res.success) {
      setSyncStatus({ loading: false, success: true });
      setTimeout(() => setSyncStatus({ loading: false }), 2000);
    } else {
      setSyncStatus({ loading: false, error: res.error });
    }
  };

  const handlePull = async () => {
    if (!token || !gistId) return alert('토큰과 Gist ID가 필요합니다.');
    if (!confirm('원격 데이터를 불러오면 현재 기기의 기록이 덮어씌워집니다. 계속하시겠습니까?')) return;
    setSyncStatus({ loading: true });
    const res = await onSyncPull(token, gistId);
    if (res.success) {
      setSyncStatus({ loading: false, success: true });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } else {
      setSyncStatus({ loading: false, error: res.error });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 no-print">
      
      {!showExportConfirm && !showGithubMenu ? (
        <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
          <button onClick={onClose} className="absolute top-6 right-6 text-black/20 hover:text-black"><X size={24} /></button>
          <h2 className="text-2xl font-display font-black tracking-tighter mb-8">설정</h2>

          <div className="space-y-6">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Bell size={18} className="text-black/40" />
                <h3 className="font-bold text-black/80 text-sm">푸시 알림</h3>
              </div>
              <div className="flex items-center justify-between bg-black/5 p-4 rounded-2xl border border-black/5">
                <input type="time" value={notificationTime} onChange={(e) => onUpdateTime(e.target.value)}
                  className="bg-transparent font-display text-2xl font-black tracking-tight focus:outline-none" />
              </div>
            </section>

            <section className="pt-4 space-y-3">
              <button onClick={() => setShowGithubMenu(true)} 
                className="w-full flex items-center justify-between bg-gray-50 p-5 rounded-2xl hover:bg-gray-100 transition-all group">
                <div className="flex items-center gap-3">
                  <Github size={20} className="text-black" />
                  <span className="font-black text-sm uppercase">GitHub 클라우드 동기화</span>
                </div>
                {githubConfig?.lastSyncedAt && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
              </button>

              <button onClick={() => setShowExportConfirm(true)}
                className="w-full flex items-center justify-between gap-2 bg-black text-white p-5 rounded-2xl transition-all hover:scale-[1.02] shadow-lg">
                <div className="flex items-center gap-3">
                  <FileDown size={20} />
                  <span className="font-black text-sm uppercase">PDF 파일로 내보내기</span>
                </div>
              </button>

              <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 text-red-500 p-4 font-bold text-xs">
                <Trash2 size={16} /> 모든 기록 삭제 및 초기화
              </button>
            </section>
          </div>
        </div>
      ) : showGithubMenu ? (
        /* GitHub Sync Menu */
        <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl relative animate-in slide-in-from-right duration-300">
          <button onClick={() => setShowGithubMenu(false)} className="absolute top-6 right-6 text-black/20"><X size={24} /></button>
          <div className="flex items-center gap-2 mb-6">
            <Github size={24} />
            <h2 className="text-xl font-display font-black tracking-tighter">GitHub Sync</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-black/40 uppercase ml-1">Personal Access Token</label>
              <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="ghp_..."
                className="w-full bg-black/5 p-4 rounded-xl font-mono text-xs focus:outline-none border border-black/5" />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-black/40 uppercase ml-1">Gist ID (for Pulling)</label>
              <input type="text" value={gistId} onChange={(e) => setGistId(e.target.value)} placeholder="Gist ID"
                className="w-full bg-black/5 p-4 rounded-xl font-mono text-xs focus:outline-none border border-black/5" />
            </div>

            {githubConfig?.lastSyncedAt && (
              <p className="text-[9px] text-center text-black/30 font-bold uppercase">
                Last Synced: {new Date(githubConfig.lastSyncedAt).toLocaleString()}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button onClick={handlePush} disabled={syncStatus.loading}
                className="flex flex-col items-center justify-center gap-2 bg-black text-white p-6 rounded-2xl transition-all active:scale-95 disabled:opacity-50">
                {syncStatus.loading ? <RefreshCw size={24} className="animate-spin" /> : <CloudUpload size={24} />}
                <span className="text-[10px] font-black">BACKUP (PUSH)</span>
              </button>
              <button onClick={handlePull} disabled={syncStatus.loading}
                className="flex flex-col items-center justify-center gap-2 border-2 border-black p-6 rounded-2xl transition-all active:scale-95 disabled:opacity-50">
                {syncStatus.loading ? <RefreshCw size={24} className="animate-spin" /> : <CloudDownload size={24} />}
                <span className="text-[10px] font-black">RESTORE (PULL)</span>
              </button>
            </div>

            {syncStatus.error && <p className="text-red-500 text-[10px] text-center font-bold">{syncStatus.error}</p>}
            {syncStatus.success && <p className="text-green-500 text-[10px] text-center font-bold">SUCCESSFULLY SYNCED!</p>}
          </div>

          <p className="mt-6 text-[9px] text-black/40 leading-relaxed text-center">
            GitHub Settings > Developer settings > <br/>Personal access tokens에서 'gist' 권한 토큰을 생성하세요.
          </p>
        </div>
      ) : (
        /* Export Confirmation */
        <div className="w-full max-w-xs bg-white rounded-[3rem] p-10 shadow-2xl text-center">
          <div className="inline-flex p-4 bg-[#C1D8C3] rounded-full mb-6"><AlertCircle size={32} className="text-black" /></div>
          <h3 className="text-2xl font-display font-black mb-3">전체 일력 내보내기</h3>
          <p className="text-sm font-medium text-black/50 mb-8">지금까지 작성한 모든 기록을 PDF 파일로 저장하시겠습니까?</p>
          <div className="space-y-3">
            <button onClick={() => { setShowExportConfirm(false); onClose(); setTimeout(() => window.print(), 500); }}
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm">내보내기 시작</button>
            <button onClick={() => setShowExportConfirm(false)} className="w-full py-4 text-black/30 font-black text-xs">취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsModal;
