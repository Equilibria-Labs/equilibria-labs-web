import { HeadingLarge } from '@/components/common/Typography';

interface DialogueTextOutputProps {
  displayedQuestion: string;
  isTyping: boolean;
  isAssistantMessage: boolean;
  className?: string;
}

export default function DialogueTextOutput({
  displayedQuestion,
  isTyping,
  isAssistantMessage,
  className = '',
}: DialogueTextOutputProps) {
  return (
    <HeadingLarge className={`text-secondary ${className}`}>
      {isTyping || !isAssistantMessage ? (
        <>
          {displayedQuestion}
          <span className='inline-block w-2 h-5 ml-1 bg-black animate-pulse'></span>
        </>
      ) : displayedQuestion ? (
        displayedQuestion
      ) : null}
    </HeadingLarge>
  );
}
