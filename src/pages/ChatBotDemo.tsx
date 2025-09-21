import React from 'react';
import { useChatBot } from '../contexts/ChatBotContext';
import { MessageCircle, Sparkles } from 'lucide-react';

const ChatBotDemo: React.FC = () => {
  const { showChatBot } = useChatBot();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-amber-600 mr-3" size={32} />
            <h1 className="text-4xl font-bold text-amber-800">KalaaSetu ChatBot</h1>
            <Sparkles className="text-amber-600 ml-3" size={32} />
          </div>
          <p className="text-xl text-gray-700 mb-8">
            Experience our intelligent assistant designed to help you navigate the world of classical arts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">🎭 For Artists</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Find work opportunities</li>
              <li>• Get profile optimization tips</li>
              <li>• Learn about platform features</li>
              <li>• Connect with potential clients</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">🏢 For Clients</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Discover talented artists</li>
              <li>• Post requirements easily</li>
              <li>• Get hiring guidance</li>
              <li>• Manage bookings efficiently</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-amber-800 mb-6 text-center">Try These Sample Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <button
                onClick={() => showChatBot()}
                className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
              >
                "How do I find artists for my wedding?"
              </button>
              <button
                onClick={() => showChatBot()}
                className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
              >
                "What are the different classical dance forms?"
              </button>
              <button
                onClick={() => showChatBot()}
                className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
              >
                "How do I post a requirement as a client?"
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => showChatBot()}
                className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
              >
                "What features does KalaaSetu offer?"
              </button>
              <button
                onClick={() => showChatBot()}
                className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
              >
                "How do I create an artist profile?"
              </button>
              <button
                onClick={() => showChatBot()}
                className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
              >
                "What are the pricing options?"
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <span className="text-xs text-gray-500">Powered by Gemini 2.5 Pro – Answers are strictly limited to KalaaSetu project topics.</span>
        </div>

        <div className="text-center">
          <button
            onClick={showChatBot}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
          >
            <MessageCircle className="mr-3" size={24} />
            Start Chatting with KalaaSetu Assistant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotDemo;
