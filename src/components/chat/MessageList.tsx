import { useRef, useEffect } from "react";
import { MessageWithSources } from "./MessageWithSources";
import ReactMarkdown from 'react-markdown';

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
  streamingText?: string;
}

export const MessageList = ({ messages, currentResponse, isTyping, streamingText }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentResponse, streamingText]);

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

      {/* Show streaming text from voice chat */}
      {streamingText && (
        <div className="flex justify-start">
          <div className="max-w-xs lg:max-w-md px-6 py-4 rounded-2xl bg-blue-50 text-gray-800 shadow-sm border border-blue-200">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mt-1"></div>
              <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-100 prose-pre:border prose-pre:rounded-lg prose-a:text-blue-600 hover:prose-a:text-blue-800">
                <ReactMarkdown>
                  {streamingText}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Typing indicator */}
      {isTyping && !currentResponse && !streamingText && (
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
