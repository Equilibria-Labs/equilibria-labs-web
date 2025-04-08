import { BodyText } from '@/components/common/Typography';

interface TextLoaderProps {
  text?: string;
  className?: string;
}

export default function TextLoader({
  text = 'Thinking...',
  className = '',
}: TextLoaderProps) {
  return <BodyText className={`animate-pulse ${className}`}>{text}</BodyText>;
}
