// import { useState, useEffect } from 'react';
import { useState } from 'react';
import {
  MultipleChoiceStep as MultipleChoiceStepType,
  ChoiceValue,
} from '@/types/questionnaire';
import { Button } from '@/components/ui/button';
import { Choice } from '@/components/common/Choice';
import { Heading, HeadingSmall } from '@/components/common/Typography';
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

  const handleToggle = (choiceId: ChoiceValue) => {
    const newSelection =
      choiceId === 'none'
        ? selectedOptions.includes('none')
          ? []
          : ['none']
        : selectedOptions.includes(choiceId?.toString() || '')
          ? selectedOptions.filter(id => id !== choiceId)
          : [...selectedOptions.filter(id => id !== 'none'), choiceId];

    setSelectedOptions(newSelection);
    onChange(newSelection);
  };

  const isValid =
    step.type === 'multiple-choice-optional' ||
    (selectedOptions.length >= (step.minSelections || 1) &&
      selectedOptions.length <= (step.maxSelections || step.choices.length));

  return (
    <Column>
      {step.question && <Heading>{parseBoldText(step.question)}</Heading>}
      {step.instruction && <HeadingSmall>{step.instruction}</HeadingSmall>}
      {step.choices.map(choice => (
        <Choice
          key={choice.choiceId}
          choice={choice}
          onChange={handleToggle}
          next={next}
          type='checkbox'
          checked={selectedOptions.includes(choice.choiceId)}
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
