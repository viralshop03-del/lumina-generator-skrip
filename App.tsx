import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ScriptGenerator } from './components/ScriptGenerator';
import { HistoryFolder } from './components/HistoryFolder';
import { Platform, PLATFORM_LABELS, ScriptDuration, GeneratedScript, SavedScript, ScriptOptions } from './types';
import { generateScript } from './services/gemini';
import { saveScriptToStorage } from './services/storage';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('general');
  const [viewMode, setViewMode] = useState<'generator' | 'history'>('generator');
  
  // Script Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Versioning State (Multiverse)
  const [scriptVersions, setScriptVersions] = useState<GeneratedScript[]>([]);
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  
  const [error, setError] = useState<string | null>(null);

  // Store current generation params to allow regeneration
  const [currentParams, setCurrentParams] = useState<{
    topic: string;
    duration: ScriptDuration;
    options: ScriptOptions;
    image?: string;
  } | null>(null);

  const handleGenerate = async (topic: string, duration: ScriptDuration, options: ScriptOptions, image?: string) => {
    setIsGenerating(true);
    setError(null);
    setScriptVersions([]); // Reset versions for new topic
    setActiveVersionIndex(0);
    setCurrentParams({ topic, duration, options, image });

    try {
      const generatedData = await generateScript(topic, duration, selectedPlatform, options, image);
      setScriptVersions([generatedData]);
      
      // Auto save on success
      saveScriptToStorage(topic, selectedPlatform, generatedData);
    } catch (err: any) {
      setError(`Gagal membuat skrip. Error: ${err.message || "Pastikan konfigurasi API Key benar dan koneksi lancar."}`);
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateWithHook = async (specificHook: string) => {
    if (!currentParams) return;

    setIsGenerating(true);
    setError(null);

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

    } catch (err: any) {
      setError(`Gagal membuat variasi skrip. ${err.message}`);
      console.error(err);
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
            useMagicHook: true
        }
    });

    setViewMode('generator');
  };

  const handleNewScript = () => {
    setScriptVersions([]);
    setActiveVersionIndex(0);
    setError(null);
    setCurrentParams(null);
    setViewMode('generator');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full bg-gray-950 text-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          selectedPlatform={viewMode === 'history' ? 'history' : selectedPlatform} 
          onSelectPlatform={handleSidebarSelect}
          onNewChat={handleNewScript}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm lg:hidden">
          <button 
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <span className="font-semibold text-sm truncate">
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
              error={error}
            />
          )}
        </main>
      </div>
    </div>
  );
}