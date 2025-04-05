// components/VoiceInput.tsx
import React from 'react';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { Button } from '@/components/ui/button';

export default function VoiceInput() {
  const {
    transcript,
    listening,
    supported,
    startListening,
    stopListening,
    setTranscript,
  } = useSpeechToText();

  if (!supported)
    return <p>Speech recognition not supported in this browser.</p>;

  return (
    <div>
      <Button onClick={listening ? stopListening : startListening}>
        {listening ? 'Stop' : 'Start'} Recording
      </Button>

      <textarea
        rows={4}
        value={transcript}
        onChange={e => setTranscript(e.target.value)}
        placeholder='Speak something or edit here'
      />

      <button onClick={() => console.log('Submit:', transcript)}>Submit</button>
    </div>
  );
}
