import type React from 'react';
import Column from '@/components/structure/Column';
import DialogueTextOutput from '@/components/common/DialogueTextOutput';
import DialogueTextOrVoiceInput from './DialogueTextOrVoiceInput';
import TextLoader from '@/components/common/TextLoader';

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
  loadingText?: string;
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
  loadingText = 'Thinking...',
}: QuestionAnswerChatProps) {
  return isLoading ? (
    <TextLoader text={loadingText} />
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
