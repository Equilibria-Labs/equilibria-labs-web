import type React from 'react';

import {
  Heading,
  HeadingLarge,
  BodyText,
} from '@/components/common/Typography';
import { Answer, QuestionnaireConfig } from '@/types/questionnaire';
import { getScoreFromAnswersWithFormula } from '../helpers/getScoreFromAnswersWithFormula';
import Column from '@/components/structure/Column';
import WeatherHeatmap from '@/components/common/WeatherHeatmap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
      <HeadingLarge className='text-center'>
        You can do this and you can expect a good outcome
      </HeadingLarge>
      <WeatherHeatmap
        score={score}
        maxScore={config.results.maxScore}
        bands={config.results.resultsBands}
      />
      <Heading>If you don't do this you'll have a bad outcome</Heading>
      <BodyText>
        This method is based on evidence-based sleep science and is personalised
        by AI.
      </BodyText>
      <Link href='/sleep-report'>
        <Button className='lg w-full'>Let's understand your sleep</Button>
      </Link>
    </Column>
  );
};

export default SeverityIndicator;
