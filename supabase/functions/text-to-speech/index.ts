
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
      voice: requestBody.voice 
    })

    const { text, voice = 'alloy' } = requestBody

    if (!text) {
      console.error('No text provided in request')
      throw new Error('Text is required')
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY')
    console.log('API key check:', { hasApiKey: !!apiKey })
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables')
      throw new Error('OpenAI API key not configured')
    }

    console.log('Making request to OpenAI TTS API with voice:', voice)

    // Call OpenAI Text-to-Speech API
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text,
        voice: voice,
        response_format: 'mp3',
      }),
    })

    console.log('OpenAI API response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText
      })
      
      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key')
      } else if (response.status === 400) {
        throw new Error('Invalid request parameters')
      } else {
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
      }
    }

    console.log('Successfully received audio from OpenAI')

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
