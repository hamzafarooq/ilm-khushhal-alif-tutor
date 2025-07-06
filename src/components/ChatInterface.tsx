
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  is_user: boolean;
  created_at: string;
}

interface ChatInterfaceProps {
  userId: string;
  threadId: string | null;
  onThreadCreated: (threadId: string) => void;
}

export const ChatInterface = ({ userId, threadId, onThreadCreated }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadId) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [threadId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentResponse]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    if (!threadId) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const createThread = async (firstMessage: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_threads')
        .insert({
          user_id: userId,
          title: firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '')
        })
        .select()
        .single();

      if (error) throw error;
      return data?.id || null;
    } catch (error) {
      console.error('Error creating thread:', error);
      return null;
    }
  };

  const saveMessage = async (threadId: string, content: string, isUser: boolean) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          thread_id: threadId,
          content,
          is_user: isUser
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsTyping(true);
    setCurrentResponse("");

    let currentThreadId = threadId;

    // Create new thread if needed
    if (!currentThreadId) {
      currentThreadId = await createThread(userMessage);
      if (currentThreadId) {
        onThreadCreated(currentThreadId);
      }
    }

    // Save user message
    if (currentThreadId) {
      const savedUserMessage = await saveMessage(currentThreadId, userMessage, true);
      if (savedUserMessage) {
        setMessages(prev => [...prev, savedUserMessage]);
      }
    }

    try {
      console.log('Calling ALIF chat function with message:', userMessage);
      
      // Call the streaming chat function
      const response = await fetch(`https://tqrlxdvmpfjfugrwbspx.functions.supabase.co/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`,
        },
        body: JSON.stringify({ message: userMessage })
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
                  setCurrentResponse(fullResponse);
                }
              } catch (e) {
                // Skip invalid JSON
                console.log('Skipping invalid JSON:', data);
              }
            }
          }
        }
      }

      // Save AI response
      if (currentThreadId && fullResponse) {
        const savedAIMessage = await saveMessage(currentThreadId, fullResponse, false);
        if (savedAIMessage) {
          setMessages(prev => [...prev, savedAIMessage]);
        }
      }

    } catch (error) {
      console.error('Error calling ALIF:', error);
      const errorMessage = "معذرت! میں ابھی جواب نہیں دے سکتا۔ برائے کرم دوبارہ کوشش کریں۔";
      
      if (currentThreadId) {
        const savedErrorMessage = await saveMessage(currentThreadId, errorMessage, false);
        if (savedErrorMessage) {
          setMessages(prev => [...prev, savedErrorMessage]);
        }
      }
    } finally {
      setIsTyping(false);
      setCurrentResponse("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-full mr-3">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">ALIF Tutor (الف)</h2>
            <p className="text-sm text-gray-600">آپ کا ذاتی اردو استاد • Your Personal Urdu Tutor</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {!threadId && messages.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-full inline-block mb-4">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">السلام علیکم!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              میں ALIF ہوں، آپ کا اردو AI استاد۔ مجھ سے کوئی بھی سوال پوچھیں!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              I'm ALIF, your Urdu AI tutor. Ask me anything!
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.is_user ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl ${
                message.is_user
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm border'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {/* Current streaming response */}
        {currentResponse && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-6 py-4 rounded-2xl bg-white text-gray-800 shadow-sm border">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {currentResponse}
              </p>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && !currentResponse && (
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

      {/* Input */}
      <div className="bg-white border-t p-6">
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
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          ALIF - Powered by Traversaal.ai • اردو میں سیکھیں
        </p>
      </div>
    </div>
  );
};
