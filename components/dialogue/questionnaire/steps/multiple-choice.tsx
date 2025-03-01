// import { useState, useEffect } from 'react';
import { useState } from 'react';
import {
  MultipleChoiceStep as MultipleChoiceStepType,
  ChoiceValue,
} from '@/types/questionnaire';
import { Button } from '@/components/ui/button';
import { Choice } from '@/components/common/Choice';
import { BodyText, Heading } from '@/components/common/Typography';
import Column from '@/components/structure/Column';
import { parseBoldText } from '@/utils/text';

interface MultipleChoiceStepProps {
  step: MultipleChoiceStepType;
  initialValue: ChoiceValue[];
  onChange: (value: ChoiceValue[]) => void;
  next: () => void;
}

export function MultipleChoiceStep({
  step,
  initialValue,
  onChange,
  next,
}: MultipleChoiceStepProps) {
  const [selectedOptions, setSelectedOptions] =
    useState<ChoiceValue[]>(initialValue);

  // useEffect(() => {
  //   onChange(selectedOptions)
  // }, [selectedOptions, onChange])

  const handleToggle = (choice: ChoiceValue) => {
    const newSelection =
      choice.stringValue === 'none'
        ? selectedOptions.some(opt => opt.stringValue === 'none')
          ? []
          : [{ stringValue: 'none' }]
        : selectedOptions.some(opt => opt.stringValue === choice.stringValue)
          ? selectedOptions.filter(
              opt => opt.stringValue !== choice.stringValue
            )
          : [
              ...selectedOptions.filter(opt => opt.stringValue !== 'none'),
              choice,
            ];

    setSelectedOptions(newSelection);
    onChange(newSelection);
  };

  const isValid =
    step.type === 'multiple-choice-optional' ||
    (selectedOptions.length >= (step.minSelections || 1) &&
      selectedOptions.length <= (step.maxSelections || step.choices.length));

  return (
    <Column hasLargeGap>
      {step.question && <Heading>{parseBoldText(step.question)}</Heading>}
      {step.instruction && <BodyText>{step.instruction}</BodyText>}
      {step.choices.map(choice => (
        <Choice
          key={choice.choiceId}
          choice={choice}
          onChange={() => handleToggle(choice.value)}
          next={next}
          type='checkbox'
          checked={selectedOptions.some(
            opt =>
              opt.stringValue === choice.value.stringValue ||
              opt.numericValue === choice.value.numericValue
          )}
          iconName={choice.iconName}
        />
      ))}

      {!isValid && (
        <p className='text-sm text-red-400'>
          Please select{' '}
          {step.minSelections === 1
            ? 'an option'
            : `${step.minSelections} options`}
        </p>
      )}

      <Button
        onClick={next}
        className='w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white'
        disabled={!isValid}
      >
        Continue
      </Button>
    </Column>
  );
}
