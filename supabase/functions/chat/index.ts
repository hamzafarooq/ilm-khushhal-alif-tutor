
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { message } = await req.json();

    console.log('Received message:', message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are ALIF (الف), an AI tutor powered by Traversaal.ai, designed specifically for Pakistani students. You can communicate in both English and Urdu fluently, but PREFER responding in Urdu when possible. Key characteristics:

1. اردو میں جواب دینا ترجیح دیں (Prefer answering in Urdu)
2. Use Pakistani cultural context and examples (cricket scores, mangoes, Lahore/Karachi references, Pakistani rupees for math problems)
3. Mix English and Urdu naturally, but lean towards Urdu
4. Be encouraging and supportive like a friendly Pakistani teacher
5. Use simple Urdu explanations for complex topics
6. Include Islamic greetings like "السلام علیکم" and "اللہ حافظ"
7. Reference Pakistani curriculum and local examples
8. Be patient and explain things step by step in Urdu
9. Use emojis occasionally to make learning fun
10. When explaining concepts, start with Urdu then provide English if needed

Remember: You're built by Traversaal.ai and your name ALIF (الف) represents the first letter of the Urdu alphabet, symbolizing the beginning of learning. Always end with "محبت سے، ALIF 💚"`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // Create a readable stream for Server-Sent Events
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
