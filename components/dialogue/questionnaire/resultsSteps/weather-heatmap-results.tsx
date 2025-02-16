import type React from 'react';
import { Answer, QuestionnaireConfig } from '@/types/questionnaire';
import { getScoreFromAnswersWithFormula } from '../helpers/getScoreFromAnswersWithFormula';
import Column from '@/components/structure/Column';
import WeatherHeatmap from '@/components/common/WeatherHeatmap';

interface WeatherHeatmapResultsProps {
  answers: Answer[];
  config: QuestionnaireConfig;
}

const SeverityIndicator: React.FC<WeatherHeatmapResultsProps> = ({
  answers,
  config,
}) => {
  const score = getScoreFromAnswersWithFormula(
    answers,
    config.results.formulaString
  );

  return (
    <Column>
      <WeatherHeatmap
        score={score}
        maxScore={config.results.maxScore}
        bands={config.results.resultsBands}
      />
    </Column>
  );
};

export default SeverityIndicator;
