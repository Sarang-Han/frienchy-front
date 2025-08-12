'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '@/types/chat';

// API가 요구하는 메시지 형식
interface ApiMessage {
  role: 'user' | 'model';
  parts: string;
}

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

  const sendMessage = useCallback(async (content?: string) => {
    const messageContent = content || inputValue;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    // UI에 사용자 메시지 바로 추가
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // API 요청을 위해 메시지 형식 변환
      const history: ApiMessage[] = updatedMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: msg.content,
      }));
      
      // 마지막 메시지는 현재 입력이므로 history에서 제외하고 input으로 전달
      const currentMessage = history.pop(); 

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: currentMessage?.parts,
          history: history 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'API request failed');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `죄송합니다. 답변을 생성하는 데 문제가 발생했습니다.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

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
