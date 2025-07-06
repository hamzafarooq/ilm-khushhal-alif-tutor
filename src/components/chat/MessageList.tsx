
import { useRef, useEffect } from "react";
import { MessageWithSources } from "./MessageWithSources";

interface Source {
  id: string;
  title: string;
  excerpt: string;
  page?: number;
  document: string;
  relevanceScore: number;
}

interface Message {
  id: string;
  content: string;
  is_user: boolean;
  created_at: string;
  sources?: Source[];
}

interface MessageListProps {
  messages: Message[];
  currentResponse: string;
  isTyping: boolean;
}

export const MessageList = ({ messages, currentResponse, isTyping }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentResponse]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-full inline-block mb-4">
            <div className="w-12 h-12 text-white flex items-center justify-center">
              📚
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">السلام علیکم!</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            میں ALIF ہوں، آپ کا اردو AI استاد۔ مجھ سے کوئی بھی سوال پوچھیں!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            I'm ALIF, your Urdu AI tutor. Ask me anything!
          </p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg inline-block">
            <p className="text-xs text-blue-700">
              💡 Upload documents in the "Docs" tab for more accurate, source-based answers
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.is_user ? 'justify-end' : 'justify-start'}`}
        >
          <MessageWithSources message={message} />
        </div>
      ))}

      {/* Current streaming response */}
      {currentResponse && (
        <div className="flex justify-start">
          <MessageWithSources 
            message={{
              id: 'streaming',
              content: currentResponse,
              is_user: false,
              created_at: new Date().toISOString()
            }}
          />
        </div>
      )}

      {/* Typing indicator */}
      {isTyping && !currentResponse && (
        <div className="flex justify-start">
          <div className="bg-white text-gray-800 shadow-sm border px-6 py-4 rounded-2xl">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
