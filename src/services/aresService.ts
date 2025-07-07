
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
    
    const response = await fetch(`https://tqrlxdvmpfjfugrwbspx.functions.supabase.co/ares-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcmx4ZHZtcGZqZnVncndic3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODA0MTksImV4cCI6MjA2NzM1NjQxOX0.serTY0x1SYdNbe40omRovxcGhepPov1I9DPoH-pjlEY`,
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
