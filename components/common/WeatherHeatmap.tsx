import type React from 'react';
import { ChevronDown } from 'lucide-react';
import Row from '@/components/structure/Row';
import { Heading } from '@/components/common/Typography';
import Box from '@/components/structure/Box';

interface WeatherHeatmapResultsProps {
  score: number;
  maxScore: number;
  bands: {
    min: number;
    max: number;
    textFriendly: string;
  }[];
}

const SeverityIndicator: React.FC<WeatherHeatmapResultsProps> = ({
  score,
  maxScore,
  bands,
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
    <Box level='1' isInverted>
      {/* Indicator label */}
      <div
        className='flex flex-col items-center mb-2 w-full'
        style={{ marginLeft: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <Heading>You</Heading>
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
            className='p-2 rounded-lg bg-background/10 text-background text-xs text-center'
          >
            {band.textFriendly}
          </div>
        ))}
      </Row>
    </Box>
  );
};

export default SeverityIndicator;
