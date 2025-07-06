
import ReactMarkdown from 'react-markdown';
import { SourceAttribution } from '../SourceAttribution';

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

interface MessageWithSourcesProps {
  message: Message;
}

// Helper function to convert URLs to clickable links
const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export const MessageWithSources = ({ message }: MessageWithSourcesProps) => {
  return (
    <div
      className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl ${
        message.is_user
          ? 'bg-emerald-500 text-white'
          : 'bg-white text-gray-800 shadow-sm border'
      }`}
    >
      {message.is_user ? (
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {renderTextWithLinks(message.content)}
        </p>
      ) : (
        <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-100 prose-pre:border prose-pre:rounded-lg prose-a:text-blue-600 hover:prose-a:text-blue-800">
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
      )}
      
      {!message.is_user && message.sources && (
        <SourceAttribution sources={message.sources} />
      )}
    </div>
  );
};
