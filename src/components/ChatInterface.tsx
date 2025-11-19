import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createChatSession } from '../services/geminiService';
import { Send, User, Bot, Loader2, MessageSquareX } from 'lucide-react';
import { GenerateContentResponse } from "@google/genai";
import ReactMarkdown from 'react-markdown';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'I am the **"Ya But..."** engine. \n\nI am here to contextualize the common arguments used to dismiss Hawaiian sovereignty. \n\nTry me with your doubts:\n\n*   *"Ya but... if the US didn\'t take it, Japan, Russia, or China would have."*\n*   *"Ya but... didn\'t they vote for statehood in 1959?"*\n*   *"Ya but... it\'s been 100 years, isn\'t it too late?"*'
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const chatSessionRef = useRef(createChatSession());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsStreaming(true);

    try {
      const result = await chatSessionRef.current.sendMessageStream({ message: userMessage });
      
      // Add empty model message to start accumulating tokens
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let fullText = '';
      for await (const chunk of result) {
        const responseChunk = chunk as GenerateContentResponse;
        const text = responseChunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1].text = fullText;
            return newHistory;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error accessing the historical records. Please try again.", isError: true }]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="bg-white rounded-t-2xl shadow-lg border border-gray-200 p-6 mb-0 flex-none">
        <h2 className="text-2xl font-serif font-bold text-deep-blue flex items-center gap-3">
          <MessageSquareX className="text-kingdom-red" size={32} />
          "Ya But..."
        </h2>
        <p className="text-gray-600 mt-1">
          Challenge the narrative. Provide a common argument, and we'll apply critical historical context to the timeframe.
        </p>
      </div>

      <div className="flex-1 bg-gray-50 overflow-y-auto p-6 border-x border-gray-200 shadow-inner space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             {msg.role === 'model' && (
               <div className="w-10 h-10 rounded-full bg-deep-blue flex items-center justify-center flex-shrink-0 mt-1 border-2 border-royal-gold">
                 <Bot size={20} className="text-white" />
               </div>
             )}
             
             <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm ${
               msg.role === 'user' 
                ? 'bg-deep-blue text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
             }`}>
               <div className="prose prose-sm max-w-none dark:prose-invert font-sans">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
               </div>
             </div>

             {msg.role === 'user' && (
               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                 <User size={20} className="text-gray-600" />
               </div>
             )}
          </div>
        ))}
        {isStreaming && (
          <div className="flex gap-4 justify-start animate-pulse">
            <div className="w-10 h-10 rounded-full bg-deep-blue flex items-center justify-center flex-shrink-0 mt-1 border-2 border-royal-gold">
              <Bot size={20} className="text-white" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-4 rounded-b-2xl shadow-lg border border-gray-200 flex-none">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your 'Ya but...' argument here (e.g., 'Ya but Japan would have taken it')"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-royal-gold focus:border-royal-gold block p-4 pr-12 shadow-sm transition-colors"
            disabled={isStreaming}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="absolute right-2 p-2 text-white bg-deep-blue hover:bg-blue-900 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isStreaming ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};
