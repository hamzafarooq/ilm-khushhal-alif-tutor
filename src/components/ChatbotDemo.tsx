
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
  language: 'en' | 'ur';
}

export const ChatbotDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "السلام علیکم! I'm ALIF, your AI tutor. Ask me anything in English or Urdu!",
      isUser: false,
      language: 'en'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Predefined responses for demo purposes
  const demoResponses: Record<string, { text: string; language: 'en' | 'ur' }> = {
    "photosynthesis": {
      text: "Photosynthesis (فوٹو سنتھیسس) is how plants make their food! Just like how we eat rice and roti for energy, plants use sunlight, water, and carbon dioxide to make glucose. It's like cooking - but plants use the sun as their stove! 🌱☀️",
      language: 'en'
    },
    "urdu mein samjhao": {
      text: "بالکل! میں آپ کو اردو میں سمجھا سکتا ہوں۔ کیا آپ کو ریاضی، سائنس، یا انگریزی میں مدد چاہیے؟ میں پاکستانی نصاب کے مطابق آپ کی رہنمائی کر سکتا ہوں۔",
      language: 'ur'
    },
    "math help": {
      text: "I'd love to help with math! مجھے ریاضی پڑھانے میں بہت مزہ آتا ہے۔ Whether it's addition (جمع), subtraction (تفریق), or multiplication (ضرب), I can explain using examples from cricket scores or counting mangoes! What topic do you need help with?",
      language: 'en'
    },
    "default": {
      text: "That's a great question! میں سمجھ گیا ہوں۔ As your AI tutor, I can help you with any subject using examples from Pakistani culture. Try asking about math, science, or any school topic!",
      language: 'en'
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      language: 'en'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const inputLower = input.toLowerCase();
      let response = demoResponses.default;

      if (inputLower.includes("photosynthesis")) {
        response = demoResponses.photosynthesis;
      } else if (inputLower.includes("urdu") || inputLower.includes("اردو")) {
        response = demoResponses["urdu mein samjhao"];
      } else if (inputLower.includes("math") || inputLower.includes("ریاضی")) {
        response = demoResponses["math help"];
      }

      const aiMessage: Message = {
        text: response.text,
        isUser: false,
        language: response.language
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything in English or Urdu..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
        />
        <Button
          onClick={handleSend}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-3">
        Try: "Explain photosynthesis" or "urdu mein samjhao" or "math help"
      </p>
    </div>
  );
};
