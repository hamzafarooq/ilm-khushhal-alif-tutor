
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ElevenLabs voice mapping
const voiceMapping: Record<string, string> = {
  'Aria': '9BWtsMINqrJLrRacOk9x',
  'Roger': 'CwhRBWXzGAHq8TQ4Fs17',
  'Sarah': 'EXAVITQu4vr4xnSDxMaL',
  'Laura': 'FGY2WhTYpPnrIDTdsKH5',
  'Charlie': 'IKne3meq5aSn9XLyUdCD'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voiceId = 'Aria' } = await req.json()

    if (!text) {
      throw new Error('Text is required')
    }

    const elevenLabsVoiceId = voiceMapping[voiceId] || voiceMapping['Aria']

    // Call ElevenLabs Text-to-Speech API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': Deno.env.get('elevenlab_api_key') || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      throw new Error(`ElevenLabs API error: ${response.status}`)
    }

    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer()
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    )

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Text-to-speech error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
