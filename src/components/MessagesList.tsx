'use client';

import { useChat } from '@/context/ChatContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessagesList = () => {
  const { messages, isLoading, messagesEndRef } = useChat();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 pb-20 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[280px] px-4 py-3 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-[#eb8401] text-white rounded-br-md'
                : 'bg-white text-gray-900 border border-gray-100 rounded-bl-md shadow-sm'
            }`}
          >
            <div className="text-sm leading-relaxed prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="mb-2 last:mb-0" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-1" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            <p
              className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
              }`}
            >
              {message.timestamp.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#eb8401] rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-[#eb8401] rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              />
              <div
                className="w-2 h-2 bg-[#eb8401] rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;

