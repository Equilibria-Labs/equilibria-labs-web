import { Answer, QuestionnaireConfig } from '@/types/questionnaire';
import { Button } from '@/components/ui/button';
import { getScoreFromAnswersWithFormula } from '../helpers/getScoreFromAnswersWithFormula';

interface SpeedDialResultsStepProps {
  answers: Answer[];
  config: QuestionnaireConfig;
}

export function SpeedDialResultsStep({
  answers,
  config,
}: SpeedDialResultsStepProps) {
  const score = getScoreFromAnswersWithFormula(
    answers,
    config.results.formulaString
  );
  console.log(answers);
  console.log(score);
  return (
    <div className='space-y-8'>
      <div className='relative p-8'>
        <svg className='w-full h-full' viewBox='0 0 100 100'>
          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='#4B5563'
            strokeWidth='10'
          />
          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='#EF4444'
            strokeWidth='10'
            strokeDasharray={`${score * 2.83} 283`}
            transform='rotate(-90 50 50)'
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
          <h2 className='text-4xl font-bold'>{score}%</h2>
          <p className='text-lg font-medium text-red-400'>Needs Work</p>
        </div>
      </div>

      <div className='text-center'>
        <p className='text-lg font-medium mb-4'>
          Based on your sleep profile, we are confident that your sleep issues
          can be solved in a lasting way!
        </p>
        <Button className='w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white'>
          Take Back My Sleep
        </Button>
      </div>
    </div>
  );
}
