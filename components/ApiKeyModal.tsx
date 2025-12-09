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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl max-w-lg w-full p-8 relative overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-gray-700 shadow-inner">
             <span className="text-4xl">👋</span>
          </div>
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Selamat Datang di Generator Skrip Powerfull</h2>
          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            Aplikasi ini dirancang untuk menghasilkan skrip viral menggunakan formula profesional. 
            <br/><br/>
            <strong>PENTING:</strong> Karena ini adalah aplikasi publik, sistem kami mewajibkan Anda menggunakan 
            <strong> Kunci API Google (Gemini)</strong> milik Anda sendiri.
          </p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-6 text-center">
             <p className="text-xs text-yellow-500 font-semibold">⛔ Akses ditutup sebelum API Key dimasukkan.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Masukkan Gemini API Key Anda
            </label>
            <div className="relative">
                <input
                type="password"
                value={inputKey}
                onChange={(e) => {
                    setInputKey(e.target.value);
                    setError('');
                }}
                placeholder="Paste kunci AIza... di sini"
                className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
                autoFocus
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
            </div>
            {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs mt-2 bg-red-900/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {error}
                </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2"
          >
            <span>Buka Akses Aplikasi 🔓</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-indigo-400 text-xs font-semibold transition-colors"
          >
            <span>Dapatkan Key Gratis (Google AI Studio)</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <p className="text-[10px] text-gray-600 mt-4 italic">
            *Kunci disimpan lokal di browser Anda. Kami tidak mengirimnya ke server kami.
          </p>
        </div>
      </div>
    </div>
  );
};