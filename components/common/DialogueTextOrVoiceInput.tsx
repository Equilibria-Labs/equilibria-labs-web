import React, { forwardRef, useEffect, ChangeEvent, RefObject } from 'react';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { Button } from '@/components/ui/button';
import Column from '../structure/Column';
import Row from '../structure/Row';

interface DialogueTextOrVoiceInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSubmit?: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isTyping?: boolean;
  buttonText?: string;
}

const DialogueTextOrVoiceInput = forwardRef<
  HTMLTextAreaElement,
  DialogueTextOrVoiceInputProps
>(
  (
    {
      onSubmit,
      isLoading,
      isTyping,
      onChange,
      onKeyDown,
      value,
      buttonText,
      ...props
    },
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
      <Column justifyItems='end'>
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
          placeholder={listening ? 'Listening...' : 'Type or click the mic...'}
          className='w-full min-h-[64px] p-0 text-heading bg-transparent border-none outline-none resize-none font-input pr-12'
          disabled={isLoading || isTyping}
          rows={1}
          {...props}
        />
        <Row justify='space-between' isFullWidth>
          {supported && (
            <Button
              type='button'
              variant='secondary'
              size='iconCircle'
              iconName={listening ? 'check' : 'mic'}
              onClick={listening ? stopListening : startListening}
            />
          )}
          <Button
            type='submit'
            variant='secondary'
            size={buttonText ? 'lg' : 'iconCircle'}
            className='rounded-full'
            isLoading={isLoading}
            iconName='chevronRight'
            disabled={
              isLoading ||
              isTyping ||
              (typeof value === 'string' ? !value.trim() : !value)
            }
            onClick={e => {
              e.preventDefault();
              onSubmit?.(e);
            }}
          >
            {buttonText && <span className='mr-2'>{buttonText}</span>}
          </Button>
        </Row>
      </Column>
    );
  }
);

DialogueTextOrVoiceInput.displayName = 'DialogueTextOrVoiceInput';

export default DialogueTextOrVoiceInput;
