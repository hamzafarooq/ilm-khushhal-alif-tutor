
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';
import { convertSpeechToText, convertTextToSpeech } from '@/services/audioService';
import { useToast } from '@/hooks/use-toast';

interface StreamingVoiceChatProps {
  onSpeechResult: (text: string) => void;
  isAudioMode: boolean;
  setIsAudioMode: (mode: boolean) => void;
}

export const StreamingVoiceChat = ({ onSpeechResult, isAudioMode, setIsAudioMode }: StreamingVoiceChatProps) => {
  const [isConverting, setIsConverting] = useState(false);
  const { isRecording, isPlaying, startRecording, stopRecording, playAudio } = useAudio();
  const { toast } = useToast();

  const handleStartRecording = async () => {
    try {
      setIsAudioMode(true);
      await startRecording();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not start recording. Please check microphone permissions.",
        variant: "destructive"
      });
    }
  };

  const handleStopRecording = async () => {
    try {
      setIsConverting(true);
      const audioBlob = await stopRecording();
      
      if (audioBlob) {
        const text = await convertSpeechToText(audioBlob);
        if (text.trim()) {
          onSpeechResult(text);
        } else {
          toast({
            title: "No speech detected",
            description: "Please try speaking more clearly.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Error processing speech:', error);
      toast({
        title: "Error",
        description: "Could not process speech. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        disabled={isConverting}
        variant={isRecording ? "destructive" : isAudioMode ? "default" : "outline"}
        size="sm"
        className="flex items-center space-x-2"
      >
        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        <span className="text-xs">
          {isConverting ? 'Processing...' : isRecording ? 'Stop Recording' : 'Voice Input'}
        </span>
      </Button>

      <Button
        onClick={() => setIsAudioMode(!isAudioMode)}
        variant={isAudioMode ? "default" : "outline"}
        size="sm"
        className="flex items-center space-x-2"
      >
        {isAudioMode ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        <span className="text-xs">
          {isAudioMode ? 'Audio On' : 'Audio Off'}
        </span>
      </Button>
    </div>
  );
};

// Export the playResponseAudio function separately for use in other components
export const useStreamingVoiceResponse = () => {
  const playResponseAudio = async (text: string) => {
    try {
      const audioBase64 = await convertTextToSpeech(text, 'alloy');
      const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
      await audio.play();
    } catch (error) {
      console.error('Error playing response audio:', error);
    }
  };

  return { playResponseAudio };
};
