
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { StreamingVoiceChat, useStreamingVoiceResponse } from "@/components/StreamingVoiceChat";

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
}

export const ChatInput = ({ input, setInput, onSend, isTyping, messages }: ChatInputProps) => {
  const [isAudioMode, setIsAudioMode] = useState(false);
  const { playResponseAudio } = useStreamingVoiceResponse();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleSpeechResult = (text: string) => {
    setInput(text);
  };

  // Play audio for the last AI response when it's completed
  const lastAIMessage = messages.filter(m => !m.is_user).pop();
  
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
            disabled={isTyping}
          />
          <Button
            onClick={onSend}
            disabled={isTyping || !input.trim()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <StreamingVoiceChat
          onSpeechResult={handleSpeechResult}
          isAudioMode={isAudioMode}
          setIsAudioMode={setIsAudioMode}
        />

        {isAudioMode && (
          <div className="text-center">
            <p className="text-xs text-emerald-600 font-medium">
              🎤 Voice Mode Active - Responses will be spoken aloud
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
