'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useChatLogic } from '@/hooks/useChatLogic';

// useChatLogic 훅의 반환 타입을 정의합니다.
type ChatLogicReturn = ReturnType<typeof useChatLogic>;

// Context를 생성합니다. 초기값은 null로 설정하고, 사용할 때 Provider를 통해 값을 주입합니다.
const ChatContext = createContext<ChatLogicReturn | null>(null);

// Context Provider 컴포넌트를 정의합니다.
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const chatLogic = useChatLogic();
  return (
    <ChatContext.Provider value={chatLogic}>
      {children}
    </ChatContext.Provider>
  );
};

// Context를 쉽게 사용하기 위한 커스텀 훅을 정의합니다.
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
