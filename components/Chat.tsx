import React, { useRef, useEffect, useState } from 'react';
import { ChatProps, PLATFORM_LABELS } from '../types';
import { MessageBubble } from './MessageBubble';

export const Chat: React.FC<ChatProps> = ({ messages, isLoading, onSendMessage, selectedPlatform }) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    onSendMessage(inputText, selectedImage || undefined);
    setInputText('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    // Reset textarea height
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(e.target.value);
      if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
  };

  const getPlaceholder = () => {
    if (selectedPlatform === 'general') return "Tanya sesuatu...";
    return `Masukan topik untuk ${PLATFORM_LABELS[selectedPlatform]}... (Contoh: Cara diet sehat, Jualan baju, dll)`;
  }

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-6">
               <div className="flex items-center gap-3 bg-gray-800 rounded-2xl rounded-tl-none px-5 py-4 border border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-md p-4">
        <div className="max-w-3xl mx-auto">
          
          {selectedImage && (
            <div className="mb-3 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-gray-600" />
              <button 
                onClick={() => { setSelectedImage(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                className="absolute -top-2 -right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-1 shadow-md border border-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          )}

          <div className="flex items-end gap-3 bg-gray-800 border border-gray-700 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-700/50"
              title="Attach visual inspiration"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            </button>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />

            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              className="flex-1 max-h-32 bg-transparent text-gray-100 placeholder-gray-500 text-sm py-3 focus:outline-none resize-none overflow-y-auto"
              rows={1}
            />

            <button
              onClick={() => handleSubmit()}
              disabled={(!inputText.trim() && !selectedImage) || isLoading}
              className={`p-2 rounded-lg transition-all duration-200 ${
                (!inputText.trim() && !selectedImage) || isLoading
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-900/20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-600 mt-2">
            AI akan memilih Hook terbaik dari 100 template database secara otomatis.
          </p>
        </div>
      </div>
    </div>
  );
};