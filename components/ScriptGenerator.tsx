
import React, { useState, useRef, useEffect } from 'react';
import { ScriptGeneratorProps, ScriptDuration, Platform, StoryboardScene, AudienceType, ToneType, ContentGoal, ScriptStrategy } from '../types';

interface ExtendedProps extends ScriptGeneratorProps {
    initialTopic?: string;
}

const DURATIONS: ScriptDuration[] = ['5s', '15s', '25s', '35s', '45s', '1m', '2m', '5m', '10m'];

const AUDIENCES: AudienceType[] = [
  'Umum / Semua Kalangan',
  'Gen Z / Anak Muda', 
  'Millennials / Dewasa Muda', 
  'Profesional / Bisnis', 
  'Ibu-ibu / Parenting', 
  'Pelajar / Mahasiswa'
];

const TONES: ToneType[] = [
  'Santai & Lucu', 
  'Serius & Edukatif', 
  'Antusias & Ceria', 
  'Tegas & To-the-point', 
  'Emosional & Storytelling',
  'Sarkas & Menggelitik'
];

const GOALS: ContentGoal[] = [
  'Viral / Views (Broad)', 
  'Jualan (Hard Sell)' , 
  'Edukasi / Save', 
  'Interaksi / Komen', 
  'Followers Baru', 
  'Klik Link di Bio'
];

const STRATEGIES: { id: ScriptStrategy; label: string; desc: string }[] = [
  { 
    id: 'faster_api', 
    label: 'Formula Standar (FasterAPI)', 
    desc: 'Filmic Flow, Emosional, & Storytelling yang mengalir.' 
  },
  { 
    id: 'contrarian', 
    label: 'Brutal Truth (Contrarian)', 
    desc: 'Tegas, Menampar Realita, Fakta Pahit, & Solusi Keras.' 
  }
];

const THEMES: Record<Platform, { 
  borderColor: string; 
  ringColor: string; 
  textColor: string; 
  buttonBg: string; 
  shadow: string;
  subtleBg: string;
  toggleActive: string;
}> = {
  tiktok: {
    borderColor: 'border-[#FE2C55]',
    ringColor: 'focus:ring-[#FE2C55]',
    textColor: 'text-[#FE2C55]',
    buttonBg: 'bg-[#FE2C55] hover:bg-[#E52048]',
    shadow: 'shadow-[#FE2C55]/20',
    subtleBg: 'bg-[#FE2C55]/10',
    toggleActive: 'bg-[#FE2C55]'
  },
  youtube_shorts: {
    borderColor: 'border-[#FF0000]',
    ringColor: 'focus:ring-[#FF0000]',
    textColor: 'text-[#FF0000]',
    buttonBg: 'bg-[#FF0000] hover:bg-[#CC0000]',
    shadow: 'shadow-[#FF0000]/20',
    subtleBg: 'bg-[#FF0000]/10',
    toggleActive: 'bg-[#FF0000]'
  },
  youtube_long: {
    borderColor: 'border-[#FF0000]',
    ringColor: 'focus:ring-[#FF0000]',
    textColor: 'text-[#FF0000]',
    buttonBg: 'bg-[#FF0000] hover:bg-[#CC0000]',
    shadow: 'shadow-[#FF0000]/20',
    subtleBg: 'bg-[#FF0000]/10',
    toggleActive: 'bg-[#FF0000]'
  },
  instagram_reels: {
    borderColor: 'border-[#E1306C]',
    ringColor: 'focus:ring-[#E1306C]',
    textColor: 'text-[#E1306C]',
    buttonBg: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90',
    shadow: 'shadow-[#E1306C]/20',
    subtleBg: 'bg-[#E1306C]/10',
    toggleActive: 'bg-[#E1306C]'
  },
  facebook_post: {
    borderColor: 'border-[#1877F2]',
    ringColor: 'focus:ring-[#1877F2]',
    textColor: 'text-[#1877F2]',
    buttonBg: 'bg-[#1877F2] hover:bg-[#166FE5]',
    shadow: 'shadow-[#1877F2]/20',
    subtleBg: 'bg-[#1877F2]/10',
    toggleActive: 'bg-[#1877F2]'
  },
  general: {
    borderColor: 'border-indigo-500',
    ringColor: 'focus:ring-indigo-500',
    textColor: 'text-indigo-500',
    buttonBg: 'bg-indigo-600 hover:bg-indigo-500',
    shadow: 'shadow-indigo-500/20',
    subtleBg: 'bg-indigo-500/10',
    toggleActive: 'bg-indigo-500'
  }
};

const SCENE_COLORS = {
  blue: { border: 'border-blue-500', text: 'text-blue-400', icon: '🟦' },
  green: { border: 'border-emerald-500', text: 'text-emerald-400', icon: '🟩' },
  orange: { border: 'border-orange-500', text: 'text-orange-400', icon: '🟧' },
  red: { border: 'border-red-500', text: 'text-red-400', icon: '🟥' },
  purple: { border: 'border-purple-500', text: 'text-purple-400', icon: '🟪' },
  black: { border: 'border-gray-500', text: 'text-gray-400', icon: '⬛' },
};

export const ScriptGenerator: React.FC<ExtendedProps> = ({ 
  selectedPlatform, 
  onGenerate, 
  onRegenerateWithHook,
  onVersionChange,
  isGenerating, 
  results,
  activeVersionIndex,
  initialTopic
}) => {
  const [topic, setTopic] = useState(initialTopic || '');
  const [duration, setDuration] = useState<ScriptDuration>('25s');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialTopic) setTopic(initialTopic);
  }, [initialTopic]);

  // New Features States
  const [useCustomAudience, setUseCustomAudience] = useState(false);
  const [audience, setAudience] = useState<AudienceType>(AUDIENCES[0]);
  const [tone, setTone] = useState<ToneType>(TONES[0]);

  const [useCustomGoal, setUseCustomGoal] = useState(false);
  const [goal, setGoal] = useState<ContentGoal>(GOALS[0]);

  const [useMagicHook, setUseMagicHook] = useState(false);

  // Strategy State
  const [strategy, setStrategy] = useState<ScriptStrategy>('faster_api');

  const theme = THEMES[selectedPlatform];
  const activeResult = results[activeVersionIndex];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCopyStoryboard = () => {
    if (!activeResult?.visualStoryboard) return;
    const text = activeResult.visualStoryboard.map(s => 
      `${SCENE_COLORS[s.color].icon} SCENE ${s.sceneNumber}\n"${s.narration}"`
    ).join('\n\n---\n\n');
    handleCopy(text);
  };

  const copyAll = () => {
    if (!activeResult) return;
    
    let storyboardText = "";
    if (activeResult.visualStoryboard) {
      storyboardText = "\n\nVISUAL STORYBOARD:\n" + activeResult.visualStoryboard.map(s => 
        `${SCENE_COLORS[s.color].icon} SCENE ${s.sceneNumber}\n"${s.narration}"`
      ).join('\n---\n');
    }

    const allText = `
JUDUL SAMPUL:
${activeResult.coverTitle}

HOOK:
${activeResult.hookUsed}

SKRIP FULL:
${activeResult.scriptContent}
${storyboardText}

CAPTION:
${activeResult.caption}

HASHTAGS:
${activeResult.hashtags.join(' ')}
    `;
    handleCopy(allText.trim());
  };

  const handleGenerateClick = () => {
    onGenerate(topic, duration, {
      useCustomAudience,
      audience,
      tone,
      useCustomGoal,
      goal,
      useMagicHook,
      strategy
    }, selectedImage || undefined);
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 overflow-y-auto custom-scrollbar">
      <div className="max-w-3xl mx-auto w-full p-4 md:p-8 space-y-8 pb-32">
        
        {/* Header */}
        <div className="text-center space-y-2 mt-4 md:mt-0">
          <h2 className={`text-2xl md:text-3xl font-black ${theme.textColor} uppercase tracking-wider transition-colors duration-300`}>
            GENERATOR SKRIP KONTEN
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
            Buat skrip viral dalam hitungan detik. Pilih platform, atur durasi, dan biarkan AI bekerja dengan formula teruji.
          </p>
        </div>

        {/* Form Section */}
        <div className={`bg-gray-900 border-2 ${theme.borderColor} rounded-2xl p-4 md:p-6 shadow-2xl ${theme.shadow} transition-all duration-300`}>
          
          {/* Topic Input */}
          <div className="space-y-3 mb-6">
            <label className={`block text-xs md:text-sm font-bold uppercase tracking-wider ${theme.textColor}`}>
              Ide Konten / Topik Utama
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Tips diet tanpa menyiksa, Review baju lebaran, Cara investasi untuk pemula..."
              className={`w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 ${theme.ringColor} focus:border-transparent transition-all resize-none h-32 text-sm md:text-base`}
            />
          </div>

          {/* STRATEGY SELECTION (NEW) */}
          <div className="mb-6 space-y-3">
             <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Pilih Strategi / Formula Skrip
             </label>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {STRATEGIES.map((strat) => (
                  <button
                    key={strat.id}
                    onClick={() => setStrategy(strat.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-1 ${
                       strategy === strat.id 
                       ? `${theme.subtleBg} ${theme.borderColor} shadow-md` 
                       : 'bg-gray-950 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                     <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${strategy === strat.id ? theme.borderColor : 'border-gray-600'}`}>
                           {strategy === strat.id && <div className={`w-2 h-2 rounded-full ${theme.buttonBg}`}></div>}
                        </div>
                        <span className={`font-bold text-sm ${strategy === strat.id ? 'text-white' : 'text-gray-400'}`}>
                           {strat.label}
                        </span>
                     </div>
                     <p className="text-xs text-gray-500 ml-6">{strat.desc}</p>
                  </button>
                ))}
             </div>
          </div>

          {/* Pro Features Toggle Section */}
          <div className="mb-6 space-y-4">
             <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-800 pb-2">
               Kustomisasi Lanjutan (Opsional)
             </div>
             
             {/* Feature 1: Audience & Tone */}
             <div className={`p-4 rounded-xl border border-gray-800 bg-gray-950/50 hover:border-gray-700 transition-colors ${useCustomAudience ? 'border-gray-600' : ''}`}>
               <div className="flex items-center justify-between cursor-pointer" onClick={() => setUseCustomAudience(!useCustomAudience)}>
                  <div className="flex items-center gap-3">
                     <span className="text-xl">🎯</span>
                     <span className="text-sm font-bold text-gray-200">Target Audiens & Gaya Bahasa</span>
                  </div>
                  <div className={`w-11 h-6 flex items-center bg-gray-700 rounded-full p-1 transition-colors duration-300 ${useCustomAudience ? theme.toggleActive : ''}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${useCustomAudience ? 'translate-x-5' : ''}`}></div>
                  </div>
               </div>
               
               {useCustomAudience && (
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-semibold">Siapa Penontonnya?</label>
                      <select 
                        value={audience} 
                        onChange={(e) => setAudience(e.target.value as AudienceType)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                      >
                        {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-semibold">Gaya Bicara?</label>
                      <select 
                        value={tone} 
                        onChange={(e) => setTone(e.target.value as ToneType)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                      >
                        {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                 </div>
               )}
             </div>

             {/* Feature 2: Custom Goal */}
             <div className={`p-4 rounded-xl border border-gray-800 bg-gray-950/50 hover:border-gray-700 transition-colors ${useCustomGoal ? 'border-gray-600' : ''}`}>
               <div className="flex items-center justify-between cursor-pointer" onClick={() => setUseCustomGoal(!useCustomGoal)}>
                  <div className="flex items-center gap-3">
                     <span className="text-xl">📢</span>
                     <span className="text-sm font-bold text-gray-200">Goal & Call to Action</span>
                  </div>
                  <div className={`w-11 h-6 flex items-center bg-gray-700 rounded-full p-1 transition-colors duration-300 ${useCustomGoal ? theme.toggleActive : ''}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${useCustomGoal ? 'translate-x-5' : ''}`}></div>
                  </div>
               </div>
               
               {useCustomGoal && (
                 <div className="mt-4 animate-fade-in-up">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-semibold">Apa Tujuan Utama?</label>
                      <select 
                        value={goal} 
                        onChange={(e) => setGoal(e.target.value as ContentGoal)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                      >
                        {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                 </div>
               )}
             </div>

             {/* Feature 3: Magic Hook */}
             <div className={`p-4 rounded-xl border border-gray-800 bg-gray-950/50 hover:border-gray-700 transition-colors ${useMagicHook ? 'border-gray-600' : ''}`}>
               <div className="flex items-center justify-between cursor-pointer" onClick={() => setUseMagicHook(!useMagicHook)}>
                  <div className="flex items-center gap-3">
                     <span className="text-xl">🧲</span>
                     <span className="text-sm font-bold text-gray-200">Magic Hook (3 Variasi)</span>
                  </div>
                  <div className={`w-11 h-6 flex items-center bg-gray-700 rounded-full p-1 transition-colors duration-300 ${useMagicHook ? theme.toggleActive : ''}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${useMagicHook ? 'translate-x-5' : ''}`}></div>
                  </div>
               </div>
             </div>
          </div>

          {/* Image Upload (Optional) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Visual Pendukung (Opsional)
              </label>
              {selectedImage && (
                <button 
                  onClick={() => { setSelectedImage(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="text-xs text-red-400 hover:text-red-300 underline"
                >
                  Hapus
                </button>
              )}
            </div>
            
            {!selectedImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed border-gray-700 hover:border-gray-500 rounded-xl p-4 text-center cursor-pointer ${theme.subtleBg} hover:bg-gray-800 transition-colors group h-24 flex items-center justify-center`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
                <div className="flex flex-col items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-500 group-hover:${theme.textColor}`}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                   <span className="text-xs text-gray-400 group-hover:text-gray-300">Klik untuk upload foto produk/referensi</span>
                </div>
              </div>
            ) : (
              <div className={`relative rounded-xl overflow-hidden h-32 bg-gray-950 border ${theme.borderColor} flex items-center justify-center`}>
                 <img src={selectedImage} alt="Preview" className="h-full object-contain" />
              </div>
            )}
          </div>

          {/* Duration Selection */}
          <div className="space-y-3 mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              Durasi Video
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold transition-all border ${
                    duration === d
                      ? `${theme.buttonBg} text-white shadow-md border-transparent`
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateClick}
            disabled={!topic.trim() || isGenerating}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-[0.99] hover:scale-[1.01] ${
              !topic.trim() || isGenerating
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : `${theme.buttonBg} text-white shadow-xl ${theme.shadow}`
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sedang Meracik Skrip...
              </span>
            ) : (
              "GENERATE SEKARANG ✨"
            )}
          </button>
        </div>

        {/* Results Section */}
        {activeResult && !isGenerating && (
          <div className="animate-fade-in-up space-y-6 pb-10">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">Hasil Skrip</h3>
                  
                  {/* Version Tabs */}
                  {results.length > 1 && (
                    <div className="flex gap-1 bg-gray-900 p-1 rounded-lg">
                        {results.map((_, idx) => (
                          <button
                              key={idx}
                              onClick={() => onVersionChange(idx)}
                              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                                activeVersionIndex === idx 
                                ? `${theme.buttonBg} text-white shadow` 
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              }`}
                          >
                              V{idx + 1}
                          </button>
                        ))}
                    </div>
                  )}
              </div>

              <button 
                onClick={copyAll}
                className={`flex items-center justify-center gap-2 ${theme.buttonBg} text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copy Semua Text
              </button>
            </div>

            {/* Cover Title Card */}
            <div className={`bg-gray-800 border-l-4 rounded-r-xl p-5 shadow-lg ${theme.borderColor} ${theme.shadow}`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 opacity-80 ${theme.textColor}`}>Judul Sampul / Thumbnail</div>
              <div className="text-xl md:text-2xl font-black text-white leading-tight">{activeResult.coverTitle}</div>
            </div>

             {/* Hook Card */}
             <div className={`bg-gray-800 border-l-4 rounded-r-xl p-5 shadow-lg ${theme.borderColor} ${theme.shadow}`}>
              <div className="flex justify-between items-start mb-2">
                 <div className={`text-xs font-bold uppercase tracking-wider opacity-80 ${theme.textColor}`}>Hook (3 Detik Pertama)</div>
                 <button onClick={() => handleCopy(activeResult.hookUsed)} className="text-gray-500 hover:text-white text-xs font-bold">COPY</button>
              </div>
              <div className="text-lg font-medium text-gray-200 italic">"{activeResult.hookUsed}"</div>
            </div>

            {/* Magic Hook Alternatives (Interactive) */}
            {activeResult.alternativeHooks && activeResult.alternativeHooks.length > 0 && (
               <div className={`bg-gray-900 border border-dashed border-gray-700 rounded-xl p-5`}>
                 <div className={`text-xs font-bold uppercase tracking-wider mb-4 text-gray-400 flex items-center gap-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    Alternatif Hook (Klik untuk Generate Ulang)
                 </div>
                 <div className="grid gap-3">
                    {activeResult.alternativeHooks.map((altHook, idx) => (
                       <button 
                          key={idx} 
                          onClick={() => onRegenerateWithHook(altHook)}
                          className="flex gap-4 items-center group text-left w-full hover:bg-gray-800 p-3 rounded-lg transition-all border border-transparent hover:border-gray-700"
                       >
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-gray-800 group-hover:${theme.buttonBg} group-hover:text-white text-gray-500 transition-colors`}>
                             {idx + 1}
                          </span>
                          <p className="text-sm text-gray-300 italic flex-1 group-hover:text-white transition-colors">"{altHook}"</p>
                          <span className="hidden md:inline-block text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold px-2 whitespace-nowrap">
                             Buat Versi Ini &rarr;
                          </span>
                       </button>
                    ))}
                 </div>
               </div>
            )}

            {/* Visual Storyboard Section */}
            {activeResult.visualStoryboard && activeResult.visualStoryboard.length > 0 && (
              <div className="space-y-4 pt-4">
                 <div className="flex justify-between items-center">
                    <div className={`text-sm font-bold uppercase tracking-wider ${theme.textColor}`}>
                        Visual Storyboard Breakdown
                    </div>
                    <button 
                      onClick={handleCopyStoryboard}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      Copy Storyboard
                    </button>
                 </div>
                 <div className="grid gap-4 md:grid-cols-2">
                    {activeResult.visualStoryboard.map((scene, idx) => {
                       const colorConfig = SCENE_COLORS[scene.color] || SCENE_COLORS.blue;
                       return (
                         <div key={idx} className={`bg-gray-900 border-l-4 ${colorConfig.border} rounded-r-xl p-4 shadow-md hover:translate-x-1 transition-transform`}>
                            <div className={`flex items-center gap-2 mb-2 font-mono text-xs font-bold ${colorConfig.text} uppercase tracking-wider`}>
                               <span>{colorConfig.icon}</span>
                               <span>SCENE {scene.sceneNumber}</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed font-medium">
                               "{scene.narration}"
                            </p>
                         </div>
                       );
                    })}
                 </div>
              </div>
            )}

            {/* Script Body (Full) */}
            <div className={`bg-gray-800 border-l-4 rounded-r-xl p-6 shadow-lg ${theme.borderColor} ${theme.shadow} mt-6`}>
               <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                 <div className={`text-xs font-bold uppercase tracking-wider ${theme.textColor}`}>Naskah Lengkap (Voiceover)</div>
                 <button onClick={() => handleCopy(activeResult.scriptContent)} className="text-gray-400 hover:text-white text-xs font-bold">COPY TEXT</button>
               </div>
               <div className="whitespace-pre-wrap text-gray-200 leading-relaxed font-sans text-sm md:text-base">
                 {activeResult.scriptContent}
               </div>
            </div>

            {/* Caption & Hashtags */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`bg-gray-800 rounded-xl p-5 shadow-lg border-2 ${theme.borderColor} ${theme.shadow}`}>
                <div className="flex justify-between items-center mb-2">
                  <div className={`text-xs font-bold uppercase ${theme.textColor}`}>Caption</div>
                  <button onClick={() => handleCopy(activeResult.caption)} className="text-gray-500 hover:text-white text-xs font-bold">COPY</button>
                </div>
                <p className="text-sm text-gray-300 whitespace-pre-line">{activeResult.caption}</p>
              </div>

              <div className={`bg-gray-800 rounded-xl p-5 shadow-lg border-2 ${theme.borderColor} ${theme.shadow}`}>
                 <div className="flex justify-between items-center mb-2">
                  <div className={`text-xs font-bold uppercase ${theme.textColor}`}>Hashtags</div>
                  <button onClick={() => handleCopy(activeResult.hashtags.join(' '))} className="text-gray-500 hover:text-white text-xs font-bold">COPY</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeResult.hashtags.map((tag, idx) => (
                    <span key={idx} className={`text-xs font-medium px-2 py-1 rounded-md bg-gray-900 ${theme.textColor}`}>#{tag.replace('#', '')}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
