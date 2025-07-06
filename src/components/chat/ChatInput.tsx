
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { RealtimeVoiceChat } from "@/components/RealtimeVoiceChat";

interface Message {
  id: string;
  content: string;
  is_user: boolean;
  created_at: string;
}

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isTyping: boolean;
  messages: Message[];
  onStreamingText?: (text: string, isComplete: boolean) => void;
}

export const ChatInput = ({ input, setInput, onSend, isTyping, messages, onStreamingText }: ChatInputProps) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleVoiceMessage = (event: any) => {
    console.log('Voice event received in ChatInput:', event);
    // Handle different types of voice events from OpenAI
    if (event.type === 'conversation.item.created' && event.item.content) {
      // Handle transcribed text or AI responses
      const content = event.item.content.find((c: any) => c.type === 'text');
      if (content && event.item.role === 'assistant') {
        console.log('AI response received in ChatInput:', content.text);
      }
    }
  };

  const handleTextUpdate = (text: string, isComplete: boolean) => {
    console.log('Text update in ChatInput:', { text: text.substring(0, 50) + '...', isComplete });
    onStreamingText?.(text, isComplete);
  };

  return (
    <div className="bg-white border-t p-6">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اردو یا انگریزی میں سوال پوچھیں... Ask in Urdu or English..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
            rows={1}
            disabled={isTyping || isVoiceActive}
          />
          <Button
            onClick={onSend}
            disabled={isTyping || !input.trim() || isVoiceActive}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <RealtimeVoiceChat
          onMessage={handleVoiceMessage}
          isActive={isVoiceActive}
          setIsActive={setIsVoiceActive}
          onTextUpdate={handleTextUpdate}
        />

        {isVoiceActive && (
          <div className="text-center">
            <p className="text-xs text-emerald-600 font-medium">
              🎤 Real-time Voice Chat Active - Speak naturally for instant AI responses
            </p>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500 text-center mt-3">
        ALIF - Powered by Traversaal.ai • اردو میں سیکھیں
      </p>
    </div>
  );
};
