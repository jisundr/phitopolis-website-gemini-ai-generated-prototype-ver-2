import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm Phit, your virtual guide. Ask me about our tech stack, culture, or what it's like to work at Phitopolis.",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.slice(-5).map(m => m.text);
    const responseText = await sendMessageToGemini(history, userMsg.text);
    
    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-phito-blue p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-phito-yellow">
              <Cpu className="w-5 h-5" />
              <span className="font-bold font-sans tracking-wide">PHIT.AI</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-phito-yellow transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-md text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-phito-blue text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-md rounded-bl-none border border-gray-200 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-phito-blue" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our tech stack..."
                className="flex-1 bg-gray-50 text-gray-800 text-sm rounded-sm px-3 py-2 border border-gray-300 focus:outline-none focus:border-phito-blue focus:ring-1 focus:ring-phito-blue placeholder-gray-400"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-phito-yellow hover:bg-yellow-500 text-phito-blue p-2 rounded-sm transition-colors disabled:opacity-50 font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-3 px-6 py-4 rounded-full shadow-xl transition-all duration-300 font-bold tracking-wide ${
          isOpen 
            ? 'bg-phito-blue text-white' 
            : 'bg-phito-blue text-white hover:bg-blue-900 border-2 border-phito-yellow'
        }`}
      >
        {!isOpen && <span className="hidden md:block">ASK PHIT.AI</span>}
        <MessageSquare className={`w-6 h-6 ${isOpen ? 'rotate-90 text-white' : 'text-phito-yellow'} transition-transform`} />
      </button>
    </div>
  );
};

export default AiAssistant;