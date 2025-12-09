import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ScriptGenerator } from './components/ScriptGenerator';
import { HistoryFolder } from './components/HistoryFolder';
import { Toast } from './components/Toast';
import { Platform, PLATFORM_LABELS, ScriptDuration, GeneratedScript, SavedScript, ScriptOptions } from './types';
import { generateScript } from './services/gemini';
import { saveScriptToStorage, saveSession, getSession } from './services/storage';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // App State
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('general');
  const [viewMode, setViewMode] = useState<'generator' | 'history'>('generator');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Script Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptVersions, setScriptVersions] = useState<GeneratedScript[]>([]);
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  
  // Persistence Params for Inputs
  const [currentParams, setCurrentParams] = useState<{
    topic: string;
    duration: ScriptDuration;
    options: ScriptOptions;
    image?: string;
  } | null>(null);

  // 1. Initial Load: Check Session
  useEffect(() => {
    // Check Storage for Previous Session
    const savedSession = getSession();
    if (savedSession) {
      setCurrentParams({
        topic: savedSession.topic,
        duration: savedSession.duration,
        options: savedSession.options,
        image: undefined 
      });
      setSelectedPlatform(savedSession.platform);
      setScriptVersions(savedSession.results);
      setActiveVersionIndex(savedSession.activeVersionIndex);
    }
  }, []);

  // 2. Save Session on Changes
  useEffect(() => {
    if (currentParams) {
      saveSession({
        topic: currentParams.topic,
        duration: currentParams.duration,
        platform: selectedPlatform,
        options: currentParams.options,
        results: scriptVersions,
        activeVersionIndex
      });
    }
  }, [currentParams, selectedPlatform, scriptVersions, activeVersionIndex]);


  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleGenerate = async (topic: string, duration: ScriptDuration, options: ScriptOptions, image?: string) => {
    setIsGenerating(true);
    // New generation = reset versions
    setScriptVersions([]); 
    setActiveVersionIndex(0);
    setCurrentParams({ topic, duration, options, image });

    try {
      const generatedData = await generateScript(topic, duration, selectedPlatform, options, image);
      setScriptVersions([generatedData]);
      
      saveScriptToStorage(topic, selectedPlatform, generatedData);
      showToast("Skrip berhasil dibuat!", "success");

    } catch (err: any) {
      console.error(err);
      if (err.message.includes('API Key')) {
        showToast("API Key salah atau kadaluarsa. Cek environment variables.", "error");
      } else {
        showToast(`Gagal: ${err.message}`, "error");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateWithHook = async (specificHook: string) => {
    if (!currentParams) return;

    setIsGenerating(true);

    try {
      const regOptions = { ...currentParams.options, useMagicHook: false };

      const generatedData = await generateScript(
        currentParams.topic, 
        currentParams.duration, 
        selectedPlatform, 
        regOptions,
        currentParams.image,
        specificHook 
      );

      const newVersions = [...scriptVersions, generatedData];
      setScriptVersions(newVersions);
      setActiveVersionIndex(newVersions.length - 1); 

      saveScriptToStorage(currentParams.topic + " (Varian Hook)", selectedPlatform, generatedData);
      showToast("Variasi skrip berhasil dibuat!", "success");

    } catch (err: any) {
      showToast(`Gagal variasi: ${err.message}`, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSidebarSelect = (selection: Platform | 'history') => {
    if (selection === 'history') {
      setViewMode('history');
    } else {
      setSelectedPlatform(selection);
      setViewMode('generator');
    }
    setIsSidebarOpen(false);
  };

  const handleLoadFromHistory = (script: SavedScript) => {
    setScriptVersions([script]);
    setActiveVersionIndex(0);
    setSelectedPlatform(script.platform);
    
    setCurrentParams({
        topic: script.topic,
        duration: '25s', 
        options: {
            useCustomAudience: false,
            audience: 'Umum / Semua Kalangan',
            tone: 'Santai & Lucu',
            useCustomGoal: false,
            goal: 'Viral / Views (Broad)',
            useMagicHook: true,
            strategy: 'faster_api'
        }
    });

    setViewMode('generator');
    showToast("Skrip dimuat dari history", "success");
  };

  const handleNewScript = () => {
    setScriptVersions([]);
    setActiveVersionIndex(0);
    setCurrentParams(null);
    setViewMode('generator');
    showToast("Siap membuat skrip baru", "success");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full bg-gray-950 text-gray-100 overflow-hidden font-sans relative">
      
      <div className="flex-1 flex flex-row h-full w-full">
        
        {/* Toast Notification */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar 
            selectedPlatform={viewMode === 'history' ? 'history' : selectedPlatform} 
            onSelectPlatform={handleSidebarSelect}
            onNewChat={handleNewScript}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full relative w-full">
          {/* Mobile Header */}
          <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm lg:hidden z-10">
            <button 
              onClick={toggleSidebar}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <span className="font-bold text-sm truncate text-white">
              {viewMode === 'history' ? 'Folder Data' : PLATFORM_LABELS[selectedPlatform]}
            </span>
            <div className="w-8" />
          </header>

          <main className="flex-1 overflow-hidden relative">
            {viewMode === 'history' ? (
              <HistoryFolder onLoadScript={handleLoadFromHistory} />
            ) : (
              <ScriptGenerator 
                selectedPlatform={selectedPlatform}
                onGenerate={handleGenerate}
                onRegenerateWithHook={handleRegenerateWithHook}
                onVersionChange={setActiveVersionIndex}
                isGenerating={isGenerating}
                results={scriptVersions}
                activeVersionIndex={activeVersionIndex}
                error={null} 
                initialTopic={currentParams?.topic || ''}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}