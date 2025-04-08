import { RadioGroup } from '@/components/ui/radio-group';
import { Choice } from '@/components/common/Choice';
import { UIChoice } from '@/types/questionnaire';
import { ChoiceValue } from '@/types';

interface ChoiceRadioGroupProps {
  value: ChoiceValue[];
  onChange: (value: ChoiceValue) => void;
  next: () => void;
  choices: UIChoice[];
}

export function ChoiceRadioGroup({
  value,
  onChange,
  next,
  choices,
}: ChoiceRadioGroupProps) {
  return (
    <RadioGroup
      value={value[0]?.stringValue || value[0]?.numericValue?.toString() || ''}
      onValueChange={(val: string) => onChange({ stringValue: val })}
      className='space-y-3'
    >
      {choices.map(choice => (
        <Choice
          key={choice.choiceId}
          choice={choice}
          onChange={() => onChange(choice.value)}
          next={next}
          type='radio'
          iconName={choice.iconName}
        />
      ))}
    </RadioGroup>
  );
}
