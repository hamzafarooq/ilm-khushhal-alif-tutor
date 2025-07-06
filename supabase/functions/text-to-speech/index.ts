
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Text-to-speech function called with method:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const requestBody = await req.json()
    console.log('Request body received:', { 
      hasText: !!requestBody.text, 
      textLength: requestBody.text?.length || 0,
      voiceId: requestBody.voiceId 
    })

    const { text, voiceId = 'pNInz6obpgDQGcFmaJgB' } = requestBody

    if (!text) {
      console.error('No text provided in request')
      throw new Error('Text is required')
    }

    const apiKey = Deno.env.get('ELEVENLABS_API_KEY')
    console.log('API key check:', { hasApiKey: !!apiKey, keyPrefix: apiKey?.substring(0, 8) + '...' })
    
    if (!apiKey) {
      console.error('ElevenLabs API key not found in environment variables')
      throw new Error('ElevenLabs API key not configured')
    }

    console.log('Making request to ElevenLabs API with voice:', voiceId)

    // Call ElevenLabs Text-to-Speech API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true
        }
      }),
    })

    console.log('ElevenLabs API response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText
      })
      
      if (response.status === 401) {
        throw new Error('Invalid ElevenLabs API key')
      } else if (response.status === 422) {
        throw new Error('Invalid voice ID or request parameters')
      } else {
        throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
      }
    }

    console.log('Successfully received audio from ElevenLabs')

    // Convert audio buffer to base64
    const arrayBuffer = await response.arrayBuffer()
    console.log('Audio buffer size:', arrayBuffer.byteLength)
    
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    )

    console.log('Successfully converted to base64, length:', base64Audio.length)

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Text-to-speech function error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check function logs for more information'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
