
import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedKey = inputKey.trim();
    
    if (!trimmedKey) {
      setError('API Key tidak boleh kosong');
      return;
    }

    if (!trimmedKey.startsWith('AIza')) {
      setError('Format API Key sepertinya salah (biasanya diawali "AIza")');
      return;
    }

    onSave(trimmedKey);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-indigo-500/30 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in-up">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/50">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Setup API Key</h2>
          <p className="text-gray-400 text-sm">
            Aplikasi ini menggunakan sistem <strong>"Bring Your Own Key"</strong>. 
            Masukkan Gemini API Key Anda sendiri untuk mulai membuat skrip tanpa batas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                setError('');
              }}
              placeholder="Paste kunci Anda di sini (AIza...)"
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-900/20"
          >
            Simpan & Mulai
          </button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-2">Belum punya API Key?</p>
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium hover:underline flex items-center justify-center gap-1"
          >
            Dapatkan Gratis di Google AI Studio
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <p className="text-[10px] text-gray-600 mt-4">
            *Kunci disimpan aman di browser Anda (LocalStorage) dan tidak dikirim ke server kami.
          </p>
        </div>
      </div>
    </div>
  );
};
