import { useState, useEffect } from "react";
import { loadMessages, createThread, saveMessage, callAlifAPI } from "@/services/chatService";
import { useRAG } from "./useRAG";

interface Source {
  id: string;
  title: string;
  excerpt: string;
  page?: number;
  document: string;
  relevanceScore: number;
}

interface Message {
  id: string;
  content: string;
  is_user: boolean;
  created_at: string;
  sources?: Source[];
}

export const useChat = (userId: string, threadId: string | null, onThreadCreated: (threadId: string) => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [accumulatedVoiceText, setAccumulatedVoiceText] = useState("");
  const { enhanceResponseWithRAG } = useRAG();

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

  const handleVoiceMessage = async (event: any) => {
    console.log('Voice event received in useChat:', event);
    
    let currentThreadId = threadId;

    // Handle user's spoken input
    if (event.type === 'conversation.item.created' && 
        event.item.content && 
        event.item.role === 'user') {
      
      const content = event.item.content.find((c: any) => c.type === 'input_text');
      if (content && content.text) {
        console.log('User voice input received:', content.text);
        
        // Create new thread if needed
        if (!currentThreadId) {
          currentThreadId = await createThread(userId, content.text);
          if (currentThreadId) {
            onThreadCreated(currentThreadId);
          }
        }

        // Save user message from voice
        if (currentThreadId) {
          const savedUserMessage = await saveMessage(currentThreadId, content.text, true);
          if (savedUserMessage) {
            setMessages(prev => [...prev, savedUserMessage]);
          }
        }
      }
    }
  };

  const handleStreamingText = async (text: string, isComplete: boolean) => {
    console.log('Streaming text in useChat:', { text: text.substring(0, 50) + '...', isComplete, fullLength: text.length });
    
    // Always update the accumulated text for display
    setAccumulatedVoiceText(text);
    setCurrentResponse(text);
    
    if (isComplete && text.trim()) {
      // Save the complete AI response to database with RAG enhancement
      let currentThreadId = threadId;
      
      if (!currentThreadId) {
        // This shouldn't happen in voice mode, but just in case
        currentThreadId = await createThread(userId, text.substring(0, 50));
        if (currentThreadId) {
          onThreadCreated(currentThreadId);
        }
      }

      if (currentThreadId) {
        // Get the last user message to find relevant sources
        const lastUserMessage = messages.filter(m => m.is_user).pop();
        const query = lastUserMessage?.content || '';
        
        // Enhance response with RAG
        const { sources } = enhanceResponseWithRAG(text, query);
        
        const savedAIMessage = await saveMessage(currentThreadId, text, false);
        if (savedAIMessage) {
          // Add sources to the message
          const messageWithSources = { ...savedAIMessage, sources };
          setMessages(prev => [...prev, messageWithSources]);
          console.log('Saved complete voice AI response with sources to database:', text.substring(0, 100) + '...');
        }
      }
      
      // Clear streaming states
      setCurrentResponse("");
      setStreamingText("");
      setAccumulatedVoiceText("");
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

        // Save AI response with RAG enhancement
        if (currentThreadId && fullResponse) {
          const { sources } = enhanceResponseWithRAG(fullResponse, userMessage);
          
          const savedAIMessage = await saveMessage(currentThreadId, fullResponse, false);
          if (savedAIMessage) {
            const messageWithSources = { ...savedAIMessage, sources };
            setMessages(prev => [...prev, messageWithSources]);
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
    handleSend,
    handleVoiceMessage,
    handleStreamingText
  };
};
