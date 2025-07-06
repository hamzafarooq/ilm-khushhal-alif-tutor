
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Book, GraduationCap, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'ready';
}

interface DocumentUploadProps {
  onDocumentsChange?: (documents: Document[]) => void;
}

export const DocumentUpload = ({ onDocumentsChange }: DocumentUploadProps) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Urdu Grammar Basics.pdf',
      type: 'pdf',
      size: '2.3 MB',
      uploadDate: '2025-01-05',
      status: 'ready'
    },
    {
      id: '2',
      name: 'Islamic History Textbook.pdf',
      type: 'pdf',
      size: '4.1 MB',
      uploadDate: '2025-01-04',
      status: 'ready'
    },
    {
      id: '3',
      name: 'Quran Translation & Commentary.pdf',
      type: 'pdf',
      size: '8.7 MB',
      uploadDate: '2025-01-03',
      status: 'ready'
    },
    {
      id: '4',
      name: 'Pakistani Culture & Traditions.docx',
      type: 'docx',
      size: '1.9 MB',
      uploadDate: '2025-01-02',
      status: 'ready'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newDoc: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'docx',
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing'
      };

      setDocuments(prev => {
        const updated = [...prev, newDoc];
        onDocumentsChange?.(updated);
        return updated;
      });

      // Simulate processing
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDoc.id ? { ...doc, status: 'ready' } : doc
          )
        );
        toast({
          title: "Document Processed",
          description: `${file.name} is now ready for Q&A`,
        });
      }, 2000);
    });

    toast({
      title: "Upload Started",
      description: `Processing ${files.length} document(s)...`,
    });
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => {
      const updated = prev.filter(doc => doc.id !== id);
      onDocumentsChange?.(updated);
      return updated;
    });
    toast({
      title: "Document Removed",
      description: "Document has been removed from the knowledge base",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx': return <Book className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <GraduationCap className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-900">Knowledge Base</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Upload textbooks and documents to enhance ALIF's knowledge for more accurate answers.
        </p>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Drop files here or click to upload
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button
            onClick={() => document.getElementById('file-upload')?.click()}
            variant="outline"
            size="sm"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Supports PDF, DOC, DOCX, TXT files up to 10MB each
          </p>
        </div>
      </div>

      {/* Document List */}
      {documents.length > 0 && (
        <div className="bg-white rounded-lg border p-6">
          <h4 className="font-medium text-gray-900 mb-4">
            Uploaded Documents ({documents.length})
          </h4>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1">
                  {getDocumentIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {doc.size} • Uploaded {doc.uploadDate}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status === 'ready' ? 'Ready' : doc.status === 'processing' ? 'Processing...' : 'Uploaded'}
                  </span>
                </div>
                <Button
                  onClick={() => removeDocument(doc.id)}
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
