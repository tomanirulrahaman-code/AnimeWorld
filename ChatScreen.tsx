import React, { useState } from 'react';
import { Send, Sparkles, MessageSquare, Users, ShieldCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
  isAi?: boolean;
}

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Rohan_Otaku",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      text: "Yo guys! One Piece Egghead Arc Hindi Dub is top tier! Luffy's voice actor nailed it! 🏴‍☠️🔥",
      timestamp: "10:40 AM"
    },
    {
      id: "2",
      sender: "Ananya_Sama",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      text: "Jujutsu Kaisen Season 2 Shibuya Incident ep 12 was mindblowing! Gojo domain expansion scene gives me goosebumps everytime!",
      timestamp: "10:42 AM"
    },
    {
      id: "3",
      sender: "AnimeWorld Bot 🤖",
      avatar: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&auto=format&fit=crop&q=80",
      text: "Welcome to AnimeWorld Community Chat! Talk about your favorite Hindi dubbed anime, vote on weekly polls, or ask me for recommendations! 🇮🇳✨",
      timestamp: "10:44 AM",
      isAi: true
    }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = input.toLowerCase();
    setInput('');

    // Generate intelligent instant community response
    setTimeout(() => {
      let botReply = "Dattebayo! That's awesome! Check out the latest Solo Leveling and One Piece Hindi dub episodes on the home screen! 🚀";
      if (currentQuery.includes("hindi") || currentQuery.includes("dub")) {
        botReply = "All episodes on AnimeWorld are available in Dual Audio: High Quality Hindi Dub 🇮🇳 & Japanese Subtitles!";
      } else if (currentQuery.includes("one piece") || currentQuery.includes("luffy")) {
        botReply = "One Piece Episode 1095 is trending #1 in India right now! Luffy's Gear 5 battle scenes are incredible!";
      } else if (currentQuery.includes("solo leveling") || currentQuery.includes("sung")) {
        botReply = "Sung Jinwoo's Shadow Army is unstoppable! Solo Leveling Season 2 is streaming in full 1080p HD!";
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "AnimeWorld Bot 🤖",
        avatar: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&auto=format&fit=crop&q=80",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: true
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen pb-28 animate-in fade-in duration-200">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-md p-4 border-b border-gray-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#e50914] text-white flex items-center justify-center shadow-md">
            <MessageSquare className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 font-['Outfit'] leading-none">
              AnimeWorld Community
            </h1>
            <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              1,420 Anime Fans Online 🇮🇳
            </span>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
          Hindi + Eng
        </span>
      </div>

      {/* Messages List */}
      <div className="p-4 space-y-3.5 flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === "You" ? "flex-row-reverse" : ""}`}
          >
            <img
              src={msg.avatar}
              alt={msg.sender}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
            />
            <div className={`max-w-[78%] flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}>
              <div className="flex items-center gap-1.5 px-1 mb-0.5">
                <span className="text-[10px] font-bold text-slate-700">{msg.sender}</span>
                <span className="text-[9px] text-slate-400">{msg.timestamp}</span>
              </div>
              <div
                className={`p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                  msg.sender === "You"
                    ? "bg-[#e50914] text-white rounded-tr-none"
                    : msg.isAi
                    ? "bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none"
                    : "bg-white text-slate-900 border border-gray-200/80 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[420px] mx-auto p-3 bg-white/95 backdrop-blur-md border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Discuss anime or ask for Hindi dub recommendations..."
            className="flex-1 bg-gray-100 text-slate-900 text-xs px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#e50914]"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-2xl bg-[#e50914] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
