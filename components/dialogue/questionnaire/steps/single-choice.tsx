import { SingleChoiceStep as SingleChoiceStepType } from '@/types/questionnaire';
import { BodyText, Heading } from '@/components/common/Typography';
import Column from '@/components/structure/Column';
import { parseBoldText } from '@/utils/text';
import { ChoiceValue } from '@/types';
import { ChoiceRadioGroup } from '@/components/common/ChoiceRadioGroup';

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
      <ChoiceRadioGroup
        value={value}
        onChange={onChange}
        next={next}
        choices={step.choices}
      />
    </Column>
  );
}
