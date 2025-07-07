
import { ExternalLink, Book, FileText, Globe } from 'lucide-react';

interface Source {
  id: string;
  title: string;
  excerpt?: string;
  snippet?: string;
  page?: number;
  document?: string;
  url?: string;
  relevanceScore: number;
}

interface SourceAttributionProps {
  sources: Source[];
}

export const SourceAttribution = ({ sources }: SourceAttributionProps) => {
  if (!sources || sources.length === 0) return null;

  const handleSourceClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex items-center space-x-2 mb-3">
        <Globe className="w-4 h-4 text-emerald-600" />
        <span className="text-sm font-medium text-gray-700">Sources</span>
      </div>
      
      <div className="space-y-2">
        {sources.map((source, index) => (
          <div key={source.id} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {source.url ? <Globe className="w-3 h-3 text-emerald-600" /> : <FileText className="w-3 h-3 text-emerald-600" />}
                  <span className="text-xs font-medium text-emerald-800">
                    {source.document || source.title || `Source ${index + 1}`}
                    {source.page && ` - Page ${source.page}`}
                  </span>
                  <span className="text-xs bg-emerald-200 text-emerald-800 px-1 rounded">
                    {Math.round(source.relevanceScore * 100)}% match
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  "{source.excerpt || source.snippet || 'Source information'}"
                </p>
                {source.url && (
                  <a 
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 underline break-all font-medium"
                  >
                    🔗 {source.url}
                  </a>
                )}
              </div>
              {source.url && (
                <button 
                  onClick={() => handleSourceClick(source.url || '')}
                  className="ml-2 text-emerald-600 hover:text-emerald-800 p-1 rounded hover:bg-emerald-100 transition-colors"
                  title="Open source link"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        💡 {sources.some(s => s.url) ? 'Click the link icon or blue links to visit sources' : 'Answers are generated using content from your uploaded documents'}
      </p>
    </div>
  );
};
