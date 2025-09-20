import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatBotContextType {
  isChatBotVisible: boolean;
  toggleChatBot: () => void;
  showChatBot: () => void;
  hideChatBot: () => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export const ChatBotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotVisible(prev => !prev);
  };

  const showChatBot = () => {
    setIsChatBotVisible(true);
  };

  const hideChatBot = () => {
    setIsChatBotVisible(false);
  };

  return (
    <ChatBotContext.Provider value={{
      isChatBotVisible,
      toggleChatBot,
      showChatBot,
      hideChatBot
    }}>
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (context === undefined) {
    throw new Error('useChatBot must be used within a ChatBotProvider');
  }
  return context;
};
