
import { supabase } from "@/integrations/supabase/client";
import { searchWithAres } from "./aresService";

interface Message {
  id: string;
  content: string;
  is_user: boolean;
  created_at: string;
}

export const loadMessages = async (threadId: string): Promise<Message[]> => {
  if (!threadId) return [];

  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
};

export const createThread = async (userId: string, firstMessage: string): Promise<string | null> => {
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

export const saveMessage = async (threadId: string, content: string, isUser: boolean): Promise<Message | null> => {
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

export const callAlifAPI = async (message: string, includeSearch: boolean = false): Promise<ReadableStream | null> => {
  try {
    console.log('Calling ALIF chat function with message:', message);
    
    let searchResults = null;
    let searchSources = null;
    
    // Perform internet search if requested
    if (includeSearch) {
      console.log('Performing internet search...');
      const aresResult = await searchWithAres(message);
      if (aresResult) {
        searchResults = aresResult.results;
        searchSources = aresResult.sourceLinks || aresResult.sources;
      }
    }
    
    const requestBody = {
      message,
      searchResults: searchResults || null,
      searchSources: searchSources || null
    };
    
    const response = await fetch(`https://tqrlxdvmpfjfugrwbspx.functions.supabase.co/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcmx4ZHZtcGZqZnVncndic3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODA0MTksImV4cCI6MjA2NzM1NjQxOX0.serTY0x1SYdNbe40omRovxcGhepPov1I9DPoH-pjlEY`,
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.body;
  } catch (error) {
    console.error('Error calling ALIF:', error);
    return null;
  }
};
