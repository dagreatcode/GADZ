import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Message {
  id: number;
  sender: string;
  receiver: string;
  content: string;
}

interface MessageContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
}

interface MessageProviderProps {
  children: ReactNode;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages([...messages, message]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};