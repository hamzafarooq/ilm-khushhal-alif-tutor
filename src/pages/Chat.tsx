
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { ChatInterface } from "@/components/ChatInterface";
import { ThreadSidebar } from "@/components/ThreadSidebar";
import { KnowledgeBaseTab } from "@/components/KnowledgeBaseTab";
import { LogOut, Plus, MessageSquare, BookOpen } from "lucide-react";

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge'>('chat');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleNewThread = () => {
    setCurrentThreadId(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">ALIF Tutor</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            السلام علیکم {user.user_metadata?.name || user.email}! 👋
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-4">
            <Button
              onClick={() => setActiveTab('chat')}
              variant={activeTab === 'chat' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button
              onClick={() => setActiveTab('knowledge')}
              variant={activeTab === 'knowledge' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Docs
            </Button>
          </div>

          {activeTab === 'chat' && (
            <Button
              onClick={handleNewThread}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              نیا سوال (New Thread)
            </Button>
          )}
        </div>

        {activeTab === 'chat' && (
          <ThreadSidebar 
            userId={user.id}
            currentThreadId={currentThreadId}
            onThreadSelect={setCurrentThreadId}
          />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'chat' ? (
          <ChatInterface 
            userId={user.id}
            threadId={currentThreadId}
            onThreadCreated={setCurrentThreadId}
          />
        ) : (
          <KnowledgeBaseTab />
        )}
      </div>
    </div>
  );
};

export default Chat;
