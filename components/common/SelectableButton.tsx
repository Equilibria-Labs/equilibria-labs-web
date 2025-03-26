import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SelectableButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function SelectableButton({
  selected,
  onClick,
  children,
}: SelectableButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant='ghost'
      className={cn(
        'rounded-full transition-all',
        'bg-secondary/25 hover:bg-secondary/50',
        selected ? 'ring-2 ring-primary text-foreground' : 'text-white'
      )}
    >
      {children}
    </Button>
  );
}
