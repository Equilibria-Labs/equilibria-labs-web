import type React from 'react';

import { Heading, BodyText } from '@/components/common/Typography';
import { Answer, ResultsStep } from '@/types/questionnaire';
import { getScoreFromAnswersWithFormula } from '../helpers/getScoreFromAnswersWithFormula';
import Column from '@/components/structure/Column';
import WeatherHeatmap from '@/components/common/WeatherHeatmap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { parseBoldText } from '@/utils/text';

interface Props {
  answers: Answer[];
  step: ResultsStep;
  next?: () => void;
}

const WeatherHeatmapResults: React.FC<Props> = ({ answers, step, next }) => {
  const score = getScoreFromAnswersWithFormula(answers, step.formulaString);
  const resultsBand = step.resultsBands.find(
    band => score >= band.min && score <= band.max
  );

  return (
    <Column hasLargeGap>
      <WeatherHeatmap
        score={score}
        maxScore={step.maxScore}
        bands={step.resultsBands}
        arrowLabel={step.arrowLabel}
        arrowSubLabel={step.arrowSubLabel}
      />

      {(step.heading || resultsBand?.textFriendly) && (
        <Heading className='text-center'>
          {step.heading ||
            parseBoldText(
              `Your answers indicate *${resultsBand?.textFriendly}*`
            )}
        </Heading>
      )}
      {(step.text || resultsBand?.description) && (
        <BodyText className='text-center'>
          {step.text || resultsBand?.description}
        </BodyText>
      )}
      {step.buttonLink ? (
        <Link href={step.buttonLink}>
          <Button className='lg w-full'>{step.buttonText}</Button>
        </Link>
      ) : (
        next && (
          <Button className='lg w-full' onClick={next}>
            {resultsBand?.buttonText || step.buttonText}
          </Button>
        )
      )}
    </Column>
  );
};

export default WeatherHeatmapResults;
