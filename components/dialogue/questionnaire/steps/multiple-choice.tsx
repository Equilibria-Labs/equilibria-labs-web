// import { useState, useEffect } from 'react';
import { useState } from 'react';
import { MultipleChoiceStep as MultipleChoiceStepType } from '@/types/questionnaire';
import { Button } from '@/components/ui/button';
import { Choice } from '@/components/common/Choice';
import { Heading, HeadingSmall } from '@/components/common/Typography';
import Column from '@/components/structure/Column';

interface MultipleChoiceStepProps {
  step: MultipleChoiceStepType;
  initialValue: string[];
  onChange: (value: string[]) => void;
  next: () => void;
}

export function MultipleChoiceStep({
  step,
  initialValue,
  onChange,
  next,
}: MultipleChoiceStepProps) {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(initialValue);

  // useEffect(() => {
  //   onChange(selectedOptions)
  // }, [selectedOptions, onChange])

  const handleToggle = (choiceId: string) => {
    const newSelection =
      choiceId === 'none'
        ? selectedOptions.includes('none')
          ? []
          : ['none']
        : selectedOptions.includes(choiceId)
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
      {step.question && <Heading>{step.question}</Heading>}
      {step.instruction && <HeadingSmall>{step.instruction}</HeadingSmall>}
      {step.choices.map(choice => (
        <Choice
          key={choice.id}
          choice={choice}
          onChange={handleToggle}
          next={next}
          type='checkbox'
          checked={selectedOptions.includes(choice.id)}
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
