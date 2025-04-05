// hooks/useSpeechToText.ts
import { useEffect, useRef, useState } from 'react';
import { getSpeechRecognition } from '@/utils/speechRecognition';
import type { SpeechRecognition, SpeechRecognitionEvent } from '@/types';

export function useSpeechToText() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const recognition = getSpeechRecognition();
    if (!recognition) {
      setSupported(false);
      return;
    }

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onerror = (event: Event) => {
      console.error('Speech recognition error:', event);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    console.log('startListening');
    if (!recognitionRef.current || listening) return;
    setTranscript('');
    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    console.log('stopListening');
    if (!recognitionRef.current || !listening) return;
    recognitionRef.current.stop();
    setListening(false);
  };

  return {
    transcript,
    listening,
    supported,
    startListening,
    stopListening,
    setTranscript, // to allow manual edits
  };
}
