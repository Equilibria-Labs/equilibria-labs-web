import type React from 'react';

import {
  Heading,
  HeadingLarge,
  BodyText,
} from '@/components/common/Typography';
import { Answer, ResultsStep } from '@/types/questionnaire';
import { getScoreFromAnswersWithFormula } from '../helpers/getScoreFromAnswersWithFormula';
import Column from '@/components/structure/Column';
import WeatherHeatmap from '@/components/common/WeatherHeatmap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Props {
  answers: Answer[];
  step: ResultsStep;
  next?: () => void;
}

const WeatherHeatmapResults: React.FC<Props> = ({ answers, step, next }) => {
  const score = getScoreFromAnswersWithFormula(answers, step.formulaString);

  return (
    <Column>
      <HeadingLarge className='text-center'>{step.title}</HeadingLarge>
      <WeatherHeatmap
        score={score}
        maxScore={step.maxScore}
        bands={step.resultsBands}
      />
      <Heading>{step.heading}</Heading>
      <BodyText>{step.text}</BodyText>
      {step.buttonLink ? (
        <Link href={step.buttonLink}>
          <Button className='lg w-full'>{step.buttonText}</Button>
        </Link>
      ) : (
        next && (
          <Button className='lg w-full' onClick={next}>
            {step.buttonText}
          </Button>
        )
      )}
    </Column>
  );
};

export default WeatherHeatmapResults;
