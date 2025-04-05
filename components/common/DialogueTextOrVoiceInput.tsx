import React, { forwardRef, useEffect, ChangeEvent, RefObject } from 'react';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { Button } from '@/components/ui/button';

interface DialogueTextOrVoiceInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSubmit?: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isTyping?: boolean;
}

const DialogueTextOrVoiceInput = forwardRef<
  HTMLTextAreaElement,
  DialogueTextOrVoiceInputProps
>(
  (
    { onSubmit, isLoading, isTyping, onChange, onKeyDown, value, ...props },
    ref
  ) => {
    const {
      transcript,
      listening,
      supported,
      startListening,
      stopListening,
      setTranscript,
    } = useSpeechToText();

    const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    };

    // Watch for transcript changes and sync with onChange
    useEffect(() => {
      if (transcript && onChange) {
        const newValue = value ? `${value} ${transcript}` : transcript;
        const event = {
          target: { value: newValue },
        } as ChangeEvent<HTMLTextAreaElement>;
        onChange(event);
        // Clear the transcript after we've used it
        setTranscript('');
      }
    }, [transcript, onChange, value]);

    // Watch for value changes and adjust height
    useEffect(() => {
      const textareaElement = ref as RefObject<HTMLTextAreaElement>;
      if (textareaElement?.current) {
        adjustTextareaHeight(textareaElement.current);
      }
    }, [value, ref]);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      // Call the original onChange if provided
      onChange?.(e);
      // Auto-expand height
      adjustTextareaHeight(e.target);
    };

    return (
      <>
        <textarea
          ref={ref}
          value={value || ''}
          onChange={handleTextChange}
          onKeyDown={e => {
            // Call the original onKeyDown if provided
            onKeyDown?.(e);
            // Handle Enter key submission
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (!isLoading && !isTyping && onSubmit) {
                onSubmit(e);
              }
            }
          }}
          className='w-full min-h-[64px] p-0 text-heading bg-transparent border-none outline-none resize-none font-input pr-12'
          disabled={isLoading || isTyping || listening}
          rows={1}
          {...props}
        />
        {supported && (
          <Button
            type='button'
            onClick={listening ? stopListening : startListening}
          >
            {listening ? 'Stop' : 'Start'} Recording
          </Button>
        )}
      </>
    );
  }
);

DialogueTextOrVoiceInput.displayName = 'DialogueTextOrVoiceInput';

export default DialogueTextOrVoiceInput;
