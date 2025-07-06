
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';
import { convertSpeechToText, convertTextToSpeech } from '@/services/audioService';
import { useToast } from '@/hooks/use-toast';

interface AudioControlsProps {
  onSpeechResult: (text: string) => void;
  lastAIResponse?: string;
  disabled?: boolean;
}

export const AudioControls = ({ onSpeechResult, lastAIResponse, disabled }: AudioControlsProps) => {
  const [isConverting, setIsConverting] = useState(false);
  const { isRecording, isPlaying, startRecording, stopRecording, playAudio } = useAudio();
  const { toast } = useToast();

  const handleStartRecording = async () => {
    try {
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

  const handlePlayLastResponse = async () => {
    if (!lastAIResponse) return;
    
    try {
      const audioBase64 = await convertTextToSpeech(lastAIResponse);
      await playAudio(audioBase64);
    } catch (error) {
      console.error('Error playing audio:', error);
      toast({
        title: "Error",
        description: "Could not play audio. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        disabled={disabled || isConverting}
        variant={isRecording ? "destructive" : "outline"}
        size="sm"
        className="flex items-center space-x-1"
      >
        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        <span className="text-xs">
          {isConverting ? 'Processing...' : isRecording ? 'Stop' : 'Record'}
        </span>
      </Button>

      {lastAIResponse && (
        <Button
          onClick={handlePlayLastResponse}
          disabled={disabled || isPlaying}
          variant="outline"
          size="sm"
          className="flex items-center space-x-1"
        >
          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="text-xs">
            {isPlaying ? 'Playing...' : 'Play'}
          </span>
        </Button>
      )}
    </div>
  );
};
