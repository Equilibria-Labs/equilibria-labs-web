import type React from 'react';
import { Answer, QuestionnaireConfig } from '@/types/questionnaire';
import { getScoreFromAnswersWithFormula } from '../helpers/getScoreFromAnswersWithFormula';
import { ChevronDown } from 'lucide-react';
import Column from '@/components/structure/Column';
import Row from '@/components/structure/Row';

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

  // Calculate total gap space (2% between each band)
  const totalGaps = (config.results.resultsBands.length - 1) * 2;
  const availableSpace = 100 - totalGaps;

  // Calculate grid template columns based on band ranges
  const gridColumns = config.results.resultsBands
    .map(band => {
      const bandRange = band.max - band.min;
      const totalRange = config.results.maxScore;
      const width = (bandRange / totalRange) * availableSpace;
      return `${width}%`;
    })
    .join(' ');

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
      <div className='h-2 rounded-full bg-gradient-to-r from-[#00ff00] via-yellow-400 via-orange-500 to-red-600 mb-4' />

      {/* Result band boxes */}
      <Row
        gridTemplateColumns={gridColumns}
        gapInPercent={2}
        hasNoGap
        isFullWidth
      >
        {config.results.resultsBands.map((band, index) => (
          <div
            key={index}
            className='p-2 rounded-lg bg-gray-800 text-white text-xs text-center'
          >
            {band.textFriendly}
          </div>
        ))}
      </Row>
    </Column>
  );
};

export default SeverityIndicator;
