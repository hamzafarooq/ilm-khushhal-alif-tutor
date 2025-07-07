
interface AresSearchResult {
  query: string;
  results: any[];
  sources?: string[];
  responseText?: string;
  sourceLinks?: Array<{
    title: string;
    url: string;
    snippet?: string;
  }>;
}

export const searchWithAres = async (query: string): Promise<AresSearchResult | null> => {
  try {
    console.log('Searching with ARES:', query);
    
    const response = await fetch(`https://${import.meta.env.VITE_PROJECT_ID}.functions.supabase.co/ares-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`ARES search failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching with ARES:', error);
    return null;
  }
};
