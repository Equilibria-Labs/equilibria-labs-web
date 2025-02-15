import type React from 'react';
import { Answer, QuestionnaireConfig } from '@/types/questionnaire';
import { getScoreFromAnswersWithFormula } from '../helpers/getScoreFromAnswersWithFormula';
import { ChevronDown } from 'lucide-react';
import Column from '@/components/structure/Column';
interface WeatherHeatmapResultsProps {
  answers: Answer[];
  config: QuestionnaireConfig;
}

const SeverityIndicator: React.FC<WeatherHeatmapResultsProps> = ({
  answers,
  config,
}) => {
  // Calculate the percentage position
  const score = getScoreFromAnswersWithFormula(
    answers,
    config.results.formulaString
  );
  const position = (score / config.results.maxScore) * 100;

  return (
    <Column>
      {/* Indicator label */}
      <div
        className='flex flex-col items-center mb-2 w-full'
        style={{ marginLeft: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <span className='text-sm text-white mb-1'>You</span>
        <ChevronDown className='w-4 h-4 text-white' />
      </div>

      {/* Gradient bar */}
      <div className='h-2 rounded-full bg-gradient-to-r from-[#00ff00] via-yellow-400 via-orange-500 to-red-600' />
    </Column>
  );
};

export default SeverityIndicator;
