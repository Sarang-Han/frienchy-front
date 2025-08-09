'use client';

import { useChatLogic } from '@/hooks/useChatLogic';
import Header from './Header';
import WelcomeSection from './WelcomeSection';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import TipsModal from './TipsModal';

const ChatInterface = () => {
  const {
    messages,
    inputValue,
    isLoading,
    showTipsModal,
    messagesEndRef,
    setInputValue,
    setShowTipsModal,
    sendMessage,
    handleKeyPress,
    handleQuickKeyword,
    handleTipSelect
  } = useChatLogic();

  const username = "username"; // TODO: 실제 사용자명으로 대체

  const handleMenuClick = () => {
    // TODO: 메뉴 사이드바 열기
    console.log('Menu clicked');
  };

  const handleSettingsClick = () => {
    // TODO: 설정 페이지 열기
    console.log('Settings clicked');
  };

  return (
    <div className={`flex flex-col flex-1 relative ${showTipsModal ? 'bg-gray-50' : 'bg-gray-50'}`}>
      <Header 
        onMenuClick={handleMenuClick}
        onSettingsClick={handleSettingsClick}
        isModalOpen={showTipsModal}
      />

  <div className="pt-16 flex-1 flex flex-col">
        {messages.length === 0 ? (
          <WelcomeSection
            username={username}
            onQuickKeyword={handleQuickKeyword}
            onShowTips={() => setShowTipsModal(true)}
          />
        ) : (
          <MessagesList
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
        )}
      </div>

      <MessageInput
        inputValue={inputValue}
        isLoading={isLoading}
        onInputChange={setInputValue}
        onKeyPress={handleKeyPress}
        onSendMessage={() => sendMessage()}
      />

      <TipsModal
        isOpen={showTipsModal}
        onClose={() => setShowTipsModal(false)}
        onTipSelect={handleTipSelect}
      />
    </div>
  );
};

export default ChatInterface;