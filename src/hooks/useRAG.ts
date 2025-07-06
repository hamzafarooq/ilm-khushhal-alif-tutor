
import { useState } from 'react';

interface Source {
  id: string;
  title: string;
  excerpt: string;
  page?: number;
  document: string;
  relevanceScore: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'ready';
}

// Mock knowledge base content
const mockKnowledgeBase = {
  'urdu grammar': {
    document: 'Urdu Grammar Basics.pdf',
    page: 15,
    content: 'اردو میں فعل کی تین اقسام ہیں: ماضی، حال، اور مستقبل۔ فعل ماضی وہ ہے جو گزرے ہوئے وقت کا اظہار کرتا ہے۔'
  },
  'islamic history': {
    document: 'Islamic History Textbook.pdf',  
    page: 42,
    content: 'The golden age of Islam (8th-13th centuries) was marked by significant advances in science, mathematics, medicine, and philosophy. اسلام کا سنہری دور علم و فن کی ترقی کا زمانہ تھا۔'
  },
  'quran translation': {
    document: 'Quran Translation & Commentary.pdf',
    page: 127,
    content: 'The Quran emphasizes the importance of knowledge and learning. "اقرأ" (Read) was the first word revealed, highlighting the significance of education in Islam.'
  },
  'pakistani culture': {
    document: 'Pakistani Culture & Traditions.docx',
    page: 8,
    content: 'Pakistani culture is a rich blend of various traditions including Punjabi, Sindhi, Balochi, and Pashtun influences. The diversity is reflected in language, food, music, and festivals.'
  }
};

export const useRAG = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const findRelevantSources = (query: string): Source[] => {
    const sources: Source[] = [];
    const queryLower = query.toLowerCase();

    // Simple keyword matching for demo purposes
    Object.entries(mockKnowledgeBase).forEach(([key, value]) => {
      const keywords = key.split(' ');
      const hasMatch = keywords.some(keyword => 
        queryLower.includes(keyword) || 
        queryLower.includes('grammar') && key.includes('grammar') ||
        queryLower.includes('history') && key.includes('history') ||
        queryLower.includes('quran') && key.includes('quran') ||
        queryLower.includes('culture') && key.includes('culture') ||
        queryLower.includes('pakistan') && key.includes('pakistani')
      );

      if (hasMatch) {
        sources.push({
          id: key,
          title: key.charAt(0).toUpperCase() + key.slice(1),
          excerpt: value.content,
          page: value.page,
          document: value.document,
          relevanceScore: Math.random() * 0.3 + 0.7 // Mock relevance score
        });
      }
    });

    // Always add at least one source for demo if we have documents
    if (sources.length === 0 && documents.length > 0) {
      const randomDoc = documents[Math.floor(Math.random() * documents.length)];
      sources.push({
        id: 'general',
        title: 'General Knowledge',
        excerpt: 'Based on the uploaded educational materials, here is relevant information about your question.',
        document: randomDoc.name,
        relevanceScore: 0.75
      });
    }

    return sources.slice(0, 3); // Return top 3 sources
  };

  const enhanceResponseWithRAG = (response: string, query: string) => {
    const sources = findRelevantSources(query);
    return { response, sources };
  };

  return {
    documents,
    setDocuments,
    findRelevantSources,
    enhanceResponseWithRAG
  };
};
