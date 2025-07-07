
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Globe, Search } from "lucide-react";
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
  onSend: (withSearch?: boolean) => void;
  isTyping: boolean;
  messages: Message[];
  useInternetSearch?: boolean;
  setUseInternetSearch?: (value: boolean) => void;
  onStreamingText?: (text: string, isComplete: boolean) => void;
  onVoiceMessage?: (event: any) => void;
  selectedSubject?: string;
  selectedGrade?: string;
}

export const ChatInput = ({ 
  input, 
  setInput, 
  onSend, 
  isTyping, 
  messages, 
  useInternetSearch = false,
  setUseInternetSearch,
  onStreamingText,
  onVoiceMessage,
  selectedSubject,
  selectedGrade
}: ChatInputProps) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleVoiceMessageInternal = (event: any) => {
    console.log('Voice event received in ChatInput:', event);
    onVoiceMessage?.(event);
  };

  const handleTextUpdate = (text: string, isComplete: boolean) => {
    console.log('Text update in ChatInput:', { text: text.substring(0, 50) + '...', isComplete });
    onStreamingText?.(text, isComplete);
  };

  const handleSendWithSearch = () => {
    onSend(true);
  };

  return (
    <div className="bg-white border-t p-6">
      <div className="space-y-4">
        {/* Internet Search Toggle */}
        {setUseInternetSearch && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant={useInternetSearch ? "default" : "outline"}
              size="sm"
              onClick={() => setUseInternetSearch(!useInternetSearch)}
              className="text-xs"
            >
              <Globe className="w-3 h-3 mr-1" />
              Internet Search
            </Button>
          </div>
        )}

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
          
          {/* Search button for one-time search */}
          <Button
            onClick={handleSendWithSearch}
            disabled={isTyping || !input.trim() || isVoiceActive}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl disabled:opacity-50"
            title="Send with Internet Search"
          >
            <Search className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => onSend()}
            disabled={isTyping || !input.trim() || isVoiceActive}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <RealtimeVoiceChat
          onMessage={handleVoiceMessageInternal}
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
        ALIF - Powered by Traversaal.ai • اردو میں سیکھیں • {useInternetSearch && '🌐 Internet Search Enabled'}
      </p>
    </div>
  );
};
