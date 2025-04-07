import type React from 'react';
import Column from '@/components/structure/Column';
import DialogueTextOutput from '@/components/common/DialogueTextOutput';
import DialogueTextOrVoiceInput from './DialogueTextOrVoiceInput';

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
  return isLoading ? (
    <div>Streaming...</div>
  ) : (
    <Column hasLargeGap fadeIn={fadeIn}>
      <DialogueTextOutput
        displayedQuestion={displayedQuestion}
        isTyping={isTyping}
        isAssistantMessage={isAssistantMessage}
      />

      <form onSubmit={onSubmit}>
        <div
          className={`transition-opacity duration-1000 ${
            !isTyping && displayedQuestion ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <DialogueTextOrVoiceInput
            ref={inputRef}
            value={input}
            onChange={onInputChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isTyping={isTyping}
            buttonText={buttonText}
          />
        </div>
      </form>
    </Column>
  );
}
