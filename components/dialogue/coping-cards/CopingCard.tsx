import { HeadingLarge } from '@/components/common/Typography';
import Box from '@/components/structure/Box';
interface CopingCardProps {
  text: string;
}

export default function CopingCard({ text }: CopingCardProps) {
  return (
    <Box
      hasLargePadding
      align='center'
      justify='center'
      className='mx-16 h-[300px]'
    >
      <HeadingLarge className='text-center'>{text}</HeadingLarge>
    </Box>
  );
}
