import { HeadingLarge } from '@/components/common/Typography';

interface DialogueTextOutputProps {
  displayedQuestion: string;
  isTyping: boolean;
  isAssistantMessage: boolean;
  className?: string;
}

export default function DialogueTextOutput({
  displayedQuestion,
  className = '',
}: DialogueTextOutputProps) {
  return (
    <HeadingLarge className={`text-secondary ${className}`}>
      {displayedQuestion}
    </HeadingLarge>
  );
}
