
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const aresApiKey = Deno.env.get('ARES_API_KEY');
    
    if (!aresApiKey) {
      return new Response(
        JSON.stringify({ error: 'ARES API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Making ARES search request for query:', query);

    const response = await fetch('https://api-ares.traversaal.ai/live/predict', {
      method: 'POST',
      headers: {
        'x-api-key': aresApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: [query]
      }),
    });

    if (!response.ok) {
      console.error('ARES API error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: `ARES API error: ${response.status}` }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('ARES search successful');

    // Extract response text and source links
    const responseText = data?.data?.response_text || '';
    const sourceLinks = data?.data?.sources || [];
    
    // Format source links for better display
    const formattedSources = sourceLinks.map((source: any, index: number) => ({
      id: `source-${index}`,
      title: source.title || `Source ${index + 1}`,
      url: source.url || source.link || '',
      snippet: source.snippet || source.description || '',
      relevanceScore: 0.9 - (index * 0.1) // Mock relevance score based on order
    }));

    return new Response(
      JSON.stringify({
        query,
        results: data,
        sources: formattedSources,
        responseText,
        sourceLinks: formattedSources
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in ARES search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
