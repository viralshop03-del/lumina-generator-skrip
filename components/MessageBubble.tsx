import React from 'react';
import { ChatMessage } from '../types';

// Simple markdown parser for bold, code blocks, and line breaks
const parseMarkdown = (text: string) => {
  // 1. Code blocks
  let formatted = text.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 p-3 rounded-md my-2 overflow-x-auto text-sm font-mono text-gray-300"><code>$1</code></pre>');
  
  // 2. Bold
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300 font-semibold">$1</strong>');
  
  // 3. Line breaks to <br/>
  formatted = formatted.replace(/\n/g, '<br />');

  // 4. Links (simple)
  formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300">$1</a>');

  return formatted;
};

export const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
          {isUser ? (
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a7 7 0 0 1-7 7H9a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a7 7 0 0 1 7-7v-1.27A2 2 0 0 1 12 2z"></path></svg>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Name & Time */}
          <div className="flex items-center gap-2 mb-1 px-1">
            <span className="text-xs font-medium text-gray-400">
              {isUser ? 'You' : 'Gemini'}
            </span>
            <span className="text-[10px] text-gray-600">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Bubble */}
          <div 
            className={`rounded-2xl px-5 py-3.5 shadow-md ${
              isUser 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700'
            }`}
          >
            {message.image && (
              <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
                <img src={message.image} alt="Uploaded content" className="max-w-full max-h-64 object-cover" />
              </div>
            )}
            <div 
              className="text-sm leading-relaxed tracking-wide"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
            />
          </div>
          
          {message.isError && (
             <span className="text-xs text-red-500 mt-1">Failed to send</span>
          )}
        </div>
      </div>
    </div>
  );
};