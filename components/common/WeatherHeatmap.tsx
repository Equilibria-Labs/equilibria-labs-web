import type React from 'react';
import { ChevronDown } from 'lucide-react';
import Row from '@/components/structure/Row';
import { Heading, BodyText } from '@/components/common/Typography';
import Box from '@/components/structure/Box';
import { ResultsBand } from '@/types/questionnaire';
import Column from '@/components/structure/Column';
import { Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';

const IconMap = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  lightning: CloudLightning,
} as const;

type IconName = keyof typeof IconMap;

interface IconProps {
  name: string | undefined;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const IconComponent =
    name && name in IconMap ? IconMap[name as IconName] : Cloud; // Default to Cloud if no icon specified or invalid icon name
  return <IconComponent className='w-6 h-6' />;
};

interface WeatherHeatmapResultsProps {
  score: number;
  maxScore: number;
  bands: ResultsBand[];
  arrowLabel?: string;
  arrowSubLabel?: string;
}

const SeverityIndicator: React.FC<WeatherHeatmapResultsProps> = ({
  score,
  maxScore,
  bands,
  arrowLabel,
  arrowSubLabel,
}) => {
  const position = (score / maxScore) * 100;

  const gapInPercent = 2;
  // Calculate total gap space (2% between each band)
  const totalGaps = (bands.length - 1) * gapInPercent;
  const availableSpace = 100 - totalGaps;

  // Calculate grid template columns based on band ranges
  const gridColumns = bands
    .map(band => {
      const bandRange = band.max - band.min + 1; // Add 1 to include both min and max values
      const totalRange = maxScore + 1; // Add 1 to include 0
      const width = (bandRange / totalRange) * availableSpace;
      return `${width}%`;
    })
    .join(' ');

  return (
    <Box hasNoBg>
      {/* Indicator label */}
      <div
        className='flex flex-col items-center w-full transition-all duration-500 ease-in-out'
        style={{ marginLeft: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <Heading>{arrowLabel}</Heading>
        {arrowSubLabel && <BodyText>{arrowSubLabel}</BodyText>}
        <ChevronDown className='w-8 h-8 text-white' strokeWidth={3} />
      </div>

      {/* Gradient bar */}
      <div className='h-2 rounded-full bg-gradient-to-r from-[#00ff00] via-yellow-400 via-orange-500 to-red-600 mb-1' />

      {/* Result band boxes */}
      <Row
        gridTemplateColumns={gridColumns}
        gapInPercent={gapInPercent}
        hasNoGap
        isFullWidth
      >
        {bands.map((band, index) => (
          <div
            key={index}
            className='px-2 py-4 rounded-lg bg-foreground/10 text-foreground text-xs text-center'
          >
            <Column justifyItems='center' hasSmallGap>
              <Icon name={band.iconName} />
              {band.textFriendly}
            </Column>
          </div>
        ))}
      </Row>
    </Box>
  );
};

export default SeverityIndicator;
