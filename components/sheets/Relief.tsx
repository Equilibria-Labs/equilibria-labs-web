import SheetNav from '@/components/navigation/SheetNav';
import { ReliefNavConfig } from '@/config/navigation';
import Column from '@/components/structure/Column';
import { Heading } from '@/components/common/Typography';

export default function ReliefSheet() {
  return (
    <Column>
      <Heading className='text-center'>Get Relief</Heading>
      <SheetNav config={ReliefNavConfig} />
    </Column>
  );
}
