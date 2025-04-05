import type React from 'react';
import Column from '@/components/structure/Column';
import { Button } from '@/components/ui/button';
import DialogueTextInput from '@/components/common/DialogueTextInput';
import DialogueTextOutput from '@/components/common/DialogueTextOutput';

interface QuestionAnswerChatProps {
  displayedQuestion: string;
  isTyping: boolean;
  isAssistantMessage: boolean;
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  fadeIn: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  buttonText?: string;
}

export default function QuestionAnswerChat({
  displayedQuestion,
  isTyping,
  isAssistantMessage,
  input,
  onInputChange,
  onSubmit,
  isLoading,
  fadeIn,
  inputRef,
  buttonText,
}: QuestionAnswerChatProps) {
  return (
    <Column hasLargeGap fadeIn={fadeIn}>
      <DialogueTextOutput
        displayedQuestion={displayedQuestion}
        isTyping={isTyping}
        isAssistantMessage={isAssistantMessage}
      />

      <form onSubmit={onSubmit}>
        <Column hasNoGap justifyItems='end'>
          <DialogueTextInput
            ref={inputRef}
            value={input}
            onChange={onInputChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isTyping={isTyping}
            placeholder='Type your response...'
          />
          <Button
            type='submit'
            variant='secondary'
            size={buttonText ? 'lg' : 'iconCircle'}
            className='rounded-full self-end'
            isLoading={isLoading}
            iconName='chevronRight'
            disabled={isLoading || isTyping || !input.trim()}
          >
            {buttonText && <span className='mr-2'>{buttonText}</span>}
          </Button>
        </Column>
      </form>
    </Column>
  );
}
