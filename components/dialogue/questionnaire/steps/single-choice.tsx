import { SingleChoiceStep as SingleChoiceStepType } from '@/types/questionnaire';
import { RadioGroup } from '@/components/ui/radio-group';
import { Choice } from '@/components/common/Choice';
import { Heading, HeadingSmall } from '@/components/common/Typography';
import Column from '@/components/structure/Column';

interface SingleChoiceStepProps {
  step: SingleChoiceStepType;
  value: string[];
  onChange: (value: string) => void;
  next: () => void;
}

export function SingleChoiceStep({
  step,
  value,
  onChange,
  next,
}: SingleChoiceStepProps) {
  return (
    <Column>
      {step.question && <Heading>{step.question}</Heading>}
      {step.instruction && <HeadingSmall>{step.instruction}</HeadingSmall>}
      <RadioGroup
        value={value[0]}
        onValueChange={onChange}
        className='space-y-3'
      >
        {step.choices.map(choice => (
          <Choice
            key={choice.id}
            choice={choice}
            onChange={onChange}
            next={next}
            type='radio'
          />
        ))}
      </RadioGroup>
    </Column>
  );
}
