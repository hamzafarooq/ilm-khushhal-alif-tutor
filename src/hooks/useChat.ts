
import { useState, useEffect } from "react";
import { loadMessages, createThread, saveMessage, callAlifAPI } from "@/services/chatService";

interface Message {
  id: string;
  content: string;
  is_user: boolean;
  created_at: string;
}

export const useChat = (userId: string, threadId: string | null, onThreadCreated: (threadId: string) => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");

  useEffect(() => {
    if (threadId) {
      loadChatMessages();
    } else {
      setMessages([]);
    }
  }, [threadId]);

  const loadChatMessages = async () => {
    if (!threadId) return;
    const loadedMessages = await loadMessages(threadId);
    setMessages(loadedMessages);
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
      currentThreadId = await createThread(userId, userMessage);
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
      const responseStream = await callAlifAPI(userMessage);
      
      if (responseStream) {
        // Handle streaming response
        const reader = responseStream.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

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
                console.log('Skipping invalid JSON:', data);
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

  return {
    messages,
    input,
    setInput,
    isTyping,
    currentResponse,
    handleSend
  };
};
