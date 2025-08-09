'use client';

import { ChatProvider, useChat } from '@/context/ChatContext';
import Header from '@/components/Header';
import WelcomeSection from '@/components/WelcomeSection';
import MessagesList from '@/components/MessagesList';
import MessageInput from '@/components/MessageInput';
import TipsModal from '@/components/TipsModal';

// ChatUI 컴포넌트를 분리하여 ChatProvider 내부에서 상태를 사용하도록 합니다.
const ChatUI = () => {
  const { messages, showTipsModal } = useChat();
  const username = "username"; // TODO: 실제 사용자명으로 대체

  return (
    <div className={`flex flex-col flex-1 relative ${showTipsModal ? 'bg-gray-50' : 'bg-gray-50'}`}>
      <Header />
      <div className="pt-16 flex-1 flex flex-col">
        {messages.length === 0 ? (
          <WelcomeSection username={username} />
        ) : (
          <MessagesList />
        )}
      </div>
      <MessageInput />
      <TipsModal />
    </div>
  );
};

export default function Home() {
  return (
    <ChatProvider>
      <div className="mobile-container">
        <ChatUI />
        <div className="bottom-safe-area"></div>
      </div>
    </ChatProvider>
  );
}
