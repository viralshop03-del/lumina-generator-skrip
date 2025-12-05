
import React, { useEffect, useState } from 'react';
import { SavedScript, PLATFORM_LABELS } from '../types';
import { deleteSavedScript, getSavedScripts } from '../services/storage';

interface HistoryFolderProps {
  onLoadScript: (script: SavedScript) => void;
}

export const HistoryFolder: React.FC<HistoryFolderProps> = ({ onLoadScript }) => {
  const [scripts, setScripts] = useState<SavedScript[]>([]);

  useEffect(() => {
    setScripts(getSavedScripts());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Yakin ingin menghapus skrip ini dari folder?')) {
      const updated = deleteSavedScript(id);
      setScripts(updated);
    }
  };

  if (scripts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        <p className="text-lg font-medium">Folder Data Kosong</p>
        <p className="text-sm mt-2">Belum ada skrip yang disimpan. Generate skrip baru dan otomatis akan masuk ke sini.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 overflow-y-auto custom-scrollbar p-4 md:p-8">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
            Folder Data Saya
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {scripts.map((script) => (
            <div 
              key={script.id}
              onClick={() => onLoadScript(script)}
              className="group bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-xl p-5 shadow-lg cursor-pointer transition-all duration-200 relative"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700">
                  {PLATFORM_LABELS[script.platform]}
                </span>
                <button 
                  onClick={(e) => handleDelete(e, script.id)}
                  className="text-gray-500 hover:text-red-500 p-1 rounded-md hover:bg-gray-800 transition-colors z-10"
                  title="Hapus Skrip"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                {script.topic}
              </h3>
              
              <div className="space-y-2 mb-4">
                 <div className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-indigo-400 font-bold shrink-0">JUDUL:</span>
                    <span className="line-clamp-1">{script.coverTitle}</span>
                 </div>
                 <div className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-yellow-500 font-bold shrink-0">HOOK:</span>
                    <span className="line-clamp-1 italic">"{script.hookUsed}"</span>
                 </div>
              </div>

              <div className="pt-3 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
                <span>{new Date(script.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}</span>
                <span className="flex items-center gap-1 text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                  Buka Skrip 
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
