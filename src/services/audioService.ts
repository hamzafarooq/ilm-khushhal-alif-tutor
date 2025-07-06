
import { supabase } from '@/integrations/supabase/client';

export const convertSpeechToText = async (audioBlob: Blob): Promise<string> => {
  try {
    // Convert blob to base64
    const arrayBuffer = await audioBlob.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    const { data, error } = await supabase.functions.invoke('speech-to-text', {
      body: { audio: base64Audio }
    });

    if (error) throw error;
    return data.text || '';
  } catch (error) {
    console.error('Error converting speech to text:', error);
    throw error;
  }
};

export const convertTextToSpeech = async (text: string, voiceId: string = 'kD4dEWy2fbcyXlge6iHh'): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('text-to-speech', {
      body: { text, voiceId }
    });

    if (error) throw error;
    return data.audioContent;
  } catch (error) {
    console.error('Error converting text to speech:', error);
    throw error;
  }
};
