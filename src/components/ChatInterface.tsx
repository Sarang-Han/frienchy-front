'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon, 
  QuestionMarkCircleIcon,
  Bars3Icon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const username = "username"; // TODO: 실제 사용자명으로 대체

  const quickKeywords = [
    "프랜차이즈 비용",
    "상권 분석",
    "가맹점 정보",
    "창업 절차"
  ];

  const tipCategories = [
    {
      title: "상권 분석",
      items: ["우리동네 유동인구", "상권 경쟁업체", "임대료 정보", "교통 접근성"]
    },
    {
      title: "프랜차이즈 정보",
      items: ["브랜드별 가맹비", "성공률 통계", "매출 데이터", "가맹점 현황"]
    },
    {
      title: "창업 준비",
      items: ["사업자등록", "인허가 절차", "자금 조달", "마케팅 전략"]
    }
  ];

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

  return (
    <div className="flex flex-col flex-1 bg-gray-50 relative">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-40 max-w-[414px] mx-auto">
        {/* Left - Menu Toggle */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors">
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
        
        {/* Center - Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">Frienchy</span>
        </div>
        
        {/* Right - Settings */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors">
          <EllipsisVerticalIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="pt-16 flex-1 flex flex-col">
      {/* Welcome Section */}
      {messages.length === 0 && (
        <div className="flex-1 px-6 pt-8 pb-12 overflow-y-auto">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-[#eb8401] rounded-full flex items-center justify-center mb-6 shadow-lg overflow-hidden border-2 border-white">
              <Image
                src="/pic.jpg"
                alt="Frienchy 챗봇 캐릭터"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
              {username} 님<br />
              무엇을 도와드릴까요?
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              궁금한 점을 물어보면 빠르게 해결해 드려요.
            </p>
          </div>

          {/* Quick Keywords */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {quickKeywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickKeyword(keyword)}
                  className="px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 hover:border-[#eb8401] transition-colors shadow-sm"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* Tips Button */}
          <button
            onClick={() => setShowTipsModal(true)}
            className="flex items-center space-x-2 text-[#eb8401] text-sm font-medium"
          >
            <QuestionMarkCircleIcon className="w-4 h-4" />
            <span>챗봇 이렇게 써보세요</span>
          </button>
        </div>
      )}

      {/* Messages Area */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[280px] px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-[#eb8401] text-white rounded-br-md'
                    : 'bg-white text-gray-900 border border-gray-100 rounded-bl-md shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#eb8401] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#eb8401] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-[#eb8401] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="궁금한 사항을 입력해 주세요"
            className="flex-1 pl-4 pr-4 py-2.5 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#eb8401] focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500 text-sm"
            rows={1}
            style={{ maxHeight: '100px' }}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 bg-[#eb8401] text-white rounded-2xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#eb8401] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center flex-shrink-0"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tips Modal */}
      {showTipsModal && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-end z-50"
          onClick={() => setShowTipsModal(false)}
        >
          <div 
            className="bg-white rounded-t-3xl w-full max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">궁금한 내용을 키워드로 선택해보세요</h2>
                <button
                  onClick={() => setShowTipsModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-gray-500 text-xl">×</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {tipCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{category.title}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {category.items.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          onClick={() => handleTipSelect(item)}
                          className="p-3 text-left bg-gray-50 rounded-xl hover:bg-[#eb8401] hover:text-white transition-colors text-sm"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ChatInterface;
