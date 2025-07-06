
import { DocumentUpload } from './DocumentUpload';
import { useRAG } from '@/hooks/useRAG';

export const KnowledgeBaseTab = () => {
  const { documents, setDocuments } = useRAG();

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Base</h2>
          <p className="text-gray-600">
            Upload textbooks and educational materials to enhance ALIF's ability to provide accurate, source-based answers.
          </p>
        </div>
        
        <DocumentUpload onDocumentsChange={setDocuments} />
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">How RAG Works</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Upload your textbooks and educational materials</li>
            <li>• ALIF processes and indexes the content</li>
            <li>• When you ask questions, ALIF searches relevant sources</li>
            <li>• Answers include citations and excerpts from your documents</li>
            <li>• Get more accurate, context-aware responses</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
