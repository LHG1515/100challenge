
import React, { useState, useMemo, useEffect } from 'react';
import { Settings, Calendar, PenLine, Grid, Download } from 'lucide-react';
import { useChallenge } from './hooks/useChallenge.ts';
import { AppMode } from './types.ts';
import DailyView from './components/DailyView.tsx';
import InputView from './components/InputView.tsx';
import GridView from './components/GridView.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import SetupScreen from './components/SetupScreen.tsx';

const App: React.FC = () => {
  const { 
    data, initializeChallenge, saveEntry, updateNotificationTime, 
    getCurrentDayNumber, syncToGithub, syncFromGithub 
  } = useChallenge();
  const [mode, setMode] = useState<AppMode>('calendar');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedViewerDay, setSelectedViewerDay] = useState<number | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const currentDay = useMemo(() => getCurrentDayNumber(), [getCurrentDayNumber]);
  const activeDay = selectedViewerDay || currentDay;

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  if (!data.isInitialized) {
    return <SetupScreen onComplete={initializeChallenge} />;
  }

  return (
    <div className="w-full h-full flex flex-col sm:items-center sm:justify-center overflow-hidden bg-[#C1D8C3]">
      <div className="w-full h-full sm:max-w-md sm:h-[90vh] bg-[#C1D8C3] sm:shadow-2xl sm:rounded-[3rem] relative overflow-hidden flex flex-col sm:border-8 border-white/20 no-print">
        
        <header className="px-5 py-5 flex justify-between items-center z-10 pt-12 sm:pt-8 bg-transparent">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <Settings size={22} className="text-black/70" />
          </button>
          
          <h1 className="text-[10px] font-black tracking-[0.3em] text-black/40 uppercase">
            {activeDay === currentDay ? 'Today' : `Day ${activeDay}`}
          </h1>

          <div className="flex gap-1">
            {deferredPrompt && (
               <button onClick={handleInstall} className="p-2 bg-black text-white rounded-full">
                <Download size={18} />
              </button>
            )}
            <button 
              onClick={() => { setMode(mode === 'grid' ? 'calendar' : 'grid'); setSelectedViewerDay(null); }}
              className={`p-2 rounded-full transition-all ${mode === 'grid' ? 'bg-black text-white' : 'hover:bg-black/5 text-black/70'}`}
            >
              <Grid size={22} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden relative">
          {mode === 'calendar' && (
            <DailyView 
              day={activeDay} 
              text={data.entries[activeDay] || ''} 
              onBack={() => { setSelectedViewerDay(null); setMode('calendar'); }}
              showBackButton={selectedViewerDay !== null}
            />
          )}
          
          {mode === 'input' && (
            <InputView 
              day={currentDay} 
              existingText={data.entries[currentDay] || ''} 
              onSave={(text) => { saveEntry(currentDay, text); setMode('calendar'); }}
              onCancel={() => setMode('calendar')}
            />
          )}

          {mode === 'grid' && (
            <GridView 
              entries={data.entries}
              currentDay={currentDay}
              onSelectDay={(day) => { setSelectedViewerDay(day); setMode('calendar'); }}
            />
          )}
        </main>

        <footer className="px-5 py-6 pb-10 sm:pb-8 flex justify-around items-center border-t border-black/5 bg-white/10 backdrop-blur-md">
          <button 
            onClick={() => { setMode('calendar'); setSelectedViewerDay(null); }}
            className={`p-4 rounded-2xl transition-all ${mode === 'calendar' && !selectedViewerDay ? 'bg-black text-white shadow-lg' : 'text-black/50 hover:bg-black/5'}`}
          >
            <Calendar size={26} />
          </button>
          
          <button 
            onClick={() => setMode('input')}
            disabled={currentDay > 100}
            className={`p-4 rounded-2xl transition-all ${mode === 'input' ? 'bg-black text-white shadow-lg' : 'text-black/50 hover:bg-black/5'} ${currentDay > 100 ? 'opacity-20 cursor-not-allowed' : ''}`}
          >
            <PenLine size={26} />
          </button>
        </footer>

        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          notificationTime={data.notificationTime}
          onUpdateTime={updateNotificationTime}
          entries={data.entries}
          currentDay={currentDay}
          githubConfig={{
            token: data.githubToken,
            gistId: data.gistId,
            lastSyncedAt: data.lastSyncedAt
          }}
          onSyncPush={syncToGithub}
          onSyncPull={syncFromGithub}
        />
      </div>

      <div id="print-area">
        {Array.from({ length: 100 }, (_, i) => i + 1).filter(d => data.entries[d]).map(day => (
          <div key={day} className="print-page bg-white">
            <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-8">
               <span className="text-xl font-black tracking-widest uppercase">100 Days Challenge</span>
               <span className="text-xl font-black tracking-tighter">Day {day.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
               <h1 className="text-[12rem] font-display font-black leading-none mb-10">{day}</h1>
               <div className="w-full text-center text-2xl leading-[3.5rem] font-medium break-keep whitespace-pre-wrap px-12 border-y border-black/10 py-10">
                  {data.entries[day]}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
