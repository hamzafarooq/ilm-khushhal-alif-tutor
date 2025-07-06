
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";

interface ChatInterfaceProps {
  userId: string;
  threadId: string | null;
  onThreadCreated: (threadId: string) => void;
}

export const ChatInterface = ({ userId, threadId, onThreadCreated }: ChatInterfaceProps) => {
  const { 
    messages, 
    input, 
    setInput, 
    isTyping, 
    currentResponse, 
    handleSend,
    handleVoiceMessage,
    handleStreamingText
  } = useChat(userId, threadId, onThreadCreated);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      
      <MessageList 
        messages={messages}
        currentResponse={currentResponse}
        isTyping={isTyping}
      />
      
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isTyping={isTyping}
        messages={messages}
        onStreamingText={handleStreamingText}
        onVoiceMessage={handleVoiceMessage}
      />
    </div>
  );
};
