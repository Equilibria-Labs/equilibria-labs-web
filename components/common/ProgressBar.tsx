import React from 'react';

interface ProgressBarProps {
  currentStepIndex: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStepIndex,
  totalSteps,
}) => {
  return (
    <div className='mb-2 h-2 rounded-full'>
      <div
        className='h-full rounded-full transition-all duration-300 bg-secondary/60'
        style={{
          width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
        }}
      />
    </div>
  );
};
