'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';

export const useChatLogic = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content?: string) => {
    const messageContent = content || inputValue;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // TODO: FastAPI 백엔드 연결
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `"${messageContent}"에 대한 프랜차이즈 창업 정보를 분석하고 있습니다. 공공데이터를 기반으로 맞춤 정보를 제공해드릴게요!`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickKeyword = (keyword: string) => {
    sendMessage(keyword);
  };

  const handleTipSelect = (tip: string) => {
    setInputValue(tip);
    setShowTipsModal(false);
  };

  return {
    // State
    messages,
    inputValue,
    isLoading,
    showTipsModal,
    messagesEndRef,
    
    // Actions
    setInputValue,
    setShowTipsModal,
    sendMessage,
    handleKeyPress,
    handleQuickKeyword,
    handleTipSelect
  };
};
