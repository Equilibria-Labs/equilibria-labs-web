import { RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ButtonText } from '@/components/common/Typography';
import { Check } from 'lucide-react';
import { Choice as ChoiceType, ChoiceValue } from '@/types';

interface ChoiceProps {
  choice: ChoiceType;
  onChange: (value: ChoiceValue) => void;
  next: () => void;
  type: 'radio' | 'checkbox';
  checked?: boolean; // Optional prop for checkbox
}

export function Choice({ choice, onChange, next, type, checked }: ChoiceProps) {
  const handleClick = async () => {
    if (type === 'checkbox') {
      await onChange(choice.value);
    } else if (type === 'radio') {
      await onChange(choice.value);
      next();
    }
  };

  return (
    <div
      key={choice.choiceId}
      className={`relative flex items-center justify-between rounded-xl p-4 cursor-pointer text-primary-foreground transition-colors ${
        checked
          ? 'bg-primary/75'
          : 'bg-secondary/75 hover:bg-secondary hover:bg-opacity-50'
      }`}
    >
      <div className='absolute inset-0 z-10' onClick={handleClick} />
      {type === 'radio' ? (
        <RadioGroupItem
          value={String(choice.value ?? '')}
          id={choice.choiceId}
          className='sr-only'
        />
      ) : (
        <Checkbox
          id={choice.choiceId}
          checked={checked}
          onCheckedChange={() => onChange(choice.value)}
          className='hidden' // Hide the checkbox
        />
      )}
      <Label
        htmlFor={choice.choiceId}
        className='flex-1 cursor-pointer text-lg'
      >
        <ButtonText>{choice.text}</ButtonText>
      </Label>
      {checked && <Check className='w-6 h-6 text-white' aria-hidden='true' />}
    </div>
  );
}
