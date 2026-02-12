
import React, { useState, useMemo } from 'react';
import { Settings, Calendar, PenLine, Grid, ChevronLeft } from 'lucide-react';
import { useChallenge } from './hooks/useChallenge';
import { AppMode } from './types';
import DailyView from './components/DailyView';
import InputView from './components/InputView';
import GridView from './components/GridView';
import SettingsModal from './components/SettingsModal';
import SetupScreen from './components/SetupScreen';

const App: React.FC = () => {
  const { data, initializeChallenge, saveEntry, updateNotificationTime, getCurrentDayNumber } = useChallenge();
  const [mode, setMode] = useState<AppMode>('calendar');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedViewerDay, setSelectedViewerDay] = useState<number | null>(null);

  const currentDay = useMemo(() => getCurrentDayNumber(), [getCurrentDayNumber]);
  const activeDay = selectedViewerDay || currentDay;

  if (!data.isInitialized) {
    return <SetupScreen onComplete={initializeChallenge} />;
  }

  return (
    <div className="min-h-screen bg-[#C1D8C3] flex flex-col items-center justify-center p-4">
      {/* Container simulating a mobile device or a clean card */}
      <div className="w-full max-w-md h-[90vh] bg-[#C1D8C3] shadow-2xl rounded-3xl relative overflow-hidden flex flex-col border-4 border-white/20">
        
        {/* Header */}
        <header className="p-6 flex justify-between items-center z-10">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <Settings size={24} className="text-black/70" />
          </button>
          
          <h1 className="text-sm font-bold tracking-widest text-black/60 uppercase">
            {activeDay === currentDay ? 'Today' : `Day ${activeDay}`}
          </h1>

          <div className="flex gap-2">
            <button 
              onClick={() => setMode(mode === 'grid' ? 'calendar' : 'grid')}
              className={`p-2 rounded-full transition-all ${mode === 'grid' ? 'bg-black text-white' : 'hover:bg-black/5 text-black/70'}`}
            >
              <Grid size={24} />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          {mode === 'calendar' && (
            <DailyView 
              day={activeDay} 
              text={data.entries[activeDay] || ''} 
              onBack={() => setSelectedViewerDay(null)}
              showBackButton={selectedViewerDay !== null}
            />
          )}
          
          {mode === 'input' && (
            <InputView 
              day={currentDay} 
              existingText={data.entries[currentDay] || ''} 
              onSave={(text) => {
                saveEntry(currentDay, text);
                setMode('calendar');
              }}
              onCancel={() => setMode('calendar')}
            />
          )}

          {mode === 'grid' && (
            <GridView 
              entries={data.entries}
              currentDay={currentDay}
              onSelectDay={(day) => {
                setSelectedViewerDay(day);
                setMode('calendar');
              }}
            />
          )}
        </main>

        {/* Footer Navigation */}
        <footer className="p-6 flex justify-around items-center border-t border-black/5 bg-white/10 backdrop-blur-sm">
          <button 
            onClick={() => { setMode('calendar'); setSelectedViewerDay(null); }}
            className={`p-4 rounded-2xl transition-all ${mode === 'calendar' ? 'bg-black text-white' : 'text-black/60 hover:bg-black/5'}`}
          >
            <Calendar size={28} />
          </button>
          
          <button 
            onClick={() => setMode('input')}
            disabled={currentDay > 100}
            className={`p-4 rounded-2xl transition-all ${mode === 'input' ? 'bg-black text-white' : 'text-black/60 hover:bg-black/5'} ${currentDay > 100 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <PenLine size={28} />
          </button>
        </footer>

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          notificationTime={data.notificationTime}
          onUpdateTime={updateNotificationTime}
        />
      </div>
    </div>
  );
};

export default App;
