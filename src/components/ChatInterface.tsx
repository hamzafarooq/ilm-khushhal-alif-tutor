
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { SampleQuestions } from "@/components/SampleQuestions";
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

  const handleSampleQuestionSelect = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      
      <SampleQuestions 
        onQuestionSelect={handleSampleQuestionSelect}
        isVisible={messages.length === 0 && !currentResponse}
      />
      
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
