
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  text: string;
  isUser: boolean;
  language: 'en' | 'ur';
}

export const ChatbotDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "السلام علیکم! I'm ALIF (الف), your AI tutor powered by Traversaal.ai. Ask me anything in English or Urdu!",
      isUser: false,
      language: 'en'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

    try {
      console.log('Sending message to ALIF:', currentInput);
      
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: currentInput }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Received response from ALIF:', data);

      const aiMessage: Message = {
        text: data.message || "Sorry, I couldn't process that. Please try again!",
        isUser: false,
        language: 'en'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling ALIF:', error);
      
      const errorMessage: Message = {
        text: "معذرت! Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        language: 'en'
      };

      setMessages(prev => [...prev, errorMessage]);
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
          <h3 className="font-bold text-gray-900">ALIF Tutor (الف)</h3>
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

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
          placeholder="Ask me anything in English or Urdu..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          disabled={isTyping}
        />
        <Button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-3">
        Try: "Explain photosynthesis" or "urdu mein samjhao" or "help with math"
      </p>
    </div>
  );
};
