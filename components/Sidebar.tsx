import React from 'react';
import { Platform, PLATFORM_LABELS } from '../types';

interface SidebarProps {
  onNewChat: () => void;
  selectedPlatform: Platform | 'history'; 
  onSelectPlatform: (platform: Platform | 'history') => void;
  onResetApiKey: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat, selectedPlatform, onSelectPlatform, onResetApiKey }) => {
  
  const platforms: { id: Platform, icon: React.ReactNode }[] = [
    { 
      id: 'general',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    },
    { 
      id: 'tiktok', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
    },
    { 
      id: 'youtube_shorts', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
    },
    { 
      id: 'instagram_reels', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    },
    { 
      id: 'youtube_long', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg> 
    },
    { 
      id: 'facebook_post', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Generator Skrip Konten
        </h1>
        <p className="text-xs text-gray-500 mt-1">100 Proven Hooks Database</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {/* Navigation Section */}
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Menu Utama
        </div>
        <div className="space-y-1 px-2 mb-6">
           {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPlatform(p.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                selectedPlatform === p.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className={`${selectedPlatform === p.id ? 'text-white' : 'text-gray-400'}`}>
                {p.icon}
              </span>
              <span className="font-medium">{PLATFORM_LABELS[p.id]}</span>
            </button>
          ))}
        </div>

        {/* Storage Section */}
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Penyimpanan
        </div>
        <div className="px-2">
           <button
              onClick={() => onSelectPlatform('history')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                selectedPlatform === 'history' 
                  ? 'bg-yellow-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className={`${selectedPlatform === 'history' ? 'text-white' : 'text-yellow-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              </span>
              <span className="font-medium">Folder Data Saya</span>
            </button>
        </div>
      </div>

      <div className="p-4 space-y-3 bg-gray-900 border-t border-gray-800">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-lg text-sm font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Buat Skrip Baru</span>
        </button>

        <button
          onClick={onResetApiKey}
          className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-gray-800 text-gray-500 hover:text-red-400 py-2 px-4 rounded-lg transition-colors text-xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          <span>Ganti API Key</span>
        </button>
      </div>
    </div>
  );
};