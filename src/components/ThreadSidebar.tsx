
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Thread {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ThreadSidebarProps {
  userId: string;
  currentThreadId: string | null;
  onThreadSelect: (threadId: string) => void;
}

export const ThreadSidebar = ({ userId, currentThreadId, onThreadSelect }: ThreadSidebarProps) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThreads();
  }, [userId]);

  const loadThreads = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_threads')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setThreads(data || []);
    } catch (error) {
      console.error('Error loading threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteThread = async (threadId: string) => {
    try {
      const { error } = await supabase
        .from('chat_threads')
        .delete()
        .eq('id', threadId);

      if (error) throw error;
      
      setThreads(threads.filter(thread => thread.id !== threadId));
      if (currentThreadId === threadId) {
        onThreadSelect('');
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Previous Conversations</h3>
      
      {threads.length === 0 ? (
        <div className="text-center text-gray-500 text-sm py-8">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>کوئی گفتگو نہیں</p>
          <p className="text-xs">No conversations yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className={`group p-3 rounded-lg cursor-pointer transition-colors ${
                currentThreadId === thread.id
                  ? 'bg-emerald-100 border-emerald-200'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onThreadSelect(thread.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {thread.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(thread.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1 h-6 w-6 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
