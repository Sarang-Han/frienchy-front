'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useChat } from '@/context/ChatContext';

const MessageInput = () => {
  const { 
    inputValue, 
    isLoading, 
    setInputValue, 
    handleKeyPress, 
    sendMessage 
  } = useChat();

  return (
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
  );
};

export default MessageInput;
