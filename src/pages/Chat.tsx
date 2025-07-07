
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { ChatInterface } from "@/components/ChatInterface";
import { ThreadSidebar } from "@/components/ThreadSidebar";
import { KnowledgeBaseTab } from "@/components/KnowledgeBaseTab";
import { SubjectSelection } from "@/components/SubjectSelection";
import { LogOut, Plus, MessageSquare, BookOpen, ArrowLeft } from "lucide-react";

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge'>('chat');
  const [showSubjectSelection, setShowSubjectSelection] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
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
    setShowSubjectSelection(true);
    setSelectedSubject("");
    setSelectedGrade("");
  };

  const handleSubjectSelection = (subject: string, grade: string) => {
    setSelectedSubject(subject);
    setSelectedGrade(grade);
    setShowSubjectSelection(false);
  };

  const handleBackToSelection = () => {
    setShowSubjectSelection(true);
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

  // Show subject selection screen
  if (showSubjectSelection) {
    return <SubjectSelection onSelectionComplete={handleSubjectSelection} />;
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

          {/* Current Selection Display */}
          {selectedSubject && selectedGrade && (
            <div className="bg-emerald-50 p-3 rounded-lg mb-4 border border-emerald-200">
              <div className="text-sm font-medium text-emerald-800 mb-1">Current Session:</div>
              <div className="text-sm text-emerald-700">
                {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} - {selectedGrade.charAt(0).toUpperCase() + selectedGrade.slice(1)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToSelection}
                className="mt-2 text-emerald-600 hover:text-emerald-800 p-0 h-auto"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Change Subject
              </Button>
            </div>
          )}

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
            selectedSubject={selectedSubject}
            selectedGrade={selectedGrade}
          />
        ) : (
          <KnowledgeBaseTab />
        )}
      </div>
    </div>
  );
};

export default Chat;
