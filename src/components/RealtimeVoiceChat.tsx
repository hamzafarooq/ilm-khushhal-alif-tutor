import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RealtimeVoiceChatProps {
  onMessage?: (message: any) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  onTextUpdate?: (text: string, isComplete: boolean) => void;
}

export const RealtimeVoiceChat = ({ onMessage, isActive, setIsActive, onTextUpdate }: RealtimeVoiceChatProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [accumulatedText, setAccumulatedText] = useState('');
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const initializeConnection = async () => {
    try {
      setIsConnecting(true);
      console.log('Getting ephemeral token...');
      
      // Get ephemeral token from our edge function
      const { data, error } = await supabase.functions.invoke('realtime-session');
      
      if (error) {
        throw new Error(`Failed to get session token: ${error.message}`);
      }

      if (!data.client_secret?.value) {
        throw new Error("Failed to get ephemeral token from response");
      }

      const EPHEMERAL_KEY = data.client_secret.value;
      console.log('Got ephemeral token, creating peer connection...');

      // Create a peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Set up to play remote audio from the model
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioElementRef.current = audioEl;
      
      pc.ontrack = (e) => {
        console.log('Received remote audio track');
        audioEl.srcObject = e.streams[0];
      };

      // Add local audio track for microphone input
      console.log('Getting user media...');
      const ms = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      pc.addTrack(ms.getTracks()[0]);

      // Set up data channel for sending and receiving events
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      
      dc.addEventListener("message", (e) => {
        const event = JSON.parse(e.data);
        console.log('Received event from OpenAI:', event);
        
        // Handle streaming text responses - accumulate properly
        if (event.type === 'response.audio_transcript.delta') {
          const deltaText = event.delta || '';
          setAccumulatedText(prev => {
            const newText = prev + deltaText;
            console.log('Accumulated text so far:', newText);
            onTextUpdate?.(newText, false);
            setCurrentResponse(newText);
            return newText;
          });
        } else if (event.type === 'response.audio_transcript.done') {
          console.log('Audio transcript complete:', accumulatedText);
          onTextUpdate?.(accumulatedText, true);
          setCurrentResponse('');
          setAccumulatedText('');
        } else if (event.type === 'response.done') {
          console.log('Response complete');
          setCurrentResponse('');
          setAccumulatedText('');
        } else if (event.type === 'conversation.item.created' && event.item?.content) {
          // Handle text content
          const textContent = event.item.content.find((c: any) => c.type === 'text');
          if (textContent && event.item.role === 'assistant') {
            onTextUpdate?.(textContent.text, true);
          }
        }
        
        onMessage?.(event);
      });

      dc.addEventListener("open", () => {
        console.log('Data channel opened');
        setIsConnected(true);
        setIsConnecting(false);
      });

      // Start the session using SDP
      console.log('Creating offer...');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      
      console.log('Sending SDP offer to OpenAI...');
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(`SDP request failed: ${sdpResponse.status}`);
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      
      console.log('Setting remote description...');
      await pc.setRemoteDescription(answer);
      
      console.log('WebRTC connection established successfully');
      
      toast({
        title: "Connected",
        description: "Voice chat is now active. You can start speaking!",
      });

    } catch (error) {
      console.error('Error initializing connection:', error);
      setIsConnecting(false);
      setIsConnected(false);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : 'Failed to connect to voice chat',
        variant: "destructive"
      });
    }
  };

  const disconnect = () => {
    if (dcRef.current) {
      dcRef.current.close();
      dcRef.current = null;
    }
    
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    
    if (audioElementRef.current) {
      audioElementRef.current.srcObject = null;
      audioElementRef.current = null;
    }
    
    setIsConnected(false);
    setIsActive(false);
    setCurrentResponse('');
    setAccumulatedText('');
    
    toast({
      title: "Disconnected",
      description: "Voice chat has been ended.",
    });
  };

  const handleToggle = () => {
    if (isConnected) {
      disconnect();
    } else if (!isConnecting) {
      setIsActive(true);
      initializeConnection();
    }
  };

  const sendTextMessage = (text: string) => {
    if (dcRef.current?.readyState === 'open') {
      const event = {
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [
            {
              type: 'input_text',
              text
            }
          ]
        }
      };
      dcRef.current.send(JSON.stringify(event));
      dcRef.current.send(JSON.stringify({type: 'response.create'}));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <Button
          onClick={handleToggle}
          disabled={isConnecting}
          variant={isConnected ? "destructive" : isActive ? "default" : "outline"}
          size="sm"
          className="flex items-center space-x-2"
        >
          {isConnected ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          <span className="text-xs">
            {isConnecting ? 'Connecting...' : isConnected ? 'End Voice Chat' : 'Start Voice Chat'}
          </span>
        </Button>

        {isConnected && (
          <div className="flex items-center space-x-2 text-green-600">
            <Volume2 className="w-4 h-4" />
            <span className="text-xs">Live Audio Active</span>
          </div>
        )}
      </div>

      {/* Show streaming text response */}
      {currentResponse && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mt-2"></div>
            <div>
              <p className="text-xs text-blue-600 font-medium mb-1">AI is responding...</p>
              <p className="text-sm text-gray-800">{currentResponse}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export function to send text messages programmatically
export const useRealtimeVoiceChat = () => {
  return {
    sendTextMessage: (text: string) => {
      // This would need to be connected to the active instance
      console.log('Sending text message:', text);
    }
  };
};
