
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { RealtimeVoiceChat } from "@/components/RealtimeVoiceChat";

interface Message {
  text: string;
  isUser: boolean;
  language: 'en' | 'ur';
}

export const ChatbotDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "السلام علیکم! I'm ALIF Tutor, powered by Traversaal.ai. Ask me anything in English or Urdu, or use voice chat for real-time conversation!",
      isUser: false,
      language: 'en'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [streamingText, setStreamingText] = useState('');

  const handleVoiceMessage = (event: any) => {
    console.log('Voice event received in demo:', event);
    
    // Handle different types of voice events
    if (event.type === 'conversation.item.created' && event.item.content) {
      const content = event.item.content.find((c: any) => c.type === 'text');
      if (content) {
        const newMessage: Message = {
          text: content.text,
          isUser: event.item.role === 'user',
          language: 'en'
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }
  };

  const handleStreamingText = (text: string, isComplete: boolean) => {
    console.log('Streaming text update:', { text: text.substring(0, 50) + '...', isComplete });
    
    if (isComplete && text.trim()) {
      // Add the complete message to the messages list and clear streaming
      const newMessage: Message = {
        text: text,
        isUser: false,
        language: 'en'
      };
      setMessages(prev => [...prev, newMessage]);
      setStreamingText('');
      console.log('Added complete message to history:', text.substring(0, 50) + '...');
    } else if (!isComplete) {
      // Update the streaming text
      setStreamingText(text);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      language: 'en'
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Add a placeholder message that will be updated with streaming content
    const placeholderMessage: Message = {
      text: "",
      isUser: false,
      language: 'en'
    };
    
    setMessages(prev => [...prev, placeholderMessage]);

    try {
      console.log('Sending message to ALIF Tutor:', currentInput);
      
      const response = await fetch(`https://tqrlxdvmpfjfugrwbspx.functions.supabase.co/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcmx4ZHZtcGZqZnVncndic3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODA0MTksImV4cCI6MjA2NzM1NjQxOX0.serTY0x1SYdNbe40omRovxcGhepPov1I9DPoH-pjlEY`,
        },
        body: JSON.stringify({ message: currentInput })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                break;
              }

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullResponse += parsed.content;
                  
                  // Update the last message with streaming content
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessageIndex = newMessages.length - 1;
                    if (lastMessageIndex >= 0 && !newMessages[lastMessageIndex].isUser) {
                      newMessages[lastMessageIndex] = {
                        ...newMessages[lastMessageIndex],
                        text: fullResponse
                      };
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                console.log('Skipping invalid JSON:', data);
              }
            }
          }
        }
      }

      console.log('Received full response from ALIF Tutor:', fullResponse);

      // Final update to ensure we have the complete response
      if (fullResponse) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessageIndex = newMessages.length - 1;
          if (lastMessageIndex >= 0 && !newMessages[lastMessageIndex].isUser) {
            newMessages[lastMessageIndex] = {
              ...newMessages[lastMessageIndex],
              text: fullResponse
            };
          }
          return newMessages;
        });
      } else {
        // If no response was received, update with error message
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessageIndex = newMessages.length - 1;
          if (lastMessageIndex >= 0 && !newMessages[lastMessageIndex].isUser) {
            newMessages[lastMessageIndex] = {
              ...newMessages[lastMessageIndex],
              text: "Sorry, I couldn't process that. Please try again!"
            };
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error calling ALIF Tutor:', error);
      
      // Update the placeholder message with error
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessageIndex = newMessages.length - 1;
        if (lastMessageIndex >= 0 && !newMessages[lastMessageIndex].isUser) {
          newMessages[lastMessageIndex] = {
            ...newMessages[lastMessageIndex],
            text: "معذرت! Sorry, I'm having trouble connecting right now. Please try again in a moment."
          };
        }
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-full mr-3">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">ALIF Tutor</h3>
          <p className="text-xs text-gray-500">Powered by Traversaal.ai</p>
        </div>
        <div className="ml-auto">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="h-80 overflow-y-auto mb-4 space-y-3 bg-gray-50 rounded-2xl p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.isUser
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm border'
              }`}
              style={{
                direction: message.language === 'ur' ? 'rtl' : 'ltr',
                textAlign: message.language === 'ur' ? 'right' : 'left'
              }}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Show streaming text from voice chat */}
        {streamingText && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 rounded-2xl bg-blue-50 text-gray-800 shadow-sm border border-blue-200">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mt-1"></div>
                <p className="text-sm leading-relaxed">{streamingText}</p>
              </div>
            </div>
          </div>
        )}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-sm border px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && !isVoiceActive && handleSend()}
            placeholder="Ask me anything in English or Urdu..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            disabled={isTyping || isVoiceActive}
          />
          <Button
            onClick={handleSend}
            disabled={isTyping || !input.trim() || isVoiceActive}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <RealtimeVoiceChat
          onMessage={handleVoiceMessage}
          isActive={isVoiceActive}
          setIsActive={setIsVoiceActive}
          onTextUpdate={handleStreamingText}
        />

        {isVoiceActive && (
          <div className="text-center">
            <p className="text-xs text-emerald-600 font-medium">
              🎤 Real-time Voice Chat Active - Speak naturally for instant responses
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center mt-3">
        Try: "Explain photosynthesis" or "urdu mein samjhao" or use real-time voice chat
      </p>
    </div>
  );
};
