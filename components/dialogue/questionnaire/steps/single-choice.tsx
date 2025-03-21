import { SingleChoiceStep as SingleChoiceStepType } from '@/types/questionnaire';
import { RadioGroup } from '@/components/ui/radio-group';
import { Choice } from '@/components/common/Choice';
import { BodyText, Heading } from '@/components/common/Typography';
import Column from '@/components/structure/Column';
import { parseBoldText } from '@/utils/text';
import { ChoiceValue } from '@/types';

interface SingleChoiceStepProps {
  step: SingleChoiceStepType;
  value: ChoiceValue[];
  onChange: (value: ChoiceValue) => void;
  next: () => void;
}

export function SingleChoiceStep({
  step,
  value,
  onChange,
  next,
}: SingleChoiceStepProps) {
  return (
    <Column hasLargeGap>
      <Column hasNoGap>
        {step.question && <Heading>{parseBoldText(step.question)}</Heading>}
        {step.instruction && <BodyText>{step.instruction}</BodyText>}
      </Column>
      <RadioGroup
        value={
          value[0]?.stringValue || value[0]?.numericValue?.toString() || ''
        }
        onValueChange={(val: string) => onChange({ stringValue: val })}
        className='space-y-3'
      >
        {step.choices.map(choice => (
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
    </Column>
  );
}
