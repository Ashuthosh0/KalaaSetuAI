import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatBotProps {
  isVisible: boolean;
  onToggle: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isVisible, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste! I'm your KalaaSetu assistant. I can help you with finding traditional artists, posting requirements, learning about traditional arts and poetry, and navigating our platform. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const generateTypingDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Help responses
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can help you with:\n\n🎨 Finding traditional artists and craftsmen\n📝 Posting your requirements as a client\n📚 Learning about traditional arts and poetry\n🔍 Navigating the KalaaSetu platform\n💡 Getting tips for artists and clients\n\nWhat would you like to know more about?";
    }
    
    // Artist finding
    if (lowerMessage.includes('find artist') || lowerMessage.includes('talent') || lowerMessage.includes('hire')) {
      return "To find talented traditional artists:\n\n1. Go to 'Find Talent' in the navigation\n2. Browse by categories (Traditional Arts, Poetry, Crafts, Painting)\n3. Use filters to narrow down your search\n4. View artist profiles and portfolios\n5. Contact artists directly through the platform\n\nWould you like me to guide you through any specific step?";
    }
    
    // Work finding
    if (lowerMessage.includes('find work') || lowerMessage.includes('job') || lowerMessage.includes('opportunity')) {
      return "To find work opportunities:\n\n1. Go to 'Find Work' in the navigation\n2. Browse available requirements\n3. Filter by your art form and location\n4. Apply to relevant opportunities\n5. Build your profile to attract clients\n\nAre you an artist looking for opportunities?";
    }
    
    // Traditional arts
    if (lowerMessage.includes('traditional') || lowerMessage.includes('art form') || lowerMessage.includes('poetry') || lowerMessage.includes('crafts')) {
      return "KalaaSetu celebrates various traditional art forms:\n\n🎨 **Traditional Arts**: Folk traditions, storytelling, puppetry, classical theatre\n📚 **Poetry & Literature**: Classical poetry, Urdu ghazals, Tamil literature, Hindi kavya\n🛠️ **Traditional Crafts**: Pottery, wood carving, textile weaving, handicrafts\n🎭 **Traditional Painting**: Madhubani, Miniature, Warli, Kalamkari\n\nWhich art form interests you most?";
    }
    
    // Platform features
    if (lowerMessage.includes('feature') || lowerMessage.includes('how to') || lowerMessage.includes('navigate')) {
      return "KalaaSetu offers these key features:\n\n✨ **Smart Matching**: AI-powered artist-client matching\n📱 **Easy Communication**: Built-in messaging system\n🔒 **Secure Payments**: Safe transaction handling\n⭐ **Reviews & Ratings**: Build trust in the community\n📊 **Analytics**: Track your performance\n\nWhich feature would you like to explore?";
    }
    
    // Registration/Account
    if (lowerMessage.includes('sign up') || lowerMessage.includes('register') || lowerMessage.includes('account')) {
      return "To create your account:\n\n1. Click 'Sign Up' in the top navigation\n2. Choose your role (Artist or Client)\n3. Fill in your details\n4. Verify your email with OTP\n5. Complete your profile\n\nWould you like help with any specific step?";
    }
    
    // Pricing/Payment
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('payment')) {
      return "KalaaSetu offers flexible pricing:\n\n🆓 **Free**: Basic profile and browsing\n💎 **Premium**: Enhanced visibility and features\n🏢 **Enterprise**: Custom solutions for organizations\n\nContact our support team for detailed pricing information!";
    }
    
    // Contact/Support
    if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help me')) {
      return "I'm here to help! You can also:\n\n📧 Email: support@kalaasetu.com\n📞 Phone: +91-XXXX-XXXX\n💬 Live Chat: Available 9 AM - 6 PM IST\n📖 Help Center: Check our FAQ section\n\nWhat specific issue can I help you with?";
    }
    
    // Default response
    const responses = [
      "That's an interesting question! Let me help you with that. Could you provide more details about what you're looking for?",
      "I'd be happy to assist you with that! Can you tell me more about your specific needs?",
      "Great question! To give you the best answer, could you share a bit more context?",
      "I'm here to help! Could you elaborate on what you'd like to know more about?",
      "That's something I can definitely help with! What specific information are you looking for?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      const response = await generateResponse(userMessage.text);
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== loadingMessage.id);
        return [...withoutLoading, {
          id: (Date.now() + 2).toString(),
          text: response,
          isUser: false,
          timestamp: new Date()
        }];
      });
    } catch (error) {
      // Remove loading message and add error response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== loadingMessage.id);
        return [...withoutLoading, {
          id: (Date.now() + 2).toString(),
          text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
          isUser: false,
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Find Traditional Artists",
    "Post Requirement", 
    "Learn About Traditional Arts",
    "Platform Features"
  ];

  const handleQuickAction = (action: string) => {
    setInputText(action);
    handleSendMessage();
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulse animation ring */}
          <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-amber-500 rounded-full animate-pulse opacity-30"></div>
          
          <button
            onClick={onToggle}
            className="relative bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <MessageCircle size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold">KalaaSetu Assistant</h3>
            <p className="text-xs text-amber-100">Online • Ready to help</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-white hover:text-amber-200 transition-colors p-1"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isUser 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-white border-2 border-amber-200 text-amber-600'
              }`}>
                {message.isUser ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`rounded-2xl px-4 py-3 ${
                message.isUser
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-amber-200 text-gray-800'
              }`}>
                {message.isLoading ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Thinking</span>
                    {generateTypingDots()}
                  </div>
                ) : (
                  <div className="text-sm whitespace-pre-line">
                    {message.text}
                  </div>
                )}
                <div className={`text-xs mt-1 ${
                  message.isUser ? 'text-amber-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-white border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1 rounded-full border border-amber-200 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
